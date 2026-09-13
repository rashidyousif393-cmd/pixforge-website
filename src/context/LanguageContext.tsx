import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "it" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, any>> = {
  it: {
    common: {
      brand: "PixelForge",
      slogan: "Artigianato Digitale",
      swissQuality: "Qualità e Servizio Svizzero",
      secConn: "Connessione sicura SSL a 256-bit. Pienamente conforme alla legge svizzera sulla protezione dei dati (LPD).",
      btnDemo: "Richiedi una demo gratuita",
      btnProjects: "Guarda i progetti",
      swissBadge: "CH 🇨🇭",
      outcome: "Risultato:",
      verifiedClient: "Clienti svizzeri veridici al 100%",
      googleStars: "Recensioni Google 5.0 stelle",
      provenRoi: "ROI garantito",
      activeText: "● ATTIVO",
      onlineText: "● ONLINE",
      moreInfo: "Richiedi informazioni",
      inquireBtn: "Invia richiesta",
      nowInquire: "Invia una richiesta ora",
      hours: "ore",
      seconds: "secondi",
      minute: "minuto",
      swissTime: "ORA SVIZZERA:"
    },
    nav: {
      services: "Servizi",
      method: "Metodo",
      about: "Chi siamo",
      testimonials: "Recensioni",
      projects: "Progetti",
      cases: "Casi studio",
      pricing: "Prezzi",
      blog: "Blog",
      contact: "Contatti",
      btnStart: "Inizia ora"
    },
    hero: {
      badge: "🇨🇭 Agenzia Web Ticino – Bellinzona & Lugano",
      titlePre: "Creazione siti web a",
      titleGradient: "Bellinzona e in Ticino",
      titlePost: "per aziende che vogliono crescere online.",
      subtitle: "Siamo la web agency in Ticino specializzata nella realizzazione di siti web per aziende a Bellinzona, Lugano e in tutta la Svizzera italiana, pensati per farti trovare su Google e conquistare nuovi clienti.",
      industries: [
        "Saloni di Bellezza",
        "Studi Dentistici",
        "Ristoranti & Grotti",
        "Imprese Edili",
        "Boutique Hotel",
        "Medici & Studi Medici",
        "Studi Legali",
        "Fisioterapisti"
      ],
      logos: [
        { name: "Alpina Chalet", locale: "St. Moritz" },
        { name: "Lugano Spa", locale: "Lugano" },
        { name: "Swiss Dental", locale: "Zurigo" },
        { name: "Grotto Ticino", locale: "Bellinzona" },
        { name: "Chiasso Med", locale: "Chiasso" },
        { name: "Mendrisio Edil", locale: "Mendrisio" },
        { name: "Aura Estetica", locale: "Lugano" }
      ],
      speedScore: "Punteggio di velocità Google 100/100",
      localSeo: "Ottimizzazione SEO locale",
      noHiddenCosts: "Nessun costo nascosto"
    },
    painPoints: {
      badge: "ANALISI DI MERCATO CH",
      titlePre: "La tua attività è ancora",
      titleGradient: "senza un sito web professionale?",
      desc: "Oggi i clienti cercano tutto su Google. Se la tua attività non ha un sito web professionale, perdi visibilità, fiducia e nuovi clienti preziosi ogni giorno nella tua regione.",
      point1Title: "Perdita di clienti locali",
      point1Desc: "Il 97% delle persone cerca online servizi locali prima di decidere.",
      point2Title: "Invisibilità su Google",
      point2Desc: "Senza un sito ottimizzato, Google non inserisce la tua azienda nei risultati di ricerca locali.",
      testBadge: "INTERATTIVO",
      testTitle: "Test della visibilità digitale",
      testSubtitle: "Analizza lo stato della tua presenza online in 3 semplici passaggi.",
      questions: [
        {
          id: 1,
          text: "La tua azienda appare tra i primi 3 risultati su Google Maps quando qualcuno nella tua regione cerca il tuo servizio?",
          icon: "Search"
        },
        {
          id: 2,
          text: "Un cliente può consultare il tuo listino prezzi, il tuo menu o i tuoi orari in meno di 2 secondi sul proprio smartphone?",
          icon: "Smartphone"
        },
        {
          id: 3,
          text: "Disponi di un sistema automatizzato per acquisire nuovi clienti o richieste di appuntamento mentre ti occupi del tuo lavoro?",
          icon: "Calendar"
        }
      ],
      btnYes: "Sì, certo",
      btnNo: "No, non ancora",
      resultsTitle: "Il tuo risultato:",
      recommendationLabel: "Consiglio PixelForge:",
      btnRestart: "Ripeti il test",
      btnConsult: "Richiedi una consulenza gratuita",
      feedback: {
        invisible: {
          score: "Invisibile 🔴",
          percentage: "90% di potenziali clienti persi",
          desc: "I clienti nella tua zona che cercano i tuoi servizi su Google finiscono direttamente dai tuoi concorrenti. Ogni giorno perdi preziose opportunità.",
          recommendation: "Ti consigliamo il nostro pacchetto **Starter** o **Professional** con indicizzazione urgente su Google Maps."
        },
        medium: {
          score: "Rischio Medio 🟡",
          percentage: "50% di potenziali clienti persi",
          desc: "Hai una presenza online minima, ma non è ottimizzata. Molti potenziali clienti trovano il tuo profilo, ma abbandonano perché mancano informazioni chiare o la possibilità di prenotare direttamente.",
          recommendation: "Il pacchetto **Professional** è ideale per colmare queste lacune e convertire i visitatori in richieste reali."
        },
        excellent: {
          score: "Stato Eccellente 🟢",
          percentage: "Presenza Ottimizzata",
          desc: "La tua presenza online ha basi solide! Puoi massimizzare ulteriormente l'esperienza dei clienti e distinguerti con un design elite ed esclusivo.",
          recommendation: "Il pacchetto **Premium Custom** ti permette di superare tutti i concorrenti svizzeri con animazioni di prima classe ed esperienze utente uniche."
        }
      }
    },
    services: {
      badge: "SERVIZI & COMPETENZE",
      titlePre: "Progettiamo il tuo",
      titleGradient: "successo commerciale",
      desc: "Non creiamo semplici siti vetrina. Sviluppiamo strumenti di marketing interattivi e velocissimi, ottimizzati per convertire i visitatori svizzeri in clienti paganti.",
      learnMore: "Scopri di più",
      benefitsLabel: "Vantaggi inclusi:",
      simTitle: "SIMULATORE DI INTERATTIVITÀ",
      simDesc: "Clicca sui nostri servizi a sinistra per testare dal vivo le funzionalità avanzate che possiamo integrare sul tuo nuovo sito web.",
      simulators: {
        maps: {
          title: "Percorso Google Maps dal vivo",
          desc: "Guarda come i clienti possono calcolare il percorso in auto, a piedi o con i mezzi pubblici fino alla tua sede con un solo tocco.",
          startLabel: "PUNTO DI PARTENZA:",
          trainStation: "Stazione di Bellinzona",
          timeCar: "4 min in auto",
          timeWalk: "12 min a piedi",
          btnRoute: "Calcola percorso su smartphone"
        },
        contact: {
          title: "Modulo di contatto istantaneo",
          desc: "Campi intelligenti e ottimizzati per ridurre i passaggi e massimizzare le richieste dei clienti.",
          labelService: "SERVIZIO RICHIESTO:",
          servicesList: ["Pulizia dentale", "Primo colloquio gratuito", "Consulenza SEO"],
          btnSubmit: "Invia richiesta di prova",
          successTitle: "Richiesta inviata con successo!",
          successDesc: "Hai simulato l'invio del modulo. Il cliente riceve un feedback immediato e tu una notifica via e-mail."
        },
        speed: {
          title: "Google PageSpeed Live-Test",
          desc: "Misura e prova l'ottimizzazione del tempo di caricamento con il PixelForge Core-Engine.",
          gaugeText: "PageSpeed",
          fcp: "FIRST CONTENTFUL PAINT",
          lcp: "LARGEST CONTENTFUL PAINT",
          btnScan: "Avvia analisi PageSpeed dal vivo",
          scanning: "Analisi in corso...",
          btnRestart: "Riavvia analisi"
        },
        ai: {
          title: "Live Demo Assistente IA",
          desc: "Simula una conversazione interamente automatizzata con prenotazione di appuntamenti.",
          intro: "Salve! Sono il tuo assistente virtuale. Vorresti prenotare un appuntamento per una consulenza gratuita?",
          replyText: "Sì, volentieri. Scelgo il seguente orario:",
          confirmed: "Eccellente! Il tuo appuntamento per domani alle <strong>{time}</strong> è confermato. Ti ho inviato una conferma via SMS. Ti aspettiamo! 🇨🇭",
          btnReset: "Azzera conversazione 🔄",
          timeLabel: "SCEGLI ORARIO:"
        }
      },
      trustBannerTitle: "Conforme alla legge svizzera sulla protezione dei dati (LPD)",
      trustBannerDesc: "Tutti i siti web creati da PixelForge includono una dichiarazione sulla privacy e una cookie policy complete e legalmente conformi. L'hosting avviene su server svizzeri ad alta sicurezza.",
      trustBannerBtn: "Richiedi ora",
      list: [
        {
          id: "siti-web",
          title: "Siti Web Professionali",
          description: "Siti web completi, eleganti e personalizzati che riflettono l'eccellenza del tuo marchio e convertono i visitatori in clienti.",
          benefits: ["Design esclusivo e personalizzato", "Perfettamente ottimizzato per dispositivi mobili", "Pannello di amministrazione semplice", "Sicuro e conforme alla LPD svizzera"]
        },
        {
          id: "landing-pages",
          title: "Landing Page ad Alta Conversione",
          description: "Pagine promozionali progettate con un unico obiettivo: trasformare i visitatori in contatti qualificati e appuntamenti di valore per la tua attività.",
          benefits: ["Psicologia di vendita persuasiva", "Moduli di contatto ottimizzati", "Perfette per campagne Google/Social", "Copywriting professionale incluso"]
        },
        {
          id: "seo-base",
          title: "SEO Locale per Google",
          description: "Fatti trovare dai clienti che cercano attivamente i tuoi servizi nella tua regione e in tutta la Svizzera.",
          benefits: ["Ricerca di parole chiave locali", "Ottimizzazione del profilo Google Business", "Struttura tecnica SEO-friendly", "Indicizzazione garantita su Google"]
        },
        {
          id: "mobile-first",
          title: "Design Mobile-First",
          description: "Oltre l'80% delle ricerche locali avviene da smartphone. Il tuo sito sarà velocissimo e intuitivo su qualsiasi schermo.",
          benefits: ["Esperienza touch fluida", "Navigazione rapida ad una mano", "Caricamento istantaneo su rete 4G/5G", "Pulsanti di chiamata e indicazioni rapide"]
        },
        {
          id: "restyling",
          title: "Rilancio & Restyling del Sito",
          description: "Trasforma un sito web obsoleto o lento in uno strumento moderno, veloce ed elegante, all'altezza dei più alti standard svizzeri.",
          benefits: ["Analisi critica della vecchia struttura", "Aggiornamento moderno dei contenuti", "Drastico aumento delle conversioni", "Caricamento fino a 3 volte più veloce"]
        },
        {
          id: "integrazioni",
          title: "Integrazione WhatsApp & Maps",
          description: "Permetti ai clienti di scriverti con un clic o di trovare la tua sede fisica in pochi secondi grazie a Google Maps.",
          benefits: ["Pulsante WhatsApp fluttuante", "Mappe interattive personalizzate", "Sincronizzazione degli orari di apertura", "Link diretti alle app di navigazione"]
        },
        {
          id: "moduli",
          title: "Moduli & Sistemi di Prenotazione",
          description: "Elimina gli ostacoli. Permetti ai tuoi clienti di richiedere preventivi, appuntamenti o tavoli direttamente online e senza sforzo.",
          benefits: ["Campi personalizzati intuitivi", "Notifiche istantanee via e-mail/SMS", "Integrazione con i calendari", "Salvataggio dati conforme alla LPD"]
        },
        {
          id: "velocita",
          title: "Ottimizzazione della Velocità",
          description: "Un sito lento fa perdere il 50% degli utenti prima del caricamento. Sviluppiamo con codice pulito per tempi di caricamento record.",
          benefits: ["Codice ultraleggero e moderno", "Compressione immagini di nuova generazione", "Punteggio Google PageSpeed eccellente (95+)", "Hosting svizzero veloce e sicuro"]
        }
      ]
    },
    process: {
      badge: "IL NOSTRO METODO",
      titlePre: "Il cammino verso la tua",
      titleGradient: "nuova presenza digitale",
      desc: "Lavoriamo con un processo strutturato e trasparente per garantirti la massima qualità svizzera, rispettando rigorosamente tempi e budget stabiliti.",
      steps: [
        {
          step: "01",
          title: "Consulenza Strategica",
          desc: "Analizziamo la tua attività, i concorrenti e definiamo gli obiettivi del tuo nuovo sito."
        },
        {
          step: "02",
          title: "Progettazione & Prototipo",
          desc: "Creiamo una demo interattiva per mostrarti l'aspetto grafico e la struttura prima dello sviluppo."
        },
        {
          step: "03",
          title: "Sviluppo & Ottimizzazione",
          desc: "Scriviamo codice pulito e leggero, ottimizziamo la velocità e integriamo le funzionalità richieste."
        },
        {
          step: "04",
          title: "Lancio & SEO locale",
          desc: "Pubblichiamo il sito su server svizzeri sicuri e lo registriamo su Google per l'indicizzazione immediata."
        }
      ]
    },
    whyChooseUs: {
      badge: "PERCHÉ PIXELFORGE",
      titlePre: "Molto più di",
      titleGradient: "una classica agenzia web",
      desc: "Confrontiamo i siti web standard con i progetti curati con artigianato digitale da PixelForge. La differenza è nei dettagli che portano clienti.",
      comparisonTitle: "Confronto: Prima vs Dopo",
      sliderLabel: "Trascina per confrontare:",
      beforeLabel: "SITO WEB STANDARD (PRIMA)",
      afterLabel: "SITO PREMIUM PIXELFORGE (DOPO)",
      beforePoints: [
        "Tempi di caricamento lenti (5+ secondi)",
        "Grafica datata o basata su modelli visti e rivisti",
        "Non ottimizzato per Google Maps e ricerche locali",
        "Nessun invito all'azione chiaro o pulsante WhatsApp",
        "Non conforme alla legge svizzera sui dati (LPD)",
        "Nessun sistema di prenotazione o preventivo online"
      ],
      afterPoints: [
        "Caricamento istantaneo (meno di 1 secondo)",
        "Design unico ed esclusivo su misura per il tuo brand",
        "Posizionamento eccellente nelle ricerche Google locali",
        "Integrazione strategica di WhatsApp e moduli rapidi",
        "Certificato SSL e conformità LPD svizzera inclusa",
        "Sistemi interattivi integrati per preventivi e appuntamenti"
      ],
      speedTitle: "Ottimizzazione della velocità",
      seoTitle: "Pronto per Google",
      securityTitle: "Sicurezza svizzera"
    },
    portfolio: {
      badge: "PROGETTI SELEZIONATI",
      titlePre: "I nostri lavori",
      titleGradient: "più recenti",
      desc: "Esplora i siti web che abbiamo realizzato per aziende svizzere. Clicca su ciascun progetto per avviare una simulazione live interattiva direttamente sullo schermo.",
      livePreview: "ANTEPRIMA INTERATTIVA",
      previewDesc: "Stai visualizzando una simulazione interattiva del sito web di esempio per cellulare. Sentiti libero di esplorare le sezioni e testare l'invio del modulo.",
      closePreview: "Chiudi simulazione",
      viewLive: "Simula sito web sul telefono",
      mockupHeader: "Simulazione Smartphone",
      list: [
        {
          id: "beauty",
          title: "Aura Kosmetik & Wellness",
          category: "Centro Estetico",
          description: "Un sito web minimalista, rilassante ed elegante per un prestigioso studio di estetica a Lugano, focalizzato sulla prenotazione online dei trattamenti.",
          location: "Lugano, Ticino",
          features: ["Prenotazione online trattamenti", "Listino prezzi interattivo", "Galleria fotografica HD", "Integrazione recensioni Google"],
          problem: "Il salone non aveva una presenza online professionale. I clienti non trovavano informazioni su Google, limitando le prenotazioni online.",
          solution: "PixelForge ha creato un sito elegante, veloce e ottimizzato per dispositivi mobili con servizi, galleria, contatti e WhatsApp fluttuante.",
          result: "Un esempio di come uno studio di estetica possa presentare i propri trattamenti con un'estetica curata e permettere prenotazioni online dirette, senza passare dal telefono.",
          mockupContent: {
            heroTitle: "Il tuo tempio di bellezza e relax a Lugano",
            heroSubtitle: "Trattamenti viso personalizzati, massaggi e cura del corpo per ritrovare la tua naturale armonia.",
            ctaText: "Prenota trattamento",
            sections: [
              {
                title: "I nostri trattamenti",
                content: "Massaggi rigeneranti (60 min) — CHF 120\nTrattamento viso anti-age — CHF 140\nManicure & Pedicure Premium — CHF 80"
              },
              {
                title: "Perché scegliere noi?",
                content: "Utilizziamo esclusivamente prodotti biologici certificati. Un ambiente esclusivo e discreto nel cuore di Lugano."
              }
            ]
          }
        },
        {
          id: "dental",
          title: "Zahnarztpraxis San Gottardo",
          category: "Studio Dentistico",
          description: "Sito web informativo e professionale per una clinica dentistica moderna a Locarno. Focus sulla fiducia e la facilità di contatto.",
          location: "Locarno, Ticino",
          features: ["Richiesta prima visita online", "Presentazione del team medico", "Integrazione urgenze 24 ore", "Sezione FAQ dettagliata"],
          problem: "I pazienti faticavano a trovare lo studio online. L'assenza di un modulo costringeva la reception a gestire decine di chiamate ripetitive.",
          solution: "PixelForge ha sviluppato un sito moderno con modulo online per le prime visite, presentazione del team e indicazioni stradali chiare.",
          result: "Un esempio di come uno studio dentistico possa comunicare fiducia fin dal primo contatto, con informazioni chiare sulle terapie e un modulo di richiesta appuntamento sempre disponibile.",
          mockupContent: {
            heroTitle: "Il sorriso che meriti, curato da esperti",
            heroSubtitle: "Tecnologie odontoiatriche all'avanguardia unite ad un approccio umano e indolore a Locarno.",
            ctaText: "Richiedi appuntamento",
            sections: [
              {
                title: "Specializzazioni",
                content: "• Implantologia guidata al computer\n• Ortodonzia invisibile (Aligner)\n• Igiene dentale professionale & Sbiancamento"
              },
              {
                title: "Urgenze odontoiatriche",
                content: "Offriamo un servizio rapido per dolori acuti o traumi. Chiamaci subito per un appuntamento urgente."
              }
            ]
          }
        },
        {
          id: "restaurant",
          title: "Grotto della Valle",
          category: "Ristorante & Osteria",
          description: "Presenza digitale calorosa per un grotto tradizionale a Bellinzona. Menu digitale interattivo e prenotazione tavoli.",
          location: "Bellinzona, Ticino",
          features: ["Menu digitale dinamico", "Prenotazione immediata tavoli", "Integrazione feed Instagram", "Indicazioni stradali rapide"],
          problem: "La scheda Google Maps era vuota, non c'era un menu leggibile da cellulare e i clienti preferivano concorrenti con siti più moderni.",
          solution: "Sito web ultraveloce con menu digitale sempre aggiornato, modulo di prenotazione tavoli e foto professionali del locale.",
          result: "Un esempio di come un grotto tradizionale possa offrire un menu digitale consultabile in un istante da smartphone e semplificare le prenotazioni dei tavoli nei weekend di punta.",
          mockupContent: {
            heroTitle: "Sapori autentici della tradizione ticinese",
            heroSubtitle: "Polenta al camino, salumi nostrani e formaggi d'alpeggio, accompagnati dai migliori Merlot della regione.",
            ctaText: "Prenota un tavolo",
            sections: [
              {
                title: "Le nostre specialità",
                content: "• Polenta taragna con spezzatino di cervo — CHF 26\n• Risotto al Merlot e funghi porcini — CHF 24\n• Tagliere di formaggi delle nostre valli — CHF 18"
              },
              {
                title: "Orari di apertura",
                content: "Mercoledì - Domenica: 11:30 - 14:30 | 18:30 - 23:00\nLunedì e Martedì: Chiuso"
              }
            ]
          }
        },
        {
          id: "hotel",
          title: "Chalet Splendide Resort",
          category: "Hotel & Resort",
          description: "Sito web lussuoso ed evocativo per un hotel boutique esclusivo nei Grigioni. Massimo impatto visivo.",
          location: "St. Moritz, Svizzera",
          features: ["Integrazione booking engine", "Virtual tour della SPA", "Pacchetti stagionali esclusivi", "Multilinguismo interattivo"],
          problem: "Le prenotazioni arrivavano quasi solo da portali terzi (Booking.com), comportando alte commissioni e nessun contatto diretto con il cliente.",
          solution: "Sviluppo di un sito ad alto impatto visivo con collegamento diretto al sistema di prenotazione e virtual tour della SPA.",
          result: "Un esempio di come un hotel boutique possa incoraggiare le prenotazioni dirette dal proprio sito, riducendo la dipendenza dalle commissioni dei portali di terze parti.",
          mockupContent: {
            heroTitle: "Esperienza esclusiva tra le vette alpine",
            heroSubtitle: "Un rifugio di lusso, benessere e gastronomia stellata, circondato dalla maestosità delle Alpi svizzere.",
            ctaText: "Verifica disponibilità",
            sections: [
              {
                title: "L'esperienza alpina",
                content: "Suite con vista panoramica sulle vette, piscina esterna riscaldata con idromassaggio e ristorante insignito di 1 stella Michelin."
              },
              {
                title: "Boutique Alpine SPA",
                content: "Trattamenti benessere esclusivi con erbe alpine e programmi di relax personalizzati per un benessere assoluto."
              }
            ]
          }
        },
        {
          id: "construction",
          title: "EdilPro Costruzioni",
          category: "Impresa Edile",
          description: "Sito professionale per un'impresa specializzata in costruzioni, ristrutturazioni e lavori edili.",
          location: "Lugano, Ticino",
          features: ["Portfolio progetti con filtri", "Richiesta preventivo online", "Presentazione servizi edili", "Galleria lavori realizzati"],
          problem: "Progetto demo pensato per un'impresa edile che necessita di una vetrina online chiara per presentare i propri servizi e raccogliere richieste di preventivo.",
          solution: "PixelForge ha sviluppato un sito solido e professionale con presentazione dei servizi, galleria progetti e modulo di richiesta preventivo diretto.",
          result: "Un esempio di come un'impresa di costruzioni possa comunicare affidabilità e competenza con una struttura chiara e un modulo di contatto immediato.",
          mockupContent: {
            heroTitle: "Costruzioni e Ristrutturazioni di Qualità",
            heroSubtitle: "Nuove costruzioni, ristrutturazioni e lavori edili con precisione e serietà a Lugano e dintorni.",
            ctaText: "Richiedi un preventivo",
            sections: [
              {
                title: "I Nostri Servizi",
                content: "• Ristrutturazioni complete\n• Nuove costruzioni residenziali\n• Lavori di manutenzione edile"
              },
              {
                title: "Perché Sceglierci",
                content: "Preventivi trasparenti, cantieri puliti e rispetto rigoroso delle tempistiche concordate."
              }
            ]
          }
        },
        {
          id: "medical",
          title: "Barber Studio Ticino",
          category: "Barbiere Premium",
          description: "Sito moderno per un barbiere professionale con servizi, prezzi, galleria e prenotazione online.",
          location: "Bellinzona, Ticino",
          features: ["Prenotazione appuntamenti online", "Listino servizi e prezzi", "Galleria fotografica del salone", "Integrazione WhatsApp"],
          problem: "Progetto demo pensato per un barbiere che vuole mostrare i propri servizi, i prezzi e permettere ai clienti di prenotare un appuntamento online.",
          solution: "PixelForge ha realizzato un sito elegante e mobile-first con listino servizi, galleria fotografica e prenotazione online semplificata.",
          result: "Un esempio concreto di come un barbiere possa offrire prenotazioni semplici, una vetrina fotografica curata e un contatto diretto via WhatsApp.",
          mockupContent: {
            heroTitle: "Il Tuo Stile, la Nostra Passione",
            heroSubtitle: "Tagli moderni, cura della barba e trattamenti su misura nel cuore di Bellinzona.",
            ctaText: "Prenota il tuo appuntamento",
            sections: [
              {
                title: "I Nostri Servizi",
                content: "Taglio classico — CHF 35\nTaglio & Barba — CHF 55\nRasatura tradizionale — CHF 30"
              },
              {
                title: "Perché Sceglierci",
                content: "Barbieri esperti, ambiente curato e prenotazione online rapida per non perdere tempo in attesa."
              }
            ]
          }
        },
        {
          id: "realestate",
          title: "Vesta Luxury Real Estate",
          category: "Immobiliare di Lusso",
          description: "Un portale immobiliare ad alte prestazioni per ville ed appartamenti di lusso nel Canton Ticino, focalizzato sulla reattività immediata.",
          location: "Lugano, Ticino",
          features: ["Filtri avanzati degli immobili", "Richieste visite integrate in tempo reale", "Galleria fotografica 4K interattiva", "Calcolatore d'ipoteche integrato"],
          problem: "I clienti faticavano a caricare le pesanti gallerie fotografiche delle ville di lusso sui loro smartphone, abbandonando subito il sito.",
          solution: "PixelForge ha ottimizzato tutte le immagini introducendo il caricamento differito (lazy loading) e formati web di nuova generazione per prestazioni fulminee.",
          result: "Un esempio di come un portale immobiliare di lusso possa mostrare immagini in alta risoluzione senza sacrificare la velocità di caricamento su mobile.",
          mockupContent: {
            heroTitle: "Dimore esclusive nelle migliori località del Ticino",
            heroSubtitle: "Una selezione di ville moderne ed appartamenti di prestigio affacciati sul lago di Lugano.",
            ctaText: "Richiedi catalogo riservato",
            sections: [
              {
                title: "Le nostre proprietà",
                content: "Villa Castagnola vista lago — Trattativa riservata\nPenthouse di design Paradiso — CHF 3'800'000\nResidenza d'epoca Morcote — CHF 5'200'000"
              },
              {
                title: "Servizi di pregio",
                content: "Valutazioni gratuite e professionali, consulenza legale e fiscale per acquirenti svizzeri e internazionali."
              }
            ]
          }
        },
        {
          id: "fitness",
          title: "Apex Strength & Conditioning",
          category: "Palestra & Fitness",
          description: "Un sito web accattivante, dinamico e performante per un centro fitness di alta gamma a Bellinzona, con prenotazioni istantanee dei corsi.",
          location: "Bellinzona, Ticino",
          features: ["Prenotazione lezioni in app", "Abbonamenti online con Stripe", "Schede d'allenamento interattive", "WhatsApp personal trainer diretto"],
          problem: "I membri dovevano telefonare o inviare messaggi continuamente per prenotare i corsi di gruppo, intasando la segreteria telefonica.",
          solution: "Un portale superveloce con calendario corsi in tempo reale e pagamento quote con carta di credito, integrato su tutti i dispositivi.",
          result: "Un esempio di come una palestra possa gestire le prenotazioni dei corsi online, liberando la reception da gran parte delle telefonate amministrative.",
          mockupContent: {
            heroTitle: "Supera i tuoi limiti con i migliori coach",
            heroSubtitle: "Allenamento funzionale, corsi di gruppo e nutrizione personalizzata nel cuore di Bellinzona.",
            ctaText: "Richiedi prova gratuita",
            sections: [
              {
                title: "I nostri abbonamenti",
                content: "Mensile Open — CHF 90 / mese\nAnnuale All-Inclusive — CHF 850 / anno\nCarnet 10 Ingressi Corsi — CHF 180"
              },
              {
                title: "Perché scegliere Apex",
                content: "Personal trainer certificati a livello federale, attrezzature d'eccellenza e ambiente sicuro e igienizzato."
              }
            ]
          }
        },
        {
          id: "winery",
          title: "TettoPro Ticino",
          category: "Tetti e Coperture",
          description: "Sito dedicato a rifacimento tetti, impermeabilizzazione, isolamento e manutenzione delle coperture.",
          location: "Ticino, Svizzera",
          features: ["Presentazione servizi di copertura", "Richiesta sopralluogo gratuito", "Galleria lavori realizzati", "Sezione manutenzione e isolamento"],
          problem: "Progetto demo pensato per un'azienda di coperture che necessita di presentare i propri servizi di rifacimento tetti e raccogliere richieste di sopralluogo.",
          solution: "PixelForge ha sviluppato un sito chiaro e professionale con presentazione dei servizi, galleria lavori e modulo di richiesta sopralluogo gratuito.",
          result: "Un esempio di come un'azienda di coperture possa comunicare competenza tecnica e raccogliere richieste in modo semplice e diretto.",
          mockupContent: {
            heroTitle: "Tetti Solidi, Protezione Duratura",
            heroSubtitle: "Rifacimento tetti, impermeabilizzazione e isolamento con materiali di qualità in tutto il Ticino.",
            ctaText: "Richiedi un sopralluogo gratuito",
            sections: [
              {
                title: "I Nostri Servizi",
                content: "• Rifacimento e riparazione tetti\n• Impermeabilizzazione e isolamento\n• Manutenzione periodica delle coperture"
              },
              {
                title: "Perché Sceglierci",
                content: "Sopralluoghi gratuiti, materiali di qualità e interventi puntuali in tutto il Ticino."
              }
            ]
          }
        },
        {
          id: "architect",
          title: "Arch Studio Spazio",
          category: "Studio di Architettura",
          description: "Un portfolio ad alto impatto visivo e minimalista per un rinomato studio di architettura a Lugano. Prestazioni eccezionali con caricamento 4K.",
          location: "Lugano, Ticino",
          features: ["Griglia progetti interattiva", "Immagini 4K ottimizzate", "Case-studies di design", "Modulo consulenza 3D"],
          problem: "Il vecchio sito non valorizzava i progetti a causa di lunghi tempi di caricamento delle foto ad alta risoluzione.",
          solution: "Un sito web geometrico e ultra-moderno con gallerie d'arte interattive e caricamento differito ultrarapido.",
          result: "Un esempio di come uno studio di architettura possa presentare i propri progetti con un portfolio visivo di grande impatto, pensato per clienti privati esigenti.",
          mockupContent: {
            heroTitle: "Spazi Moderni che Ispirano la Vita",
            heroSubtitle: "Progettazione architettonica e interior design d'eccellenza con rigore geometrico.",
            ctaText: "Richiedi consulenza",
            sections: [
              {
                title: "Progetti Chiave",
                content: "Villa Gialla (Collina d'Oro) — Residenza Minimalista\nPenthouse M (Paradiso) — Interior Design Premium\nSede Direzionale (Lugano) — Architettura Sostenibile"
              },
              {
                title: "Il Nostro Approccio",
                content: "Sostenibilità Minergie-P, materiali biologici locali e integrazione armoniosa con il paesaggio alpino."
              }
            ]
          }
        },
        {
          id: "lawfirm",
          title: "Studio Legale Gottardo",
          category: "Studio Legale",
          description: "Presenza web autorevole, riservata ed elegante per uno studio legale di spicco a Lugano. Interfaccia sobria incentrata sulla fiducia.",
          location: "Lugano, Svizzera",
          features: ["Profili dettagliati avvocati", "Prenotazione consulenze legali", "Integrazione contenuti normativi", "Conformità di sicurezza crittografata"],
          problem: "Il sito precedente sembrava obsoleto e non trasmetteva l'eccellenza e la discrezione necessarie per attrarre PMI svizzere.",
          solution: "Creazione di un portale di alta classe con biografie del team e un modulo di contatto sicuro crittografato.",
          result: "Un esempio di come uno studio legale possa comunicare autorevolezza e riservatezza online, con un tono professionale coerente su ogni pagina.",
          mockupContent: {
            heroTitle: "Esperienza Legale al Servizio del Vostro Successo",
            heroSubtitle: "Consulenza e patrocinio legale per aziende e privati con rigore svizzero e riservatezza.",
            ctaText: "Contatta lo studio",
            sections: [
              {
                title: "Aree di Pratica",
                content: "• Diritto Societario & Commerciale\n• Consulenza Fiscale & Pianificazione Patrimoniale\n• Contenzioso & Arbitrati Internazionali"
              },
              {
                title: "I Nostri Valori",
                content: "Integrità assoluta, eccellenza professionale e vicinanza alle esigenze strategiche dei clienti."
              }
            ]
          }
        },
        {
          id: "consulting",
          title: "Swiss Alpine Consulting",
          category: "Consulenza Aziendale",
          description: "Piattaforma corporate di altissimo livello per una società di consulenza finanziaria e strategica internazionale operante tra Zug e Lugano.",
          location: "Zug, Svizzera",
          features: ["Metriche e KPI interattivi", "Richiesta audit aziendale", "Resource library per CEO", "Integrazione multi-lingua automatica"],
          problem: "La mancanza di un posizionamento digitale autorevole rallentava l'acquisizione di contratti strategici istituzionali.",
          solution: "Sviluppo di un sito corporate internazionale con layout bento, metriche interattive e candidatura audit.",
          result: "Un esempio di come una società di consulenza possa presentare le proprie competenze con un layout corporate internazionale e una candidatura audit diretta.",
          mockupContent: {
            heroTitle: "Pianificazione Strategica Svizzera per Leader Globali",
            heroSubtitle: "Guidiamo la crescita, l'efficienza operativa e la transizione digitale della vostra impresa.",
            ctaText: "Richiedi Audit gratuito",
            sections: [
              {
                title: "I Nostri Servizi",
                content: "• Fusioni & Acquisizioni (M&A)\n• Riorganizzazione Strategica & Operational Excellence\n• Advisory per la Quotazione in Borsa (IPO)"
              },
              {
                title: "Perché Swiss Alpine",
                content: "Più di 20 anni di esperienza con imprese leader di mercato e profonda conoscenza dell'ecosistema svizzero."
              }
            ]
          }
        }
      ]
    },
    successStories: {
      badge: "STORIE DI SUCCESSO SVIZZERE",
      titlePre: "Risultati concreti per i",
      titleGradient: "nostri clienti",
      desc: "Scopri come abbiamo aiutato imprenditori locali svizzeri a raggiungere i propri obiettivi commerciali grazie a un sito web premium.",
      problemLabel: "IL PROBLEMA:",
      solutionLabel: "LA SOLUZIONE PIXELFORGE:",
      resultLabel: "I RISULTATI OTTENUTI:",
      provenSuccess: "Esperienza comprovata",
      satisfiedUsers: "Clienti felici"
    },
    pricing: {
      badge: "LISTINO PREZZI TRASPARENTE",
      titlePre: "Prezzi chiari, nessun",
      titleGradient: "costo nascosto",
      desc: "Scegli il pacchetto più adatto alle tue esigenze o usa il nostro configuratore interattivo per creare un preventivo personalizzato.",
      popularBadge: "PIÙ SCELTO",
      periodLabel: "sito web",
      configuratorTitle: "Configuratore di Preventivi Interattivo",
      configuratorDesc: "Seleziona le opzioni desiderate per calcolare una stima immediata del tuo investimento per un sito web premium.",
      optionPages: "Numero di pagine:",
      optionSeo: "Ottimizzazione SEO avanzata",
      optionBooking: "Sistema di prenotazione online",
      optionMultilingual: "Multilinguismo (IT + EN)",
      totalInvestment: "Investimento Stimato:",
      pricingDisclaimer: "Nota: Questa è una stima indicativa. Contattaci per un preventivo personalizzato definitivo.",
      btnContactForPlan: "Richiedi questo pacchetto",
      btnContactConfig: "Richiedi preventivo personalizzato",
      plans: {
        starter: {
          name: "Starter",
          description: "Perfetto per artigiani e piccole attività che desiderano una presenza online professionale ed elegante in tempi record.",
          features: [
            "Landing Page professionale (1 pagina)",
            "Design esclusivo e responsivo (Mobile-First)",
            "Ottimizzazione della velocità di caricamento",
            "Integrazione WhatsApp & Google Maps",
            "Modulo di contatto standard",
            "SEO di base e indicizzazione Google",
            "Fino a 3 revisioni incluse"
          ]
        },
        professional: {
          name: "Professional",
          description: "La scelta ideale per aziende locali e professionisti che desiderano presentare i propri servizi in modo completo e persuasivo.",
          features: [
            "Sito web completo fino a 5 pagine",
            "Design di fascia alta personalizzato",
            "Presentazione dettagliata dei servizi e del team",
            "Galleria progetti interattiva / Portfolio",
            "Ottimizzazione SEO locale approfondita",
            "Integrazione delle recensioni di Google",
            "Pannello di amministrazione semplice per i testi",
            "Fino a 5 revisioni incluse",
            "30 giorni di supporto tecnico post-lancio"
          ]
        },
        premium: {
          name: "Premium Custom",
          description: "Design di fascia alta senza compromessi per marchi e aziende che vogliono imporsi sul mercato con una presenza digitale memorabile.",
          features: [
            "Numero illimitato di pagine con design personalizzato",
            "Animazioni fluide di alto livello (stile Apple/Awwwards)",
            "Sistema di prenotazione online o listini interattivi",
            "Configuratore personalizzato o calcolatore di preventivi",
            "Strategia SEO avanzata con analisi della concorrenza",
            "Multilinguismo integrato (IT + EN)",
            "Formazione personale per l'uso del pannello",
            "Revisioni illimitate",
            "90 giorni di supporto prioritario e manutenzione"
          ]
        }
      }
    },
    about: {
      badge: "CHI SIAMO & FILOSOFIA",
      titlePre: "La web agency in Ticino che unisce design e",
      titleGradient: "precisione svizzera",
      desc: "PixelForge è una web agency con sede a Bellinzona, specializzata nella creazione di siti web di altissimo livello per piccole e medie imprese in Ticino, Lugano e in tutta la Svizzera italiana. Non usiamo template prefabbricati: ogni riga di codice è scritta per garantire la massima velocità e un design che conquista al primo sguardo.",
      statProjects: "Progetti completati",
      statSpeed: "Velocità media",
      statSatisfaction: "Soddisfazione clienti",
      aboutPoints: [
        {
          title: "Standard di qualità svizzera",
          desc: "Precisione in ogni pixel, rispetto dei tempi stabiliti e affidabilità totale nelle comunicazioni."
        },
        {
          title: "Sviluppo orientato ai risultati",
          desc: "I nostri siti non sono solo belli: sono progettati per ricevere richieste di preventivo e contatti caldi."
        }
      ]
    },
    testimonials: {
      badge: "FIDUCIA & SUCCESSO",
      titlePre: "Voci che testimoniano la nostra",
      titleGradient: "qualità svizzera",
      desc: "Scopri come le imprese svizzere hanno rivoluzionato la propria presenza online e aumentato il fatturato collaborando con PixelForge.",
      viewSpotlight: "Spotlight Interattivo",
      viewGrid: "Griglia Bento",
      btnPause: "Pausa scorrimento",
      btnPlay: "Avvia scorrimento",
      metricLabel: "Umsatzsteigerung", // keeps track
      list: [
        {
          id: "beauty",
          name: "Elena Bianchi",
          role: "Titolare",
          company: "Aura Kosmetik",
          industry: "Bellezza & Benessere",
          location: "Lugano, Ticino",
          rating: 5,
          review: "Prima di PixelForge non avevamo un vero sito web, ma ricevevamo solo chiamate sporadiche. Ora, con la prenotazione online personalizzata e un'ottima SEO, il nostro fatturato è aumentato del 40% in soli tre mesi! I clienti si complimentano spesso per l'eleganza del sito e per la facilità di prenotazione da smartphone.",
          metric: "+40%",
          metricLabel: "Aumento Fatturato"
        },
        {
          id: "dental",
          name: "Dr. med. dent. Marco Galli",
          role: "Direttore Sanitario",
          company: "Zahnarztpraxis San Gottardo",
          industry: "Odontoiatria",
          location: "Locarno, Ticino",
          rating: 5,
          review: "Come studio dentistico diamo massima importanza alla serietà e alla protezione dei dati. PixelForge ha sviluppato una piattaforma fantastica e pienamente conforme alla LPD che ispira fiducia. I nuovi pazienti ora prenotano le prime visite direttamente online, alleggerendo notevolmente il carico della reception.",
          metric: "-30%",
          metricLabel: "Chiamate in reception"
        },
        {
          id: "restaurant",
          name: "Giovanni Rossi",
          role: "Titolare & Chef",
          company: "Grotto della Valle",
          industry: "Gastronomia",
          location: "Bellinzona, Ticino",
          rating: 5,
          review: "Il nostro vecchio menu era solo un pesante file PDF e il sito era datato. PixelForge ci ha costruito un sito velocissimo con un menu interattivo fantastico e un sistema di prenotazione tavoli. Da allora, nei fine settimana siamo praticamente sempre esauriti. Una collaborazione semplice ed efficiente.",
          metric: "100%",
          metricLabel: "Saturazione Weekend"
        },
        {
          id: "hotel",
          name: "Beat Keller",
          role: "Direttore",
          company: "Chalet Splendide Resort",
          industry: "Boutique Hotel",
          location: "St. Moritz, Grigioni",
          rating: 5,
          review: "Volevamo ridurre la dipendenza dai grandi portali di prenotazione. PixelForge ha creato un capolavoro visivo. L'estetica cattura immediatamente il visitatore. Grazie alla perfetta integrazione con il nostro booking engine, abbiamo aumentato subito le prenotazioni dirette. Un investimento assolutamente redditizio.",
          metric: "+35%",
          metricLabel: "Prenotazioni Dirette"
        },
        {
          id: "construction",
          name: "Thomas Meier",
          role: "CEO & Titolare",
          company: "Edilizia Alpina SA",
          industry: "Edilizia & Costruzioni",
          location: "Mendrisio, Ticino",
          rating: 5,
          review: "Nei concorsi pubblici l'affidabilità e l'immagine sono decisivi. Il nostro nuovo sito presenta le nostre opere referenziali con perfetta chiarezza e precisione. Il portfolio filtrabile è imbattibile. Il numero di richieste di preventivo qualificate tramite il modulo ha superato le nostre aspettative.",
          metric: "+50%",
          metricLabel: "Richieste Preventivo"
        },
        {
          id: "medical",
          name: "Dr. med. Sandra Rocco",
          role: "Direttrice Medica",
          company: "Medizinisches Zentrum San Rocco",
          industry: "Centro Medico",
          location: "Chiasso, Ticino",
          rating: 5,
          review: "Accessibilità, percorsi chiari per i pazienti e assoluta sicurezza dei dati erano al centro del nostro nuovo sito. PixelForge ha superato queste sfide con affidabilità svizzera. Il calcolo automatico del percorso con i mezzi pubblici facilita enormemente l'arrivo dei pazienti più anziani.",
          metric: "100%",
          metricLabel: "Usabilità accessibile"
        }
      ]
    },
    contact: {
      badge: "CONTATTACI",
      subtitle: "Compila il modulo o scrivici direttamente su WhatsApp per avviare il tuo progetto web.",
      titlePre: "Pronto a superare la concorrenza?",
      titleGradient: "Creiamo la tua demo gratuita.",
      desc: "Analizzeremo la tua attività, studieremo i tuoi concorrenti più forti e realizzeremo una demo live gratuita che potrai testare direttamente sul tuo smartphone in pochi giorni. Senza impegno e con la massima qualità.",
      btnStart: "Inizia gratis ora",
      btnWhatsapp: "Contattaci su WhatsApp",
      detailsBadge: "SEDE & ASSISTENZA",
      detailsTitlePre: "Precisione svizzera",
      detailsTitleGradient: "al tuo fianco.",
      detailsDesc: "Operiamo in Ticino e nei Grigioni nel rigoroso rispetto degli standard di precisione e della nuova legge svizzera sulla protezione dei dati (LPD).",
      labelOffice: "SEDE & UFFICIO",
      officeVal: "Ticino & Grigioni, Svizzera",
      officeDesc: "Referenti svizzeri per incontri di persona o consulenze video.",
      labelEmail: "E-MAIL DIRETTA",
      emailDesc: "Rispondiamo garantito entro poche ore lavorative.",
      labelWhatsapp: "WHATSAPP CHAT",
      whatsappDesc: "Scrivici in modo semplice, diretto e riservato.",
      guaranteeTitle: "Garanzia Svizzera di Tempo di Risposta",
      guaranteeDesc: "Analizziamo la tua richiesta e ti ricontatteremo entro 4 ore lavorative con una prima valutazione professionale.",
      formBadge: "MODULO DI CONTATTO",
      labelName: "Nome & Cognome *",
      labelPhone: "Numero di telefono svizzero *",
      labelEmailField: "Indirizzo E-Mail *",
      labelBusiness: "Nome dell'azienda / Settore",
      labelMessage: "Dettagli sul tuo progetto web",
      placeholderMessage: "Descrivi brevemente la tua attività, i tuoi obiettivi o allega il tuo preventivo stimato...",
      errorFields: "Compila tutti i campi obbligatori contrassegnati da asterisco (*).",
      successTitle: "Grazie mille, {name}!",
      successDesc: "Abbiamo ricevuto la tua richiesta per una demo gratuita per <strong>{business}</strong>.",
      successEmail: "E-Mail:",
      successPhone: "Telefono:",
      successResponse: "Tempo di risposta:",
      successResponseVal: "Meno di 4 ore 🇨🇭",
      btnNewMsg: "Invia un nuovo messaggio",
      btnSubmit: "Invia richiesta"
    },
    footer: {
      desc: "Siti web premium personalizzati realizzati con precisione svizzera. Trasformiamo la presenza digitale delle PMI svizzere in esperienze di marca ad alta conversione.",
      followUs: "Seguici su",
      supportTitle: "Contatto Diretto & Supporto",
      labelEmail: "INDIRIZZO E-MAIL",
      labelOffice: "SEDE DELL'AGENZIA",
      labelOfficeVal: "Bellinzona, Ticino, Svizzera",
      labelWhatsapp: "SUPPORTO WHATSAPP",
      btnWhatsappChat: "Inizia chat ora 🇨🇭",
      newsletterBadge: "IMPULSI DIGITALI",
      newsletterTitle: "Iscriviti alla nostra newsletter",
      newsletterDesc: "Ricevi strategie esclusive per lo sviluppo web, la psicologia di vendita e la sicurezza direttamente nella tua casella di posta. Nessuno spam.",
      newsletterPlaceholder: "Il tuo indirizzo e-mail...",
      newsletterBtn: "Iscriviti",
      newsletterSuccess: "Iscrizione avvenuta con successo!",
      newsletterSuccessDesc: "Grazie per la fiducia. Riceverai presto una e-mail di conferma.",
      newsletterError: "Inserisci un indirizzo e-mail valido.",
      copyright: "© 2026 PixelForge.ch. Tutti i diritti riservati.",
      subCopyright: "SVILUPPO WEB SVIZZERO INNOVATIVO • CONCEPITO IN SVIZZERA",
      timeLabel: "ORA SVIZZERA:",
      sslLabel: "SSL CRITTOGRAFATO SICURO",
      linkImpressum: "Impressum",
      linkPrivacy: "Privacy"
    }
  },
  en: {
    common: {
      brand: "PixelForge",
      slogan: "Web Craftsmanship",
      swissQuality: "Swiss Quality & Service",
      secConn: "Secure 256-bit SSL encrypted connection. Fully compliant with the Swiss Data Protection Act (DPA).",
      btnDemo: "Request a free demo",
      btnProjects: "View projects",
      swissBadge: "CH 🇨🇭",
      outcome: "Outcome:",
      verifiedClient: "100% Verified Swiss Clients",
      googleStars: "Google Reviews 5.0 Stars",
      provenRoi: "Guaranteed ROI",
      activeText: "● ACTIVE",
      onlineText: "● ONLINE",
      moreInfo: "Request information",
      inquireBtn: "Send Inquiry",
      nowInquire: "Inquire now",
      hours: "hours",
      seconds: "seconds",
      minute: "minute",
      swissTime: "SWISS TIME:"
    },
    nav: {
      services: "Services",
      method: "Method",
      about: "About Us",
      testimonials: "Testimonials",
      projects: "Projects",
      cases: "Case Studies",
      pricing: "Pricing",
      blog: "Blog",
      contact: "Contact",
      btnStart: "Get Started"
    },
    hero: {
      badge: "🇨🇭 Web Agency – Ticino & Graubünden",
      titlePre: "We build",
      titleGradient: "Premium websites",
      titlePost: "for businesses that want to grow.",
      subtitle: "We create modern, fast, and professional websites for local businesses in Switzerland that want to be found on Google and attract new customers.",
      industries: [
        "Beauty Salons",
        "Dental Practices",
        "Restaurants & Grottos",
        "Construction Companies",
        "Boutique Hotels",
        "Medical Doctors & Clinics",
        "Law Firms",
        "Physiotherapists"
      ],
      logos: [
        { name: "Alpina Chalet", locale: "St. Moritz" },
        { name: "Lugano Spa", locale: "Lugano" },
        { name: "Swiss Dental", locale: "Zurich" },
        { name: "Grotto Ticino", locale: "Bellinzona" },
        { name: "Chiasso Med", locale: "Chiasso" },
        { name: "Mendrisio Edil", locale: "Mendrisio" },
        { name: "Aura Estetica", locale: "Lugano" }
      ],
      speedScore: "Google Speed Score 100/100",
      localSeo: "Local SEO optimization",
      noHiddenCosts: "No hidden costs"
    },
    painPoints: {
      badge: "MARKET ANALYSIS CH",
      titlePre: "Is your business still",
      titleGradient: "without a professional website?",
      desc: "Today, customers search for everything on Google. If your business doesn't have a professional website, you lose visibility, trust, and valuable local clients every day.",
      point1Title: "Loss of local clients",
      point1Desc: "97% of people search online for local services before making a decision.",
      point2Title: "Invisibility on Google",
      point2Desc: "Without an optimized website, Google won't list your business in local search results.",
      testBadge: "INTERACTIVE",
      testTitle: "Digital Visibility Test",
      testSubtitle: "Analyze the state of your online presence in 3 simple steps.",
      questions: [
        {
          id: 1,
          text: "Does your company appear in the top 3 results on Google Maps when someone in your region searches for your service?",
          icon: "Search"
        },
        {
          id: 2,
          text: "Can a client access your price list, menu, or opening hours in less than 2 seconds on their smartphone?",
          icon: "Smartphone"
        },
        {
          id: 3,
          text: "Do you have an automated system to acquire new clients or appointment requests while you do your work?",
          icon: "Calendar"
        }
      ],
      btnYes: "Yes, of course",
      btnNo: "No, not yet",
      resultsTitle: "Your result:",
      recommendationLabel: "PixelForge Recommendation:",
      btnRestart: "Retake test",
      btnConsult: "Request free consultation",
      feedback: {
        invisible: {
          score: "Invisible 🔴",
          percentage: "90% potential client loss",
          desc: "Clients in your region searching for your services on Google end up directly at your competitors. You are losing valuable opportunities every day.",
          recommendation: "We recommend our **Starter** or **Professional** package with urgent Google Maps indexing."
        },
        medium: {
          score: "Medium Risk 🟡",
          percentage: "50% potential client loss",
          desc: "You have a minimal online presence, but it is not optimized. Many potential clients find your profile but leave because clear information or direct booking is missing.",
          recommendation: "The **Professional** package is ideal to fill these gaps and turn web visitors into real inquiries."
        },
        excellent: {
          score: "Excellent State 🟢",
          percentage: "Optimized Presence",
          desc: "Your online presence has a solid foundation! You can further maximize client experience and stand out with an exclusive elite design.",
          recommendation: "The **Premium Custom** package allows you to outperform all Swiss competitors with first-class animations and unique user experiences."
        }
      }
    },
    services: {
      badge: "SERVICES & COMPETENCE",
      titlePre: "We engineer your",
      titleGradient: "business success",
      desc: "We do not build simple showcase websites. We develop ultra-fast, interactive marketing tools optimized to convert Swiss visitors into paying clients.",
      learnMore: "Learn more",
      benefitsLabel: "Included benefits:",
      simTitle: "INTERACTIVITY SIMULATOR",
      simDesc: "Click on our services on the left to test live the advanced features we can integrate on your new website.",
      simulators: {
        maps: {
          title: "Live Google Maps Route",
          desc: "See how clients can calculate directions by car, walking, or public transport to your location with a single tap.",
          startLabel: "STARTING POINT:",
          trainStation: "Bellinzona Station",
          timeCar: "4 min driving",
          timeWalk: "12 min walking",
          btnRoute: "Calculate route on smartphone"
        },
        contact: {
          title: "Instant Contact Form",
          desc: "Smart, optimized fields to reduce friction and maximize client inquiries.",
          labelService: "REQUESTED SERVICE:",
          servicesList: ["Dental cleaning", "Free initial talk", "SEO Consultation"],
          btnSubmit: "Send test inquiry",
          successTitle: "Inquiry sent successfully!",
          successDesc: "You simulated the form submission. The client gets instant feedback and you receive an email notification."
        },
        speed: {
          title: "Google PageSpeed Live Test",
          desc: "Measure and experience the loading time optimization of the PixelForge Core Engine.",
          gaugeText: "PageSpeed",
          fcp: "FIRST CONTENTFUL PAINT",
          lcp: "LARGEST CONTENTFUL PAINT",
          btnScan: "Start live PageSpeed analysis",
          scanning: "Analyzing...",
          btnRestart: "Restart analysis"
        },
        ai: {
          title: "AI Assistant Live Demo",
          desc: "Simulate a fully automated client conversation with booking capabilities.",
          intro: "Hello! I am your automated booking assistant. Would you like to reserve a slot for a free initial consultation?",
          replyText: "Yes, gladly. I select the following time:",
          confirmed: "Excellent! Your consultation for tomorrow at <strong>{time}</strong> is successfully booked. I've just sent you an SMS confirmation. See you soon! 🇨🇭",
          btnReset: "Reset conversation 🔄",
          timeLabel: "SELECT TIME:"
        }
      },
      trustBannerTitle: "Compliant with Swiss Data Protection Act (DPA)",
      trustBannerDesc: "All websites created by PixelForge include a complete, legally compliant privacy policy and cookie declaration. Hosting takes place on high-security Swiss servers.",
      trustBannerBtn: "Request now",
      list: [
        {
          id: "siti-web",
          title: "Professional Websites",
          description: "Complete, elegant, and tailored websites that reflect your brand's excellence and convert visitors into clients.",
          benefits: ["Exclusive & custom design", "Perfect mobile responsiveness", "Easy administration panel", "Secure & compliant with Swiss DPA"]
        },
        {
          id: "landing-pages",
          title: "High-Converting Landing Pages",
          description: "Promotional pages designed with a single goal: converting visitors into hot leads and valuable appointments.",
          benefits: ["Persuasive sales psychology", "Optimized contact forms", "Perfect for Google/Social campaigns", "Professional copywriting included"]
        },
        {
          id: "seo-base",
          title: "Local SEO for Google",
          description: "Get found by local clients who are actively searching for your services in your area and across Switzerland.",
          benefits: ["Local keyword research", "Google Business Profile optimization", "SEO-friendly technical structure", "Guaranteed Google indexing"]
        },
        {
          id: "mobile-first",
          title: "Mobile-First Design",
          description: "Over 80% of local searches are done via smartphone. Your website will load extremely fast and feel intuitive on any screen.",
          benefits: ["Fluid touch experience", "One-handed quick navigation", "Instant loading on 4G/5G networks", "Quick-action buttons (Call/Maps)"]
        },
        {
          id: "restyling",
          title: "Website Relaunch & Restyling",
          description: "Turn an outdated or slow website into a modern, fast, and elegant tool matching the highest Swiss standards.",
          benefits: ["Critical analysis of old structure", "Modern content updating", "Drastic conversion increases", "Up to 3x faster loading speeds"]
        },
        {
          id: "integrazioni",
          title: "WhatsApp & Maps Integration",
          description: "Let clients write to you with one click or find your physical location in seconds thanks to Google Maps.",
          benefits: ["Floating WhatsApp button", "Custom interactive maps", "Opening hours synchronization", "Direct links to navigation apps"]
        },
        {
          id: "moduli",
          title: "Forms & Booking Systems",
          description: "Remove barriers. Allow clients to request offers, bookings, or tables directly and effortlessly online.",
          benefits: ["Intuitive, customized fields", "Instant email/SMS alerts", "Calendar integrations", "DPA-compliant data storage"]
        },
        {
          id: "velocita",
          title: "Speed Optimization",
          description: "A slow website loses 50% of users before loading. We build with clean code for record-breaking speeds.",
          benefits: ["Ultralight and modern code", "Next-gen image compression", "Excellent Google PageSpeed score (95+)", "Fast & secure Swiss hosting"]
        }
      ]
    },
    process: {
      badge: "OUR METHODOLOGY",
      titlePre: "The path to your new",
      titleGradient: "premium digital presence",
      desc: "We work with a structured and transparent process to guarantee you top Swiss quality, strictly respecting agreed timelines and budget.",
      steps: [
        {
          step: "01",
          title: "Strategic Consulting",
          desc: "We analyze your business and competitors, and define the specific goals of your new website."
        },
        {
          step: "02",
          title: "Design & Prototype",
          desc: "We create an interactive prototype to show you the graphic layout and structure before coding."
        },
        {
          step: "03",
          title: "Development & Tuning",
          desc: "We write clean, lightweight code, optimize loading speeds, and integrate all required features."
        },
        {
          step: "04",
          title: "Launch & Local SEO",
          desc: "We deploy the site on secure Swiss servers and submit it to Google for immediate indexing."
        }
      ]
    },
    whyChooseUs: {
      badge: "WHY PIXELFORGE",
      titlePre: "Much more than",
      titleGradient: "a traditional web agency",
      desc: "We compare standard websites with the digital craftsmanship of PixelForge. The difference lies in the details that attract clients.",
      comparisonTitle: "Comparison: Before vs After",
      sliderLabel: "Drag to compare:",
      beforeLabel: "STANDARD WEBSITE (BEFORE)",
      afterLabel: "PIXELFORGE PREMIUM SITE (AFTER)",
      beforePoints: [
        "Slow loading times (5+ seconds)",
        "Outdated visuals or generic templates",
        "Not optimized for Google Maps & local search",
        "No clear call-to-actions or WhatsApp option",
        "Non-compliant with Swiss privacy laws (DPA)",
        "No interactive booking or inquiry forms"
      ],
      afterPoints: [
        "Instant loading (under 1 second)",
        "Unique custom design tailormade for your brand",
        "Excellent rankings in local Google searches",
        "Strategic WhatsApp and rapid form integration",
        "SSL certified & full Swiss DPA compliance",
        "Integrated interactive quote/booking systems"
      ],
      speedTitle: "Speed Optimization",
      seoTitle: "Ready for Google",
      securityTitle: "Swiss Security"
    },
    portfolio: {
      badge: "SELECTED PROJECTS",
      titlePre: "Our latest",
      titleGradient: "craft projects",
      desc: "Explore the websites we have built for Swiss companies. Click on each project to launch an interactive live mobile simulation directly on your screen.",
      livePreview: "INTERACTIVE LIVE PREVIEW",
      previewDesc: "You are viewing an interactive smartphone simulator of the client's live website. Feel free to explore the sections and try submitting the form.",
      closePreview: "Close simulation",
      viewLive: "Simulate website on phone",
      mockupHeader: "Smartphone Simulation",
      list: [
        {
          id: "beauty",
          title: "Aura Kosmetik & Wellness",
          category: "Beauty Salon",
          description: "A minimalist, relaxing, and elegant website for a premium beauty salon in Lugano, focused on online booking of treatments.",
          location: "Lugano, Ticino",
          features: ["Online treatment booking", "Interactive price list", "HD photo gallery", "Google Reviews integration"],
          problem: "The salon had no professional online presence. Clients could barely find any info on Google, making online bookings rare.",
          solution: "PixelForge built a fast, beautiful, and mobile-optimized website with services, gallery, and floating WhatsApp.",
          result: "An example of how a beauty studio can present its treatments with a polished aesthetic and let clients book directly online, without needing to call.",
          mockupContent: {
            heroTitle: "Your temple for beauty and relaxation in Lugano",
            heroSubtitle: "Individual facials, massages, and body care to rediscover your natural harmony.",
            ctaText: "Book treatment",
            sections: [
              {
                title: "Our Treatments",
                content: "Regenerating Massages (60 min) — CHF 120\nAnti-Aging Facial — CHF 140\nPremium Manicure & Pedicure — CHF 80"
              },
              {
                title: "Why Us?",
                content: "We use exclusively certified organic products. An exclusive and discreet ambiance in the heart of Lugano."
              }
            ]
          }
        },
        {
          id: "dental",
          title: "Zahnarztpraxis San Gottardo",
          category: "Dental Clinic",
          description: "Trustworthy and informative website for a modern dental clinic in Locarno. Focus on trust and straightforward contact.",
          location: "Locarno, Ticino",
          features: ["Request initial visit online", "Medical team presentation", "24h emergency integration", "Detailed FAQ section"],
          problem: "Patients struggled to find the clinic online. The lack of a contact form forced the reception to handle dozens of repetitive calls.",
          solution: "PixelForge created a modern clinic website with an online request form, team presentation, and clear directions.",
          result: "An example of how a dental practice can build trust from the first visit, with clear treatment information and an always-available appointment request form.",
          mockupContent: {
            heroTitle: "The smile you deserve, cared for by experts",
            heroSubtitle: "State-of-the-art dental technology combined with a human, pain-free approach in Locarno.",
            ctaText: "Book an Appointment",
            sections: [
              {
                title: "Specialties",
                content: "• Computer-guided implantology\n• Invisible orthodontics (Aligners)\n• Professional dental cleaning & Bleaching"
              },
              {
                title: "Dental Emergencies",
                content: "We offer a fast on-call service for acute pain. Call us immediately for an urgent appointment."
              }
            ]
          }
        },
        {
          id: "restaurant",
          title: "Grotto della Valle",
          category: "Restaurant & Osteria",
          description: "Warm digital presence for a traditional Grotto in Bellinzona. Interactive digital menu and table reservations.",
          location: "Bellinzona, Ticino",
          features: ["Dynamic digital menu", "Instant table booking", "Instagram feed integration", "Quick directions"],
          problem: "The Google Maps listing was empty, there was no mobile-friendly menu online, and clients were choosing competitors with modern sites.",
          solution: "An ultra-fast website with an always-current digital menu, a table reservation widget, and professional photos.",
          result: "An example of how a traditional grotto can offer a digital menu that's readable in an instant on mobile and simplify table bookings during busy weekends.",
          mockupContent: {
            heroTitle: "Authentic flavors of Ticino tradition",
            heroSubtitle: "Fireplace polenta, local cold cuts, and alpine cheese, accompanied by the region's best Merlot wines.",
            ctaText: "Reserve a Table",
            sections: [
              {
                title: "Our Specialties",
                content: "• Taragna polenta with venison stew — CHF 26\n• Merlot risotto with porcini mushrooms — CHF 24\n• Cheese board from our valleys — CHF 18"
              },
              {
                title: "Opening Hours",
                content: "Wednesday - Sunday: 11:30 - 14:30 | 18:30 - 23:00\nMonday and Tuesday: Closed"
              }
            ]
          }
        },
        {
          id: "hotel",
          title: "Chalet Splendide Resort",
          category: "Hotel & Resort",
          description: "Luxurious and evocative website for an exclusive boutique mountain resort in Graubünden. Maximum visual impact.",
          location: "St. Moritz, Switzerland",
          features: ["Booking engine integration", "Virtual SPA tour", "Exclusive seasonal packages", "Interactive multilinguism"],
          problem: "Bookings were made almost entirely through third-party portals (Booking.com), leading to high commissions and no direct client relation.",
          solution: "A high-end website with direct booking engine integration and virtual tours of the wellness center.",
          result: "An example of how a boutique hotel can encourage direct bookings from its own website, reducing reliance on third-party booking platform fees.",
          mockupContent: {
            heroTitle: "Exclusive experience amidst alpine peaks",
            heroSubtitle: "A sanctuary of luxury, wellness, and Michelin-starred dining, surrounded by the majesty of the Swiss Alps.",
            ctaText: "Check Availability",
            sections: [
              {
                title: "The Alpine Experience",
                content: "Suites with panoramic peak views, heated outdoor pool with whirlpool, and a 1 Michelin star restaurant."
              },
              {
                title: "Boutique Alpine SPA",
                content: "Exclusive wellness treatments with mountain herbs and customized relaxation programs for absolute well-being."
              }
            ]
          }
        },
        {
          id: "construction",
          title: "EdilPro Costruzioni",
          category: "Construction Company",
          description: "Professional website for a company specialized in construction, renovations, and building works.",
          location: "Lugano, Ticino",
          features: ["Filterable project portfolio", "Online quote request", "Construction services overview", "Completed works gallery"],
          problem: "Demo project designed for a construction company that needs a clear online showcase to present its services and collect quote requests.",
          solution: "PixelForge developed a solid, professional website with a services overview, project gallery, and a direct quote request form.",
          result: "An example of how a construction company can communicate reliability and expertise with a clear structure and an immediate contact form.",
          mockupContent: {
            heroTitle: "Quality Construction & Renovations",
            heroSubtitle: "New builds, renovations, and construction work with precision and reliability in Lugano and beyond.",
            ctaText: "Request a Quote",
            sections: [
              {
                title: "Our Services",
                content: "• Full renovations\n• New residential construction\n• Building maintenance work"
              },
              {
                title: "Why Choose Us",
                content: "Transparent quotes, clean job sites, and strict adherence to agreed timelines."
              }
            ]
          }
        },
        {
          id: "medical",
          title: "Barber Studio Ticino",
          category: "Premium Barber",
          description: "Modern website for a professional barber shop with services, pricing, gallery, and online booking.",
          location: "Bellinzona, Ticino",
          features: ["Online appointment booking", "Services & price list", "Salon photo gallery", "WhatsApp integration"],
          problem: "Demo project designed for a barber shop that wants to showcase its services and pricing and let clients book an appointment online.",
          solution: "PixelForge built an elegant, mobile-first website with a service price list, photo gallery, and simplified online booking.",
          result: "A concrete example of how a barber shop can offer simple bookings, a curated photo showcase, and a direct WhatsApp contact channel.",
          mockupContent: {
            heroTitle: "Your Style, Our Passion",
            heroSubtitle: "Modern cuts, beard care, and tailored treatments in the heart of Bellinzona.",
            ctaText: "Book Your Appointment",
            sections: [
              {
                title: "Our Services",
                content: "Classic Cut — CHF 35\nCut & Beard — CHF 55\nTraditional Shave — CHF 30"
              },
              {
                title: "Why Choose Us",
                content: "Experienced barbers, a well-kept space, and fast online booking so you never waste time waiting."
              }
            ]
          }
        },
        {
          id: "realestate",
          title: "Vesta Luxury Real Estate",
          category: "Luxury Real Estate",
          description: "A high-performance real estate portal for luxury villas and apartments in Canton Ticino, focused on immediate responsiveness.",
          location: "Lugano, Ticino",
          features: ["Advanced property filters", "Real-time integrated viewing requests", "Interactive 4K photo gallery", "Built-in mortgage calculator"],
          problem: "Clients struggled to load high-resolution photo galleries of luxury villas on their smartphones, bouncing almost immediately.",
          solution: "PixelForge optimized all images using lazy-loading and next-gen formats to guarantee instant rendering and absolute visual sharpness.",
          result: "An example of how a luxury real estate portal can display high-resolution imagery without sacrificing mobile load speed.",
          mockupContent: {
            heroTitle: "Exclusive residences in the prime spots of Ticino",
            heroSubtitle: "A curated selection of modern villas and prestigious estates overlooking Lake Lugano.",
            ctaText: "Request Private Catalog",
            sections: [
              {
                title: "Our Properties",
                content: "Lake-view Villa Castagnola — Price upon request\nDesign Penthouse in Paradiso — CHF 3,800,000\nHistorical Estate in Morcote — CHF 5,200,000"
              },
              {
                title: "Premium Services",
                content: "Free professional valuations, expert Swiss legal and tax advice for local and international buyers."
              }
            ]
          }
        },
        {
          id: "fitness",
          title: "Apex Strength & Conditioning",
          category: "Gym & Fitness",
          description: "A highly captivating, dynamic, and high-performance website for a premium gym in Bellinzona with seamless booking workflows.",
          location: "Bellinzona, Ticino",
          features: ["In-app session bookings", "Online subscriptions via Stripe", "Interactive workout routines", "Direct WhatsApp to personal trainers"],
          problem: "Members had to call or text repeatedly to reserve a slot in group fitness courses, causing administrative bottlenecks.",
          solution: "A blazing-fast website with an integrated calendar for real-time bookings and simplified checkout flows.",
          result: "An example of how a gym can manage class bookings online, freeing up front-desk staff from much of the administrative call load.",
          mockupContent: {
            heroTitle: "Exceed your limits with first-class coaches",
            heroSubtitle: "Functional training, group classes, and customized nutrition plans in the heart of Bellinzona.",
            ctaText: "Claim Free Session",
            sections: [
              {
                title: "Our Memberships",
                content: "Monthly Open Access — CHF 90 / month\nAll-Inclusive Annual Pass — CHF 850 / year\n10-Class Group Pass — CHF 180"
              },
              {
                title: "Why Choose Apex",
                content: "Swiss federally certified personal coaches, top-tier professional equipment, and a pristine environment."
              }
            ]
          }
        },
        {
          id: "winery",
          title: "TettoPro Ticino",
          category: "Roofing & Coverings",
          description: "Website dedicated to roof renovation, waterproofing, insulation, and roof maintenance.",
          location: "Ticino, Switzerland",
          features: ["Roofing services overview", "Free on-site survey request", "Completed works gallery", "Maintenance & insulation section"],
          problem: "Demo project designed for a roofing company that needs to present its roof renovation services and collect on-site survey requests.",
          solution: "PixelForge developed a clear, professional website with a services overview, works gallery, and a free on-site survey request form.",
          result: "An example of how a roofing company can communicate technical expertise and collect inquiries in a simple, direct way.",
          mockupContent: {
            heroTitle: "Solid Roofs, Lasting Protection",
            heroSubtitle: "Roof renovation, waterproofing, and insulation with quality materials across Ticino.",
            ctaText: "Request a Free Survey",
            sections: [
              {
                title: "Our Services",
                content: "• Roof renovation and repair\n• Waterproofing and insulation\n• Periodic roof maintenance"
              },
              {
                title: "Why Choose Us",
                content: "Free on-site surveys, quality materials, and prompt service across Ticino."
              }
            ]
          }
        },
        {
          id: "architect",
          title: "Arch Studio Spazio",
          category: "Architecture Studio",
          description: "An immersive, minimalist portfolio for a renowned architecture and interior design studio in Lugano. Exceptional speed and 4K media optimization.",
          location: "Lugano, Ticino",
          features: ["Interactive project grid", "4K optimized imagery", "Design case-studies", "3D consultation module"],
          problem: "The previous website did not value award-winning architectural designs due to heavy loading times and non-responsive image grids.",
          solution: "A geometric, sleek website featuring swift lazy-loading galleries and a horizontal immersive layout.",
          result: "An example of how an architecture studio can present its projects with a high-impact visual portfolio aimed at discerning private clients.",
          mockupContent: {
            heroTitle: "Modern Spaces That Inspire Living",
            heroSubtitle: "Exquisite architectural planning and interior design executed with Swiss geometric rigor.",
            ctaText: "Book Consultation",
            sections: [
              {
                title: "Key Projects",
                content: "Villa Gialla (Collina d'Oro) — Minimalist Residence\nPenthouse M (Paradiso) — Premium Interior Design\nHeadquarters (Lugano) — Sustainable Architecture"
              },
              {
                title: "Our Approach",
                content: "Minergie-P energy efficiency, local organic materials, and organic integration into the Alpine landscape."
              }
            ]
          }
        },
        {
          id: "lawfirm",
          title: "Studio Legale Gottardo",
          category: "Law Firm & Partners",
          description: "An authoritative, secure, and prestigious web presence for a premium law firm in Lugano. Clean layout focused on absolute trust.",
          location: "Lugano, Switzerland",
          features: ["Detailed attorney profiles", "Online consultation requests", "Normative insights hub", "End-to-end secure forms"],
          problem: "Their previous website looked outdated and lacked the prestige required to attract modern Swiss SMEs and corporate clients.",
          solution: "Creation of a highly elegant portal with partner biographies and secure, encrypted contact endpoints.",
          result: "An example of how a law firm can communicate authority and discretion online, with a consistent professional tone across every page.",
          mockupContent: {
            heroTitle: "Legal Expertise Dedicated to Your Success",
            heroSubtitle: "Consultation and representation for corporations and individuals with Swiss rigor and discretion.",
            ctaText: "Contact Law Firm",
            sections: [
              {
                title: "Practice Areas",
                content: "• Corporate & Commercial Law\n• Tax Advisory & Asset Management\n• Litigation & International Arbitration"
              },
              {
                title: "Our Values",
                content: "Absolute integrity, professional excellence, and close alignment with our clients' strategic goals."
              }
            ]
          }
        },
        {
          id: "consulting",
          title: "Swiss Alpine Consulting",
          category: "Business Consulting",
          description: "A top-tier corporate platform for an international financial and strategic advisory firm operating in Zug and Lugano.",
          location: "Zug, Switzerland",
          features: ["Interactive KPIs & metrics", "Inquiry for business audits", "CEO resource library", "Automatic multilingual setup"],
          problem: "The absence of a solid, authoritative digital presence slowed down strategic partnerships with corporate leaders.",
          solution: "Development of a global corporate website with a bento layout, interactive stats, and simplified audit application pathways.",
          result: "An example of how a consulting firm can present its expertise with an international corporate layout and a direct audit application pathway.",
          mockupContent: {
            heroTitle: "Swiss Strategic Planning for Global Leaders",
            heroSubtitle: "Driving growth, operational excellence, and digital transformation for your company.",
            ctaText: "Request Free Audit",
            sections: [
              {
                title: "Our Services",
                content: "• Mergers & Acquisitions (M&A)\n• Strategic Reorganization & Operational Excellence\n• IPO and Advisory Services"
              },
              {
                title: "Why Swiss Alpine",
                content: "Over 20 years of experience with market-leading corporations, combined with a deep knowledge of the Swiss economic landscape."
              }
            ]
          }
        }
      ]
    },
    successStories: {
      badge: "SWISS SUCCESS STORIES",
      titlePre: "Concrete results for our",
      titleGradient: "esteemed clients",
      desc: "See how we helped local Swiss businesses achieve their commercial goals through a premium digital presence.",
      problemLabel: "THE PROBLEM:",
      solutionLabel: "THE PIXELFORGE SOLUTION:",
      resultLabel: "THE ACQUIRED OUTCOME:",
      provenSuccess: "Proven Success",
      satisfiedUsers: "Happy Clients"
    },
    pricing: {
      badge: "TRANSPARENT PRICING PLANS",
      titlePre: "Clear pricing, no",
      titleGradient: "hidden costs",
      desc: "Choose the package that best fits your goals or use our interactive configurator to create a custom estimate.",
      popularBadge: "MOST POPULAR",
      periodLabel: "website",
      configuratorTitle: "Interactive Quote Configurator",
      configuratorDesc: "Select your desired features to calculate an instant cost estimate for your premium website.",
      optionPages: "Number of pages:",
      optionSeo: "Advanced SEO Optimization",
      optionBooking: "Online Booking System",
      optionMultilingual: "Multilingual capability (IT + EN)",
      totalInvestment: "Estimated Investment:",
      pricingDisclaimer: "Note: This is an indicative estimate. Contact us for a final binding quotation.",
      btnContactForPlan: "Request this plan",
      btnContactConfig: "Request customized quote",
      plans: {
        starter: {
          name: "Starter",
          description: "Perfect for artisans and small businesses seeking an elegant, professional online presence in record time.",
          features: [
            "Professional Landing Page (1 page)",
            "Exclusive & responsive design (Mobile-First)",
            "Loading speed optimization",
            "WhatsApp & Google Maps integration",
            "Standard contact form",
            "SEO basics and Google indexing",
            "Up to 3 revisions included"
          ]
        },
        professional: {
          name: "Professional",
          description: "The ideal choice for local companies and service providers wishing to present their services comprehensively.",
          features: [
            "Complete website with up to 5 pages",
            "High-end customized design",
            "Detailed services & team introduction",
            "Interactive project gallery / Portfolio",
            "Deep local SEO optimization",
            "Google Reviews integration",
            "Simple admin panel for easy text edits",
            "Up to 5 revisions included",
            "30 days of technical support after launch"
          ]
        },
        premium: {
          name: "Premium Custom",
          description: "High-end design without compromises for brands and companies seeking a memorable, market-leading presence.",
          features: [
            "Unlimited pages with custom tailored design",
            "Fluid high-end animations (Apple/Awwwards style)",
            "Online booking engine or interactive price tables",
            "Custom configurator or cost calculator",
            "Advanced SEO strategy with competitor analysis",
            "Multilingual capability integrated (IT + EN)",
            "Personal training session for the admin panel",
            "Unlimited design revisions",
            "90 days of priority support and maintenance"
          ]
        }
      }
    },
    about: {
      badge: "ABOUT US & PHILOSOPHY",
      titlePre: "We blend cutting-edge design and",
      titleGradient: "Swiss precision",
      desc: "PixelForge is a Swiss web agency specializing in high-end websites for local small and medium businesses. We do not use premade generic templates: every line of code is custom-written to ensure peak performance and design that captures your audience instantly.",
      statProjects: "Completed projects",
      statSpeed: "Average Speed",
      statSatisfaction: "Client satisfaction",
      aboutPoints: [
        {
          title: "Swiss quality standards",
          desc: "Precision in every pixel, strict compliance with deadlines, and total communication reliability."
        },
        {
          title: "Results-driven development",
          desc: "Our websites aren't just pretty: they are engineered to generate inquiry forms and warm business leads."
        }
      ]
    },
    testimonials: {
      badge: "TRUST & SUCCESS",
      titlePre: "Voices that speak for our",
      titleGradient: "Swiss quality",
      desc: "Discover how local Swiss businesses revolutionized their digital presence and boosted revenue collaborating with PixelForge.",
      viewSpotlight: "Interactive Spotlight",
      viewGrid: "Bento Grid",
      btnPause: "Pause auto-slide",
      btnPlay: "Resume auto-slide",
      metricLabel: "Boost in Revenue",
      list: [
        {
          id: "beauty",
          name: "Elena Bianchi",
          role: "Owner",
          company: "Aura Kosmetik",
          industry: "Beauty & Wellness",
          location: "Lugano, Ticino",
          rating: 5,
          review: "Before PixelForge, we had no website, just sporadic phone calls. Now, with customized online booking and top-notch SEO, our revenue went up 40% in three months! Clients constantly compliment how elegant the site looks and how easy booking is from their smartphones.",
          metric: "+40%",
          metricLabel: "Revenue Increase"
        },
        {
          id: "dental",
          name: "Dr. dent. Marco Galli",
          role: "Medical Director",
          company: "Zahnarztpraxis San Gottardo",
          industry: "Dentistry",
          location: "Locarno, Ticino",
          rating: 5,
          review: "As a dental clinic, we put the highest value on integrity and data protection. PixelForge developed a fantastic, fully DPA-compliant platform that radiates trust. New patients now book initial visits directly online, significantly offloading our reception desk.",
          metric: "-30%",
          metricLabel: "Reception phone calls"
        },
        {
          id: "restaurant",
          name: "Giovanni Rossi",
          role: "Owner & Chef",
          company: "Grotto della Valle",
          industry: "Gastronomy",
          location: "Bellinzona, Ticino",
          rating: 5,
          review: "Our old menu was just a heavy PDF and the site was obsolete. PixelForge created an ultra-fast site with a wonderful interactive menu and table reservation engine. We've been practically fully booked on weekends since. Direct and highly efficient partnership.",
          metric: "100%",
          metricLabel: "Weekend Occupancy"
        },
        {
          id: "hotel",
          name: "Beat Keller",
          role: "General Manager",
          company: "Chalet Splendide Resort",
          industry: "Boutique Hospitality",
          location: "St. Moritz, Graubünden",
          rating: 5,
          review: "We wanted to reduce our dependency on major booking portals. PixelForge created a visual masterpiece. The aesthetics instantly captivate visitors. Seamless booking engine integration immediately grew our high-value direct bookings. A highly lucrative investment.",
          metric: "+35%",
          metricLabel: "Direct Bookings"
        },
        {
          id: "construction",
          name: "Thomas Meier",
          role: "CEO & Owner",
          company: "Edilizia Alpina SA",
          industry: "Building & Craft",
          location: "Mendrisio, Ticino",
          rating: 5,
          review: "For public bids, trust and a flawless impression decide. Our new website presents references with extreme clarity and sharpness. The filterable portfolio is unbeatable. The number of qualified bids through the form has completely exceeded our expectations.",
          metric: "+50%",
          metricLabel: "Bidding inquiries"
        },
        {
          id: "medical",
          name: "Dr. Sandra Rocco",
          role: "Medical Lead",
          company: "Medizinisches Zentrum San Rocco",
          industry: "Medical Center",
          location: "Chiasso, Ticino",
          rating: 5,
          review: "Accessibility, clear patient pathways, and absolute data safety were central to our web launch. PixelForge handled these complex Swiss demands flawlessly. The public transport routing integration makes access extremely easy for our elderly patients.",
          metric: "100%",
          metricLabel: "Accessible usability"
        }
      ]
    },
    contact: {
      badge: "CONTACT US",
      subtitle: "Fill out the form or write to us directly on WhatsApp to start your web project.",
      titlePre: "Ready to outperform the competition?",
      titleGradient: "Let's create your free demo.",
      desc: "We will analyze your business, study your strongest competitors, and code a free live demo that you can test directly on your smartphone in a few days. Non-binding and at the highest quality.",
      btnStart: "Start free now",
      btnWhatsapp: "Contact us on WhatsApp",
      detailsBadge: "OFFICE & SUPPORT",
      detailsTitlePre: "Swiss precision",
      detailsTitleGradient: "at your side.",
      detailsDesc: "We operate in Ticino and Graubünden, strictly respecting high precision standards and the new Swiss Data Protection Act (DPA).",
      labelOffice: "OFFICE LOCATION",
      officeVal: "Ticino & Graubünden, Switzerland",
      officeDesc: "Swiss contact partners for face-to-face meetings or video advice.",
      labelEmail: "DIRECT EMAIL",
      emailDesc: "We reply guaranteed within a few business hours.",
      labelWhatsapp: "WHATSAPP CHAT",
      whatsappDesc: "Write to us simply, directly, and confidentially.",
      guaranteeTitle: "Swiss Response Time Guarantee",
      guaranteeDesc: "We analyze your request and will contact you within 4 business hours with an initial professional estimation.",
      formBadge: "CONTACT FORM",
      labelName: "First & Last Name *",
      labelPhone: "Swiss Phone Number *",
      labelEmailField: "Email Address *",
      labelBusiness: "Company Name / Industry",
      labelMessage: "Details about your web project",
      placeholderMessage: "Briefly describe your business, goals, or attach your estimated quotation...",
      errorFields: "Please fill out all mandatory fields marked with an asterisk (*).",
      successTitle: "Thank you so much, {name}!",
      successDesc: "We have received your request for a free demo for <strong>{business}</strong>.",
      successEmail: "Email:",
      successPhone: "Phone:",
      successResponse: "Response Time:",
      successResponseVal: "Under 4 hours 🇨🇭",
      btnNewMsg: "Send another message",
      btnSubmit: "Submit request"
    },
    footer: {
      desc: "Premium tailored websites engineered with Swiss precision. We transform the digital presence of Swiss SMEs into high-converting brand experiences.",
      followUs: "Follow us on",
      supportTitle: "Direct Contact & Support",
      labelEmail: "EMAIL ADDRESS",
      labelOffice: "AGENCY SEATS",
      labelOfficeVal: "Bellinzona, Ticino, Switzerland",
      labelWhatsapp: "WHATSAPP SUPPORT",
      btnWhatsappChat: "Start Chat Now 🇨🇭",
      newsletterBadge: "DIGITAL BRIEFINGS",
      newsletterTitle: "Subscribe to our briefings",
      newsletterDesc: "Receive exclusive strategies for web development, sales psychology, and cyber safety directly in your inbox. No spam.",
      newsletterPlaceholder: "Your email address...",
      newsletterBtn: "Subscribe",
      newsletterSuccess: "Successfully subscribed!",
      newsletterSuccessDesc: "Thank you for your trust. You will receive a confirmation email shortly.",
      newsletterError: "Please enter a valid email address.",
      copyright: "© 2026 PixelForge.ch. All rights reserved.",
      subCopyright: "INNOVATIVE SWISS WEB DEVELOPMENT • CONCEIVED IN SWITZERLAND",
      timeLabel: "SWISS TIME:",
      sslLabel: "SSL ENCRYPTED SECURE",
      linkImpressum: "Impressum",
      linkPrivacy: "Privacy"
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialPath?: string }> = ({
  children,
  initialPath,
}) => {
  // Hydration-safe: the initial render must produce the exact same output on the
  // server (prerender) and on the client's first hydration pass. `initialPath` is
  // passed explicitly by entry-server.tsx (no `window` there); on the client it
  // falls back to `window.location.pathname`, read synchronously before first
  // render (not in an effect), so both sides derive the same starting language
  // from the same real URL -- no server/client markup mismatch.
  //
  // "/en" is a dedicated, crawlable English URL (see routeMeta.ts) and must
  // always start in English -- including for a returning visitor whose saved
  // preference is Italian, since landing there (e.g. from a search result for
  // the English page) should show English, not silently flip back. Every other
  // route keeps the prior behavior exactly: fixed "it" default, corrected after
  // mount by any saved preference.
  const path = initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const isEnglishRoute = path === "/en" || path.startsWith("/en/");
  const [language, setLanguage] = useState<Language>(isEnglishRoute ? "en" : "it");

  useEffect(() => {
    if (isEnglishRoute) return;
    try {
      const saved = localStorage.getItem("pixelforge_lang");
      if ((saved === "it" || saved === "en") && saved !== language) {
        setLanguage(saved as Language);
      }
    } catch {
      /* localStorage unavailable (private mode etc.) -- safe to ignore, default stands */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pixelforge_lang", language);
    } catch {
      /* localStorage unavailable -- safe to ignore */
    }
  }, [language]);

  const t = (key: string) => {
    const keys = key.split(".");
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to "it" if key is missing in the current language
        let fallback: any = translations["it"];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key; // return key itself as fallback
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
