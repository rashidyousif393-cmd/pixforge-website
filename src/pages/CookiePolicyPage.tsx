import { Link } from "react-router-dom";
import LegalPageLayout from "../components/LegalPageLayout";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useCookieConsent } from "../context/CookieConsentContext";
import { getRouteMeta } from "../lib/routeMeta";

export default function CookiePolicyPage() {
  const { openSettings } = useCookieConsent();

  useDocumentHead(getRouteMeta("/cookie-policy"));

  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="7 agosto 2026">
      <p>
        Questa pagina spiega, in modo semplice e trasparente, quali cookie e tecnologie simili
        utilizza il sito <a href="https://pixforge.ch">pixforge.ch</a>, a cosa servono e come puoi
        gestire le tue preferenze in ogni momento. Per informazioni più generali sul trattamento dei
        dati personali, consulta la nostra <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che un sito salva sul tuo dispositivo (o tecnologie
        equivalenti, come il local storage del browser) per ricordare informazioni tra una visita e
        l'altra: preferenze, stato di accesso o dati statistici anonimi.
      </p>

      <h2>Come gestiamo il consenso su questo sito</h2>
      <p>
        Al primo accesso ti mostriamo un banner che ti permette di <strong>accettare</strong>,{" "}
        <strong>rifiutare</strong> o <strong>gestire le preferenze</strong> dei cookie non necessari.
        I cookie tecnici indispensabili al funzionamento del sito sono sempre attivi. I cookie di
        analisi (Google Analytics) e pubblicitari (Google AdSense) <strong>non vengono attivati per
        nessun motivo prima che tu esprima un consenso esplicito</strong>: lo script di Google
        Analytics, ad esempio, non viene nemmeno caricato dal browser finché non premi "Accetta" — non
        è quindi solo bloccato "in background", semplicemente non viene scaricato. Puoi cambiare la
        tua scelta in qualsiasi momento cliccando su{" "}
        <button
          type="button"
          onClick={openSettings}
          className="text-gold-500 hover:text-gold-400 underline underline-offset-2 cursor-pointer font-semibold"
        >
          Gestisci preferenze cookie
        </button>{" "}
        nel footer del sito, disponibile su ogni pagina.
      </p>

      <h2>Cookie tecnici (sempre attivi, nessun consenso richiesto)</h2>
      <p>
        Questi cookie sono strettamente necessari al funzionamento di base del sito e non possono
        essere disattivati:
      </p>
      <ul>
        <li>
          <strong>pixelforge_lang</strong> — memorizza la lingua scelta (italiano/inglese) per
          mostrarti il sito nella lingua corretta alla visita successiva. Durata: persistente, fino a
          rimozione manuale.
        </li>
        <li>
          <strong>pf_intro_shown</strong> — ricorda se hai già visto l'animazione di apertura del
          sito, per non ripeterla a ogni pagina visitata nella stessa sessione. Durata: sessione di
          navigazione.
        </li>
        <li>
          <strong>pf_cookie_consent</strong> — memorizza la scelta che fai su questo banner (accetta /
          rifiuta), in modo da non richiedertela di nuovo a ogni visita. Durata: persistente, fino a
          revoca.
        </li>
      </ul>

      <h2>Cookie di analisi (solo con consenso)</h2>
      <p>
        Se accetti, utilizziamo <strong>Google Analytics</strong> (Google Ireland Limited) per
        raccogliere statistiche aggregate e anonime su come i visitatori usano il sito: pagine più
        visitate, tempo di permanenza, provenienza geografica generale e tipo di dispositivo. Questi
        dati ci aiutano a migliorare contenuti e prestazioni del sito, ma non permettono di
        identificarti personalmente.
      </p>
      <ul>
        <li><strong>_ga, _ga_*</strong> — distinguono gli utenti per le statistiche di Google Analytics. Durata: fino a 2 anni.</li>
        <li><strong>_gid</strong> — distingue gli utenti nell'arco di 24 ore. Durata: 24 ore.</li>
      </ul>
      <p>
        Puoi consultare l'informativa privacy di Google all'indirizzo{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          policies.google.com/privacy
        </a>
        .
      </p>

      <h2>Cookie pubblicitari (solo con consenso)</h2>
      <p>
        PixelForge intende utilizzare <strong>Google AdSense</strong> per mostrare annunci
        pubblicitari sul sito. Se e quando questa funzionalità sarà attiva, Google potrà impostare
        cookie pubblicitari (ad esempio cookie DoubleClick/Google Ads) per mostrare annunci pertinenti
        e misurarne l'efficacia, ma esclusivamente se hai espresso il tuo consenso tramite il banner.
        Puoi in qualsiasi momento gestire le preferenze pubblicitarie di Google direttamente su{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Cookie di terze parti attivati da azioni volontarie</h2>
      <p>
        Alcuni contenuti e strumenti del sito possono impostare cookie propri solo quando li utilizzi
        attivamente, indipendentemente dalla tua scelta sul banner, perché richiesti per fornire il
        servizio che hai richiesto:
      </p>
      <ul>
        <li>
          <strong>Assistente di chat (n8n)</strong> — attivo solo se apri e utilizzi la finestra di
          chat, per mantenere il contesto della conversazione.
        </li>
        <li>
          <strong>WhatsApp</strong> — se clicchi su un link "Scrivici su WhatsApp", vieni reindirizzato
          alla piattaforma WhatsApp/Meta, soggetta alle loro proprie policy sui cookie.
        </li>
      </ul>

      <h2>Come funziona il nostro banner dei cookie</h2>
      <p>
        Il banner presente su questo sito è uno strumento sviluppato direttamente da PixelForge per
        raccogliere e rispettare la tua scelta in modo reale: la preferenza viene salvata sul tuo
        dispositivo e i cookie non essenziali restano bloccati finché non dai il consenso. Non si
        tratta però di una piattaforma di gestione del consenso (CMP) certificata da Google o da
        organismi di settore come l'IAB: per campagne pubblicitarie più complesse basate su aste in
        tempo reale (RTB) con più fornitori pubblicitari, Google può richiedere in futuro l'uso di una
        CMP certificata registrata nel suo{" "}
        <a
          href="https://support.google.com/adsense/answer/13554116"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google-certified CMP list
        </a>
        . Ne siamo consapevoli e valuteremo l'eventuale adozione di una CMP certificata quando
        necessario.
      </p>

      <h2>Come disattivare i cookie dal browser</h2>
      <p>
        Oltre alle nostre impostazioni, puoi sempre bloccare o cancellare i cookie direttamente dalle
        impostazioni del tuo browser (Chrome, Safari, Firefox, Edge). Tieni presente che disabilitare i
        cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
      </p>

      <h2>Domande</h2>
      <p>
        Per qualsiasi domanda su questa Cookie Policy, scrivici a{" "}
        <a href="mailto:info@pixforge.ch">info@pixforge.ch</a>.
      </p>
    </LegalPageLayout>
  );
}
