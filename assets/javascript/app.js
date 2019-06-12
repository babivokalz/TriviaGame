var questions = [
  {
    //1
    question:
      "In The Jungle Book who teaches Mowgli about The Bare Necesseties of life?",
    answerChoices: [
      { answer: "Baboo", value: false, isUsed: false },
      { answer: "Banoo", value: false, isUsed: false },
      { answer: "Baloo", value: true, isUsed: false },
      { answer: "Bakoo", value: false, isUsed: false }
    ],
    info: "The correct answer is Baloo!",
    isAnswered: false
  },
  {
    //2
    question: "Which of the following is NOT a nephew of Donald Duck?",
    answerChoices: [
      { answer: "Huey", value: false, isUsed: false },
      { answer: "Stewie", value: true, isUsed: false },
      { answer: "Dewey", value: false, isUsed: false },
      { answer: "Louie", value: false, isUsed: false }
    ],
    info: "The correct answer is Stewie!",
    isAnswered: false
  },
  {
    //3
    question:
      "In the movie Finding Nemo, which country was Nemo been taken to?",
    answerChoices: [
      { answer: "Austria", value: false, isUsed: false },
      { answer: "New Zealand", value: false, isUsed: false },
      { answer: "Australia", value: true, isUsed: true },
      { answer: "Fiji", value: false, isUsed: false }
    ],
    info: "The correct answer is Australia!",
    isAnswered: false
  },
  {
    question: "What does the crocodile swallow in Peter Pan?", //4
    answerChoices: [
      { answer: "A sword", value: false, isUsed: false },
      { answer: "A clock", value: true, isUsed: false },
      { answer: "A shoe", value: false, isUsed: false },
      { answer: "A hook", value: false, isUsed: false }
    ],
    info: "The correct answer is a clock!",
    isAnswered: false
  },
  {
    question: "Which Disney movie features the song Two Worlds?", //5
    answerChoices: [
      { answer: "Aladdin", value: false, isUsed: false },
      { answer: "The Little Mermaid", value: false, isUsed: false },
      { answer: "Frozen", value: false, isUsed: false },
      { answer: "Tarzan", value: true, isUsed: false }
    ],
    info: "The correct answer is Tarzan",
    isAnswered: false
  },
  {
    question: "What is the name of Donald Duck's sister?", //6
    answerChoices: [
      { answer: "Dumbella", value: true, isUsed: false },
      { answer: "Daisy", value: false, isUsed: false },
      { answer: "Darla", value: false, isUsed: false },
      { answer: "Daphne", value: false, isUsed: false }
    ],
    info: "The correct answer is Dumbella!",
    isAnswered: false
  },
  {
    question: "What is Simba's mother's name?", //7
    answerChoices: [
      { answer: "Sarafina", value: false, isUsed: false },
      { answer: "Sarabi", value: true, isUsed: false },
      { answer: "Nala", value: false, isUsed: false },
      { answer: "Kiara", value: false, isUsed: false }
    ],
    info: "The correct answer is Sarabi!",
    isAnswered: false
  },
  {
    question: "From Monster's Inc., what is Boo's real name?", //8
    answerChoices: [
      { answer: "Mary", value: true, isUsed: false },
      { answer: "Cindy", value: false, isUsed: false },
      { answer: "Bonnie", value: false, isUsed: false },
      { answer: "Hannah", value: false, isUsed: false }
    ],
    info: "The correct answer is Mary!",
    isAnswered: false
  },
  {
    question: "How many older brother's does Prince Hans have?", //9
    answerChoices: [
      { answer: "8", value: false, isUsed: false },
      { answer: "10", value: false, isUsed: false },
      { answer: "12", value: true, isUsed: false },
      { answer: "13", value: false, isUsed: false }
    ],
    info: "The correct answer is 12!",
    isAnswered: false
  },
  {
    question: "How many years was Genie stuck in the lamp?", //10
    answerChoices: [
      { answer: "5,000 years", value: false, isUsed: false },
      { answer: "8,000 years", value: false, isUsed: false },
      { answer: "9,000 years", value: false, isUsed: false },
      { answer: "10,000 years", value: true, isUsed: false }
    ],
    info: "The correct answer is 10,000 years!",
    isAnswered: false
  }
];

var TESTING_MODE = false;
var TIME_REMAINING = TESTING_MODE ? 1 : 15;
var DELAY_ANSWER = TESTING_MODE ? 0 : 1500;
var DELAY_QUESTION = TESTING_MODE ? 0 : 7000;

var clockId;
var clockRunning = false;
var timer = 0;
var timerLimit;
var countRight = 0;
var countWrong = 0;
var countUnanswered = 0;
var pickedAnswer = false;

function resetGame() {
  for (var i = 0; i < questions.length; i++) {
    for (var j = 0; j < questions[i].answerChoices.length; j++) {
      questions[i].answerChoices[j].isUsed = false;
    }
    questions[i].isAnswered = false;
  }

  countRight = 0;
  countWrong = 0;
  countUnanswered = 0;
  pickedAnswer = false;

  $(".restart-area").hide();
  $(".question-area").show();
}

function startTimer() {
  if (!clockRunning) {
    clockId = setInterval(countTimer, 1000);
    clockRunning = true;
  }
}

function stopTimer() {
  clearInterval(clockId);
  clockRunning = false;
}

function countTimer() {
  if (timeLimit == 0) {
    stopTimer();
    if (countRight + countWrong + countUnanswered < questions.length) {
      answerNone();
    }
  } else {
    timeLimit--;
  }
  $(".timer").text(timeLimit);
}

function printBsCard() {
  $("table").append(
    "<div class=\"card border-dark\">\
    <div class='card-body bg-secondary'><h5 class='card-title'>Card Title</h5><h6 class='card-subtitle mb-2 text-muted'>Card Subtitle</h6><p class='card-text'>Body</p></div></div>"
  );
}

function printStatus(flag) {
  var correctAns = $(".answer-right").text();
  var correctIndex = $(".answer-right").attr("index");

  if (flag == "none") {
    $("table").empty();
    printBsCard();
    $(".card-title").text("You're out of time!");
    $(".card-subtitle").text("The correct answer is " + correctAns);
    $(".card-text").text(questions[correctIndex].info);
  }
  if (flag == "right") {
    $("table").empty();
    printBsCard();
    $(".card-title").text("Wow! You're a true Disney fan!");
    $(".card-subtitle").text("");
    $(".card-text").text(questions[correctIndex].info);
  }
  if (flag == "wrong") {
    $("table").empty();
    printBsCard();
    $(".card-title").text("Sorry! Better luck next time!");
    $(".card-subtitle").text("The correct answer is " + correctAns);
    $(".card-text").text(questions[correctIndex].info);
  }
  if (flag == "done") {
    $("table").empty();
    printBsCard();
    $(".card-title").text("Yay! Let's see how you did!");
    $(".card-subtitle").text("");
    $(".card-text").html("<ul></ul>");
    $("ul").append("<li>Correct Answers: " + countRight + "</li>");
    $("ul").append("<li>Incorrect Answers: " + countWrong + "</li>");
    $("ul").append("<li>Unanswered: " + countUnanswered + "</li>");

    $(".status-area").hide();
    $(".restart-area").show();
  }
}

function answerNone() {
  countUnanswered++;
  updateStatus();
  stopTimer();

  setTimeout(function() {
    printStatus("none");
  }, DELAY_ANSWER);
  setTimeout(printQuestions, DELAY_QUESTION);

  if (countRight + countWrong + countUnanswered >= questions.length) {
    setTimeout(function() {
      printStatus("done");
    }, DELAY_ANSWER);
  }
}

function answerRight() {
  countRight++;
  colorAnswers();
  updateStatus();
  stopTimer();

  setTimeout(function() {
    printStatus("right");
  }, DELAY_ANSWER);
  if (countRight + countWrong + countUnanswered < questions.length) {
    setTimeout(printQuestions, DELAY_QUESTION);
  } else {
    setTimeout(function() {
      printStatus("done");
    }, DELAY_ANSWER);
  }
}

function answerWrong() {
  countWrong++;
  colorAnswers();
  updateStatus();
  stopTimer();

  setTimeout(function() {
    printStatus("wrong");
  }, DELAY_ANSWER);
  if (countRight + countWrong + countUnanswered < questions.length) {
    setTimeout(printQuestions, DELAY_QUESTION);
  } else {
    setTimeout(function() {
      printStatus("done");
    }, DELAY_ANSWER);
  }
}

function colorAnswers() {
  $(".answer-picked").css("font-weight", "bolder");
  $(".answer-wrong").addClass("bg-danger");
  $(".answer-wrong").css("color", "#111");
  $(".answer-right").addClass("bg-success");
  $(".answer-right").css("color", "#333");
}

function updateStatus() {
  $(".questions").text(
    questions.length - (countRight + countWrong + countUnanswered)
  );
  $(".correct").text(countRight);
  $(".incorrect").text(countWrong);
}

function startPage() {
  $(".start-area").show();
  $(".status-area").hide();
  $(".question-area").hide();
  $(".restart-area").hide();
}

function resetQuestionDisplay() {
  $("table").empty();
  pickedAnswer = false;
  timeLimit = TIME_REMAINING;
  startTimer();
}

function preNumToChar(number) {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[number - 1];
}

function printQuestions() {
  var randomAns;
  var randomQue;
  var answerCount = 0;
  var questionCount = countRight + countWrong + countUnanswered;

  resetQuestionDisplay();

  while (questionCount < questions.length) {
    randomQue = Math.floor(math.random() * questions.length);

    if (!questions[randomQue].isAnswered) {
      break;
    }
  }

  if (questionCount < questions.length) {
    if (!questions[randomQue].isAnswered) {
      $("table")
        .append("<thead>")
        .append("<tbody>");
      $("thead").append("<tr>");
      $("tr").append("<th>");
      $("th").text(questions[randomQue].question);
      questions[randomQue].isAnswered = true;

      while (answerCount < questions[randomQue].answerChoices.length);
      if (!questions[randomQue].answerChoices[randomAns].isUsed) {
        answerCount++;

        var answerTr = $("<tr>");
        var answerTd = $("<td>").text(
          preNumToChar(answerCount) +
            ": " +
            questions[randomQue].answerChoices[randomAns].answer
        );

        if (questions[randomQue].answerChoices[randomAns].value) {
          answerTd.attr("value", "true");
          answerTd.attr("index", randomQue);
          answerTd.attr("class", "answer answer-right");
        } else {
          answerTd.attr("class", "answer answer-wrong");
        }

        answerTr.append(answerTd);
        $("tbody").append(answerTr);
        questions[randomQue].answerChoices[randomAns].isUsed = true;
      }
    }
  }
}
function startGame() {
  $(".start-area").hide();
  $(".status-area").show();
  $(".question-area").show();

  printQuestions();
  updateStatus();
}

$(document).ready(function() {
  startPage();

  $(document).on("click", ".start-button", function(event) {
    event.preventDefault();
    startGame();
  });
  $(document).on("click", ".answer", function(event) {
    if (!pickedAnswer) {
      $(this).addClass("answer-picked");
      pickedAnswer = true;

      if ($(this).attr("value") == "true") {
        answerRight();
      } else {
        answerWrong();
      }
    }
  });
  $(document).on("click", ".restart-button", function(event) {
    resetGame();
    printQuestions();
    updateStatus();
  });
});
