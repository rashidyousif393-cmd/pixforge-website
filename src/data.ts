import { Service, Project, PricingPlan, Testimonial } from "./types";

export const SERVICES: Service[] = [
  {
    id: "siti-web",
    title: "Professionelle Websites",
    description: "Komplette, elegante und massgeschneiderte Websites, die die Exzellenz Ihrer Marke widerspiegeln und Ihre Besucher zu Kunden machen.",
    iconName: "Globe",
    benefits: ["Exklusives & individuelles Design", "Perfekt optimiert für Mobilgeräte", "Einfachstes Administrations-Panel", "Sicher & konform mit dem Schweizer DSG"]
  },
  {
    id: "landing-pages",
    title: "Hochkonvertierende Landingpages",
    description: "Werbeseiten, die mit einem einzigen Ziel entwickelt wurden: Besucher in heisse Kontakte und wertvolle Termine für Ihr Unternehmen zu verwandeln.",
    iconName: "Target",
    benefits: ["Überzeugende Verkaufspsychologie", "Optimierte Kontaktformulare", "Perfekt für Google/Social-Kampagnen", "Professionelles Copywriting inklusive"]
  },
  {
    id: "seo-base",
    title: "Lokales SEO für Google",
    description: "Lassen Sie sich gezielt von Kunden finden, die in Ihrer Region und in der ganzen Schweiz aktiv nach Ihren Dienstleistungen suchen.",
    iconName: "Search",
    benefits: ["Lokale Keyword-Recherche", "Optimierung des Google Business Profils", "SEO-freundliche technische Struktur", "Garantierte Indexierung bei Google"]
  },
  {
    id: "mobile-first",
    title: "Responsive Mobile-Design",
    description: "Über 80% der lokalen Suchanfragen erfolgen per Smartphone. Ihre Website wird auf jedem Bildschirm extrem schnell und intuitiv bedienbar sein.",
    iconName: "Smartphone",
    benefits: ["Flüssiges Touch-Erlebnis", "Einhändige Schnellnavigation", "Sofortiges Laden im 4G/5G-Netz", "Schnellaktionstasten (Anrufen/Karte)"]
  },
  {
    id: "restyling",
    title: "Website-Relaunch & Restyling",
    description: "Verwandeln Sie eine veraltete oder langsame Website in ein modernes, schnelles und elegantes Werkzeug, das höchsten Schweizer Ansprüchen genügt.",
    iconName: "RefreshCw",
    benefits: ["Kritische Analyse der alten Struktur", "Moderne Aufbereitung der Inhalte", "Drastische Steigerung der Conversions", "Bis zu 3x schnellere Ladezeit"]
  },
  {
    id: "integrazioni",
    title: "WhatsApp- & Maps-Integration",
    description: "Ermöglichen Sie Kunden, Ihnen mit einem Klick zu schreiben oder Ihren physischen Standort dank Google Maps in Sekundenschnelle zu finden.",
    iconName: "MapPin",
    benefits: ["Schwebender WhatsApp-Button", "Interaktive, angepasste Karten", "Synchronisation der Öffnungszeiten", "Direktlinks zu Navigations-Apps (Apple/Google)"]
  },
  {
    id: "moduli",
    title: "Formulare & Buchungssysteme",
    description: "Beseitigen Sie Barrieren. Ermöglichen Sie Ihren Kunden, Angebote, Termine oder Tische direkt und mühelos online anzufragen.",
    iconName: "Mail",
    benefits: ["Intuitive, benutzerdefinierte Felder", "Sofort-Benachrichtigung per E-Mail/SMS", "Integration mit Kalendern", "DSG-konforme Datenspeicherung"]
  },
  {
    id: "velocita",
    title: "Geschwindigkeits-Optimierung",
    description: "Eine langsame Website verliert 50% der Nutzer vor dem Laden. Wir entwickeln mit sauberem Code für Rekord-Ladezeiten.",
    iconName: "Zap",
    benefits: ["Ultraleichter und moderner Code", "Bildkomprimierung der neuesten Generation", "Grüner Score (95+) bei Google PageSpeed", "Schnelles & sicheres Schweizer Hosting"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "beauty",
    title: "Aura Kosmetik & Wellness",
    category: "Schönheitssalon",
    description: "Eine minimalistische, entspannende und elegante Website für ein erstklassiges Kosmetikstudio in Lugano, fokussiert auf die Online-Buchung von Behandlungen.",
    location: "Lugano, Tessin",
    features: ["Online-Behandlung buchen", "Interaktive Preisliste", "HD-Fotogalerie", "Google-Bewertungen-Integration"],
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Der Salon hatte keine professionelle Online-Präsenz. Kunden fanden kaum Informationen bei Google, was die Gewinnung neuer Buchungen erschwerte.",
    solution: "PixelForge erstellte eine elegante, schnelle und mobil optimierte Website mit Dienstleistungen, Galerie, Kontakten und schwebendem WhatsApp-Button.",
    result: "Höheres Kundenvertrauen, +40% mehr Online-Buchungen und eine erstklassige digitale Präsenz im Premium-Markt von Lugano.",
    mockupContent: {
      heroTitle: "Ihr Tempel für Schönheit und Entspannung in Lugano",
      heroSubtitle: "Individuelle Gesichtsbehandlungen, Massagen und Körperpflege, um Ihre natürliche Harmonie wiederzufinden.",
      colors: {
        primary: "#d4af37", // gold
        secondary: "#faf6f0", // soft cream
        bg: "#0d0d0e",
        text: "#e4e4e7"
      },
      sections: [
        {
          title: "Unsere Behandlungen",
          content: "Regenerierende Massagen (60 Min.) — CHF 120\nAnti-Aging-Gesichtsbehandlung — CHF 140\nPremium Maniküre & Pediküre — CHF 80"
        },
        {
          title: "Warum wir?",
          content: "Wir verwenden ausschliesslich zertifizierte Bio-Produkte. Ein exklusives und diskretes Ambiente im Herzen von Lugano."
        }
      ],
      ctaText: "Behandlung buchen"
    }
  },
  {
    id: "dental",
    title: "Zahnarztpraxis San Gottardo",
    category: "Zahnklinik",
    description: "Vertrauenerweckende und informative Website für eine hochmoderne Zahnklinik in Locarno. Fokus auf Vertrauen und unkomplizierte Kontaktaufnahme.",
    location: "Locarno, Tessin",
    features: ["Ersttermin online anfragen", "Vorstellung des Ärzteteams", "24h-Notfall-Integration", "Ausführliche FAQ-Sektion"],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Patienten hatten Schwierigkeiten, die Praxis online zu finden. Das Fehlen eines Kontaktformulars zwang die Rezeption, Dutzende sich wiederholende Anrufe zu bearbeiten.",
    solution: "PixelForge entwickelte eine vertrauenerweckende, moderne Website mit einem Online-Formular für Ersttermine, Teamvorstellung und klaren Wegbeschreibungen.",
    result: "30% Entlastung der Rezeption bei Telefonaten, Anstieg neuer Patienten und ein absolut vertrauenswürdiges, professionelles Image.",
    mockupContent: {
      heroTitle: "Das Lächeln, das Sie verdienen – von Experten gepflegt",
      heroSubtitle: "Modernste Zahntechnik kombiniert mit einem menschlichen und schmerzfreien Ansatz in Locarno.",
      colors: {
        primary: "#00d2ff", // electric cyan
        secondary: "#101b2b", // medical dark blue
        bg: "#090d16",
        text: "#f1f5f9"
      },
      sections: [
        {
          title: "Spezialisierungen",
          content: "• Computergestützte Implantologie\n• Unsichtbare Kieferorthopädie (Aligner)\n• Professionelle Zahnreinigung & Bleaching"
        },
        {
          title: "Zahnärztliche Notfälle",
          content: "Wir bieten einen schnellen Bereitschaftsdienst für akute Schmerzen oder Traumata. Rufen Sie uns für einen dringenden Termin sofort an."
        }
      ],
      ctaText: "Termin vereinbaren"
    }
  },
  {
    id: "restaurant",
    title: "Grotto della Valle",
    category: "Restaurant & Osteria",
    description: "Herzliche digitale Präsenz für ein traditionelles Grotto in Bellinzona. Interaktive digitale Speisekarte und Tischreservierung.",
    location: "Bellinzona, Tessin",
    features: ["Dynamische digitale Speisekarte", "Sofortige Tischreservierung", "Instagram-Feed-Integration", "Schnelle Anfahrtsbeschreibung"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Der Google Maps Eintrag war leer, es gab keine für Handys lesbare Speisekarte online, und Kunden wanderten zu Konkurrenten mit moderneren Websites ab.",
    solution: "Ultraschnelle Website mit stets aktueller digitaler Speisekarte, sofortigem Tischreservierungsmodul und professionellen Fotos des Lokals.",
    result: "Wochenenden durchgehend ausgebucht, einfache Menükonsultation auf dem Smartphone und verdreifachte positive Bewertungen dank QR-Codes auf den Tischen.",
    mockupContent: {
      heroTitle: "Authentische Aromen der Tessiner Tradition",
      heroSubtitle: "Kamin-Polenta, hausgemachter Aufschnitt und Alpkäse, begleitet von den besten Merlot-Weinen der Region.",
      colors: {
        primary: "#ff6b35", // warm terracotta
        secondary: "#1c120c", // dark wood
        bg: "#0d0907",
        text: "#fbf8f5"
      },
      sections: [
        {
          title: "Unsere Spezialitäten",
          content: "• Taragna-Polenta mit Hirschgulasch — CHF 26\n• Risotto mit Merlot und Steinpilzen — CHF 24\n• Käseplatte aus unseren Tälern — CHF 18"
        },
        {
          title: "Öffnungszeiten",
          content: "Mittwoch - Sonntag: 11:30 - 14:30 | 18:30 - 23:00\nMontag und Dienstag: Geschlossen"
        }
      ],
      ctaText: "Tisch reservieren"
    }
  },
  {
    id: "hotel",
    title: "Chalet Splendide Resort",
    category: "Hotel & Resort",
    description: "Luxuriöse und evocative Landingpage für ein exklusives Boutique-Berg-Hotel in Graubünden. Höchste visuelle Wirkung.",
    location: "St. Moritz, Schweiz",
    features: ["Booking-Engine-Integration", "Virtueller Rundgang der SPA", "Exklusive saisonale Pakete", "Interaktive Mehrsprachigkeit"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Buchungen erfolgten fast ausschliesslich über Drittanbieter-Portale (Booking), was zu sehr hohen Provisionen führte und den direkten Kundenkontakt verhinderte.",
    solution: "Entwicklung einer hochkarätigen Landingpage mit maximaler visueller Wirkung, direkter Anbindung an das Buchungssystem und virtuellem Spa-Rundgang.",
    result: "35% Steigerung der Direktbuchungen über die eigene Website, Einsparung tausender Franken an Provisionen und Festigung der Luxus-Positionierung.",
    mockupContent: {
      heroTitle: "Erstklassiges Erlebnis inmitten der Alpengipfel",
      heroSubtitle: "Ein Zufluchtsort für Luxus, Wellness und Sternegastronomie, umgeben von der majestätischen Pracht der Schweizer Alpen.",
      colors: {
        primary: "#e5c158", // luxury warm gold
        secondary: "#121814", // deep green slate
        bg: "#080b09",
        text: "#f3f5f4"
      },
      sections: [
        {
          title: "Das alpine Erlebnis",
          content: "Suiten mit Panoramablick auf die Gipfel, beheizter Aussenpool mit Whirlpool und ein mit 1 Michelin-Stern ausgezeichnetes Restaurant."
        },
        {
          title: "Boutique Alpine SPA",
          content: "Exklusive Wellnessbehandlungen mit Bergkräutern und personalisierte Entspannungsprogramme für absolutes Wohlbefinden."
        }
      ],
      ctaText: "Verfügbarkeit prüfen"
    }
  },
  {
    id: "construction",
    title: "Edilizia Alpina SA",
    category: "Bauunternehmen",
    description: "Solide, geometrische und moderne Website für ein Bauunternehmen im Mendrisiotto. Viel Raum für abgeschlossene Projekte und Services.",
    location: "Mendrisio, Tessin",
    features: ["Projekt-Portfolio mit Filtern", "Anfrage für Vor-Ort-Termine", "Schweizer Qualitätszertifikate", "Karriere-Bereich (Jobs)"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Potenzielle Kunden konnten bisherige Bauprojekte des Unternehmens nicht online einsehen, und es gab keinen professionellen Kanal für Offertenanfragen.",
    solution: "Solide und geometrische Corporate-Website mit einem umfangreichen, filterbaren Projekt-Portfolio, Offertenformular und Schweizer Zertifikaten.",
    result: "Offertenanfragen um 50% gestiegen, makellose Unternehmenspräsentation für öffentliche und private Ausschreibungen und gestärkte Markenidentität.",
    mockupContent: {
      heroTitle: "Wir bauen die Zukunft der italienischen Schweiz",
      heroSubtitle: "Schlüsselfertige Renovierungen, neue Wohn- und Industriebauten mit Schweizer Präzision.",
      colors: {
        primary: "#dfb51c", // golden yellow
        secondary: "#18181b", // zinc-900
        bg: "#09090b",
        text: "#f4f4f5"
      },
      sections: [
        {
          title: "Unsere Baudienstleistungen",
          content: "• Renovierungen und energetische Sanierungen\n• Ökologische Wohnbauten (Minergie)\n• Betonarbeiten und Tiefbau"
        },
        {
          title: "Präzision und Garantien",
          content: "Millimetergenaue Einhaltung der Lieferfristen, maximale Kostentransparenz und mehrjährige Garantie auf jedes Bauwerk."
        }
      ],
      ctaText: "Kostenlose Offerte anfordern"
    }
  },
  {
    id: "medical",
    title: "Medizinisches Zentrum San Rocco",
    category: "Fachärzte-Zentrum",
    description: "Sichere, professionelle und barrierefreie Website für ein multidisziplinäres medizinisches Zentrum in Chiasso. Klare Benutzeroberfläche.",
    location: "Chiasso, Tessin",
    features: ["Übersicht der Fachbereiche", "Online-Terminanfrage", "Geschützte Patienten-Infos", "Krankenkassen-Integration"],
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Es fehlten klare Informationen über die angebotenen medizinischen Fachbereiche, und Patienten hatten Schwierigkeiten, die Praxis in Bahnhofsnähe zu finden.",
    solution: "Für alle zugängliche Benutzeroberfläche mit interaktiver Karte inklusive ÖV-Anbindungen, Auflistung aller Fachbereiche und schnellen Kontaktmöglichkeiten.",
    result: "Einfacher Zugang zu Gesundheitsinformationen, exponentielles Wachstum neuer Patienten aus der Region und vollständige Schweizer DSG-Konformität.",
    mockupContent: {
      heroTitle: "Ihre Gesundheit in guten Händen, ganz in Ihrer Nähe",
      heroSubtitle: "Fachärzte, modernste Therapien und schnelle Diagnostik im Zentrum von Chiasso.",
      colors: {
        primary: "#3b82f6", // clinical blue
        secondary: "#0f172a", // dark slate
        bg: "#030712",
        text: "#f9fafb"
      },
      sections: [
        {
          title: "Fachbereiche",
          content: "• Allgemeinmedizin & Hausarztmodell\n• Kardiologie & Gefässdiagnostik\n• Physiotherapie & Rehabilitation"
        },
        {
          title: "So finden Sie uns",
          content: "Wir sind nur 2 Gehminuten vom Bahnhof Chiasso entfernt. Kundenparkplätze direkt vor der Klinik vorhanden."
        }
      ],
      ctaText: "Zentrum kontaktieren"
    }
  },
  {
    id: "realestate",
    title: "Vesta Luxury Real Estate",
    category: "Immobiliare di Lusso",
    description: "Ein hochperformantes Immobilienportal für exklusive Residenzen im Tessin, optimiert für ultraschnelle Ladezeiten.",
    location: "Lugano, Tessin",
    features: ["Erweiterte Filter für Immobilien", "Direkte Buchung von Besichtigungen", "Interaktive 4K-Galerie", "Integrierter Hypothekenrechner"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Kunden hatten Mühe, hochauflösende Bilder von Luxusimmobilien auf Mobiltelefonen zu laden, was zu schnellen Absprüngen führte.",
    solution: "PixelForge optimierte alle Bilder mit modernem Lazy-Loading und Formaten der nächsten Generation, um maximale Geschwindigkeit und Qualität zu garantieren.",
    result: "Verdreifachung der Verweildauer auf der Seite und eine Steigerung der Online-Besichtigungsanfragen um 50%.",
    mockupContent: {
      heroTitle: "Exklusive Residenzen in den besten Lagen des Tessins",
      heroSubtitle: "Eine feine Auswahl an modernen Villen und historischen Anwesen mit Panoramablick auf den Luganersee.",
      colors: {
        primary: "#c5a880", // champagne gold
        secondary: "#141416", // slate/black
        bg: "#0b0b0c",
        text: "#e4e4e7"
      },
      sections: [
        {
          title: "Unsere Objekte",
          content: "Villa Castagnola mit Seeblick — Preis auf Anfrage\nModernes Penthouse in Paradiso — CHF 3'800'000\nHistorische Residenz in Morcote — CHF 5'200'000"
        },
        {
          title: "Exklusive Services",
          content: "Kostenlose Schätzungen, Rechts- und Steuerberatung in der Schweiz für internationale Käufer."
        }
      ],
      ctaText: "Exklusiven Katalog anfordern"
    }
  },
  {
    id: "fitness",
    title: "Apex Strength & Conditioning",
    category: "Palestra & Fitness",
    description: "Ein dynamisches und fesselndes Portal für ein High-End-Fitnessstudio in Bellinzona, optimiert für direkte Buchungen.",
    location: "Bellinzona, Tessin",
    features: ["Echtzeit-Kursbuchung", "Online-Abonnements mit Stripe", "Interaktive Trainingspläne", "Direktkontakt mit Personal Trainers"],
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Kunden mussten anrufen oder E-Mails schreiben, um eine Trainingsstunde zu reservieren, was zu administrativen Engpässen führte.",
    solution: "Ein extrem schnelles Portal mit integriertem Buchungssystem und unkomplizierter Abo-Abwicklung direkt vom Smartphone.",
    result: "Ausgebuchte Kurse zu 100%, erhebliche Entlastung des Empfangs und begeisterte Feedbacks von den Trainierenden.",
    mockupContent: {
      heroTitle: "Bringen Sie Ihr Training auf das nächste Level",
      heroSubtitle: "Funktionelles Training, Gruppenkurse und individuelle Ernährungsberatung im Herzen von Bellinzona.",
      colors: {
        primary: "#ff3e3e", // neon red
        secondary: "#121214", // dark grey
        bg: "#08080a",
        text: "#f4f4f5"
      },
      sections: [
        {
          title: "Unsere Abos",
          content: "Monatsabo Open — CHF 90 / Monat\nAll-Inclusive Jahresabo — CHF 850 / Jahr\n10er-Karte Gruppenkurse — CHF 180"
        },
        {
          title: "Warum Apex?",
          content: "Qualifizierte Trainer mit eidgenössischem Fachausweis, modernste Geräte und ein sauberes, erstklassiges Umfeld."
        }
      ],
      ctaText: "Kostenloses Probetraining"
    }
  },
  {
    id: "winery",
    title: "Tenuta dell'Oro",
    category: "Cantina Vinicola",
    description: "Una splendida vetrina digitale ed e-commerce per una storica cantina vinicola e vigneto nel Mendrisiotto, focalizzata sulle degustazioni e sulle vendite di vini premium.",
    location: "Mendrisio, Svizzera",
    features: ["E-commerce integrato", "Prenotazione degustazioni online", "Presentazione vini DOC", "Storytelling interattivo"],
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "I clienti internazionali e i ristoratori locali non potevano ordinare i vini online, e il sistema di prenotazione per le visite guidate in vigneto era lento e cartaceo.",
    solution: "Sviluppo di una piattaforma e-commerce fluida, veloce e d'elite, con prenotazione istantanea delle degustazioni e una presentazione affascinante della cantina.",
    result: "+65% di ordini diretti online e prenotazioni per degustazioni sature fino a 3 mesi di anticipo.",
    mockupContent: {
      heroTitle: "L'Arte del Merlot nel cuore del Ticino",
      heroSubtitle: "Vini d'eccellenza nati da vigneti storici coltivati con passione e rispetto del territorio.",
      colors: {
        primary: "#722f37", // wine color
        secondary: "#1c1415", // warm dark brown/black
        bg: "#0d090a",
        text: "#faf0f1"
      },
      sections: [
        {
          title: "Le Degustazioni",
          content: "Degustazione Classic (4 vini + tagliere) — CHF 45\nEsperienza Gran Riserva (vini barricati + tour) — CHF 85"
        },
        {
          title: "La Filosofia",
          content: "Coltivazione a basso impatto ambientale, vendemmia manuale e affinamento in pregiate botti di rovere svizzero."
        }
      ],
      ctaText: "Prenota degustazione"
    }
  },
  {
    id: "architect",
    title: "Arch Studio Spazio",
    category: "Studio di Architettura",
    description: "Un portfolio ad alto impatto visivo e minimalista per uno rinomato studio di architettura e design d'interni a Lugano. Prestazioni eccezionali con caricamento 4K.",
    location: "Lugano, Ticino",
    features: ["Interactive project grid", "Immagini 4K ottimizzate", "Case-studies di design", "Modulo consulenza 3D"],
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Il sito precedente non valorizzava i progetti pluripremiati a causa di layout rigidi e lunghi tempi di attesa per il caricamento delle foto dei rendering.",
    solution: "Un sito web geometrico, fluido e ultra-moderno con gallerie d'arte interattive, caricamento differito ultrarapido e navigazione orizzontale immersiva.",
    result: "Significativo aumento di contatti da parte di clienti di alto profilo e visibilità internazionale consolidata nell'architettura d'élite.",
    mockupContent: {
      heroTitle: "Spazi Moderni che Ispirano la Vita",
      heroSubtitle: "Progettazione architettonica e interior design d'eccellenza con rigore geometrico ed eleganza svizzera.",
      colors: {
        primary: "#a8a29e", // stone gray
        secondary: "rgba(28, 25, 23, 0.7)", // warm dark stone
        bg: "#0c0a09",
        text: "#f5f5f4"
      },
      sections: [
        {
          title: "Progetti Chiave",
          content: "Villa Gialla (Collina d'Oro) — Residenza Minimalista\nPenthouse M (Paradiso) — Interior Design Premium\nSede Direzionale (Lugano) — Architettura Sostenibile"
        },
        {
          title: "Il Nostro Approccio",
          content: "Sostenibilità energetica Minergie-P, materiali biologici locali e integrazione armoniosa con il paesaggio alpino."
        }
      ],
      ctaText: "Richiedi una consulenza"
    }
  },
  {
    id: "lawfirm",
    title: "Studio Legale Gottardo",
    category: "Studio Legale & Associati",
    description: "Una presenza web autorevole, riservata ed estremamente elegante per un rinomato studio legale a Lugano. Interfaccia sobria incentrata sulla fiducia.",
    location: "Lugano, Svizzera",
    features: ["Profili dettagliati avvocati", "Prenotazione consulenze legali", "Integrazione contenuti normativi", "Conformità di sicurezza crittografata"],
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "Il sito precedente sembrava obsoleto e non trasmetteva l'eccellenza e la discrezione necessarie per attrarre clienti aziendali ticinesi ed esteri.",
    solution: "Creazione di un portale di alta classe con una navigazione fluida, biografie dettagliate del team di partner e un modulo di contatto sicuro e protetto.",
    result: "Rafforzamento della reputazione aziendale e un aumento del 45% dei contatti qualificati da parte di PMI ticinesi.",
    mockupContent: {
      heroTitle: "Esperienza Legale al Servizio del Vostro Successo",
      heroSubtitle: "Consulenza e patrocinio legale per aziende e clienti privati con rigore svizzero e massima riservatezza.",
      colors: {
        primary: "#c5a880", // platinum gold
        secondary: "#12171f", // deep navy dark
        bg: "#070b11",
        text: "#f8fafc"
      },
      sections: [
        {
          title: "Aree di Pratica",
          content: "• Diritto Societario & Commerciale\n• Consulenza Fiscale & Pianificazione Patrimoniale\n• Contenzioso & Arbitrati Internazionali"
        },
        {
          title: "I Nostri Valori",
          content: "Integrità assoluta, eccellenza professionale e vicinanza alle esigenze strategiche di ogni singolo cliente."
        }
      ],
      ctaText: "Contatta lo studio"
    }
  },
  {
    id: "consulting",
    title: "Swiss Alpine Consulting",
    category: "Consulenza Aziendale",
    description: "Piattaforma corporate di altissimo livello per una società di consulenza finanziaria e strategica internazionale operante tra Zug e Lugano.",
    location: "Zug, Svizzera",
    features: ["Metriche e KPI interattivi", "Richiesta audit aziendale", "Resource library per CEO", "Integrazione multi-lingua automatica"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=webp&auto=format&fit=crop&w=800&q=60",
    problem: "La mancanza di un posizionamento digitale autorevole rallentava l'acquisizione di nuovi clienti istituzionali in cerca di partner di consulenza affidabili.",
    solution: "Sviluppo di un sito corporate di impatto internazionale con bento layout, grafici interattivi e un sistema di candidatura audit aziendale.",
    result: "Incremento del 55% delle richieste di partnership strategiche ed espansione del brand a livello svizzero.",
    mockupContent: {
      heroTitle: "Pianificazione Strategica Svizzera per Leader Globali",
      heroSubtitle: "Guidiamo la crescita, l'efficienza operativa e la transizione digitale della vostra impresa con soluzioni su misura.",
      colors: {
        primary: "#10b981", // emerald neon green
        secondary: "#18181b", // dark slate
        bg: "#09090b",
        text: "#f4f4f5"
      },
      sections: [
        {
          title: "I Nostri Servizi",
          content: "• Fusioni & Acquisizioni (M&A)\n• Riorganizzazione Strategica & Operational Excellence\n• Advisory per la Quotazione in Borsa (IPO)"
        },
        {
          title: "Perché Swiss Alpine",
          content: "Più di 20 anni di esperienza con imprese leader di mercato, uniti a una profonda conoscenza dell'ecosistema svizzero e internazionale."
        }
      ],
      ctaText: "Richiedi un Audit gratuito"
    }
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "900",
    period: "Website",
    description: "Perfekt für Handwerker und kleine Betriebe, die in Rekordzeit eine elegante, professionelle Online-Präsenz wünschen.",
    features: [
      "Professionelle Landingpage (1 Seite)",
      "Exklusives & responsives Design (Mobile-First)",
      "Ladegeschwindigkeits-Optimierung",
      "WhatsApp- & Google Maps-Integration",
      "Standard-Kontaktformular",
      "SEO-Grundlagen und Google-Indexierung",
      "Bis zu 3 Korrekturschleifen inklusive"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: "1'500",
    period: "Website",
    description: "Die ideale Wahl für lokale Unternehmen und Dienstleister, die ihre Services umfassend und überzeugend präsentieren wollen.",
    features: [
      "Komplette Website mit bis zu 5 Seiten",
      "Individuelles High-End-Design",
      "Detaillierte Vorstellung von Services & Team",
      "Interaktive Projektgalerie / Referenz-Portfolio",
      "Tiefgehende lokale SEO-Optimierung",
      "Google-Bewertungen-Integration",
      "Einfaches Administrations-Panel für eigene Texte",
      "Bis zu 5 Korrekturschleifen inklusive",
      "30 Tage technischer Support nach dem Launch"
    ],
    isPopular: true
  },
  {
    id: "premium",
    name: "Premium Custom",
    price: "2'100",
    period: "Website",
    description: "Kompromissloses High-End-Design für Marken und Unternehmen, die sich mit einem preisverdächtigen Auftritt am Markt behaupten wollen.",
    features: [
      "Unbegrenzte Seitenanzahl mit Massdesign",
      "Flüssige High-End-Animationen (Apple/Awwwards-Stil)",
      "Online-Buchungssystem oder interaktive Preislisten",
      "Individueller Konfigurator oder Angebotsrechner",
      "Erweiterte SEO-Strategie mit Wettbewerbsanalyse",
      "Mehrsprachigkeit integriert (Deutsch + It/Fr/En)",
      "Persönliche Schulung für das Administrations-Panel",
      "Unbegrenzte Korrekturschleifen",
      "90 Tage Prioritätssupport und Wartung"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Elena Bianchi",
    role: "Inhaberin",
    company: "Aura Kosmetik Lugano",
    text: "Vor PixelForge hatten wir keine Website, sondern erhielten nur unregelmässige Anrufe. Jetzt, mit der integrierten Online-Buchung und der Sichtbarkeit bei Google, ist unser Umsatz in nur drei Monaten um 40% gestiegen! Die Kunden lieben es, wie flüssig die Website auf dem Handy läuft.",
    rating: 5
  },
  {
    id: "2",
    author: "Dr. Marco Galli",
    role: "Ärztlicher Leiter",
    company: "Zahnarztpraxis Locarno",
    text: "Wir suchten eine Agentur, die versteht, wie wichtig Zuverlässigkeit ist. PixelForge hat eine fantastische, moderne und sichere Plattform geschaffen. Viele neue Patienten finden uns über Google und fragen direkt Ersttermine an. Schweizer Präzision durch und durch.",
    rating: 5
  },
  {
    id: "3",
    author: "Giovanni Rossi",
    role: "Inhaber",
    company: "Grotto della Valle Bellinzona",
    text: "Unser Google-Eintrag war verwaist und wir hatten keine Speisekarte online. PixelForge hat eine wunderbare Website mit digitaler Speisekarte und Tischreservierung erstellt. Seither sind wir an den Wochenenden durchgehend ausgebucht!",
    rating: 5
  }
];
