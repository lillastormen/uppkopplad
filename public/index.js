import quiz from "./quiz/quiz.js";

quiz.loadQuiz(2);

function includeHTML() {

    const includes = document.querySelectorAll('[data-include]');

    includes.forEach(element => {
        const file = element.getAttribute('data-include');

        fetch(file)
            .then(response => response.text())
            .then(html => {element.innerHTML = html;
        });
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);
