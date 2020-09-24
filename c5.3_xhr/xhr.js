const btnNode = document.querySelector('button');
const output = document.querySelector('#result');

function letRequest(num, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://picsum.photos/v2/list?limit=${num}`);
    xhr.onload = function() {
        if (xhr.status != 200) {
            output.innerHTML = `<p>Статус ответа: ${xhr.status}</p>`
        } else {
            const result = JSON.parse(xhr.response);
            callback(result) 
            }
        }
    xhr.onerror = function() {
        output.innerHTML = `<p>Статус ответа: ${xhr.status}</p>`
    }
    xhr.send();
}

function showResult(apiData) {
    let cards = "";
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card" style="margin: 8px;">
                <img
                    src="${item.download_url}"
                    class="card-image"
                    width=300px
                    heigth=auto
                />
            <p>${item.author}</p>
            </div>
        `;
        cards = cards + cardBlock;
    });
    output.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    if (value < 1 || value > 10) {
        output.innerHTML = "<h3>Число вне диапазона</h3>"
    } else if (isNaN(value)){
        output.innerHTML = "<h3>Введено не число</h3>"
    } else {
        letRequest(value, showResult)
    }
})