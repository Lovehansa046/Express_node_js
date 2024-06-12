// Функция для установки куки
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Функция для установки языка
function setLanguage(lang) {
    // Устанавливаем куку "language" с выбранным языком на 30 дней
    setCookie('language', lang, 30);

    // Здесь можно добавить логику для изменения языка на странице, если это необходимо
    // Например, можно перезагрузить страницу для применения нового языка
    window.location.reload();
}
