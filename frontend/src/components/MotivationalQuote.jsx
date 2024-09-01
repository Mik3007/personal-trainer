import React, { useState, useEffect } from 'react';

const quotes = [
"Il successo è la somma di piccoli sforzi ripetuti giorno dopo giorno. – Robert Collier",
"Non smettere mai di cercare di migliorare. Il cambiamento inizia da dentro.",
"Ogni goccia di sudore è un passo verso il tuo obiettivo.",
"Non è la forza, ma la costanza dei risultati che fa la differenza. – Buddha",
"Non aspettare. Il tempo non sarà mai quello giusto. – Napoleon Hill",
"Il dolore che senti oggi sarà la forza che sentirai domani.",
"Ogni fallimento è solo un’opportunità per ricominciare con più intelligenza. – Henry Ford",
"Sii la migliore versione di te stesso.",
"La difficoltà maggiore è quella che sta nel cominciare. – Cesare Pavese",
"Il tuo corpo può sopportare quasi tutto. È la tua mente che devi convincere.",
"Il successo non è definitivo, il fallimento non è fatale: ciò che conta è il coraggio di continuare. – Winston Churchill",
"Trasforma i tuoi sogni in piani, i tuoi piani in azioni.",
"Non arrenderti mai, il difficile è solo una fase temporanea.",
"Il vero allenamento inizia quando vuoi smettere.",
"La forza non viene dal corpo. Viene dalla volontà. – Mahatma Gandhi",
"Ogni giorno è un'opportunità per migliorare te stesso.",
"Non contare i giorni, fai in modo che i giorni contino. – Muhammad Ali",
"La determinazione oggi porta al successo domani.",
"Il solo limite ai tuoi risultati è la tua immaginazione.",
"Il dolore è temporaneo, la soddisfazione è eterna.",
"Sii più forte delle tue scuse.",
"Il successo è un viaggio, non una destinazione.",
"Non fermarti quando sei stanco, fermati quando hai finito.",
"I risultati non arrivano con l’attesa, ma con l’azione.",
"Non c'è gloria senza sacrificio.",
"Ogni passo avanti è un passo verso il successo.",
"La qualità del tuo allenamento determina la qualità dei tuoi risultati.",
"La perseveranza non è una corsa lunga; è tante corse brevi, una dopo l’altra.",
"Allenarsi non è mai facile, ma ne vale sempre la pena.",
"Se non ti piace qualcosa, cambiala. Se non puoi cambiarla, cambia il tuo atteggiamento. – Maya Angelou",
"Chi smette di migliorarsi, smette di essere buono. – Oliver Cromwell",
"La fatica che senti oggi sarà la vittoria di domani.",
"Ogni ostacolo superato è una vittoria.",
"L'unica persona che devi superare sei tu stesso.",
"Non esistono limiti, solo ostacoli da superare.",
"L'energia e la perseveranza conquistano tutte le cose. – Benjamin Franklin",
"Non aspettare di avere il tempo; crea il tempo.",
"Il successo è l'abilità di passare da un fallimento all'altro senza perdere entusiasmo. – Winston Churchill",
"Allenati duro o vai a casa.",
"Il sudore è grasso che piange.",
"Se fosse facile, lo farebbero tutti.",
"Vivi la vita al massimo, ogni singolo giorno.",
"L'unico modo per fare un grande lavoro è amare quello che fai. – Steve Jobs",
"Il coraggio è resistere alla paura, dominare la paura, non l'assenza di paura. – Mark Twain",
"Un campione è qualcuno che si alza quando non può. – Jack Dempsey",
"La grandezza non è mai un caso, è sempre il risultato di un'intenzione alta, uno sforzo sincero e un'esecuzione intelligente. – Aristotle",
"L'unico posto dove il successo viene prima del lavoro è nel dizionario. – Vidal Sassoon",
"La felicità non è qualcosa di pronto. Viene dalle tue azioni. – Dalai Lama",
"Per avere qualcosa che non hai mai avuto, devi fare qualcosa che non hai mai fatto.",
"Non fermarti quando sei stanco, fermati quando hai finito.",
"Non conta quanto vai piano, l'importante è non fermarsi. – Confucio",
"La disciplina è il ponte tra gli obiettivi e i risultati. – Jim Rohn",
"È la mancanza di fede che fa temere di affrontare le sfide, e io credo in me stesso. – Muhammad Ali",
"Non smettere mai di credere in te stesso.",
"Non c'è nulla di impossibile per chi crede.",
"Più duro è il conflitto, più glorioso è il trionfo. – Thomas Paine",
"Il sacrificio di oggi è il successo di domani.",
"Non devi essere grande per iniziare, ma devi iniziare per essere grande. – Zig Ziglar",
"L'unico modo per fare un buon lavoro è amare quello che fai. – Steve Jobs",
"Allenarsi è la migliore terapia.",
"Raggiungi i tuoi limiti e poi superali.",
"La potenza è nulla senza controllo.",
"Ogni obiettivo raggiunto è un nuovo punto di partenza.",
"La grandezza è solo la punta dell'iceberg del duro lavoro.",
"Non contano le volte che cadi, ma le volte che ti rialzi. – Vince Lombardi",
"Non c'è vittoria senza sacrificio.",
"Non aspettare il momento perfetto, prendi il momento e rendilo perfetto.",
"Perdere non è il contrario di vincere, è parte del processo.",
"Il dolore è temporaneo, il rimpianto è per sempre.",
"La motivazione ti porta all’inizio, l'abitudine ti porta avanti.",
"Non si tratta di essere il migliore, ma di essere meglio di ieri.",
"La determinazione è la chiave del successo.",
"Impara ad amare il processo e il successo sarà inevitabile.",
"La vittoria ama la preparazione.",
"Essere forte è l'unica opzione.",
"Non ci sono scorciatoie per qualsiasi posto in cui valga la pena andare. – Beverly Sills",
"Ciò che non ti uccide ti rende più forte. – Friedrich Nietzsche",
"La grandezza è nata dalla volontà di superare le sfide.",
"Non importa quanto lentamente vai, finché non ti fermi. – Confucio",
"La vittoria non arriva mai per caso.",
"L'unica limitazione è la tua mente.",
"Se puoi sognarlo, puoi farlo. – Walt Disney",
"La fatica di oggi sarà la tua forza di domani.",
"Non c'è progresso senza lotta.",
"Il vero successo è alzarsi ogni volta che si cade.",
"Credi in te stesso e tutto sarà possibile.",
"La disciplina è l'arma dei campioni.",
"L'unica strada per il successo è il duro lavoro.",
"Non c'è vittoria senza battaglia.",
"Il corpo realizza ciò che la mente crede.",
];

const MotivationalQuote = () => {
    const [quote, setQuote] = useState('');
  
    useEffect(() => {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      setQuote(quotes[dayOfYear % quotes.length]);
    }, []);
  
    return (
      <div className="mt-4 md:mt-6 max-w-2xl mx-auto">
        <p className="italic text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center">"{quote}"</p>
      </div>
    );
  };

export default MotivationalQuote;