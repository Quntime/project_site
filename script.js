// Генератор QR-кодов с игровым дизайном
// Переменные
let currentColor = '#000000'; // Текущий цвет QR-кода

// Основная функция генерации (добавлен async)
async function generateQR() {
    const textInput = document.getElementById('qr-text');
    const text = textInput.value.trim();
    const qrOutput = document.getElementById('qr-output');

    if (!text) {
        alert('Введите текст или ссылку!');
        return;
    }

    qrOutput.innerHTML = '';
    
    const canvas = document.createElement('canvas');
    qrOutput.appendChild(canvas);

    try {
        // Используем современный синтаксис с await вместо коллбэка
        await QRCode.toCanvas(
            canvas,
            text,
            {
                width: 200,
                color: {
                    dark: currentColor,
                    light: '#ffffff00'
                },
                margin: 2,
                errorCorrectionLevel: 'H'
            }
        );
        // Пиксельный эффект применяется после успешной генерации
        canvas.style.imageRendering = 'pixelated';
    } catch (error) {
        console.error('Ошибка генерации:', error);
        alert('Не удалось создать QR-код 😢');
    }
}

// Смена цвета QR-кода (без изменений)
function changeColor(newColor) {
    currentColor = newColor;
    const text = document.getElementById('qr-text').value.trim();
    if (text) generateQR();
}

// Скачивание QR-кода (без изменений)
function downloadQR() {
    const canvas = document.querySelector('#qr-output canvas');
    if (!canvas) {
        alert('Сначала создайте QR-код!');
        return;
    }
    
    const link = document.createElement('a');
    link.download = 'game-qr.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Обработчик Enter (без изменений)
document.getElementById('qr-text').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});