define(function() {
	var kata = {
		sections : {
			arrays : {
				1 : {
					code : "",
					input : [ "abcd" ],
					output : true,
					question : "<strong>Question 1.1 :</strong><br />Implement an algorithm to determine if a string has all unique characters.  What if you can't use additional data structures?",
					answer : [
							"public boolean uniqueChars(String str) {",
							"   for(int index = 0; index < str.length(); index++) {",
							"      if(index != str.lastIndexOf(str.charAt(index))) {",
							"         return false;", "      }", "   }",

							"   return true;", "}" ]
				},
				2 : {
					code : "",
					input : [ "abcd" ],
					output : "dcba",
					question : "<strong>Question 1.2 :</strong><br />Implement a function String reverse(String str). You cannot use the Collections library.  See if you can do it in place.",
					answer : [
							"public String reverse(String str) {",
							"    char[] characters = str.toCharArray();",
							"    char temp = '';",
							"    int len = characters.length;",
							"",
							"    for (int i = 0; i < Math.floor(len / 2); i++) {",
							"        temp = characters[(len - 1) - i];",
							"        characters[(len - 1) - i] = characters[i];",
							"        characters[i] = temp;", "    }", "",
							"    return String.valueOf(characters);", "}" ]
				},
				3 : {
					code : "",
					input : [ "abcdefg", "gdbacef" ],
					output : true,
					question : "<strong>Question 1.3 :</strong><br />Given two strings, write a method to decide if one is a permutation of the other.",
					answer : [
							"public static boolean permutation(String str1, String str2) {",
							"    //check length",
							"    if(str1.length() != str2.length()) {",
							"        return false;",
							"    } else {",
							"        //check same characters",
							"        char[] str1Chars = str1.toCharArray();",
							"        char[] str2Chars = str2.toCharArray();",
							"        for(int i = 0; i < str1.length(); i++) {",
							"            int index = str2.indexOf(str1Chars[i]);",
							"            if(str2.indexOf(index == -1) {",
							"                return false;", "            }",
							"            str2Chars[index] = ' ';",
							"            string2 = String.valueOf(str2Chars);",
							"        }", "    }", "    return true;", "}" ]
				},
				4 : {
					code : "",
					input : "Keep practicing your skills",
					output : "Keep%20practicing%20your%20skills",
					question : "<strong>Question 1.4 :</strong><br />Write a method to encode all spaces in a string with %20.  Perform in place.",
					answer : [ "Answer to come..." ]
				},
				5 : {
					code : "",
					input : "aabcccd",
					output : "a2bc3d",
					question : "<strong>Question 1.5 :</strong><br />Implement a method to compress a string using the counts of repeated characeters.  For example, aabcccd, would become a2bc3d.",
					answer : [ "Answer to come..." ]
				},
				6 : {
					code : "",
					input : "",
					output : "",
					question : "<strong>Question 1.6 :</strong><br />Given an image by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees.  Do this in place.",
					answer : [ "Answer to come..." ]
				},
				7 : {
					code : "",
					input : "",
					output : "",
					question : "<strong>Question 1.7 :</strong><br />Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.",
					answer : [ "Answer to come..." ]

				}
			}
		},

		prepQA : function(sectionName, questionId) {
			var section, question, answer;
			questions = kata.sections[sectionName];

			question = questions[questionId];

			// show question
			$('.codeIt textarea').val(question.code);
			$('.codeIt').show();
			$('.question').html(question.question).data({
				number : questionId,
				section : sectionName
			});

			// set answer
			$solution = $('.solution pre');
			$solution.html("");
			for (answer in question.answer) {
				answer = question.answer[answer];
				$solution.append(answer);
				$solution.append("<br />");
			}

			prettyPrint();
		}
	};

	$(document).on('keyup', '.codeIt textarea',
		function() {
			var 
				$question = $('.question'),
				id = $question.data('number'), 
				name = $question.data('section');
	
			kata.sections[name][parseInt(id, 10)].code = $(this).val();
		});

	$(document).on('click', '.bs-docs-sidenav a', function() {
		$parent = $(this).parent();
		$('.nav-list > li').each(function() {
			$(this).removeClass('active');
		});
		$parent.addClass('active');
		var sectionName = $parent.data('section-name');
		var questionId = $parent.data('question-id');

		var $answerButton = $('.btn.answer');
		if ($answerButton.val() == "Hide Answer") {
			$answerButton.click();
		}
		$('#correctAnswer').hide();
		kata.prepQA(sectionName, questionId);
	});

	$(document).on('click', '#solveBtn', function() {
		var $question = $('.question'), questionId = $question
				.data('number'), section = $question
				.data('section'), $correctAnswer = $('#correctAnswer');
		try {
			var solution = eval("var args = '"
					+ kata.sections[section][parseInt(
							questionId, 10)].input
					+ "';(function(){"
					+ kata.sections[section][parseInt(
							questionId, 10)].code + "})();");
			$correctAnswer.removeClass();
			$correctAnswer.show();
			if (solution === kata.sections[section][parseInt(questionId, 10)].output) {
				$correctAnswer.addClass("correct");
				$correctAnswer.text("Correct!");
			} else {
				$correctAnswer.addClass("incorrect");
				$correctAnswer.text("Incorrect!");
			}
		} catch (e) {
			$correctAnswer.addClass("incorrect");
			$correctAnswer.text(e.message);
		}
	});

	$(document).on('click', '.btn.answer',
		function() {
			$btn = $(this);
			$btn.closest('.row-fluid').siblings('.solution')
					.fadeToggle();
			var btnTitle = $btn.val() == "Show Answer" ? "Hide Answer"
					: "Show Answer";
			$btn.val(btnTitle);

			var $codeItSection = $('.codeIt');
			if ("Hide Answer" == btnTitle) {
				$codeItSection.hide();
			} else {
				$codeItSection.show();
			}
			$('#correctAnswer').removeClass();
		});
	
	return {
		load : function(sectionName) {
			$('#topics').hide();

			// prepare navlist
			var $navlist = $('.nav-list > li'), i;
			for (i = 0; i < $navlist.length; i++) {
				$($navlist[i]).data('section-name', sectionName);
				$($navlist[i]).data('question-id', (i + 1));
			}
			$('.nav-list > li').each(function() {
				$(this).removeClass('active');
			});
			$('.nav-list > li:first-child').addClass('active');

			$('.questions').show();

			// get questions and answers for first nav item
			kata.prepQA(sectionName, 1);
		},
	};
});