function handleFileSelect(event) {
    const files = event.target.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = document.createElement('div');
            if (file.type.startsWith('image/')) {
                content.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
            } else {
                content.textContent = e.target.result;
            }
            document.getElementById('file-content').appendChild(content);
        }
        reader.readAsDataURL(file);
    }
}

const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    handleFileSelect({ target: { files: event.dataTransfer.files } });
});

document.getElementById('file-select').addEventListener('click', () => {
    document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', handleFileSelect);

document.getElementById('get-location').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const output = `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
            document.getElementById('location-output').textContent = output;
        }, () => {
            alert('Не удалось получить местоположение.');
        });
    } else {
        alert('Geolocation не поддерживается вашим браузером.');
    }
});

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        });
}

snapButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});