import { Link } from "react-router-dom";
import LegalPageLayout from "../components/LegalPageLayout";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useLanguage } from "../context/LanguageContext";
import { getRouteMeta } from "../lib/routeMeta";

// Every piece of copy here is reused verbatim from the already-verified,
// already-bilingual "about" section shown on the homepage (see
// context/LanguageContext.tsx's `about` block and components/About.tsx's
// `stats` array) -- nothing on this page is new or invented content, only a
// more substantial, standalone presentation of it with its own crawlable URL.
const STATS_IT = [
  { value: "100%", label: "Siti realizzati su misura, mai template" },
  { value: "< 0.4s", label: "Tempo di caricamento medio a cui puntiamo" },
  { value: "100/100", label: "Punteggio Google PageSpeed su cui lavoriamo" },
  { value: "6", label: "Servizi digitali integrati in un unico partner" },
];
const STATS_EN = [
  { value: "100%", label: "Custom-built sites, never templates" },
  { value: "< 0.4s", label: "Average load time we build towards" },
  { value: "100/100", label: "Google PageSpeed score we target" },
  { value: "6", label: "Digital services integrated under one partner" },
];

export default function AboutPage() {
  const { language } = useLanguage();
  useDocumentHead(getRouteMeta("/chi-siamo"));

  const stats = language === "it" ? STATS_IT : STATS_EN;

  return (
    <LegalPageLayout
      title={language === "it" ? "Chi Siamo" : "About Us"}
      lastUpdated={language === "it" ? "7 agosto 2026" : "August 7, 2026"}
    >
      {language === "it" ? (
        <>
          <p>
            <strong>PixelForge</strong> è una web agency con sede a Bellinzona, specializzata nella
            creazione di siti web di altissimo livello per piccole e medie imprese in Ticino, Lugano e
            in tutta la Svizzera italiana. Non usiamo template prefabbricati: ogni riga di codice è
            scritta per garantire la massima velocità e un design che conquista al primo sguardo.
          </p>

          <h2>Il nostro approccio</h2>
          <p>
            <strong>Standard di qualità svizzera</strong> — Precisione in ogni pixel, rispetto dei
            tempi stabiliti e affidabilità totale nelle comunicazioni.
          </p>
          <p>
            <strong>Sviluppo orientato ai risultati</strong> — I nostri siti non sono solo belli: sono
            progettati per ricevere richieste di preventivo e contatti caldi.
          </p>

          <h2>I nostri numeri</h2>
          <ul>
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong> — {s.label}
              </li>
            ))}
          </ul>

          <h2>Dove operiamo</h2>
          <p>
            Con sede a Bellinzona, seguiamo aziende in tutto il Ticino — Bellinzona, Lugano, Locarno,
            Mendrisio — e nella Svizzera italiana. Puoi vedere alcuni dei progetti realizzati nella
            nostra <Link to="/#portfolio">galleria progetti</Link>, consultare i pacchetti nella
            sezione <Link to="/#listino">prezzi</Link>, oppure leggere le guide pratiche sul nostro{" "}
            <Link to="/blog">blog</Link>.
          </p>

          <h2>Contatti</h2>
          <p>
            Scrivici a{" "}
            <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>, oppure trovi tutti i canali di
            contatto nella sezione <Link to="/#contatti">contatti</Link> della homepage.
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>PixelForge</strong> is a Swiss web agency based in Bellinzona, specializing in
            high-end websites for small and medium businesses in Ticino, Lugano and across Italian-
            speaking Switzerland. We do not use premade generic templates: every line of code is
            custom-written to ensure peak performance and design that captures your audience instantly.
          </p>

          <h2>Our approach</h2>
          <p>
            <strong>Swiss quality standards</strong> — Precision in every pixel, strict compliance with
            deadlines, and total communication reliability.
          </p>
          <p>
            <strong>Results-driven development</strong> — Our websites aren't just pretty: they are
            engineered to generate inquiry forms and warm business leads.
          </p>

          <h2>By the numbers</h2>
          <ul>
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong> — {s.label}
              </li>
            ))}
          </ul>

          <h2>Where we work</h2>
          <p>
            Based in Bellinzona, we work with businesses across Ticino — Bellinzona, Lugano, Locarno,
            Mendrisio — and Italian-speaking Switzerland. You can see some of our completed projects in
            our <Link to="/#portfolio">project gallery</Link>, check our packages in the{" "}
            <Link to="/#listino">pricing</Link> section, or read practical guides on our{" "}
            <Link to="/blog">blog</Link>.
          </p>

          <h2>Contact</h2>
          <p>
            Write to us at <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>, or find every contact
            channel in the <Link to="/#contatti">contact</Link> section of the homepage.
          </p>
        </>
      )}
    </LegalPageLayout>
  );
}
