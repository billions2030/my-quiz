// HTML 요소들 연결하기
const startContainer = document.getElementById('start-container');
const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-btn');

const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');
const currentQuestionNumberDisplay = document.getElementById('current-question-number');
const totalQuestionsDisplay = document.getElementById('total-questions-display');

const resultContainer = document.getElementById('result-container');
const userNameResult = document.getElementById('user-name-result');
const totalQuestionsText = document.getElementById('total-questions');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartButton = document.getElementById('restart-btn');

// 격려의 피드백 라이브러리
const feedbackLibrary = {
    "부자의 정의": "부자의 진짜 의미를 고민하는 모습이 정말 멋져요. 돈의 액수보다 내면의 자유와 자존감을 중요하게 생각하는 그 마음, 꼭 간직하세요! (책 23페이지 참고)",
    "부자의 마인드셋": "결핍이 때로는 성장의 가장 큰 동력이 된다는 것을 이해하고 계시네요. 현실에 안주하지 않고 끊임없이 나아가는 당신의 열정을 응원합니다! (책 28페이지 참고)",
    "장기 투자 전략": "시간과 복리의 힘을 믿는 것은 부자로 가는 가장 확실한 길입니다. 눈앞의 작은 파도보다 먼 수평선을 바라보는 지혜, 정말 대단해요! (책 93페이지 참고)",
    "투자 심리": "훌륭한 투자자는 정보의 홍수 속에서도 자신만의 중심을 지킵니다. 대중의 목소리보다 객관적인 사실에 집중하는 연습을 조금만 더한다면, 분명 멋진 기회를 잡으실 수 있을 거예요! (책 96페이지 참고)",
    "인적 자본": "자신의 가치를 높이는 것이 최고의 투자라는 사실을 이미 알고 계시네요. 꾸준히 배우고 성장하는 당신의 미래가 정말 기대됩니다! (책 74페이지 참고)",
    "실행의 중요성": "아무리 좋은 계획도 '실행'이 없다면 꿈에 그친다는 것을 알고 계시는군요. 작은 것이라도 직접 부딪혀보는 용기, 그것이 모든 성공의 시작입니다! (책 61페이지 참고)",
    "자산 배분": "달걀을 한 바구니에 담지 않는 지혜를 배우셨네요. 위험을 나누고 안정적으로 자산을 키워나가는 모습, 정말 현명합니다! (책 50페이지 참고)"
};

// 전체 문제 은행
const questionBank = [
    { question: "이 책에서 저자가 말하는 '부자'의 가장 중요한 기준은 무엇일까요?", answers: [ { text: "금융 자산 100억 원", correct: false }, { text: "경제적 자유를 얻고 남을 부러워하지 않는 사람", correct: true }, { text: "매년 10억 원 이상 소득", correct: false }, { text: "강남의 50평 이상 아파트 소유", correct: false } ], category: "부자의 정의" },
    { question: "책에 따르면, '타고난 풍족함'이 부자가 되는 데 방해가 될 수 있는 가장 큰 이유는 무엇인가요?", answers: [ { text: "상속세 등 세금이 많아서", correct: false }, { text: "주변에 사기꾼이 많이 모여서", correct: false }, { text: "절박함이 없어 저축과 투자의 필요성을 덜 느끼기 때문에", correct: true }, { text: "돈을 낭비하는 습관이 생겨서", correct: false } ], category: "부자의 마인드셋" },
    { question: "워런 버핏이 세계 최고의 부자가 된 비결로 책에서 가장 강조하는 것은 무엇인가요?", answers: [ { text: "단기 기술주 투자", correct: false }, { text: "오랜 시간 동안 '잃지 않는 투자'를 통해 눈덩이를 굴린 것", correct: true }, { text: "운 좋게 복권에 당첨된 것", correct: false }, { text: "유명 경제학자들의 조언", correct: false } ], category: "장기 투자 전략" },
    { question: "30대가 근로 소득을 높이는 데 중점을 둬야 하는 이유는 무엇인가요?", answers: [ { text: "자산 가격은 내 노력으로 올릴 수 없지만, 근로 소득은 가능해서", correct: true }, { text: "투자는 위험하기 때문에", correct: false }, { text: "30대는 원래 돈을 많이 쓰는 시기라서", correct: false }, { text: "부동산을 사기 위해서", correct: false } ], category: "인적 자본" },
    { question: "책에서 '실행하지 않는 지식의 가치는 0'이라고 말한 이유는 무엇일까요?", answers: [ { text: "지식보다 운이 더 중요해서", correct: false }, { text: "지식은 계속 변해서 쓸모없어지기 때문에", correct: false }, { text: "작은 경험이라도 해본 사람만이 막연한 두려움을 이겨낼 수 있어서", correct: true }, { text: "모두가 아는 지식은 차별성이 없어서", correct: false } ], category: "실행의 중요성" },
    { question: "부자가 되는 길의 가장 큰 방해물로 책에서 언급된 것은 무엇인가요?", answers: [ { text: "너무 많이 공부하는 것", correct: false }, { text: "정부의 부동산 정책", correct: false }, { text: "인플레이션(물가 상승)", correct: true }, { text: "친구들과 자주 만나지 않는 것", correct: false } ], category: "부자의 마인드셋" },
    { question: "책에서 '자산 배분의 나침반'으로 삼아야 할 가장 중요한 원칙은 무엇인가요?", answers: [ { text: "예금에만 안전하게 투자하기", correct: false }, { text: "장기적인 관점에서 주식을 중심으로 자산 배분하기", correct: true }, { text: "하나의 유망 종목에 집중 투자하기", correct: false }, { text: "세금은 신경쓰지 않기", correct: false } ], category: "자산 배분" },
    { question: "부모가 자녀에게 물려줘야 할 가장 중요한 유산으로 책에서 강조하는 것은 무엇인가요?", answers: [ { text: "100억 원 상당의 건물", correct: false }, { text: "아무것도 하지 말라는 유언", correct: false }, { text: "스스로 잘살고자 하는 동기와 능력", correct: true }, { text: "최고급 자동차와 명품 시계", correct: false } ], category: "인적 자본" },
    { question: "책에서 30대에게 '보수적인 투자'가 기회비용이 될 수 있다고 말하는 이유는 무엇인가요?", answers: [ { text: "안전 자산은 물가 상승률을 이기기 어려워 구매력을 확보하기 힘들기 때문에", correct: true }, { text: "은행이 파산할 수 있기 때문에", correct: false }, { text: "배당주 투자는 재미가 없기 때문에", correct: false }, { text: "더 많은 세금을 내야 하기 때문에", correct: false } ], category: "장기 투자 전략" },
    { question: "책에서 '학벌'이 아닌 '학력'이 장기적으로 더 중요하다고 강조하는 이유는 무엇인가요?", answers: [ { text: "좋은 인맥을 쌓을 수 있어서", correct: false }, { text: "높은 수준의 전문성이 대체 불가능한 가치를 만들어내기 때문에", correct: true }, { text: "첫 취업에만 유리하기 때문에", correct: false }, { text: "박사 학위가 있어야만 창업할 수 있어서", correct: false } ], category: "인적 자본" }
];

let currentQuestionIndex;
let score;
let wrongCategories;
let userName;
let selectedQuestions = [];

startButton.addEventListener('click', () => {
    userName = nameInput.value;
    if (userName.trim() === "") {
        alert("이름을 입력해주세요!");
        return;
    }
    startContainer.classList.add('hide');
    startQuiz();
});

function startQuiz() {
    selectedQuestions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;
    wrongCategories = [];
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    totalQuestionsDisplay.innerText = selectedQuestions.length;
    showQuestion();
}

function showQuestion() {
    resetState();
    currentQuestionNumberDisplay.innerText = currentQuestionIndex + 1;
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
    } else {
        wrongCategories.push(selectedQuestions[currentQuestionIndex].category);
    }

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    if (selectedQuestions.length > currentQuestionIndex + 1) {
        nextButton.innerText = "다음";
    } else {
        nextButton.innerText = "결과 보기";
    }
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    userNameResult.innerText = userName;
    totalQuestionsText.innerText = selectedQuestions.length;
    scoreText.innerText = score;

    if (wrongCategories.length === 0) {
        feedbackText.innerHTML = "<ul><li>모든 문제를 맞혔습니다! 책의 핵심을 완벽하게 이해하고 계시는군요. 당신의 빛나는 미래를 응원합니다!</li></ul>";
    } else {
        const uniqueWrongCategories = [...new Set(wrongCategories)];
        let feedbackHTML = uniqueWrongCategories.map(category => {
            return `<li><strong>${category}:</strong> ${feedbackLibrary[category]}</li>`;
        }).join('');
        feedbackText.innerHTML = `<ul>${feedbackHTML}</ul>`;
    }

    const resultData = {
        userName: userName,
        score: score,
        totalQuestions: selectedQuestions.length,
        wrongCategories: [...new Set(wrongCategories)]
    };
    
    fetch("https://billions2030.app.n8n.cloud/webhook/3c8270cf-6de6-432d-b363-907a5b0b8f9e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
    })
    .then(response => console.log("N8N으로 데이터 전송 성공!", response))
    .catch(error => console.error("N8N 전송 오류:", error));
}

nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', () => {
    startContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    nameInput.value = "";
});