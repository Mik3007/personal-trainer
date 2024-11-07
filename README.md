# Personal Trainer App

Questa applicazione web full-stack è pensata per aiutare i personal trainer a gestire in modo efficiente i propri clienti, offrendo un'interfaccia intuitiva per la creazione e gestione delle schede di allenamento, il monitoraggio dei progressi e l'analisi delle performance attraverso strumenti avanzati come l'analisi BIA. Un'ottima soluzione per chi vuole ottimizzare il proprio lavoro e seguire i clienti in modo digitale.

## Tecnologie Utilizzate

### Backend
- Node.js (ambiente di esecuzione JavaScript lato server)
- Express.js (framework per la creazione di API RESTful)
- MongoDB (database NoSQL per la memorizzazione dei dati)

### Frontend
- React (libreria per la costruzione dell'interfaccia utente)
- Vite (strumento di build per un'esperienza di sviluppo più veloce)
- JavaScript (linguaggio di programmazione principale)
- Tailwind CSS (framework CSS per lo styling rapido e responsivo)
- Framer Motion (libreria per animazioni fluide e interattive)
- Recharts (libreria per la creazione di grafici, utilizzata per i confronti BIA)
- Axios (libreria per effettuare chiamate HTTP al backend)

## Funzionalità Principali

1. **Home Page**:
   - Descrizione dei servizi disponibili in 3 card
   - Tasto "Contatta" con link diretto a WhatsApp
   - Link alla pagina Instagram del personal trainer

2. **Autenticazione**:
   - Sistema di login e registrazione
   - Accesso differenziato per admin e utenti standard
   - Utilizzo di JWT (JSON Web Tokens) per l'autenticazione sicura
   - Hashing delle password con bcrypt per una maggiore sicurezza

3. **Dashboard Admin**:
   - Visualizzazione di tutti gli utenti registrati
   - Gestione degli utenti (modifica, cancellazione, visualizzazione profili)
   - Creazione e modifica di schede di allenamento personalizzate
   - Aggiunta di nuovi esercizi al database

4. **Profilo Utente**:
   - Frase motivazionale giornaliera
   - Visualizzazione della scheda di allenamento personale
   - Inserimento e confronto dei valori BIA

## Struttura del Progetto

Personal-trainer/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── exercises/
│   │   └── esercizi.json
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Bia.js
│   │   ├── User.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── biaRoutes.js
│   │   ├── exerciseRoutes.js
│   │   ├── userRoutes.js
│   │   └── workoutRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── images/
    ├── src/
    │   ├── components/
    │   │   ├── BIAChart.jsx
    │   │   ├── BIAManager.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ExerciseCreator.jsx
    │   │   ├── MotivationalQuote.jsx
    │   │   ├── NavHero.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ServiceCards.jsx
    │   │   ├── WorkoutPlanCreator.jsx
    │   │   └── WorkoutPlanViewer.jsx
    │   ├── pages/
    │   │   ├── CreateWorkout.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Register.jsx
    │   │   └── UserManagement.jsx
    │   ├── services/
    │   │   └── api.jsx
    │   ├── utils/
    │   │   └── axiosConfig.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── package.json
    └── vite.config.js

## Installazione

1. Clona il repository: git clone https://github.com/Mik3007/personal-trainer.gitCopy

2. Installa le dipendenze del backend: cd personal-trainer/backend - npm install

3. Installa le dipendenze del frontend:cd ../frontend - npm install

4. Configura le variabili d'ambiente:
- Nel backend, crea un file `.env` e configura le variabili necessarie (es. MONGODB_URI, JWT_SECRET, ecc.)
- Nel frontend, se necessario, crea un file `.env.local` per le variabili d'ambiente del client

## Avvio dell'Applicazione

1. Avvia il backend: cd backend - node server.js

2. In un nuovo terminale, avvia il frontend: cd frontend - npm run dev

3. Apri un browser e vai all'indirizzo indicato nel terminale del frontend (solitamente `http://localhost:5173`)

## Deployment

- Il backend è deployato su [Render](https://render.com)
- Il frontend è deployato su [Vercel](https://vercel.com)
- Link al sito deployato: [https://francescorauccipt.vercel.app](https://francescorauccipt.vercel.app)

## Conclusione

Ed ecco qua! Questa è l'app che ho creato per il mio amico personal trainer. L'idea era di dargli uno strumento pratico per gestire i suoi clienti e i loro allenamenti senza impazzire con fogli Excel o app troppo complicate.

Ho cercato di mettere insieme un po' di tecnologie moderne per renderla veloce e facile da usare, sia per lui che per i suoi clienti. Ci sono sicuramente ancora cose da migliorare e idee da aggiungere, quindi se hai suggerimenti o trovi qualche bug, fammelo sapere!

Se sei curioso di saperne di più o vuoi dare un'occhiata al codice, sentiti libero di esplorare il repository. E se sei un developer e vuoi contribuire, sei il benvenuto!

Grazie per aver dato un'occhiata al progetto. Spero che possa essere utile anche ad altri personal trainer là fuori!

## Contatti

Michele Altieri - [michelealtieri3007@gmail.com](mailto:michelealtieri3007@gmail.com)

Link al progetto: [https://github.com/Mik3007/personal-trainer](https://github.com/Mik3007/personal-trainer)

