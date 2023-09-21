let xhr = new XMLHttpRequest();
xhr.responseType = 'json';
let items = document.querySelector('#items');
let loader = document.querySelector('#loader');
let arr = [];
let fromLocalStorage = localStorage.getItem('preloader');

if (fromLocalStorage === null) {
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.send();
    
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let answer = xhr.response;
            
            renderAnswer(answer);
            localStorage.setItem('preloader', xhr.responseText);
        }    
    });

} else {

    let answer = JSON.parse(fromLocalStorage);

    renderAnswer(answer);

    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.send();

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            answer = xhr.responseText;

            renderAnswer(answer);
            localStorage.setItem('preloader', xhr.responseText);
        }    
    });

    
}

function renderAnswer(answer) {
    for (let valute in answer.response.Valute) {
        arr.push(answer.response.Valute[valute]);
    }

    let render = arr.map(el => `
        <div class="item">
            <div class="item__code">
                ${el.CharCode}
            </div>
            <div class="item__value">
                ${el.Value}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `);

    items.innerHTML = render.join('');
    arr = [];
    loader.className = 'loader';
}