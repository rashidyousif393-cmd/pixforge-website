import { Link } from "react-router-dom";
import LegalPageLayout from "../components/LegalPageLayout";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getRouteMeta } from "../lib/routeMeta";

export default function TerminiCondizioniPage() {
  useDocumentHead(getRouteMeta("/termini-e-condizioni"));

  return (
    <LegalPageLayout title="Termini e Condizioni" lastUpdated="7 agosto 2026">
      <p>
        I presenti Termini e Condizioni regolano l'utilizzo del sito{" "}
        <a href="https://pixforge.ch">pixforge.ch</a>, gestito da <strong>PixelForge</strong> con sede
        a Bellinzona, Ticino, Svizzera ("noi", "PixelForge"). Accedendo e navigando il sito accetti i
        termini descritti in questa pagina. Se non li condividi, ti invitiamo a non utilizzare il
        sito.
      </p>

      <h2>1. Oggetto del sito</h2>
      <p>
        Il sito ha finalità informativa e commerciale: presenta i servizi di PixelForge (realizzazione
        di siti web, e-commerce, ottimizzazione SEO, branding e servizi digitali correlati), un
        portfolio di progetti realizzati, un blog con contenuti informativi e un modulo per richiedere
        una consulenza o un preventivo. La navigazione del sito non costituisce di per sé un contratto
        di servizio tra te e PixelForge.
      </p>

      <h2>2. Proprietà intellettuale</h2>
      <p>
        Salvo diversa indicazione, i testi, i loghi, il design, il codice e i contenuti originali del
        sito sono di proprietà di PixelForge e protetti dalle leggi applicabili sul diritto d'autore e
        sulla proprietà intellettuale. Alcune immagini presenti sul sito, in particolare nel blog e nel
        portfolio, provengono da librerie fotografiche di terze parti (ad esempio Unsplash) e sono
        utilizzate secondo le rispettive licenze d'uso. Non è consentito copiare, riprodurre o
        riutilizzare i contenuti originali del sito senza autorizzazione scritta.
      </p>

      <h2>3. Uso consentito del sito</h2>
      <p>
        Ti impegni a utilizzare il sito in modo lecito e a non comprometterne la sicurezza, la
        disponibilità o il corretto funzionamento (ad esempio tramite tentativi di accesso non
        autorizzato, invio di contenuti dannosi o uso automatizzato non autorizzato dei nostri
        moduli e della chat).
      </p>

      <h2>4. Servizi, preventivi e contratti</h2>
      <p>
        Le informazioni su prezzi e pacchetti pubblicate nella sezione{" "}
        <Link to="/#listino">Prezzi & Listino</Link> hanno valore indicativo e possono variare in base
        alle esigenze specifiche del progetto. Un preventivo formale, i termini di consegna e le
        condizioni economiche definitive vengono sempre concordati direttamente con il cliente prima
        dell'avvio di qualsiasi progetto, tipicamente a seguito di una richiesta inviata tramite la
        sezione <Link to="/#contatti">Contatti</Link>. Nessun accordo contrattuale si considera
        concluso per il solo fatto di aver navigato il sito o compilato un modulo di contatto.
      </p>

      <h2>5. Contenuti forniti dal cliente</h2>
      <p>
        Quando affidi a PixelForge la realizzazione di un progetto (sito web, e-commerce o altro
        servizio digitale), sei responsabile dei contenuti che ci fornisci per realizzarlo — testi,
        immagini, loghi, marchi e altro materiale — e garantisci di averne il diritto d'uso o la
        titolarità necessaria. PixelForge non è responsabile per violazioni di diritti di terzi
        derivanti da materiale fornito dal cliente e utilizzato su sua richiesta esplicita.
      </p>

      <h2>6. Disponibilità del servizio</h2>
      <p>
        Facciamo il possibile per mantenere il sito e i servizi digitali che realizziamo accessibili e
        funzionanti, ma non possiamo garantire una disponibilità ininterrotta al 100%: interruzioni
        possono verificarsi per manutenzione programmata, aggiornamenti tecnici o cause dipendenti da
        fornitori terzi (ad esempio l'hosting). Per i siti che realizziamo per i clienti, eventuali
        livelli di servizio (SLA) specifici vengono concordati separatamente, per iscritto, nell'ambito
        del contratto di progetto.
      </p>

      <h2>7. Contenuti del blog</h2>
      <p>
        Gli articoli pubblicati nel <Link to="/blog">blog</Link> hanno finalità informativa e
        divulgativa relativa al mondo dei siti web, del marketing digitale e della SEO. Pur essendo
        curati con attenzione, non costituiscono consulenza professionale personalizzata: per
        indicazioni specifiche sulla tua attività ti invitiamo a contattarci direttamente.
      </p>

      <h2>8. Limitazione di responsabilità</h2>
      <p>
        PixelForge si impegna a mantenere il sito accurato, sicuro e disponibile, ma non può garantire
        l'assenza totale di interruzioni, errori tecnici o imprecisioni occasionali nei contenuti. Nei
        limiti consentiti dalla legge svizzera applicabile, PixelForge non è responsabile per danni
        indiretti derivanti dall'uso o dall'impossibilità di utilizzare il sito. Eventuali garanzie
        specifiche relative a un progetto (ad esempio tempi di consegna, risultati SEO o funzionalità
        concordate) sono valide solo se definite per iscritto nell'ambito di un contratto di servizio
        separato.
      </p>

      <h2>9. Link a siti terzi</h2>
      <p>
        Il sito può contenere link verso piattaforme esterne (Google Maps, WhatsApp, Instagram,
        piattaforme di recensioni). Non siamo responsabili dei contenuti o delle pratiche sulla privacy
        di questi siti terzi, che sono soggetti alle rispettive condizioni d'uso e informative.
      </p>

      <h2>10. Servizi e strumenti di terze parti</h2>
      <p>
        Il sito si appoggia ad alcuni fornitori esterni per funzionare correttamente: hosting su
        Netlify, gestione del modulo di contatto tramite Netlify Forms, l'assistente di chat basato su
        n8n e, previo consenso, Google Analytics e Google AdSense. Trovi tutti i dettagli nella nostra{" "}
        <Link to="/privacy-policy">Privacy Policy</Link> e <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>11. Legge applicabile e foro competente</h2>
      <p>
        I presenti Termini e Condizioni sono regolati dal diritto svizzero. Per qualsiasi controversia
        relativa al sito o ai servizi offerti, salvo diverso accordo scritto, è competente il foro
        del Cantone Ticino.
      </p>

      <h2>12. Modifiche ai servizi e ai presenti termini</h2>
      <p>
        Possiamo aggiornare nel tempo sia i servizi offerti sia questi Termini e Condizioni, ad esempio
        in caso di nuove funzionalità, nuovi servizi digitali o cambiamenti normativi. La versione
        pubblicata su questa pagina, con la relativa data di aggiornamento, è sempre quella in vigore.
      </p>

      <h2>13. Contatti</h2>
      <p>
        Per qualsiasi domanda su questi Termini e Condizioni, scrivici a{" "}
        <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>.
      </p>
    </LegalPageLayout>
  );
}
