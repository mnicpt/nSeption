var kata = {
    sections : [ {
        id : 1,
        name : 'arrays',
        questions : [
                {
                    id : 1,
                    code : "",
                    input : "abcd",
                    output : "true",
                    question : "<strong>Question 1.1 :</strong><br />Implement an algorithm to determine if a string has all unique characters.  What if you can't use additional data structures?",
                    answer : [ "public boolean uniqueChars(String str) {",
                            "   for(int index = 0; index < str.length(); index++) {",
                            "      if(index != str.lastIndexOf(str.charAt(index))) {", "         return false;",
                            "      }", "   }",

                            "   return true;", "}" ]
                },
                {
                    id : 2,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.2 :</strong><br />Implement a function String reverse(String str). You cannot use the Collections library.  See if you can do it in place.",
                    answer : [ "public String reverse(String str) {", "    char[] characters = str.toCharArray();",
                            "    char temp = '';", "    int len = characters.length;", "",
                            "    for (int i = 0; i < Math.floor(len / 2); i++) {",
                            "        temp = characters[(len - 1) - i];",
                            "        characters[(len - 1) - i] = characters[i];", "        characters[i] = temp;",
                            "    }", "", "    return String.valueOf(characters);", "}" ]
                },
                {
                    id : 3,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.3 :</strong><br />Given two strings, write a method to decide if one is a permutation of the other.",
                    answer : [ "public static boolean permutation(String str1, String str2) {", "    //check length",
                            "    if(str1.length() != str2.length()) {", "        return false;", "    } else {",
                            "        //check same characters", "        char[] str1Chars = str1.toCharArray();",
                            "        char[] str2Chars = str2.toCharArray();",
                            "        for(int i = 0; i < str1.length(); i++) {",
                            "            int index = str2.indexOf(str1Chars[i]);",
                            "            if(str2.indexOf(index == -1) {", "                return false;",
                            "            }", "            str2Chars[index] = ' ';",
                            "            string2 = String.valueOf(str2Chars);", "        }", "    }",
                            "    return true;", "}" ]
                },
                {
                    id : 4,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.4 :</strong><br />Write a method to encode all spaces in a string with %20.  Perform in place.",
                    answer : [ "Answer to come..." ]
                },
                {
                    id : 5,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.5 :</strong><br />Implement a method to compress a string using the counts of repeated characeters.  For example, aabcccd, would become a2bc3d.",
                    answer : [ "Answer to come..." ]
                },
                {
                    id : 6,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.6 :</strong><br />Given an image by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees.  Do this in place.",
                    answer : [ "Answer to come..." ]
                },
                {
                    id : 7,
                    code : "",
                    input : "",
                    output : "",
                    question : "<strong>Question 1.7 :</strong><br />Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.",
                    answer : [ "Answer to come..." ]

                } ]
    } ],

    prepQA : function(sectionName, questionId) {
        var section, question, answer, $solution;
        for (section in kata.sections) {
            section = kata.sections[section];
            if (sectionName === section.name) {
                for (question in section.questions) {
                    question = section.questions[question];
                    if (questionId === question.id) {
                        $('.questions').show();
                        $('.codeIt textarea').val(question.code);
                        $('.codeIt').show();
                        $('.question').html(question.question).data('number', questionId);
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
                "<ul class='nav nav-list bs-docs-sidenav " + section.name + "'>" + listItems + "</ul>");
        $('.bs-docs-sidenav li:first-child').addClass('active').children('a').click();
    },

    generateListItems : function(section) {
        var list = "";
        var index = 1;
        var question = {};
        for (question in section.questions) {
            question = section.questions[question];
            list += "<li><a href=\"javascript:;\" " + "data-section-name=\"" + section.name + "\"data-question-id=\"" +
                    question.id + "\">" + section.id + "." + index + "</a></li>";
            index++;
        }
        return list;
    },

    load : function(sectionName) {
        var section = {};
        for (section in kata.sections) {
            section = kata.sections[section];
            if (sectionName === section.name) {
                kata.createSidebar(section);
            }
        }
    }
};

$(document).on('keyup', '.codeIt textarea', function() {
    var questionId = $('.question').data('number');
    kata.sections[0].questions[parseInt(questionId, 10) - 1].code = $(this).val();// TODO
                                                                                    // change
                                                                                    // section
                                                                                    // id
                                                                                    // to
                                                                                    // be
                                                                                    // dynamic
});

$(document).on('click', '.bs-docs-sidenav a', function() {
    $('#correctAnswer').text("");
    $('.bs-docs-sidenav li').each(function() {
        $(this).removeClass('active');
    });

    var $this = $(this);
    $this.parent().addClass('active');
    var sectionName = $this.data('section-name');
    var questionId = $this.data('question-id');

    var $answerButton = $('.btn-success');
    if ($answerButton.val() === "Hide Answer") {
        $answerButton.click();
    }
    kata.prepQA(sectionName, questionId);
});

$('.dropdown-menu a').on('click', function(e) {
    e.preventDefault();
    var section = $(this).attr('href');
    kata.load(section);
});

$('#solveBtn').on('click', function() {
    var questionId = $('.question').data('number');
    var solution = "(function(){" + $('textfield .codeIt').val() + "})();";
    var $correctAnswer = $('#correctAnswer');

    if (solution === kata.sections[0].questions[parseInt(questionId, 10) - 1].output) { // TODO
                                                                                        // change
                                                                                        // section
                                                                                        // id
                                                                                        // to
                                                                                        // be
                                                                                        // dynamic
        $correctAnswer.addClass("correct");
        $correctAnswer.text("Correct!");
    } else {
        $correctAnswer.addClass("incorrect");
        $correctAnswer.text("Incorrect!");
    }
});

$('.btn-success').on('click', function() {
    var $btn = $(this);
    $('.btn-success').closest('.row-fluid').siblings('.solution').fadeToggle();
    var btnTitle = $btn.val() === "Show Answer" ? "Hide Answer" : "Show Answer";
    $btn.val(btnTitle);

    var $codeItSection = $('.codeIt');
    if ("Hide Answer" === btnTitle) {
        $codeItSection.hide();
    } else {
        $codeItSection.show();
    }
});