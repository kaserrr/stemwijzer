class Question {
    constructor(id, text, answer) {
        this.id = id;
        this.text = text;
        this.answer = answer;
    }

    answered(choice) {
        this.answer = choice;
    }

    generateHTML() {
        return `
            <div>
                <p>${this.text}</p>
                <button onclick="answerQuestion('agree')">Eens</button>
                <button onclick="answerQuestion('none')">Geen van beide</button>
                <button onclick="answerQuestion('disagree')">Oneens</button>
            </div>
        `;
    }
}

class VotingGuide {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    showCurrentQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        document.getElementById("questions").innerHTML = currentQuestion.generateHTML();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showCurrentQuestion();
        } else {
            document.getElementById("result").innerHTML = "Finished!";
        }
    }
}

let votingGuide = new VotingGuide();

let questionData = [
    { id: 1, text: "Moet er meer geld worden besteed aan onderwijs?" },
    { id: 2, text: "Moet de inkomstenbelasting worden verhoogd?" },
    { id: 3, text: "Moet de maximale snelheid omhoog?" },
    { id: 4, text: "Moet Nederland meer vluchtelingen opnemen?" }
];

questionData.forEach(question => {
    votingGuide.addQuestion(new Question(question.id, question.text,));
});

function startVotingGuide() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("questions-container").style.display = "block";
    votingGuide.showCurrentQuestion();
}

function answerQuestion(choice) {
    votingGuide.questions[votingGuide.currentQuestionIndex].answered(choice);
    votingGuide.nextQuestion();
}

function backToLastQuestion() {
    if(votingGuide.currentQuestionIndex > 0) {
        votingGuide.currentQuestionIndex--;
        votingGuide.showCurrentQuestion();
    }
}

