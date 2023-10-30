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

