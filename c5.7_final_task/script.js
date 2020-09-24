const btnNode = document.querySelector('.j-btn');
const output = document.querySelector('#result');

// если введенные пользователем данные валидны - возвращает соответствующий url для запроса 
function checkInputValues() {
    const page = document.querySelector('#j-input-page').value;
    const limit = document.querySelector('#j-input-limit').value;
    
    if ((isNaN(page) || page < 1 || page > 10) && (isNaN(limit) || limit < 1 || limit > 10)) {
        output.innerHTML = "<h3>Номер страницы и лимит вне диапазона от 1 до 10</h3>";
        return null
    } else if (isNaN(page) || page < 1 || page > 10) {
        output.innerHTML = "<h3>Номер страницы вне диапазона от 1 до 10</h3>";
        return null
    } else if (isNaN(limit) || limit < 1 || limit > 10) {
        output.innerHTML = "<h3>Лимит вне диапазона от 1 до 10</h3>";
        return null
    } else {
        return `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    }
}

// принимает url и отправляет по нему запрос
const useRequest = (url) => {
    return fetch(url)
        .then(response => {
            const result = response.json();
            return result
        })
        .then(data => {
            localStorage.setItem('savedData', JSON.stringify(data));
            showResult(data)
        })
        .catch(() => { alert('Что-то пошло не так! Попробуйте снова') });
}

// принимает массив данных, полученных по запросу, и выводит результат на страницу
function showResult(apiData) {
    let cards = "";
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card" style="margin: 8px;">
                <img
                    src="${item.download_url}"
                    class="card-image"
                    width=300px
                    height=auto
                />
            <p>${item.author}</p>
            </div>
        `;
        cards = cards + cardBlock;
    });
    output.innerHTML = cards;
}

btnNode.addEventListener('click', async () => {
    if (checkInputValues() !== null) {
        const url = checkInputValues();
        const result = await useRequest(url);
    }
});

// при наличии в localStorage данных последнего успешного запроса - выводит их на страницу 
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("savedData")) {
        const previousData = JSON.parse(localStorage.getItem('savedData'));
        showResult(previousData);
    }
});