var kata = {
	sections : [ {
		id : 1,
		name : 'arrays',
		questions : [
				{
					id : 1,
					question : "<strong>Question 1.1 :</strong><br />Implement an algorithm to determine if a string has all unique characters.  What if you can't use additional data structures?",
					answer : [
							"public boolean uniqueChars(String str) {",
							"   for(int index = 0; index < str.length(); index++) {",
							"      if(index != str.lastIndexOf(str.charAt(index))) {",
							"         return false;", "      }", "   }",

							"   return true;", "}" ]
				}, {
					id : 2,
					question : "<strong>Question 1.2 :</strong><br />Implement a function String reverse(String str). You cannot use the Collections library.  See if you can do it in place.",
					answer	: [
					      	   "public String reverse(String str) {",
					      	   "    char[] characters = str.toCharArray();",
					      	   "    char temp = '';",
					      	   "    int len = characters.length;",
					      	   "",
					      	   "    for (int i = 0; i < Math.floor(len / 2); i++) {",
					      	   "        temp = characters[(len - 1) - i];",
					      	   "        characters[(len - 1) - i] = characters[i];",
					      	   "        characters[i] = temp;",
							   "    }",
							   "",
							   "    return String.valueOf(characters);",
							   "}"
					      	   ]
				} ]
	} ],

	prepQA : function(sectionName, questionId) {
		var section, question, answer;
		for (section in kata.sections) {
			section = kata.sections[section];
			if (sectionName == section.name) {
				for (question in section.questions) {
					question = section.questions[question];
					if (questionId == question.id) {
						$('.questions').show();
						$('.question').html(question.question);
						$solution = $('.solution pre');
						$solution.html("");
						for (answer in question.answer) {
							answer = question.answer[answer];
							$solution.append(answer);
							$solution.append("<br />");
						}
					}
				}
			}
		}
		prettyPrint();
	},

	createSidebar : function(section) {
		var listItems = kata.generateListItems(section);
		$('.bs-docs-sidebar').html(
				"<ul class='nav nav-list bs-docs-sidenav " + section.name
						+ "'>" + listItems + "</ul>");
		$('.bs-docs-sidenav li:first-child').addClass('active').children('a').click();
	},

	generateListItems : function(section) {
		var list = "";
		var index = 1;
		var question = {};
		for (question in section.questions) {
			question = section.questions[question];
			list += "<li><a href=\"javascript:;\" " +
					"data-section-name=\"" +section.name+ 
					"\"data-question-id=\"" +question.id+ "\">" + 
					section.id + "." + index + 
					"</a></li>";
			index++;
		}
		return list;
	},

	load : function(sectionName) {
		var section = {};
		for (section in kata.sections) {
			section = kata.sections[section];
			if (sectionName == section.name) {
				kata.createSidebar(section);
			}
		}
	}
};

$(document).on('click', '.bs-docs-sidenav a', function() {
	$('.bs-docs-sidenav li').each(function() {
		$(this).removeClass('active');
	});
	
	$this = $(this);
	$this.parent().addClass('active');
	var sectionName = $this.data('section-name');
	var questionId = $this.data('question-id');
	
	var $answerButton = $('.btn-success');
	if($answerButton.val() == "Hide Answer") {
		$answerButton.click();
	}
	kata.prepQA(sectionName, questionId);
});

$('.dropdown-menu a').on('mouseup', function() {
	var section = $(this).data('target');
	kata.load(section);
});

$('.btn-success').on('click', function() {
	$btn = $(this);
	$('.btn-success').closest('.row-fluid').siblings('.solution').fadeToggle();
	var btnTitle = $btn.val() == "Show Answer" ? "Hide Answer" : "Show Answer";
	$btn.val(btnTitle);
});