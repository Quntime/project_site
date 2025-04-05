// Текущий цвет QR-кода
let currentColor = '#000000';

function generateQR() {
    const textInput = document.getElementById('qr-text');
    const text = textInput.value.trim(); // Удаляем пробелы в начале/конце
    const qrOutput = document.getElementById('qr-output');
    
    if (!text) {
        alert('Введите текст или ссылку!');
        return;
    }

    try {
        qrOutput.innerHTML = '';
        QRCode.toCanvas(
            qrOutput, 
            text, 
            {
                width: 200,
                color: {
                    dark: currentColor,
                    light: '#ffffff00'
                },
                margin: 2,
                errorCorrectionLevel: 'H' // Повышаем устойчивость к ошибкам
            }, 
            (error) => {
                if (error) {
                    console.error("Ошибка генерации QR:", error);
                    alert('Не удалось создать QR-код. Проверьте данные!');
                }
            }
        );
    } catch (e) {
        alert('Ошибка: ' + e.message);
    }
}

// ... остальные функции без изменений
// Смена цвета
function changeColor(color) {
    currentColor = color;
    if (document.getElementById('qr-text').value) generateQR();
}

// Скачивание QR-кода
function downloadQR() {
    const canvas = document.querySelector('#qr-output canvas');
    if (!canvas) {
        alert('Сначала создайте QR-код!');
        return;
    }
    const link = document.createElement('a');
    link.download = 'pixel-qr.png';
    link.href = canvas.toDataURL();
    link.click();
}