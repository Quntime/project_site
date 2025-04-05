// Генератор QR-кодов с игровым дизайном
// Переменные
let currentColor = '#000000'; // Текущий цвет QR-кода

// Основная функция генерации
function generateQR() {
    const textInput = document.getElementById('qr-text');
    const text = textInput.value.trim(); // Получаем и очищаем текст
    const qrOutput = document.getElementById('qr-output');

    // Проверка на пустой ввод
    if (!text) {
        alert('Введите текст или ссылку!');
        return;
    }

    // Очищаем предыдущий QR-код
    qrOutput.innerHTML = '';
    
    // Создаем новый canvas
    const canvas = document.createElement('canvas');
    qrOutput.appendChild(canvas);

    // Генерация QR-кода
    try {
        QRCode.toCanvas(
            canvas, // Передаем элемент canvas
            text,
            {
                width: 200,
                color: {
                    dark: currentColor,   // Цвет точек
                    light: '#ffffff00'   // Прозрачный фон
                },
                margin: 2,
                errorCorrectionLevel: 'H' // Высокая устойчивость к ошибкам
            },
            (error) => {
                if (error) {
                    console.error('Ошибка генерации:', error);
                    alert('Не удалось создать QR-код 😢');
                } else {
                    // Добавляем пиксельный эффект
                    canvas.style.imageRendering = 'pixelated';
                }
            }
        );
    } catch (error) {
        alert('Критическая ошибка: ' + error.message);
    }
}

// Смена цвета QR-кода
function changeColor(newColor) {
    currentColor = newColor;
    const text = document.getElementById('qr-text').value.trim();
    if (text) generateQR(); // Пересоздаем QR, если текст есть
}

// Скачивание QR-кода
function downloadQR() {
    const canvas = document.querySelector('#qr-output canvas');
    if (!canvas) {
        alert('Сначала создайте QR-код!');
        return;
    }
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.download = 'game-qr.png'; // Название файла
    link.href = canvas.toDataURL(); // Данные изображения
    link.click();
}

// Дополнительно: генерация по нажатию Enter
document.getElementById('qr-text').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});