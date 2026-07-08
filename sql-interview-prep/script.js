// Quiz State
let currentQuestionIndex = 0;
let userAnswers = new Array(sqlQuestions.length).fill(null);
let correctCount = 0;
let wrongCount = 0;
let filteredQuestions = [...sqlQuestions];

// DOM Elements
const questionNumber = document.getElementById('question-number');
const difficultyBadge = document.getElementById('difficulty-badge');
const questionText = document.getElementById('question-text');
const exampleSection = document.getElementById('example-section');
const exampleCode = document.getElementById('example-code');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const explanationSection = document.getElementById('explanation-section');
const explanationText = document.getElementById('explanation-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressSpan = document.getElementById('progress');
const correctSpan = document.getElementById('correct');
const wrongSpan = document.getElementById('wrong');
const scoreSpan = document.getElementById('score');
const difficultyFilter = document.getElementById('difficulty-filter');
const resetBtn = document.getElementById('reset-btn');
const quizContainer = document.querySelector('.quiz-container');
const summarySection = document.getElementById('summary-section');
const restartBtn = document.getElementById('restart-btn');

// Tab Navigation
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Topic Navigation
function initTopics() {
    const topicBtns = document.querySelectorAll('.topic-btn');
    const topicContent = document.getElementById('topic-content');

    topicBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topicName = btn.dataset.topic;
            
            // Remove active class from all topic buttons
            topicBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Load topic content
            if (topics[topicName]) {
                topicContent.innerHTML = topics[topicName].content;
            }
        });
    });

    // Load first topic by default
    if (topicBtns.length > 0 && topics.basics) {
        topicContent.innerHTML = topics.basics.content;
    }
}

// Initialize Quiz
function initQuiz() {
    loadProgress();
    applyFilter();
    displayQuestion();
    updateStats();
}

// Display Current Question
function displayQuestion() {
    if (currentQuestionIndex >= filteredQuestions.length) {
        showSummary();
        return;
    }

    const question = filteredQuestions[currentQuestionIndex];
    const originalIndex = sqlQuestions.findIndex(q => q.id === question.id);

    // Update question header
    questionNumber.textContent = `Question ${question.id}`;
    difficultyBadge.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;

    // Update question text
    questionText.textContent = question.question;

    // Update example
    if (question.example) {
        exampleSection.style.display = 'block';
        exampleCode.textContent = question.example;
    } else {
        exampleSection.style.display = 'none';
    }

    // Display options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const optionLetter = document.createElement('span');
        optionLetter.className = 'option-letter';
        optionLetter.textContent = String.fromCharCode(65 + index);
        
        const optionText = document.createElement('span');
        optionText.textContent = option;
        
        optionDiv.appendChild(optionLetter);
        optionDiv.appendChild(optionText);
        
        // Check if this option was previously selected
        if (userAnswers[originalIndex] === index) {
            optionDiv.classList.add('selected');
            if (userAnswers[originalIndex] === question.correct) {
                optionDiv.classList.add('correct');
            } else {
                optionDiv.classList.add('wrong');
            }
            optionDiv.classList.add('disabled');
            showFeedback(userAnswers[originalIndex] === question.correct);
            showExplanation(question.explanation);
        } else if (userAnswers[originalIndex] !== null) {
            if (index === question.correct) {
                optionDiv.classList.add('correct');
            }
            optionDiv.classList.add('disabled');
        } else {
            optionDiv.addEventListener('click', () => selectOption(index, originalIndex));
        }
        
        optionsContainer.appendChild(optionDiv);
    });

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === filteredQuestions.length - 1 ? 'Finish' : 'Next →';

    // Hide feedback and explanation if not answered
    if (userAnswers[originalIndex] === null) {
        feedback.classList.remove('show');
        explanationSection.style.display = 'none';
    }
}

// Select Option
function selectOption(selectedIndex, originalIndex) {
    const question = filteredQuestions[currentQuestionIndex];
    
    userAnswers[originalIndex] = selectedIndex;
    
    if (selectedIndex === question.correct) {
        correctCount++;
    } else {
        wrongCount++;
    }
    
    saveProgress();
    updateStats();
    
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === selectedIndex) {
            option.classList.add('selected');
            if (selectedIndex === question.correct) {
                option.classList.add('correct');
            } else {
                option.classList.add('wrong');
            }
        }
        if (index === question.correct) {
            option.classList.add('correct');
        }
    });
    
    showFeedback(selectedIndex === question.correct);
    showExplanation(question.explanation);
}

// Show Feedback
function showFeedback(isCorrect) {
    feedback.classList.add('show');
    if (isCorrect) {
        feedback.className = 'feedback show correct';
        feedback.textContent = '✓ Correct! Well done!';
    } else {
        feedback.className = 'feedback show wrong';
        feedback.textContent = '✗ Incorrect. Check the explanation below.';
    }
}

// Show Explanation
function showExplanation(explanation) {
    explanationSection.style.display = 'block';
    explanationText.textContent = explanation;
}

// Update Stats
function updateStats() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    progressSpan.textContent = `${answeredCount}/${sqlQuestions.length}`;
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
    
    const score = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    scoreSpan.textContent = `${score}%`;
}

// Navigation
prevBtn?.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

nextBtn?.addEventListener('click', () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showSummary();
    }
});

// Filter Questions
difficultyFilter?.addEventListener('change', (e) => {
    currentQuestionIndex = 0;
    applyFilter();
    displayQuestion();
});

function applyFilter() {
    const filterValue = difficultyFilter?.value || 'all';
    
    if (filterValue === 'all') {
        filteredQuestions = [...sqlQuestions];
    } else {
        filteredQuestions = sqlQuestions.filter(q => q.difficulty === filterValue);
    }
}

// Reset Progress
resetBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        userAnswers = new Array(sqlQuestions.length).fill(null);
        correctCount = 0;
        wrongCount = 0;
        currentQuestionIndex = 0;
        localStorage.removeItem('sqlQuizProgress');
        updateStats();
        displayQuestion();
    }
});

// Show Summary
function showSummary() {
    quizContainer.style.display = 'none';
    summarySection.style.display = 'block';
    
    document.getElementById('final-correct').textContent = correctCount;
    document.getElementById('final-wrong').textContent = wrongCount;
    
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const finalScore = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    document.getElementById('final-score').textContent = `${finalScore}%`;
}

// Restart Quiz
restartBtn?.addEventListener('click', () => {
    summarySection.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestionIndex = 0;
    difficultyFilter.value = 'all';
    applyFilter();
    displayQuestion();
});

// Save Progress to LocalStorage
function saveProgress() {
    const progress = {
        userAnswers,
        correctCount,
        wrongCount,
        currentQuestionIndex
    };
    localStorage.setItem('sqlQuizProgress', JSON.stringify(progress));
}

// Load Progress from LocalStorage
function loadProgress() {
    const saved = localStorage.getItem('sqlQuizProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        userAnswers = progress.userAnswers || new Array(sqlQuestions.length).fill(null);
        correctCount = progress.correctCount || 0;
        wrongCount = progress.wrongCount || 0;
        currentQuestionIndex = progress.currentQuestionIndex || 0;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initTopics();
    initQuiz();
});

// Made with Bob
