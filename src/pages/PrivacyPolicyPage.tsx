import { Link } from "react-router-dom";
import LegalPageLayout from "../components/LegalPageLayout";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useCookieConsent } from "../context/CookieConsentContext";
import { getRouteMeta } from "../lib/routeMeta";

export default function PrivacyPolicyPage() {
  const { openSettings } = useCookieConsent();

  useDocumentHead(getRouteMeta("/privacy-policy"));

  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="7 agosto 2026">
      <p>
        La presente informativa descrive come <strong>PixelForge</strong> ("noi", "PixelForge")
        raccoglie e tratta i dati personali dei visitatori del sito{" "}
        <a href="https://pixforge.ch">pixforge.ch</a> e dei clienti che ci contattano. L'obiettivo è
        spiegare in modo chiaro, senza formule vaghe, cosa raccogliamo, perché, e come puoi
        controllare i tuoi dati.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento dei dati è <strong>PixelForge</strong>, con sede a Bellinzona,
        Ticino, Svizzera. Per qualsiasi domanda relativa a questa informativa o per esercitare i tuoi
        diritti puoi scriverci a{" "}
        <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>.
      </p>

      <h2>2. Quali dati raccogliamo e perché</h2>

      <h3>Dati inviati tramite il modulo di contatto</h3>
      <p>
        Quando compili il modulo nella sezione <Link to="/#contatti">Contatti</Link> raccogliamo i
        dati che inserisci volontariamente: nome, indirizzo e-mail, nome dell'azienda (se indicato) e
        il contenuto del messaggio. Il modulo è gestito tecnicamente da{" "}
        <strong>Netlify</strong>, il fornitore su cui è ospitato il sito, che riceve e ci inoltra
        queste informazioni. Usiamo questi dati esclusivamente per risponderti e, se prosegue una
        trattativa, per predisporti un preventivo o gestire il rapporto contrattuale.
      </p>

      <h3>Messaggi inviati tramite la chat AI o WhatsApp</h3>
      <p>
        Se utilizzi l'assistente di chat integrato nel sito, i messaggi che scrivi vengono elaborati
        tramite <strong>n8n</strong>, la piattaforma di automazione che alimenta l'assistente, al solo
        scopo di fornirti una risposta pertinente. Se ci contatti tramite WhatsApp, la conversazione è
        soggetta anche all'informativa privacy di WhatsApp/Meta, poiché avviene sulla loro
        piattaforma.
      </p>

      <h3>Dati di navigazione e statistiche (solo con consenso)</h3>
      <p>
        Solo se acconsenti tramite il banner cookie, utilizziamo <strong>Google Analytics</strong> per
        raccogliere statistiche aggregate e anonime su come viene utilizzato il sito (pagine visitate,
        durata della visita, dispositivo, provenienza geografica approssimativa). Questi dati ci
        aiutano a migliorare il sito, ma non vengono usati per identificarti personalmente. Trovi tutti
        i dettagli, inclusa la lista dei cookie utilizzati, nella nostra{" "}
        <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h3>Google AdSense</h3>
      <p>
        PixelForge intende utilizzare (o sta utilizzando, una volta approvato l'account){" "}
        <strong>Google AdSense</strong> per mostrare annunci pubblicitari sul sito. Google può
        utilizzare cookie e identificatori simili per mostrare annunci pertinenti in base alla tua
        attività di navigazione, ma solo se hai espresso il tuo consenso ai cookie non necessari. Puoi
        gestire o revocare in ogni momento le preferenze pubblicitarie di Google tramite{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>3. Base giuridica del trattamento</h2>
      <p>
        Trattiamo i tuoi dati sulla base del tuo <strong>consenso</strong> (cookie di analisi e
        pubblicitari), dell'<strong>esecuzione di misure precontrattuali o contrattuali</strong>{" "}
        (quando ci contatti per un preventivo o un progetto) e del nostro{" "}
        <strong>legittimo interesse</strong> a rispondere alle richieste ricevute e a mantenere il
        sito sicuro e funzionante.
      </p>

      <h2>4. Con chi condividiamo i dati</h2>
      <p>
        Non vendiamo né cediamo i tuoi dati personali a terzi per finalità di marketing proprio. I
        dati possono essere trattati dai seguenti fornitori terzi, in qualità di responsabili del
        trattamento o titolari autonomi per i servizi che offrono:
      </p>
      <ul>
        <li><strong>Netlify</strong> — hosting del sito e gestione del modulo di contatto.</li>
        <li><strong>Google Ireland Limited</strong> — Google Analytics e, se attivo, Google AdSense.</li>
        <li><strong>n8n</strong> — elaborazione dei messaggi inviati tramite l'assistente di chat.</li>
        <li><strong>Meta / WhatsApp</strong> — solo se scegli di contattarci tramite WhatsApp.</li>
      </ul>
      <p>
        Alcuni di questi fornitori possono trattare i dati anche al di fuori della Svizzera o
        dell'Unione Europea; in tal caso si affidano a garanzie riconosciute (ad esempio le clausole
        contrattuali standard della Commissione Europea) per assicurare un livello di protezione
        adeguato.
      </p>

      <h2>5. Per quanto tempo conserviamo i dati</h2>
      <p>
        Conserviamo i dati dei moduli di contatto per il tempo necessario a gestire la tua richiesta e,
        in caso di rapporto contrattuale, per la durata prevista dagli obblighi legali e fiscali
        applicabili in Svizzera. I dati statistici raccolti tramite Google Analytics sono conservati
        secondo le impostazioni di conservazione configurate nel nostro account (non oltre 14 mesi).
      </p>

      <h2>6. I tuoi diritti</h2>
      <p>
        In qualità di visitatore o cliente, hai il diritto di chiederci in qualsiasi momento: accesso
        ai dati che trattiamo su di te, rettifica di dati inesatti, cancellazione dei dati (dove
        applicabile), limitazione o opposizione al trattamento, e portabilità dei dati. Se hai fornito
        un consenso (ad esempio per i cookie di analisi), puoi revocarlo in qualunque momento senza
        pregiudicare la liceità del trattamento effettuato prima della revoca.
      </p>
      <p>
        Per esercitare uno di questi diritti scrivi a{" "}
        <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>. Se ritieni che il trattamento dei tuoi
        dati non sia conforme alla legge, hai inoltre il diritto di presentare reclamo
        all'Incaricato federale della protezione dei dati e della trasparenza (IFPDT), l'autorità
        svizzera competente in materia di protezione dei dati.
      </p>

      <h2>7. Sicurezza dei dati</h2>
      <p>
        Il sito utilizza una connessione cifrata HTTPS/SSL per proteggere i dati trasmessi tra il tuo
        browser e i nostri server. Adottiamo misure tecniche e organizzative ragionevoli per proteggere
        i dati da accessi non autorizzati, perdita o alterazione.
      </p>

      <h2>8. Minori</h2>
      <p>
        Il sito e i servizi offerti sono rivolti ad aziende e professionisti e non sono destinati a
        persone di età inferiore ai 16 anni. Non raccogliamo consapevolmente dati personali di minori.
      </p>

      <h2>9. Modifiche a questa informativa</h2>
      <p>
        Possiamo aggiornare periodicamente questa informativa per riflettere cambiamenti nei nostri
        servizi o nella normativa applicabile. La data di "ultimo aggiornamento" in cima alla pagina
        indica sempre la versione più recente.
      </p>

      <h2>10. Contatti</h2>
      <p>
        Per qualsiasi domanda su questa Privacy Policy o sul trattamento dei tuoi dati, contattaci a{" "}
        <a href="mailto:info@pixforge.ch">info@pixforge.ch</a> oppure consulta la nostra{" "}
        <Link to="/cookie-policy">Cookie Policy</Link> per i dettagli sui cookie utilizzati. Puoi anche{" "}
        <button
          type="button"
          onClick={openSettings}
          className="text-gold-500 hover:text-gold-400 underline underline-offset-2 cursor-pointer"
        >
          gestire le tue preferenze cookie
        </button>{" "}
        in qualsiasi momento.
      </p>
    </LegalPageLayout>
  );
}
