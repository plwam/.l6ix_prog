let questions = [];
let indexQuestionActuelle = 0;
let score = 0;
let timer;
const tempsParQuestion = 20; // Temps en secondes

// Charger les questions depuis questions.json
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
    })
    .catch(error => console.error("Erreur de chargement des questions :", error));

// Démarrer le quiz
function demarrerQuiz() {
    document.getElementById("accueil").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    score = 0;
    indexQuestionActuelle = 0;
    afficherQuestion(indexQuestionActuelle);
}

// Afficher une question
function afficherQuestion(index) {
    if (index >= questions.length) {
        afficherResultat();
        return;
    }

    let question = questions[index];
    document.getElementById("question").textContent = question.question;

    let choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    question.choices.forEach(choice => {
        let button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => verifierReponse(choice, question.answer);
        choicesContainer.appendChild(button);
    });

    // Démarrer le minuteur
    demarrerMinuteur();
}

// Vérifier la réponse et passer à la question suivante
function verifierReponse(choixUtilisateur, reponseCorrecte) {
    clearInterval(timer);
    if (choixUtilisateur === reponseCorrecte) {
        score++;
    }
    questionSuivante();
}

// Passer à la question suivante
function questionSuivante() {
    indexQuestionActuelle++;
    afficherQuestion(indexQuestionActuelle);
}

// Afficher le résultat final
function afficherResultat() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultat").style.display = "block";
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
}

// Rejouer le quiz
function rejouer() {
    document.getElementById("resultat").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

// Ajouter un minuteur pour chaque question
function demarrerMinuteur() {
    let tempsRestant = tempsParQuestion;
    document.getElementById("timer").textContent = `Temps restant : ${tempsRestant}s`;

    timer = setInterval(() => {
        tempsRestant--;
        document.getElementById("timer").textContent = `Temps restant : ${tempsRestant}s`;

        if (tempsRestant <= 0) {
            clearInterval(timer);
            questionSuivante();
        }
    }, 1000);
}
