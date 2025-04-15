// Vocabulary Data
const vocabularyData = [
    { word: 'Table(စားပွဲ)', translation: 'Стол' },
    { word: 'Chair(ကုလားထိုင်)', translation: 'Стул' },
    { word: 'Dog(ခွေး)', translation: 'Собака' },
    { word: 'Cat(ကြောင်)', translation: 'Кот' },
    { word: 'Book(စာအုပ်)', translation: 'Книга' },
    { word: 'Pen(ပဲထိုး)', translation: 'Ручка' },
    { word: 'Notebook(ဒိုင်စာအုပ်)', translation: 'Блокнот' },
    { word: 'Window(ထွက်ပေါက်)', translation: 'Окно' },
    { word: 'Door(တံခါး)', translation: 'Дверь' },
    { word: 'Cup(ခွက်)', translation: 'Чашка' },
    { word: 'Glass(သွားသွား)', translation: 'Стакан' },
    { word: 'Bed(အိပ်ရာ)', translation: 'Кровать' },
    { word: 'Kitchen(မီးဖိုချောင်)', translation: 'Кухня' },
    { word: 'Bathroom(ရေချိုးခန်း)', translation: 'Ванная комната' },
    { word: 'Car(ကား)', translation: 'Машина' },
    { word: 'Bicycle(စက်ဘီး)', translation: 'Велосипед' },
    { word: 'Shoe(စွပ်စီးအပ်)', translation: 'Обувь' },
    { word: 'T-shirt(အင်္ကျီ)', translation: 'Футболка' },
    { word: 'Hat(ထုတုပ်)', translation: 'Шляпа' },
    { word: 'Rain(မိုးရေ)', translation: 'Дождь' },
    { word: 'Snow(မြေခင်း)', translation: 'Снег' },
    { word: 'Sun(နေ)', translation: 'Солнце' },
    { word: 'Cloud(မိုးကွင်း)', translation: 'Облако' },
    { word: 'Star(တောက်ပသောနက္ခတ်)', translation: 'Звезда' },
    { word: 'Mountain(တောင်တန်း)', translation: 'Гора' },
    { word: 'River(မြစ်)', translation: 'Река' },
    { word: 'Ocean(มหาสมุทร)', translation: 'Океан' },
    { word: 'Island(ကျွန်း)', translation: 'Остров' },
    { word: 'Tree(သစ်ပင်)', translation: 'Дерево' },
    { word: 'Flower(ပန်း)', translation: 'Цветок' },
    { word: 'Bird(ပျောကွက်)', translation: 'Птица' },
];


// Gamification Variables
let points = 0;
const badges = [];

// Function to Update Points
function updatePoints(amount) {
    points += amount;
    document.getElementById('points').textContent = points;
    checkBadges(); // Check if badges are earned
}

// Function to Award Badges
function awardBadge(badgeName) {
    if (!badges.includes(badgeName)) {
        badges.push(badgeName);

        // Create and Display Badge
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        badgeElement.textContent = badgeName;
        document.getElementById('badges').appendChild(badgeElement);

        alert(`🎉 You've earned a badge: ${badgeName}`);
    }
}

// Check if Badges are Earned
function checkBadges() {
    if (points >= 50 && !badges.includes('50 Points Achiever')) {
        awardBadge('50-очковый участник');
    }

    if (points >= 100 && !badges.includes('100 Points Master')) {
        awardBadge('100 очков Мастер');
    }
}

// Load Multiple Choice Lesson
function loadMultipleChoiceLesson() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // Clear previous content

    const questionData = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
    const correctAnswer = questionData.translation;

    // Display Question
    const question = document.createElement('p');
    question.textContent = `Как по-русски будет "${questionData.word}"?`;
    gameArea.appendChild(question);

    // Shuffle and Display Options
    const options = [...vocabularyData.map(item => item.translation)].sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.addEventListener('click', () => {
            if (option === correctAnswer) {
                alert('Правильно!');
                updatePoints(10); // Award Points
                loadMultipleChoiceLesson(); // Load next question
            } else {
                alert('Попробуйте еще раз!');
            }
        });
        gameArea.appendChild(button);
    });
}

// Load Flashcard Lesson
function loadFlashcardLesson() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // Clear previous content

    const flashcardData = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];

    // Create Flashcard Container
    const flashcardContainer = document.createElement('div');
    flashcardContainer.className = 'flashcard-container'; // Container for 3D effect

    // Create Flashcard
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';  // Add class for 3D flip
    flashcard.innerHTML = `<div class="front">${flashcardData.word}</div><div class="back">${flashcardData.translation}</div>`;
    flashcardContainer.appendChild(flashcard);

    gameArea.appendChild(flashcardContainer);

    // Create Flip Button
    const flipButton = document.createElement('button');
    flipButton.textContent = 'Перевернуть карту';
    flipButton.addEventListener('click', () => {
        flashcard.classList.toggle('flip'); // Toggle flip effect on click
    });
    gameArea.appendChild(flipButton);

    // Create "Next" Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Следующая карта';
    nextButton.addEventListener('click', () => {
        updatePoints(5); // Award Points
        loadFlashcardLesson(); // Load next card
    });
    gameArea.appendChild(nextButton);
}


// Toggle Between Games
document.getElementById('multiple-choice-btn').addEventListener('click', loadMultipleChoiceLesson);
document.getElementById('flashcard-btn').addEventListener('click', loadFlashcardLesson);

// Initialize with Multiple Choice
loadMultipleChoiceLesson();
