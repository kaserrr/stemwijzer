//question list
let questionData = [
    { id: 1, text: "Moet er meer geld worden besteed aan onderwijs?" },
    { id: 2, text: "Moet de inkomstenbelasting worden verhoogd?" },
    { id: 3, text: "Moet de maximale snelheid omhoog?" },
    { id: 4, text: "Moet Nederland meer vluchtelingen opnemen?" }
];

//
class Question {
    constructor(id, text, answer, weight) {
        this.id = id;
        this.text = text;
        this.answer = answer;
        this.weight = weight;
        this.skipped = false;
    }

    answered(choice) {
        if (!this.skipped) {
            this.answer = choice;
        }
    }

    skipQuestion() {
        this.skipped = true;
    }

    //generates the HTML for the questions
    generateQuestionHTML() {
        return `
            <div>
                <p>${this.text}</p>
                <button onclick="answerQuestion('agree')">Eens</button>
                <button onclick="answerQuestion('none')">Geen van beide</button>
                <button onclick="answerQuestion('disagree')">Oneens</button>
                 <a href="#" onclick="skipCurrentQuestion()">Sla deze vraag over</a>
            </div>
        `;
    }
    //generates the html for the weights
    generateWeightHTML() {
        return `
            <div>
                <p>${this.text}</p>
                <input type="checkbox" id="weight_${this.id}" name="question_weight" value="1">
            </div>
        `;
    }
}

class VotingGuide {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
    }

    //adds a question to the questions array
    addQuestion(question) {
        this.questions.push(question);
    }

    //shows the current question using the currentQuestionIndex var
    showCurrentQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        document.getElementById("questions").innerHTML = currentQuestion.generateQuestionHTML();
    }

    //shows the next question to the screen and hides the old one
    //And if there are no questions left it prints finished
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showCurrentQuestion();
        } else {
            selectQuestionWeights();
            document.getElementById("questions-container").style.display = "none";
            document.getElementById("weight-options-container").style.display = "block";
        }
    }
}

//starts a new VotingGuide
let votingGuide = new VotingGuide();

//makes a Question instance for every item in questionData
questionData.forEach(question => {
    votingGuide.addQuestion(new Question(question.id, question.text,));
});

//starts the voting guide by showing the questions-container and hiding the start-container
function startVotingGuide() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("questions-container").style.display = "block";
    votingGuide.showCurrentQuestion();
}

//puts the answer of the question in the question object
function answerQuestion(choice) {
    votingGuide.questions[votingGuide.currentQuestionIndex].answered(choice);
    votingGuide.nextQuestion();
}

//checks which question your on and puts you back 1 question when clicked
function backToLastQuestion() {
    if(votingGuide.currentQuestionIndex > 0) {
        votingGuide.currentQuestionIndex--;
        votingGuide.showCurrentQuestion();
    }
}

//checks which question your on and puts you forward 1 question when clicked
function skipCurrentQuestion() {
    votingGuide.questions[votingGuide.currentQuestionIndex].skipQuestion();
    votingGuide.nextQuestion();
}

//generated each question with a checkbox to select the weight per question
function selectQuestionWeights() {
    const weightsContainer = document.getElementById("weight-questions");

    votingGuide.questions.forEach((question) => {
        const weightHTML = question.generateWeightHTML();
        const weightContainer = document.createElement("div");
        weightContainer.innerHTML += weightHTML;

        weightsContainer.appendChild(weightContainer); 
    });
}

function calculateResults() {

}

function showResults() {

}