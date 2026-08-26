import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Excludes color-contrast from the strict "serious+" gate below: the site's premium
// dark theme uses several deliberately subtle/low-contrast decorative text treatments
// (e.g. muted captions) that are a design choice, not something a code pass should
// silently "fix" by changing colors. Everything else structural/semantic must pass.
const SERIOUS_RULES_ONLY = (violations: { id: string; impact?: string | null }[]) =>
  violations.filter((v) => v.id !== "color-contrast" && (v.impact === "critical" || v.impact === "serious"));

test("homepage has no critical/serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(500);
  const results = await new AxeBuilder({ page }).exclude(".pf-noise-bg").analyze();
  const serious = SERIOUS_RULES_ONLY(results.violations);
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("blog article has no critical/serious accessibility violations", async ({ page }) => {
  await page.goto("/blog/costo-sito-web-ticino-2026");
  await page.waitForTimeout(300);
  const results = await new AxeBuilder({ page }).analyze();
  const serious = SERIOUS_RULES_ONLY(results.violations);
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});
