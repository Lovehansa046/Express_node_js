function setLanguage(lang) {
    // Сохраняем выбранный язык в куки
    document.cookie = `lang=${lang};expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/`;

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
