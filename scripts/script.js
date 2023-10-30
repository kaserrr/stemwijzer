class Question {
    constructor(id, text, answer) {
        this.id = id;
        this.text = text;
        this.answer = null;
    }

    answered(choice) {
        this.answer = choice;
    }

    generateHTML() {
        return `
            <div>
                <p>${this.text}</p>
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
}

