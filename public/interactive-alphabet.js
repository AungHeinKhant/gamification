const alphabetMemoryData = [
    { type: 'letter', content: 'А', pair: 'ah', audio: 'audio/ttsMP3. А.mp3' },
    { type: 'letter', content: 'Б', pair: 'be', audio: 'audio/ttsMP3. Б.mp3' },
    { type: 'letter', content: 'В', pair: 've', audio: 'audio/ttsMP3. В.mp3' },
    { type: 'letter', content: 'Г', pair: 'ge', audio: 'audio/ttsMP3. Г.mp3' },
    { type: 'letter', content: 'Д', pair: 'deh', audio: 'audio/ttsMP3. Д.mp3' },
    // Add more letters and their pronunciations as needed...
];

let flippedCards = [];
let matchedPairs = 0;
let points = 0;
let selectedLetter = null;  // To track the selected letter
let pronunciationCards = [];
let badges = [];  // To store earned badges
let streak = 0;  // Initialize streak variable

// Audio play function
function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

// Function to handle letter selection and play audio
function handleLetterSelection(cardElement) {
    if (selectedLetter) {
        return; // If a letter has already been selected, do nothing
    }
    selectedLetter = cardElement.dataset.content;
    cardElement.classList.remove('hidden');
    document.getElementById('game-feedback').textContent = `You selected the letter: ${selectedLetter}. Now select a pronunciation.`;

    // Find the corresponding letter data from the alphabetMemoryData
    const selectedLetterData = alphabetMemoryData.find(letter => letter.content === selectedLetter);

    // Play the corresponding audio for the letter
    if (selectedLetterData) {
        playAudio(selectedLetterData.audio);
    }

    // Reveal pronunciation cards
    const pronunciationCards = document.querySelectorAll('.card.hidden');
    pronunciationCards.forEach(card => {
        card.classList.remove('hidden');
    });
}

// Function to check for badges based on matched pairs
function checkBadges() {
    console.log(`Matched Pairs: ${matchedPairs}`);  // Log matched pairs for debugging

    if (matchedPairs >= 10 && !badges.includes('Beginner')) {
        awardBadge('Beginner');
    }
    if (matchedPairs >= 20 && !badges.includes('Intermediate')) {
        awardBadge('Intermediate');
    }
    if (matchedPairs >= 30 && !badges.includes('Expert')) {
        awardBadge('Expert');
    }
}

// Function to award badges
function awardBadge(badgeName) {
    if (!badges.includes(badgeName)) {
        badges.push(badgeName);

        // Log for debugging
        console.log(`Awarded badge: ${badgeName}`);

        // Display the badge
        const badgeDisplay = document.getElementById('badge-display-memory');
        const badgeElement = document.createElement('div');
        badgeElement.classList.add('badge');
        badgeElement.textContent = badgeName;
        badgeDisplay.appendChild(badgeElement);  // Append the badge

        // Log DOM update
        console.log("Badge DOM updated with", badgeName);

        alert(`🎉 You've earned a badge: ${badgeName}`);
    }
}

// Load the memory game
function loadMemoryGame() {
    const gameBoard = document.getElementById('game-board');
    const pronunciationBoard = document.getElementById('pronunciation-board');
    const feedback = document.getElementById('game-feedback');
    const restartBtn = document.getElementById('restart-btn');
    const scoreDisplay = document.getElementById('score-display-memory');
    const badgeDisplay = document.getElementById('badge-display-memory');

    // Clear the boards and feedback
    gameBoard.innerHTML = '';
    pronunciationBoard.innerHTML = '';
    feedback.textContent = '';
    matchedPairs = 0;
    points = 0;
    selectedLetter = null;

    scoreDisplay.textContent = `Points: ${points}`;
    badgeDisplay.innerHTML = '';  // Reset badge display

    // Add different classes for letter and pronunciation cards
    const letterCards = shuffle(alphabetMemoryData.filter(item => item.type === 'letter'));
    letterCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden', 'letter-card');  // Add 'letter-card' class here
        cardElement.dataset.type = card.type;
        cardElement.dataset.content = card.content;
        cardElement.textContent = card.content;
        cardElement.addEventListener('click', () => {
            handleLetterSelection(cardElement);
        });
        gameBoard.appendChild(cardElement);
    });

    const pronunciationData = alphabetMemoryData.map(item => item.pair);
    pronunciationCards = shuffle(pronunciationData).slice(0, 5);  // Get 5 random pronunciations

    pronunciationCards.forEach(pronunciation => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden', 'pronunciation-card');  // Add 'pronunciation-card' class here
        cardElement.textContent = pronunciation;
        cardElement.addEventListener('click', () => {
            handlePronunciationSelection(cardElement);
        });
        pronunciationBoard.appendChild(cardElement);
    });

    restartBtn.onclick = loadMemoryGame;
}

// Shuffle array (helper function)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Handle pronunciation selection
function handlePronunciationSelection(cardElement) {
    if (!selectedLetter) {
        return; // If no letter has been selected, do nothing
    }

    const isCorrect = cardElement.textContent === getPronunciationForLetter(selectedLetter);
    if (isCorrect) {
        points += 10;
        document.getElementById('game-feedback').textContent = `Correct! You matched ${selectedLetter} with ${cardElement.textContent}.`;
        matchedPairs++;
        checkBadges();  // Check if any new badge is earned
    } else {
        points -= 5;
        document.getElementById('game-feedback').textContent = `Incorrect! Try again.`;
        if (points < 0) points = 0;
    }

    // Reset selected letter
    selectedLetter = null;

    // Hide pronunciation cards again
    const pronunciationCards = document.querySelectorAll('.card');
    pronunciationCards.forEach(card => {
        card.classList.add('hidden');
    });

    // Update score
    document.getElementById('score-display-memory').textContent = `Points: ${points}`;

    // Check if the game is completed
    if (matchedPairs === alphabetMemoryData.length) {
        document.getElementById('game-feedback').textContent = 'Congratulations! You completed the game!';
    }
}

// Get the correct pronunciation for a letter
function getPronunciationForLetter(letter) {
    const letterData = alphabetMemoryData.find(item => item.content === letter);
    return letterData ? letterData.pair : '';
}

// Start the game
loadMemoryGame();











//audio recognition game
const alphabetAudioData = [
    { letter: 'А', audio: 'audio/ttsMP3. А.mp3' },
    { letter: 'Б', audio: 'audio/ttsMP3. Б.mp3' },
    { letter: 'В', audio: 'audio/ttsMP3. В.mp3' },
    { letter: 'Г', audio: 'audio/ttsMP3. Г.mp3' },
    { letter: 'Д', audio: 'audio/ttsMP3. Д.mp3' },
    { letter: 'Е', audio: 'audio/ttsMP3. Е.mp3' },
    { letter: 'Ё', audio: 'audio/ttsMP3. Ё.mp3' },
    { letter: 'Ж', audio: 'audio/ttsMP3. Ж.mp3' },
    { letter: 'З', audio: 'audio/ttsMP3. З.mp3' },
    { letter: 'И', audio: 'audio/ttsMP3. И.mp3' },
    { letter: 'Й', audio: 'audio/ttsMP3. Й.mp3' },
    { letter: 'К', audio: 'audio/ttsMP3. К.mp3' },
    { letter: 'Л', audio: 'audio/ttsMP3. Л.mp3' },
    { letter: 'М', audio: 'audio/ttsMP3. М.mp3' },
    { letter: 'Н', audio: 'audio/ttsMP3. Н.mp3' },
    { letter: 'О', audio: 'audio/ttsMP3. О.mp3' },
    { letter: 'П', audio: 'audio/ttsMP3. П.mp3' },
    { letter: 'Р', audio: 'audio/ttsMP3. Р.mp3' },
    { letter: 'С', audio: 'audio/ttsMP3. С.mp3' },
    { letter: 'Т', audio: 'audio/ttsMP3. Т.mp3' },
    { letter: 'У', audio: 'audio/ttsMP3. У.mp3' },
    { letter: 'Ф', audio: 'audio/ttsMP3. Ф.mp3' },
    { letter: 'Х', audio: 'audio/ttsMP3. Х.mp3' },
    { letter: 'Ц', audio: 'audio/ttsMP3. Ц.mp3' },
    { letter: 'Ч', audio: 'audio/ttsMP3. Ч.mp3' },
    { letter: 'Ш', audio: 'audio/ttsMP3. Ш.mp3' },
    { letter: 'Щ', audio: 'audio/ttsMP3. Щ.mp3' },
    { letter: 'Ъ', audio: 'audio/ttsMP3. Ъ.mp3' },
    { letter: 'Ы', audio: 'audio/ttsMP3. Ы.mp3' },
    { letter: 'Ь', audio: 'audio/ttsMP3. Ь.mp3' },
    { letter: 'Э', audio: 'audio/ttsMP3. Э.mp3' },
    { letter: 'Ю', audio: 'audio/ttsMP3. Ю.mp3' },
    { letter: 'Я', audio: 'audio/ttsMP3. Я.mp3' },
];

let progress = 0;
let currentAudio = null; // Global variable to manage audio playback
let totalQuestions = alphabetAudioData.length;

function updateProgressBar() {
    const progressBar = document.getElementById('audio-progress');
    const badgeDisplay = document.getElementById('badge-display-audio');
    const progressPercentage = Math.round((progress / totalQuestions) * 100);

    // Update the progress bar
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage}%`;

    // Check for badge at different percentages
    if (progressPercentage >= 100) {
        badgeDisplay.innerHTML = "🏆 Значок мастера получен! 100%";
    } else if (progressPercentage >= 75) {
        badgeDisplay.innerHTML = "🥇 Отличный значок получен! 75%";
    } else if (progressPercentage >= 50) {
        badgeDisplay.innerHTML = "🥈 Хороший значок получен! 50%";
    } else if (progressPercentage >= 25) {
        badgeDisplay.innerHTML = "🥉Значок новичка получен! 25%";
    } else {
        badgeDisplay.innerHTML = "";
    }
}

function loadAudioRecognitionGame() {
    const playAudioBtn = document.getElementById('play-audio-btn');
    const optionsContainer = document.getElementById('letter-options');
    const feedback = document.getElementById('audio-feedback');

    // Select a random item from the alphabetAudioData array
    const randomItem = alphabetAudioData[Math.floor(Math.random() * alphabetAudioData.length)];
    const correctLetter = randomItem.letter;

    // Remove existing listeners
    playAudioBtn.replaceWith(playAudioBtn.cloneNode(true));
    const newPlayAudioBtn = document.getElementById('play-audio-btn');

    // Play the audio clip when the button is clicked
    newPlayAudioBtn.addEventListener('click', () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(randomItem.audio);
        currentAudio.play();
    });

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Shuffle options and add them as buttons
    const shuffledOptions = [...alphabetAudioData.map(item => item.letter)].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            if (option === correctLetter) {
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
                progress += 1;  // Increment progress on correct answer
                updateProgressBar(); // Update progress bar and badge
                loadAudioRecognitionGame(); // Reload the game for the next round
            } else {
                feedback.textContent = 'Try Again!';
                feedback.style.color = 'red';
            }
        });
        const li = document.createElement('li');
        li.appendChild(button);
        optionsContainer.appendChild(li);
    });
}

// Restart Game Functionality
function restartAudioRecognitionGame() {
    progress = 0; // Reset progress
    const feedback = document.getElementById('audio-feedback');
    const progressBar = document.getElementById('audio-progress');

    // Clear feedback and progress bar
    feedback.textContent = '';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';

    // Reload the game
    loadAudioRecognitionGame();
}

// Add Restart Button Listener
document.getElementById('restart-audio-btn').addEventListener('click', restartAudioRecognitionGame);

// Start the game
loadAudioRecognitionGame();







//multiple choice for restart exercise
function restartQuiz() {
    score = 0; // Reset score to 0
    alert('Quiz restarted! Your score is now reset.');

    // Optionally, hide results or reset other UI components.
    // You can also reload the page to reset any other states, or you could manually reset elements.

    // Example: Hide final score or reset buttons if you show any results
    // document.getElementById('final-score').style.display = 'none'; // If you display a final score somewhere
}






