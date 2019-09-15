var card = $("#quiz-area")

var quiz = [
    {
      question: "Flight was discovered by",
      answers: ["the Wright Brothers", "the Wrong Brothers", "the Marx Brothers", "the Kennedy Brothers"],
      correctAnswer: "the Wright Brothers"
    },
    {
      question: "Quotes referencing this movie are banned at the Naval Fight Academy",
      answers: ["Cars", "Fast and Furious 7", "Top Gun", "Cars 2"],
      correctAnswer: "Top Gun"
    },
    {
      question: "The most prolific flying ace in WWI was named",
      answers: ["Ernst Udet", "Snoopy", "Manfred von Richtofen", "Max Ritter von Muller"],
      correctAnswer: "Manfred von Richtofen"
    },
    {
      question: "This was the first combat ready fighter-jet",
      answers: ["the Gloster Meteor", "the ME-262", "the P-80 Shooting Star", "the MiG-15"],
      correctAnswer: "the ME-262"
    },
  ];

  var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 60,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();
    $(".card-title").remove();

    for (var i = 0; i < quiz.length; i++) {
      card.append("<h2>" + quiz[i].question + "</h2>");
      for (var j = 0; j < quiz[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + quiz[i].answers[j] + "''>" + quiz[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === quiz[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});