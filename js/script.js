document.addEventListener('DOMContentLoaded', () => {

    // Створити HTML-сторінку для відображення/редагування тексту.
    // При відкритті сторінки текст відображається за допомогою тега div.
    // При натисканні Ctrl + E, замість div з'являється textarea з тим же текстом,
    // який тепер можна редагувати. При натисканні Ctrl + S, замість textarea
    // з'являється div з уже зміненим текстом. Не забудь вимкнути поведінку за
    // замовчуванням для цих поєднань клавіш.

    const TEXT = document.querySelector('.text');
    const TEXT_AREA = document.createElement("textarea");
    
    document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyE' && event.ctrlKey) {
        event.preventDefault()
        TEXT_AREA.innerHTML = TEXT.textContent;
        TEXT.appendChild(TEXT_AREA);
    }
    if (event.code == 'KeyS' && event.ctrlKey) {
        event.preventDefault()
        TEXT.innerHTML = TEXT_AREA.value;
        TEXT.style.display = "block";
    }
    });

    // Створити HTML-сторінку з великою таблицею.
    // При кліку на заголовок стовпця, необхідно 
    // відсортувати дані цього стовпця. Врахуй,
    // що числові значення повинні сортуватися як числа,
    // а не як рядки.

    const NUMBERS = document.getElementById("numbers").addEventListener('click', sortArray);
    const LANGUAGES = document.getElementById("languages").addEventListener('click', sortTextArray);
    function sortArray () {
        let table = document.getElementById("table");
        let numberTR = table.rows;
    Array.from(numberTR)
         .sort((a, b) => a.cells[0].textContent - b.cells[0].textContent)
         .forEach(tr => table.appendChild(tr));
    }

    // Створити HTML-сторінку з блоком тексту в рамці.
    // Реалізувати можливість змінювати розмір блоку,
    // якщо затиснути мишку в правому нижньому кутку
    // і тягнути її далі.

    let element = document.getElementById('myBox');
    element.addEventListener('mousedown', startResize, false);
    function startResize(e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
     }
     function Resize(e) {
        element.style.width = (e.clientX - element.offsetLeft) + 'px';
        element.style.height = (e.clientY - element.offsetTop) + 'px';
     }
     function stopResize(e) {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }



});