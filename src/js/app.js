const questions = [
    {
        question: "Which telescope is the largest and most expensive?", 
        answers: ["James Webb Telescope", "Hubble Telescope", "Subaru Telescope", "Gaia Telescope"],
        correct: 1,
    },
    {
        question: "What is the diameter of the James Webb Telescope's mirror?",
        answers: [
        "2.4 m", 
        "3.6 m",
        "4.8 m",
        "6.5 m"
    ],
        correct: 4,
    },
    {
        question: "What makes the James Webb Telescope different from other space telescopes?",
        answers: [
            "It uses a sunshield",
            "It has cryogenic systems",
            "The main heat source of the spacecraft is the Sun",
            "It has no differences"],
        correct: 1,
    },
    {
        question: "How big is the James Webb Telescope?",
        answers: ["Like a football field", "Like a tennis court", "Like a basketball court", "Like a volleyball court"],
        correct: 2,
    },
    {
        question: "Which precious metal coats the main mirror of the James Webb Telescope?",
        answers: ["Silver", "Platinum", "Gold", "Copper"],
        correct: 3,
    },
    {
        question: "What does the telescope's camera work like?",
        answers: ["A space vacuum cleaner", "A human eye", "A space thermal imager", "An echolocator"],
        correct: 3,
    },
    {
        question: "Why is the main mirror of the James Webb Telescope coated with a precious metal?",
        answers: ["To increase the telescope's cost", "To enhance the mirror’s reflectivity", "For aesthetics", "To protect the telescope from meteoroids"],
        correct: 2,
    },
    {
        question: "What does infrared radiation allow the telescope to do?",
        answers: ["Observe the formation of stars and planetary systems", "Self-cool", "Observe distances over 13.6 billion light-years", "It doesn't provide any benefits"],
        correct: 1,
    },
    {
        question: "What is one disadvantage of the James Webb Telescope?",
        answers: ["It cannot self-cool", "It cannot send images to Earth", "It cannot be repaired if it breaks", "It has no disadvantages"],
        correct: 3,
    },
    {
        question: "Which planet's aurora was photographed by the James Webb Telescope?",
        answers: ["Mars", "Jupiter", "Saturn", "Mercury"],
        correct: 2,
    },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
   const headerTemplate = `<h2 class="title">%title%</h2>`;
   const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
   headerContainer.innerHTML = title;
   let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate = 
        `<li>
        <label>
            <input value="%number%" type="radio" class="answer" name="answer" />
            <span>%answer%</span>
        </label>
    </li>`;
    const answerHTML = questionTemplate
    .replace('%answer%', answerText)
    .replace('%number%', answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
    }
}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    if (!checkedRadio) {
        submitBtn.getBoundingClientRect();
        return;
    }

    const userAnswer = parseInt(checkedRadio.value);
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }
    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    const resultsTemplate = 
    `<h2 class="title">%title%</h2>
    <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>`;
    
    let title, message;

    if (score === questions.length) {
        title = 'Congratulations!';
        message = 'You answered all questions correctly.';
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Not bad!';
        message = 'You got more than half of the answers right.';
    } else {
        title = 'Poor result';
        message = 'You got less than half of the answers correct.';
    }
    
    let result = `${score} out of ${questions.length}`;
    const finalMessage = resultsTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%result%', result);
    
    headerContainer.innerHTML = finalMessage;
    submitBtn.getBoundingClientRect();
    submitBtn.innerText = 'Restart';
    submitBtn.onclick = () => { history.go(); };
}
