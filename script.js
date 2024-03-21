let currentQuestionIndex = 0;
let lives = 5; // Liczba żyć
let score = 0; // Liczba punktów

let wrongAnswers = 0; // Liczba błędnych odpowiedzi
const questions = [
  { question: "Co oznacza 'brazo' po polsku?", answers: ["Noga", "Ręka", "Ucho", "Oko"], correct: 1 },
  { question: "Jak po hiszpańsku powiemy 'stopa'?", answers: ["El pie", "La mano", "El codo", "La cabeza"], correct: 0 },
  { question: "Jakiego słowa użyjemy mówiąc po hiszpańsku 'przyjaciel'?", answers: ["Amiga", "Amigo", "Chico", "Chica"], correct: 1 },
  { question: "Jak przetłumaczymy 'relajarse'?", answers: ["Zrelaksować się", "Wysilać się", "Podnieść się", "Biegać"], correct: 0 },
  { question: "Jak powiemy 'kłamać' po hiszpańsku?", answers: ["Decir", "Hablar", "Mentir", "Escribir"], correct: 2 },
  { question: "Co znaczy 'divertirse'?", answers: ["Zmęczyć się", "Cieszyć się", "Uczyć się", "Denerwować się"], correct: 1 },
  { question: "Co oznacza 'serio'?", answers: ["Śmieszny", "Wesoły", "Poważny", "Zmartwiony"], correct: 2 },
  { question: "Co znaczy hiszpańskie słowo 'cabeza'?", answers: ["Ramię", "Kolano", "Głowa", "Pięta"], correct: 2 },
  { question: "Jak po hiszpańsku jest 'palec'?", answers: ["El dedo", "La boca", "El brazo", "La pierna"], correct: 0 },
  { question: "Jak przetłumaczymy 'dormir la siesta'?", answers: ["Iść spać", "Położyć się", "Zdrzemnąć się", "Odpoczywać"], correct: 2 },
  { question: "Co oznacza 'comer'?", answers: ["Biegać", "Śpiewać", "Jeść", "Pisać"], correct: 2 },
  { question: "Jak hiszpańskie 'estar de buen humor' przetłumaczymy na polski?", answers: ["Być w złym humorze", "Być w dobrym nastroju", "Być smutnym", "Być zdenerwowanym"], correct: 1 },
  { question: "Jakiego wyrażenia użyjemy mówiąc 'podróżować' po hiszpańsku?", answers: ["Viajar", "Dormir", "Comer", "Descansar"], correct: 0 },
  { question: "Jak powiemy 'ryba' po hiszpańsku?", answers: ["El pez", "El pollo", "La vaca", "El cerdo"], correct: 0 },
  { question: "Co znaczy 'cansado'?", answers: ["Głodny", "Spragniony", "Zmęczony", "Chory"], correct: 2 },
  { question: "Jak przetłumaczymy 'aburrido'?", answers: ["Zainteresowany", "Znudzony", "Zabawny", "Szczęśliwy"], correct: 1 },
  { question: "Co oznacza 'la nariz'?", answers: ["Usta", "Oczy", "Nos", "Włosy"], correct: 2 },
  { question: "Jak po hiszpańsku powiemy 'długość'?", answers: ["La anchura", "La altura", "La longitud", "El peso"], correct: 2 },
  { question: "Co znaczy 'abierto'?", answers: ["Zamknięty", "Szczęśliwy", "Otwarty", "Wypełniony"], correct: 2 },
  { question: "Co znaczy 'estar de pie' w języku hiszpańskim?", answers: ["być smutnym", "stać", "biegać", "być zadowolonym"], correct: 1 },
  { question: "Jak po hiszpańsku jest 'szyja'?", answers: ["la cabeza", "el cuello", "el dedo", "el ojo"], correct: 1 },
  { question: "Jak powiesz 'łokieć' po hiszpańsku?", answers: ["la rodilla", "el codo", "la mano", "el pie"], correct: 1 },
  // ... Wstaw tu kolejne pytania ...
  { question: "Jak przetłumaczymy 'sentarse'?", answers: ["leżeć", "stać", "siedzieć", "chodzić"], correct: 2 },
  // ... Kontynuuj dodawanie pytań ...
  { question: "Co oznacza 'alegre'?", answers: ["smutny", "zadowolony", "zamyślony", "zirytowany"], correct: 1 },
  { question: "Co oznacza hiszpańskie 'hacer gimnasia'?", answers: ["robić zakupy", "grać na instrumencie", "ćwiczyć gimnastykę", "gotować"], correct: 2 },

];

  function showQuestion(questionIndex) {
    const quiz = document.getElementById("quiz");
    // Użyj selectedQuestions zamiast questions
    const questionObj = selectedQuestions[questionIndex];
    let questionText = questionObj.question;
  
    // Pozostała część funkcji pozostaje bez zmian
    questionText = questionText.replace(/'([^']+)'/g, "<span class='highlighted'>$1</span>");
    document.getElementById("question").innerHTML = questionText;
  
    const buttons = quiz.querySelectorAll(".answer-btn");
    buttons.forEach((button, index) => {
        button.innerText = questionObj.answers[index];
        button.disabled = false;
        button.style.backgroundColor = "";
    });
}

  function shuffleAndSelectQuestions(array, numQuestions) {
    let shuffled = array.slice(); // Klonujemy tablicę, aby nie modyfikować oryginału
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Przetasowanie tablicy
    }
    return shuffled.slice(0, numQuestions); // Zwracamy tylko pierwsze 'numQuestions' pytań
  }
  let selectedQuestions = shuffleAndSelectQuestions(questions, 10);
  
  function finishQuiz() {
    // Wyświetl wyniki końcowe
    document.getElementById('final-score').innerText = score;
  
    // Pokaż kontener z przewijanym tekstem
    document.getElementById('crawl-container').style.display = 'block';
  
    // Po zakończeniu przewijania (lub po upływie czasu) ukryj kontener
    setTimeout(function() {
      document.getElementById('crawl-container').style.display = 'none';
    }, 60000); // 60 sekund to czas trwania animacji przewijania tekstu
  }
  
  
  
  
  function selectAnswer(answerIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");

    if (answerIndex === question.correct) {
        // Wywołanie funkcji tutaj
        const correctSound = document.getElementById('correct-answer-sound');
        correctSound.play();
        score++; // Zwiększ punkty za poprawną odpowiedź
        document.getElementById('correct-glow').style.display = 'block'; // Aktywuj efekt świecenia

        setTimeout(function() {
            document.getElementById('correct-glow').style.display = 'none'; // Wyłącz efekt po określonym czasie
        }, 1000); // Dostosuj czas trwania efektu

        if (currentQuestionIndex < selectedQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
            updateProgress(); // Aktualizuj postęp po każdej odpowiedzi
        } else {
            // Ta część kodu wykona się, gdy gracz odpowie na ostatnie pytanie
            document.querySelector(".quiz-container").style.display = "none";
            finishQuiz(); // Możesz tu wywołać finishQuiz, aby pokazać wyniki końcowe
        }
    } else {
      const sound = document.getElementById('wrong-answer-sound');
      sound.play();
  
      // Pozostała logika dla złej odpowiedzi (bez zmian)
      document.getElementById('glow-effect').style.display = 'block';
      
      setTimeout(function() {
        document.getElementById('glow-effect').style.display = 'none';
      }, 1000);
  
      buttons[answerIndex].style.backgroundColor = "lightcoral";
      buttons[answerIndex].disabled = true;
      lives--;
      wrongAnswers++;
      displayLives();
  
      if (lives === 0 || wrongAnswers % 5 === 0) {
        showGameOverMessage();
      }
    }
  }

function showGameOverMessage() {
  const messageText = document.getElementById("message-text");
  const messageContainer = document.getElementById("message-container");

  document.querySelector(".quiz-container").classList.add("blur-effect");
  messageContainer.style.display = "block";

  messageText.innerText = "Koniec gry! Spróbuj ponownie.";
}

function updateProgress() {
  const progressText = `Odpowiedziano ${currentQuestionIndex + 1} z ${selectedQuestions.length} pytań`;
  document.getElementById("progress").innerText = progressText;
}
function restartGame() {
  // Resetowanie indeksu bieżącego pytania
  currentQuestionIndex = 0;
  
  // Resetowanie liczby żyć
  lives = 5;
  
  // Resetowanie wyniku
  score = 0;
  
  // Resetowanie liczby błędnych odpowiedzi
  wrongAnswers = 0;
  
  // Ponowne tasowanie pytań
  selectedQuestions = shuffleAndSelectQuestions(questions, 10);
  
  // Ukrycie komunikatu końcowego i ewentualnych innych elementów, które były pokazywane na koniec gry
  document.getElementById("message-container").style.display = "none";
  
  // Wyświetlenie kontenera z quizem
  document.querySelector(".quiz-container").style.display = "block";
  
  // Usunięcie efektu rozmycia z kontenera quizu, jeśli był zastosowany
  document.querySelector(".quiz-container").classList.remove("blur-effect");
  
  // Wyświetlenie pierwszego pytania z nowego zestawu
  showQuestion(currentQuestionIndex);
  
  // Aktualizacja wyświetlania liczby żyć
  displayLives();
  
  // Aktualizacja paska postępu
  updateProgress();
}

  function displayLives() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
      // Dodanie klasy 'life-icon' do tagu <img>
      livesContainer.innerHTML += "<img src='spain.png' alt='Życie' class='life-icon'>";
    }
  }
  function startGame() {
    const nickname = document.getElementById("nickname-input").value;
    if (nickname.trim()) { // Sprawdź, czy nickname nie jest pusty i nie składa się tylko z białych znaków
      document.getElementById("start-screen").style.display = "none"; // Ukryj ekran startowy
      document.querySelector(".quiz-container").style.display = "block"; // Pokaż kontener quizu
      showQuestion(currentQuestionIndex);
      displayLives(); // Wywołanie funkcji do wyświetlania liczby żyć
      updateProgress(); // Aktualizacja postępu na początku gry
    } else {
      alert("Wprowadź swój nick!"); // Komunikat, gdy nick nie został wprowadzony
    }
  }
  
  function createStar() {
    const starFallContainer = document.getElementById('starfall');
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = `${Math.random() * 3 + 1}px`; // Losowa szerokość gwiazdy
    star.style.height = star.style.width; // Wysokość równa szerokości
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.top = `${Math.random() * window.innerHeight * 0.1}px`; // Losowa pozycja początkowa
    star.style.left = `${Math.random() * window.innerWidth}px`;
  
    starFallContainer.appendChild(star);
  
    // Animacja spadania
    const duration = Math.random() * 3000 + 3000; // Losowa długość trwania
    star.animate([
      { transform: `translateY(0px)` },
      { transform: `translateY(${window.innerHeight}px)` }
    ], {
      duration: duration,
      easing: 'linear',
      iterations: 1,
      fill: 'forwards'
    }).onfinish = () => star.remove(); // Usuń gwiazdę po zakończeniu animacji
  }
  
  // Tworzenie nowej gwiazdy co kilka sekund
  setInterval(createStar, 300);
  