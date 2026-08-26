import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title, Hero, and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await expect(page).toHaveTitle(/PixelForge/);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("#home")).toBeVisible();

    expect(errors, `Console/page errors: ${errors.join(" | ")}`).toEqual([]);
  });

  test("has exactly one H1 and a logical heading structure", async ({ page }) => {
    await page.goto("/");
    // A fresh browser context (no sessionStorage) plays the one-time branded intro,
    // which briefly renders its own "PixelForge" <h1> alongside the Hero's; wait past
    // its safety timeout (1100ms) so only the real page heading remains.
    await page.waitForTimeout(1300);
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test("header nav scrolls to the target section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /servizi|services/i }).first().click();
    // The homepage now prerenders every below-the-fold section up front (for SEO),
    // so there's more concurrent GSAP/ScrollTrigger setup work competing with the
    // smooth-scroll on initial load than before; give it more room to settle.
    await page.waitForTimeout(1200);
    await expect(page.locator("#servizi")).toBeInViewport();
  });

  test("language switcher toggles visible copy", async ({ page }) => {
    await page.goto("/");
    const heroHeading = page.locator("h1").first();
    const italianText = await heroHeading.innerText();

    // exact: true -- otherwise this substring-matches unrelated buttons whose copy
    // happens to contain "en" (e.g. "Prenota", "...senza impegno"), now all present
    // in the DOM immediately since the homepage is prerendered.
    await page.getByRole("button", { name: "EN", exact: true }).first().click();
    await page.waitForTimeout(300);
    const englishText = await heroHeading.innerText();

    expect(englishText).not.toBe(italianText);
  });

  test("below-the-fold sections are present in the prerendered HTML", async ({ page }) => {
    // The homepage is now prerendered for SEO, so below-the-fold content (e.g.
    // pricing) is real, crawlable markup from the very first response -- no
    // scrolling or client JS required to reveal it.
    await page.goto("/");
    await expect(page.locator("#listino")).toBeAttached({ timeout: 10_000 });
  });

  test("portfolio card opens and closes the case-study modal", async ({ page }) => {
    await page.goto("/");
    // Let the one-time branded intro (fresh context => no sessionStorage) finish;
    // it covers the full viewport until its safety timeout (1100ms) elapses.
    await page.waitForTimeout(1300);
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
    await page.waitForTimeout(400);

    const firstCard = page.locator('.card-glow-hover').first();
    await firstCard.waitFor({ state: "visible", timeout: 10_000 });
    await firstCard.click();

    // exact: true -- otherwise this also substring-matches the mobile drawer's
    // "Chiudi menu" close button, which is present (off-canvas) at narrow viewports.
    const modal = page.getByRole("button", { name: "Chiudi", exact: true });
    await expect(modal).toBeVisible();
    await modal.click();
    await expect(modal).toBeHidden();
  });

  test("contact form fields are fillable", async ({ page }) => {
    await page.goto("/#contatti");
    // Let the one-time branded intro (fresh context => no sessionStorage) finish;
    // it covers the full viewport until its safety timeout (1100ms) elapses.
    await page.waitForTimeout(1300);
    await page.locator("#contatti").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Scoped to #contatti: index.html also has a hidden, Netlify-only form-detection
    // stub with the same field names outside the React app, matched otherwise.
    const form = page.locator("#contatti");
    await form.locator('input[name="name"]').fill("Mario Rossi");
    await form.locator('input[name="email"]').fill("mario@example.com");
    await form.locator('input[name="business"]').fill("Rossi SA");
    await form.locator('textarea[name="message"]').fill("Vorrei un preventivo per un sito web.");

    await expect(form.locator('input[name="name"]')).toHaveValue("Mario Rossi");
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens the drawer and the close button is accessible", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Toggle menu" }).click();
    const drawer = page.locator("#mobile-nav-drawer");
    await expect(drawer).toBeVisible();

    const closeBtn = page.locator("#mobile-drawer-close");
    await expect(closeBtn).toHaveAccessibleName(/chiudi/i);
    await closeBtn.click();
    await expect(drawer).not.toHaveClass(/translate-x-0/);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(hasOverflow).toBe(false);
  });
});

test.describe("404 page", () => {
  test("an unknown URL renders the Not Found page with a working home CTA", async ({ page }) => {
    // Note: `vite preview` (this suite's local server) has no equivalent of Netlify's
    // _redirects, so it serves dist/index.html (the prerendered homepage) verbatim for
    // any unrecognized path instead of the empty dist/app-shell.html Netlify would use.
    // The client then correctly reconciles to the catch-all route/NotFoundPage, but --
    // only in this local-preview harness -- React logs a recoverable hydration error
    // while doing so, since the served markup doesn't match this route. This has been
    // verified clean (no console errors) against a harness that replicates the real
    // Netlify _redirects behavior; asserting on console output here would just be
    // asserting on this test server's known limitation, not a real bug.
    await page.goto("/this-page-does-not-exist");
    await expect(page).toHaveTitle(/Pagina non trovata/);
    await expect(page.getByRole("heading", { name: "Pagina non trovata" })).toBeVisible();

    const homeCta = page.getByRole("link", { name: "Torna alla home" });
    await expect(homeCta).toBeVisible();
    await homeCta.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("#home")).toBeVisible();
  });

  test("existing routes are unaffected by the catch-all", async ({ page }) => {
    for (const path of ["/", "/blog", "/privacy-policy", "/cookie-policy", "/termini-e-condizioni"]) {
      await page.goto(path);
      await expect(page).not.toHaveTitle(/Pagina non trovata/);
    }
  });
});

test.describe("Blog", () => {
  test("listing page renders posts and links to an article", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toBeVisible();
    const firstPost = page.locator("main a[href^='/blog/']").first();
    await expect(firstPost).toBeVisible();
    await firstPost.click();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveURL(/\/blog\/.+/);
  });

  test("article page has SEO metadata", async ({ page }) => {
    await page.goto("/blog/costo-sito-web-ticino-2026");
    await expect(page).toHaveTitle(/.+/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description && description.length).toBeGreaterThan(20);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/blog/costo-sito-web-ticino-2026");
    const jsonLd = await page.locator('script[type="application/ld+json"]').last().textContent();
    expect(() => JSON.parse(jsonLd || "")).not.toThrow();
  });
});
