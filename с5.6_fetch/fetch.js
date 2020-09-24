const btnNode = document.querySelector('.j-btn');
const output = document.querySelector('#result');

// если введенные пользователем данные валидны - возвращает соответствующий url для запроса 
function checkInputValues() {
    const width = document.querySelector('.j-input-w').value;
    const heigth = document.querySelector('.j-input-h').value;
    
    if (width === "" || heigth === "") {
        output.innerHTML = "<h3>Заполните все поля!</h3>";
        return null
    } else if (isNaN(width) || isNaN(heigth)) {
        output.innerHTML = "<h3>Будьте вниамтельны! Вводить нужно целые числа в диапазоне: 100 - 300</h3>";
        return null
    } else if (width && (width < 100 || width > 300) || heigth && (heigth < 100 || heigth > 300)) {
        output.innerHTML = "<h3>Будьте вниамтельны! Вводить нужно целые числа в диапазоне: 100 - 300</h3>";       
        return null
    } else {
        return `https://picsum.photos/${width}/${heigth}`
    }
}

// принимает url и отправляет по нему запрос
const useRequest = (url) => {
    return fetch(url)
        .then(response => response)
        .then(data => data.url)
        .catch(() => { alert('Что-то пошло не так! Попробуйте снова') });
}

btnNode.addEventListener('click', async () => {
    if (checkInputValues() !== null) {
        const url = checkInputValues();
        const result = await useRequest(url);
        output.innerHTML = `<img src=${result}>`
    }
});