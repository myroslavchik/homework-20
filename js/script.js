document.addEventListener('DOMContentLoaded', () => {

    // Створити HTML-сторінку для відображення/редагування тексту.
    // При відкритті сторінки текст відображається за допомогою тега div.
    // При натисканні Ctrl + E, замість div з'являється textarea з тим же текстом,
    // який тепер можна редагувати. При натисканні Ctrl + S, замість textarea
    // з'являється div з уже зміненим текстом. Не забудь вимкнути поведінку за
    // замовчуванням для цих поєднань клавіш.

    const TEXT = document.querySelector('.text');
    const TEXT_AREA = document.createElement("textarea");
    const HOME = document.querySelector('.home-1');
    
    document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyE' && event.ctrlKey) {
        event.preventDefault()
        TEXT_AREA.innerHTML = TEXT.textContent;
        TEXT.remove();
        HOME.appendChild(TEXT_AREA);
        
        
    }
    if (event.code == 'KeyS' && event.ctrlKey) {
        event.preventDefault()
        HOME.appendChild(TEXT)
        TEXT.innerHTML = TEXT_AREA.value;
        TEXT_AREA.remove();
    }
    });

    // Створити HTML-сторінку з великою таблицею.
    // При кліку на заголовок стовпця, необхідно 
    // відсортувати дані цього стовпця. Врахуй,
    // що числові значення повинні сортуватися як числа,
    // а не як рядки.

        const TABLE = document.getElementById('sortMe');
        const HEADERS = TABLE.querySelectorAll('th');
        const TABLEBODY = TABLE.querySelector('tbody');
        const ROWS = TABLEBODY.querySelectorAll('tr');
        const DIRECTIONS = Array.from(HEADERS).map(function (header) {
            return '';
        });

        const transform = function (index, content) {
        const type = HEADERS[index].getAttribute('data-type');
            switch (type) {
                case 'number':
                    return parseFloat(content);
                case 'string':
                default:
                    return content;
            }
        };

        const SORTCOLUMN = function (index) {
        const DIRECTION = DIRECTIONS[index] || 'asc';
        const MULTIPLIER = DIRECTION === 'asc' ? 1 : -1;
        const NEWROWS = Array.from(ROWS);

            NEWROWS.sort(function (rowA, rowB) {
                const CELLA = rowA.querySelectorAll('td')[index].innerHTML;
                const CELLB = rowB.querySelectorAll('td')[index].innerHTML;
                const a = transform(index, CELLA);
                const b = transform(index, CELLB);
                switch (true) {
                    case a > b:
                        return 1 * MULTIPLIER;
                    case a < b:
                        return -1 * MULTIPLIER;
                    case a === b:
                        return 0;
                }
            });

            [].forEach.call(ROWS, function (row) {
                TABLEBODY.removeChild(row);
            });

            DIRECTIONS[index] = DIRECTION === 'asc' ? 'desc' : 'asc';

            NEWROWS.forEach(function (newRow) {
                TABLEBODY.appendChild(newRow);
            });
        };

        [].forEach.call(HEADERS, function (header, index) {
            header.addEventListener('click', function () {
                SORTCOLUMN(index);
            });
        });

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