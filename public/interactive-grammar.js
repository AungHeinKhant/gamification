
//Binding New Lessons
document.querySelectorAll(".lesson-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const lessonType = button.getAttribute("data-lesson");
        if (lessonType === "subject-verb") {
            loadSubjectVerbLesson();
        } else if (lessonType === "gender-nouns") {
            loadGenderNounsLesson();
        } else if (lessonType === "prepositions") {
            loadPrepositionsLesson();
        } else if (lessonType === "adjectives-nouns") {
            loadAdjectiveNounLesson();
        } else if (lessonType === "pronouns-cases") {
            loadPronounsLesson();
        }
    });
});


// Gamification Variables
let points = 0;
const badges = [];

// Function to update points
function updatePoints(amount) {
    points += amount;
    document.getElementById("points").textContent = points;
    checkBadges();
}

// Function to award badges
function awardBadge(badgeName) {
    if (!badges.includes(badgeName)) {
        badges.push(badgeName);

        const badgeElement = document.createElement("div");
        badgeElement.className = "badge";
        badgeElement.textContent = badgeName;
        document.getElementById("badges").appendChild(badgeElement);

        alert(`🎉 You've earned a badge: ${badgeName}`);
    }
}

// Check if badges are earned
function checkBadges() {
    if (points >= 50 && !badges.includes("Grammar Beginner")) {
        awardBadge("Grammar Beginner");
    }
    if (points >= 100 && !badges.includes("Grammar Pro")) {
        awardBadge("Grammar Pro");
    }
}

function loadSubjectVerbLesson() {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = ""; // Clear content

    // Lesson Explanation
    const explanation = document.createElement("p");
    explanation.textContent =
        "В русском языке глаголы должны соответствовать подлежащему в числе и лице. Например: «Я читаю».";
    contentArea.appendChild(explanation);

    // Quiz Data - Adding more questions
    const quizData = [
        {
            question: "Какой глагол соответствует «Я (I)»?",
            options: ["читаю", "читает", "читаем"],
            correct: "читаю",
        },
        {
            question: "Какой глагол соответствует «Мы (We)»?",
            options: ["читает", "читаем", "читаю"],
            correct: "читаем",
        },
        {
            question: "Какой глагол соответствует «Ты (You)»?",
            options: ["читаем", "читаешь", "читаю"],
            correct: "читаешь",
        },
        {
            question: "Какой глагол соответствует «Он (He)»?",
            options: ["читаем", "читает", "читаю"],
            correct: "читает",
        },
        {
            question: "Какой глагол соответствует «Они (They)»?",
            options: ["читаю", "читает", "читают"],
            correct: "читают",
        },
        // You can add as many as you'd like here
    ];

    quizData.forEach((quiz, index) => {
        // Create question
        const question = document.createElement("p");
        question.textContent = `${index + 1}. ${quiz.question}`;
        contentArea.appendChild(question);

        // Create options
        quiz.options.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.className = "option-btn";
            button.addEventListener("click", () => {
                if (option === quiz.correct) {
                    alert("Correct!");
                    updatePoints(10); // Award points
                } else {
                    alert("Try Again!");
                }
            });
            contentArea.appendChild(button);
        });
    });
}


// 2 Load Gender in Nouns Lesson (Drag-and-Drop)
function loadGenderNounsLesson() {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = ""; // Clear content

    // Lesson Explanation
    const explanation = document.createElement("p");
    explanation.textContent =
        "В русском языке существительные имеют три рода: мужской, женский и средний. Соотнесите существительные с их родом.(ရုရှားဘာသာတွင် နာမ်များသည် ကျား၊ မ၊ မိန်းမ၊ နှင့် အလယ်အလတ်ဟူ၍ သုံးမျိုးရှိသည်။ နာမ်များကို ၎င်းတို့၏ လိင်နှင့် ယှဉ်ပါ။)";
    contentArea.appendChild(explanation);

    // Drag-and-Drop Game Container
    const gameContainer = document.createElement("div");
    gameContainer.className = "drag-drop-container";

    // Nouns and their gender
    const nouns = [
        { word: "Книга", gender: "Женственный" },
        { word: "Стол", gender: "Мужской" },
        { word: "Молоко", gender: "Средний" },
        { word: "Собака", gender: "Женственный" },
        { word: "Письмо", gender: "Средний" },
        { word: "Человек", gender: "Мужской" },
        { word: "Женщина", gender: "Женственный" },
        { word: "Мужчина", gender: "Мужской" },
        { word: "Окно", gender: "Средний" },
        { word: "Театр", gender: "Мужской" },
        { word: "Тетрадь", gender: "Женственный" },
        { word: "Река", gender: "Женственный" },
    ];

    // Gender Targets (drop zones)
    const targets = ["Мужской", "Женственный", "Средний"];
    targets.forEach((target) => {
        const targetDiv = document.createElement("div");
        targetDiv.className = "drop-zone";
        targetDiv.textContent = target;
        targetDiv.setAttribute("data-gender", target);
        gameContainer.appendChild(targetDiv);
    });

    // Draggable Noun Items
    nouns.forEach((noun) => {
        const nounDiv = document.createElement("div");
        nounDiv.className = "draggable";
        nounDiv.textContent = noun.word;
        nounDiv.setAttribute("draggable", "true");
        nounDiv.setAttribute("data-gender", noun.gender);

        // Drag Event
        nounDiv.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", noun.gender); // Store the gender in dataTransfer
        });

        gameContainer.appendChild(nounDiv);
    });

    // Drop Event for Matching Gender
    gameContainer.querySelectorAll(".drop-zone").forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); // Allow dropping
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedGender = e.dataTransfer.getData("text/plain"); // Get dragged gender
            const targetGender = zone.getAttribute("data-gender"); // Get gender of the target zone
            const draggedNoun = document.querySelector(`[data-gender="${draggedGender}"]`); // Get the noun being dragged

            // Check if the dragged item matches the drop zone
            if (draggedGender === targetGender) {
                alert("Correct!");
                updatePoints(10); // Award points
                draggedNoun.style.backgroundColor = "#28a745"; // Green background for correct match
                draggedNoun.style.color = "white"; // Keep text color white for visibility
                draggedNoun.classList.add('completed'); // Optional: Add 'completed' class for completed nouns
                draggedNoun.classList.remove('incorrect'); // Remove incorrect styling if present
            } else {
                alert("Wrong Match! Try again.");
                draggedNoun.style.backgroundColor = "#dc3545"; // Red background for incorrect match
                draggedNoun.style.color = "white"; // Keep text color white for visibility
                draggedNoun.classList.add('incorrect'); // Optional: Add 'incorrect' class for incorrect nouns
                draggedNoun.classList.remove('completed'); // Remove 'completed' class if it's incorrect
            }
        });
    });

    contentArea.appendChild(gameContainer);
}





// 3 Load Negative Sentences Lesson (Fill-in-the-Blanks)
function loadNegativeSentencesLesson() {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = ""; // Clear content

    // Lesson Explanation
    const explanation = document.createElement("p");
    explanation.textContent =
        "Чтобы образовать отрицательное предложение в русском языке, используйте «не». Например: «Я не хочу спать».(ရုရှားလို အနုတ်လက္ခဏာဝါကျတစ်ခု ဖန်တီးရန် 'не' ကိုသုံးပါ။ ဥပမာ- 'Я не хочу спать' (မအိပ်ချင်ဘူး)။)";
    contentArea.appendChild(explanation);

    // Fill-in-the-Blank Exercise
    const sentence = "Я ___ хочу спать.";
    const correctAnswer = "не";

    const sentenceDiv = document.createElement("div");
    sentenceDiv.textContent = sentence;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter the missing word";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Check Answer";

    submitButton.addEventListener("click", () => {
        if (input.value === correctAnswer) {
            alert("Correct!");
            updatePoints(10); // Award points
        } else {
            alert("Incorrect. Try Again!");
        }
    });

    contentArea.appendChild(sentenceDiv);
    contentArea.appendChild(input);
    contentArea.appendChild(submitButton);
}

// Attach Event Listeners to Buttons
document.querySelectorAll(".lesson-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const lessonType = button.getAttribute("data-lesson");
        if (lessonType === "subject-verb") {
            loadSubjectVerbLesson();
        } else if (lessonType === "gender-nouns") {
            loadGenderNounsLesson();
        } else if (lessonType === "negatives") {
            loadNegativeSentencesLesson();
        }
    });
});

// Default Lesson
loadSubjectVerbLesson();







//5 Adjective-Noun Agreement (Drag-and-Drop)
function loadAdjectiveNounLesson() {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = ""; // Clear content

    // Lesson Explanation
    const explanation = document.createElement("p");
    explanation.textContent =
        "Прилагательные в русском языке должны соответствовать роду, числу и падежу существительного. Перетащите прилагательные к правильным существительным.(ရုရှားလို နာမ်ဝိသေသနများသည် နာမ်၏ လိင်၊ နံပါတ်နှင့် ဖြစ်ရပ်တို့နှင့် ကိုက်ညီရပါမည်။ နာမဝိသေသနများကို မှန်ကန်သောနာမ်များဆီသို့ ဆွဲယူပါ။)";
    contentArea.appendChild(explanation);

    // Data for Drag-and-Drop
    const pairs = [
        { noun: "дом (house)", adjective: "красивый (beautiful)" },
        { noun: "книга (book)", adjective: "интересная (interesting)" },
        { noun: "молоко (milk)", adjective: "свежее (fresh)" },
    ];

    const gameContainer = document.createElement("div");
    gameContainer.className = "drag-drop-container";

    // Create Drop Zones (Nouns)
    pairs.forEach((pair) => {
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.textContent = pair.noun;
        dropZone.setAttribute("data-answer", pair.adjective);

        // Add Dragover Event
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add("dragover");
        });

        // Add Dragleave Event
        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("dragover");
        });

        // Add Drop Event
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
            const draggedAdjective = e.dataTransfer.getData("text/plain");

            // Check if the dropped item is correct
            if (draggedAdjective === dropZone.getAttribute("data-answer")) {
                dropZone.classList.add("correct");
                dropZone.textContent += ` (${draggedAdjective})`;
                updatePoints(10); // Award points
            } else {
                dropZone.classList.add("incorrect");
                setTimeout(() => dropZone.classList.remove("incorrect"), 1000); // Remove error styling after 1s
            }
        });

        gameContainer.appendChild(dropZone);
    });

    // Create Draggable Adjectives
    pairs.forEach((pair) => {
        const draggable = document.createElement("div");
        draggable.className = "draggable";
        draggable.textContent = pair.adjective;
        draggable.setAttribute("draggable", "true");

        // Add Dragstart Event
        draggable.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", pair.adjective);
        });

        gameContainer.appendChild(draggable);
    });

    contentArea.appendChild(gameContainer);
}




