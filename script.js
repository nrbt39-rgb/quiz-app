// クイズ問題データ（answer は正解の choices のインデックス）
const questions = [
  {
    question: "日本で一番高い山はどれ？",
    choices: ["北岳", "奥穂高岳", "富士山", "槍ヶ岳"],
    answer: 2,
    explanation: "富士山の標高は3,776mで、日本一高い山です。",
  },
  {
    question: "太陽系の惑星の中で、一番大きい惑星はどれ？",
    choices: ["土星", "木星", "地球", "海王星"],
    answer: 1,
    explanation: "木星は太陽系最大の惑星で、直径は地球の約11倍です。",
  },
  {
    question: "1年が366日になる年のことを何という？",
    choices: ["平年", "閏年", "厄年", "還暦"],
    answer: 1,
    explanation: "2月29日がある年を閏年（うるうどし）といいます。",
  },
  {
    question: "1気圧のもとで、水が沸騰する温度はおよそ何℃？",
    choices: ["50℃", "80℃", "100℃", "120℃"],
    answer: 2,
    explanation: "1気圧のもとでは、水はおよそ100℃で沸騰します。",
  },
  {
    question: "「三寒四温」はどの季節の天気を表す言葉？",
    choices: ["冬から春にかけて", "春から夏にかけて", "夏から秋にかけて", "秋から冬にかけて"],
    answer: 0,
    explanation: "寒い日が3日ほど続いた後に暖かい日が4日ほど続く、冬から春先の天気を表す言葉です。",
  },
  {
    question: "日本の都道府県はいくつある？",
    choices: ["43", "45", "47", "50"],
    answer: 2,
    explanation: "1都・1道・2府・43県で、合計47都道府県です。",
  },
  {
    question: "「1ダース」はいくつのこと？",
    choices: ["6", "10", "12", "20"],
    answer: 2,
    explanation: "1ダースは12個のことです。鉛筆などを数えるときによく使われます。",
  },
  {
    question: "光の三原色に含まれない色はどれ？",
    choices: ["赤", "緑", "青", "黄"],
    answer: 3,
    explanation: "光の三原色は赤・緑・青（RGB）です。黄は色の三原色（シアン・マゼンタ・イエロー）に含まれます。",
  },
  {
    question: "日本の国会を構成するのは、衆議院と何院？",
    choices: ["貴族院", "参議院", "枢密院", "元老院"],
    answer: 1,
    explanation: "日本の国会は、衆議院と参議院の二院制です。",
  },
  {
    question: "「猫に小判」とほぼ同じ意味のことわざはどれ？",
    choices: ["豚に真珠", "猿も木から落ちる", "犬も歩けば棒に当たる", "弘法も筆の誤り"],
    answer: 0,
    explanation: "どちらも「価値のわからない者に貴重な物を与えても役に立たない」という意味です。",
  },
];

// 画面要素
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

let currentIndex = 0;
let score = 0;

// 指定した画面だけを表示する
const showScreen = (screen) => {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
};

const startQuiz = () => {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  showQuestion();
};

const showQuestion = () => {
  const q = questions[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.classList.add("hidden");

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(btn);
  });
};

const selectAnswer = (selectedIndex) => {
  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  const isCorrect = selectedIndex === q.answer;

  // 回答後は選択肢を押せないようにし、正解・不正解を色で示す
  buttons.forEach((btn) => (btn.disabled = true));
  buttons[q.answer].classList.add("correct");
  if (isCorrect) {
    score++;
    feedbackEl.textContent = `⭕ 正解！ ${q.explanation}`;
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedbackEl.textContent = `❌ 不正解… 正解は「${q.choices[q.answer]}」です。${q.explanation}`;
    feedbackEl.classList.add("incorrect");
  }

  nextBtn.textContent = currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextBtn.classList.remove("hidden");
};

const nextQuestion = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

const showResult = () => {
  showScreen(resultScreen);
  scoreEl.textContent = `${questions.length}問中${score}問正解`;

  if (score === questions.length) {
    messageEl.textContent = "全問正解！すばらしい！";
  } else if (score >= questions.length * 0.6) {
    messageEl.textContent = "よくできました！";
  } else {
    messageEl.textContent = "もう一度挑戦してみましょう！";
  }
};

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("retry-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
