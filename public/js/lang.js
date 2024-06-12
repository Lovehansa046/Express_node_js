function setLanguage(lang) {
    // Сохраняем выбранный язык в куки
    document.cookie = `i18next=${lang};expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/`;

    // Отправка AJAX-запроса на сервер для смены языка
    fetch(`/setlang?lang=${lang}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to set language');
            }
            // Перезагрузка страницы после успешной установки языка
            location.reload();
        })
        .catch(error => {
            console.error('Error setting language:', error);
        });
}

// Функция для получения значения куки по имени
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Устанавливаем язык страницы при загрузке
document.addEventListener("DOMContentLoaded", () => {
    const lang = getCookie('i18next') || 'en'; // Получаем язык из куки или используем 'en' по умолчанию
    console.log(`Current language: ${lang}`);
});
