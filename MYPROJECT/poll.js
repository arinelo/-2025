document.addEventListener("DOMContentLoaded", function () {
    // Створення опитування за допомогою JavaScript
    const pollContainer = document.createElement("div");
    pollContainer.classList.add("poll-container");

    const pollForm = document.createElement("form");
    pollForm.id = "pollForm";

    // Створення заголовка для опитування
    const pollHeader = document.createElement("h1");
    pollHeader.textContent = "Опитування: Як ви оцінюєте українську кухню?";
    pollContainer.appendChild(pollHeader);

    // Список питань для опитування
    const questions = [
        {
            question: "1. Яка ваша улюблена українська страва?",
            options: ["Борщ", "Голубці", "Драники", "Вареники"]
        },
        {
            question: "2. Як часто ви готуєте українські страви?",
            options: ["Щодня", "Раз на тиждень", "Рідко", "Ніколи"]
        },
        {
            question: "3. Яка страва вам найбільше подобається?",
            options: ["Пироги", "Квашена капуста", "Кулеш", "Сало"]
        },
        {
            question: "4. Чи любите ви готувати українські страви?",
            options: ["Так", "Ні"]
        },
        {
            question: "5. Як ви оцінюєте українську кухню в порівнянні з іншими кухнями світу?",
            options: ["Відмінно", "Добре", "Задовільно", "Погано"]
        }
    ];

    // Створюємо питання і варіанти відповідей
    questions.forEach((item, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = item.question;
        questionDiv.appendChild(questionTitle);

        item.options.forEach(option => {
            const label = document.createElement("label");
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = `q${index + 1}`;
            radioButton.value = option;

            label.appendChild(radioButton);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        pollForm.appendChild(questionDiv);
    });

    // Кнопка для відправлення форми
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("submit-btn");
    submitButton.textContent = "Надіслати";
    pollForm.appendChild(submitButton);

    // Додаємо форму опитування на сторінку
    pollContainer.appendChild(pollForm);
    document.body.appendChild(pollContainer);

    // Виведення результату
    const resultContainer = document.createElement("div");
    resultContainer.id = "result";
    pollContainer.appendChild(resultContainer);

    // Обробка відправки форми
    pollForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Забороняємо стандартне відправлення форми

        const formData = new FormData(pollForm);
        let score = 0;
        const totalQuestions = questions.length;

        // Перевірка відповідей на кожне питання
        questions.forEach((item, index) => {
            const answer = formData.get(`q${index + 1}`);
            if (answer) score++;
        });

        // Виведення результату
        const resultMessage = `Ви відповіли на ${score} з ${totalQuestions} питань.`;

        const evaluationMessage = getEvaluation(score, totalQuestions);

        resultContainer.innerHTML = `
            <h3>Ваш результат:</h3>
            <p>${resultMessage}</p>
            <p>${evaluationMessage}</p>
        `;
    });

    // Функція для оцінки результату
    function getEvaluation(score, totalQuestions) {
        const percentage = (score / totalQuestions) * 100;
        if (percentage === 100) {
            return "Відмінно! Ви чудово знаєте українську кухню!";
        } else if (percentage >= 80) {
            return "Добре! Ви маєте гарні знання про українські страви.";
        } else if (percentage >= 60) {
            return "Задовільно! Трохи більше вивчіть українську кухню.";
        } else {
            return "Потрібно більше практики. Спробуйте ще раз!";
        }
    }
});
