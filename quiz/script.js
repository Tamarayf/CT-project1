(function ($) {
    var username = "";


	
	var all_questions = [
		{
			question_string: "What is the primary purpose of JavaScript?",
			choices: {
				correct: "Adding interactivity to web pages",
				wrong: ["Styling web pages", "Creating database queries", "Handling server-side logic"]
			}
		},
		
			
		{
			question_string: "In CSS, what property is used to change the text color of an element?",
			choices: {
				correct: "color",
				wrong: ["font-color", "text-color", "foreground-color"]
			}
		},
		{
			question_string: "What does HTML stand for?",
			choices: {
				correct: "HyperText Markup Language",
				wrong: ["High-Level Text Modeling Language", "Hyperlink and Text Management Language", "Home Tool Markup Language"]
			}
		},		
		
		{
			question_string: "Which of the following statements is true about Java?",
			choices: {
				correct: "Java applications are platform-independent",
				wrong: ["Java code must be compiled for a specific operating system", "Java is primarily used for frontend development", "Java was developed by Microsoft"]
			}
		},
		
		{
			question_string: "What is the purpose of the CSS box-sizing property?",
			choices: {
				correct: "To control how the width and height of an element are calculated",
				wrong: ["To set the display type of an element", "To define the color of an element", "To specify the font size of an element"]
			}
		},
		
		{
			question_string: "Which version control system is commonly used in software development?",
			choices: {
				correct: "Git",
				wrong: ["Mercurial", "Subversion", "Perforce"]
			}
		},
		{
			question_string: "What is the purpose of the 'testing' phase in the software development lifecycle?",
			choices: {
				correct: "To identify and fix bugs in the software",
				wrong: ["To design the user interface", "To write the initial code", "To deploy the software to production"]
			}
		},
		{
			question_string: "What is Big O notation used to describe?",
			choices: {
				correct: "Algorithm complexity and performance",
				wrong: ["Variable naming conventions", "Software licensing agreements", "Database table relationships"]
			}
		},
        
		
		
		
	];

    var Quiz = function (quiz_name) {
        this.quiz_name = quiz_name;
        this.questions = [];

        for (var i = 0; i < all_questions.length; i++) {
            var question = new Question(
                i + 1,
                all_questions[i].question_string,
                all_questions[i].choices.correct,
                all_questions[i].choices.wrong
            );
            this.add_question(question);
        }
    };

    Quiz.prototype.add_question = function (question) {
        var index_to_add_question = this.questions.length;
        this.questions.splice(index_to_add_question--, 0, question);
    };

    Quiz.prototype.render = function (container) {
       

        var self = this;

        var question_container = $("<div>")
            .attr("id", "question")
            .appendTo(container);

        function change_question() {
            self.questions[current_question_index].render(question_container);
            $("#prevButton").prop("disabled", current_question_index === 0);
            $("#nextButton").prop(
                "disabled",
                current_question_index === self.questions.length - 1
            );

            var all_questions_answered = true;
            for (var i = 0; i < self.questions.length; i++) {
                if (self.questions[i].user_choice_index === null) {
                    all_questions_answered = false;
                    break;
                }
            }
            $("#name-submit-button").prop("disabled", !all_questions_answered);
;
        }

        var current_question_index = 0;
        change_question();

        $("#prevButton").click(function () {
            if (current_question_index > 0) {
                current_question_index--;
                change_question();
            }
        });

        $("#nextButton").click(function () {
            if (current_question_index < self.questions.length - 1) {
                current_question_index++;
                change_question();
            }
        });

        $("#submitButton").click(function () {
           

            var score = 0;
            for (var i = 0; i < self.questions.length; i++) {
                if (
                    self.questions[i].user_choice_index ===
                    self.questions[i].correct_choice_index
                ) {
                    score++;
                }
            }

            var percentage = score / self.questions.length;

            var scoremessage =
                score + " Out of " + self.questions.length + " questions were correct.";
            var icon = "";
            var chartcolor = "";

            $(".percentage").data("percent", percentage * 100);
            $(".percentage span").text(percentage);

            var message;
            if (percentage === 1) {
                icon = "fa fa-smile-o";
                message = "Great job!";
                chartcolor = "green";
            } else if (percentage >= 0.75) {
                icon = "fa fa-smile-o";
                message = "You did alright.";
                chartcolor = "green";
            } else if (percentage >= 0.5) {
                icon = "fa fa-meh-o";
                message = "Better luck next time.";
                chartcolor = "orange";
            } else {
                icon = "fa fa-meh-o";
                message = "Maybe you should try a little harder.";
                chartcolor = "red";
            }

            $(".score-label h1").html(
                "Hi " + username + ", " + 'Your Score<i class="smiley"></i>'
            );
            $(".message").text(message);
            $(".score-detail h3").text(scoremessage);
            $(".smiley").addClass(icon);
            $("#question-box").hide();
            $("#result").show();
            $(".percentage").easyPieChart({
                animate: 1000,
                lineWidth: 4,
                onStep: function (value) {
                    this.$el.find("span").text(Math.round(value));
                },
                onStop: function (value, to) {
                    this.$el.find("span").text(Math.round(to));
                },
                barColor: chartcolor
            });
            $("#prevButton, #nextButton, #submitButton").hide();
            $(".navigation-buttons #resultButton").show();
        });

        $("#resultButton").click(function () {
            $("#result").hide();
            var table = $("#result-stats table").find("tbody");
            var tr;
            for (var i = 0; i < self.questions.length; i++) {
                tr = $("<tr>");
                if (
                    self.questions[i].user_choice_index ===
                    self.questions[i].correct_choice_index
                ) {
                    tr.append(
                        '<td><i class="fa fa-check-circle"></i>' +
                            self.questions[i].question_string +
                            "</td>"
                    );
                } else {
                    tr.append(
                        '<td><i class="fa fa-times-circle"></i>' +
                            self.questions[i].question_string +
                            "</td>"
                    );
                }
                if (
                    self.questions[i].choices[self.questions[i].user_choice_index] !==
                    undefined
                ) {
                    tr.append(
                        "<td>" +
                            self.questions[i].choices[self.questions[i].user_choice_index] +
                            "</td>"
                    );
                } else {
                    tr.append("<td>" + '<span class="grey">No Attempt</span>' + "</td>");
                }
                tr.append(
                    "<td>" +
                        self.questions[i].choices[self.questions[i].correct_choice_index] +
                        "</td>"
                );
                tr.appendTo(table);
            }
            $("#result-stats").show();
            $("#resultButton").hide();
        });

        question_container.bind("user-select-change", function () {
            var all_questions_answered = true;
            for (var i = 0; i < self.questions.length; i++) {
                if (self.questions[i].user_choice_index === null) {
                    all_questions_answered = false;
                    break;
                }
            }
            $("#submit-button").prop("disabled", !all_questions_answered);
        });
    };

    var Question = function (
        count,
        question_string,
        correct_choice,
        wrong_choices
    ) {
        this.question_string = count + ". " + question_string;
        this.choices = [];
        this.user_choice_index = null;
        this.correct_choice_index = Math.floor(
            Math.random() * wrong_choices.length + 1
        );
        var number_of_choices = wrong_choices.length + 1;
        for (var i = 0; i < number_of_choices; i++) {
            if (i === this.correct_choice_index) this.choices[i] = correct_choice;
            else {
                var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
                this.choices[i] = wrong_choices[wrong_choice_index];
                wrong_choices.splice(wrong_choice_index, 1);
            }
        }
    };

    Question.prototype.render = function (container) {
        var self = this;

        var question_string_h2;
        if (container.children("h2").length === 0) {
            question_string_h2 = $("<h2>").appendTo(container);
        } else {
            question_string_h2 = container.children("h2").first();
        }
        question_string_h2.text(this.question_string);

        if (container.children("label").length > 0) {
            container.children("label").each(function () {
                var radio_button_id = $(this).attr("id");
                $(this).remove();
                container.children("label[for=" + radio_button_id + "]").remove();
            });
        }

        for (var i = 0; i < this.choices.length; i++) {
            var choice_label = $("<label>")
                .attr("for", "choices-" + i)
                .appendTo(container);

            var choice_radio_button = $("<input>")
                .attr("id", "choices-" + i)
                .attr("type", "radio")
                .attr("name", "choices")
                .attr("value", "choices-" + i)
                .attr("class", "option-input radio")
                .attr("checked", i === this.user_choice_index)
                .appendTo(choice_label);

            choice_label.append(this.choices[i]);
        }

        $("input[name=choices]").change(function (index) {
            var selected_radio_button_value = $("input[name=choices]:checked").val();

            self.user_choice_index = parseInt(
                selected_radio_button_value.substr(
                    selected_radio_button_value.length - 1,
                    1
                )
            );

            container.trigger("user-select-change");
        });
    };

   
   

    
    $(document).ready(function () {
        var quiz = new Quiz("My Quiz");

        $("#name-input-box").css("border-bottom", "solid thin white");
        var quiz_container = $("#question-box");
        $(".navigation-buttons").hide();
        $("#result").hide();
        $("#result-stats").hide();

        $("#name-submit-button").click(function (event) {
            event.preventDefault();
            username = $("#name-input-box").val();
            if (username !== "" && username !== undefined) {
                $(".name-box").hide();
                quiz.render(quiz_container);
                $(".navigation-buttons").show();
                $("#resultButton").hide();
            }
        });
        
        });
    })(jQuery);