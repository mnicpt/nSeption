/*jslint devel: true */

define(function () {
    "use strict";

    var current_row,
        solution = [],
        game = function() { return document.querySelector(".game"); },
        marbleContainer = function() { return document.querySelector(".marbles"); },
        row_template = function() { return document.querySelector(".row.template"); },
        marbleTemplate = function() { return document.querySelector(".marble.template"); },
        restartBtn = function() { return document.querySelector(".restartBtn"); },
        colors = ["red", "blue", "yellow", "orange", "green", "brown", "white", "black"],
        solution_marbles = function () {
            return document.querySelectorAll(".solution .marble");
        },
        rows = function () {
            return document.querySelectorAll(".game .row");
        },
        marbles = function () {
            return document.querySelectorAll(".marbles .marble");
        },
        current_marbles = function () {
            return document.querySelectorAll(".current .guess .marble");
        },
        check_buttons = function () {
            return document.querySelectorAll(".solveBtn");
        },
        hints = function () {
            return document.querySelectorAll(".current.row .hints .pin");
        };

    function init() {
        configureRestartButton();
        generateMarbles();
        restart();
    }

    function restart() {
        current_row = 9;
        generateSolution();
        generateGuessRows();
        configureDragStartEvents();
        configureDragOverDropEvents();
        configureCheckButton();
    }

    function generateSolution() {
        solution = shuffle(colors).slice(0, 4);
        for (var i = 0; i < solution_marbles().length; i++) {
            solution_marbles()[i].className = "marble " + solution[i] + " hidden";
        }
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex, shuffledArray = array.slice(0);

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = shuffledArray[currentIndex];
            shuffledArray[currentIndex] = shuffledArray[randomIndex];
            shuffledArray[randomIndex] = temporaryValue;
        }

        return shuffledArray;
    }

    function generateGuessRows() {
        game().innerHTML = "";
        for (var i = 0; i < 10; i++) {
            var clonedRow = row_template().cloneNode(true);
            clonedRow.style.display = "flex";

            if (i === current_row) {
                clonedRow.className = "row current";
            }

            game().appendChild(clonedRow);
        }
    }

    function generateMarbles() {
        marbleContainer().innerHTML = "";
        for (var i = 0; i < colors.length; i++) {
            var newMarble = marbleTemplate().cloneNode(true);
            newMarble.style.display = "block";
            newMarble.className = "marble " + colors[i];
            marbleContainer().appendChild(newMarble);
        }
    }

    function configureDragStartEvents() {
        for (var i = 0; i < marbles().length; i++) {
            marbles()[i].addEventListener("dragstart", dragstart);
        }
    }

    function dragstart(e) {
        e.dataTransfer.setData("marble", e.target.className.split(" ")[1]);
    }

    function dragover(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();

        var marbleColor = e.dataTransfer.getData("marble");

        // get all marble in current row and validate duplicates
        var foundSimilar = false;
        for (var i = 0; i < current_marbles().length; i++) {
            var marble = current_marbles()[i];
            if (marble.className.indexOf(marbleColor) !== -1) {
                foundSimilar = true;
                break;
            }
        }

        if (!foundSimilar) {
            e.target.className = "marble " + marbleColor;
        }
    }

    function configureDragOverDropEvents() {
        for (var i = 0; i < current_marbles().length; i++) {
            current_marbles()[i].addEventListener("dragover", dragover);
            current_marbles()[i].addEventListener("drop", drop);
        }
    }

    function configureCheckButton() {
        for (var i = 0; i < check_buttons().length; i++) {
            check_buttons()[i].addEventListener("click", clickCheckBtn);
        }
    }

    function clickCheckBtn(e) {
        validateChoice(e);
    }

    function validateChoice(e) {
        if(validateAllSlotsChosen(e)) {
            validateGuess();
            moveToNextGuess();
        }
    }

    function moveToNextGuess() {
        for (var i = 0; i < current_marbles().length; i++) {
            current_marbles()[i].removeEventListener("dragover", dragover);
            current_marbles()[i].removeEventListener("drop", drop);
        }

        current_row--;
        changeCurrentRow();
        configureDragOverDropEvents();
    }

    function validateAllSlotsChosen(e) {
        for (var i = 0; i < current_marbles().length; i++) {
            if (current_marbles()[i].className.split(" ").length === 1) {
                e.preventDefault();
                return false;
            }
        }

        return true;
    }

    function validateGuess() {
        var current_hints = {
            red: 0,
            white: 0
        };

        // validate against solution
        for (var i = 0; i < current_marbles().length; i++) {
            if (current_marbles()[i].className.split(" ")[1] === solution[i]) {
                current_hints.red += 1;
            } else if (solution.includes(current_marbles()[i].className.split(" ")[1])) {
                current_hints.white += 1;
            }
        }

        // render hints
        for (var i = 0; i < current_hints.red; i++) {
            hints()[i].className = "pin red";
        }

        for (var j = current_hints.red; j < (current_hints.red + current_hints.white); j++) {
            hints()[j].className = "pin white";
        }

        // determine solved
        if (current_hints.red === 4) {
            showSolution();
            alert("You win!");
            return;
        } else if (current_row === 0) {
            showSolution();
            alert("Sorry, try again.");
            return;
        }
    }

    function showSolution() {
        for (var i = 0; i < solution_marbles().length; i++) {
            solution_marbles()[i].className = "marble " + solution_marbles()[i].className.split(" ")[1];
        }
    }

    function changeCurrentRow() {
        for (var i = 0; i < rows().length; i++) {
            rows()[i].className = "row";
        }

        rows()[current_row].className = "row current";
    }

    function configureRestartButton() {
        restartBtn().addEventListener("click", function () {
            restart();
        });
    }

    return {
        init : init
    };
});
