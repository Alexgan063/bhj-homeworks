const poollTitle = document.getElementById('poll__title');
const pollAnswersList = document.getElementById('poll__answers');

let id;
let title;
let answers;

let xhr = new XMLHttpRequest();



function showAndUpdateAns(event) {
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.send();
    xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        [...pollAnswersList.children].map((i) => i.remove());
        let answer = JSON.parse(xhr.responseText);
        id = answer.id;
        title = answer.data.title;
        answers = answer.data.answers;

        poollTitle.innerHTML = title;
      answers.forEach((item) => {
        pollAnswersList.innerHTML += `
                  <button class="poll__answer">
                      ${item}
                  </button>
              `;
      });
      answers = Array.from(document.querySelectorAll(".poll__answer"));

      answers.forEach((el) => {
        el.addEventListener("click", function () {
          alert("Спасибо, ваш голос засчитан!");
          updateAnswers();
        });
      });
    }
  });
}
showAndUpdateAns();