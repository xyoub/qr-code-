let qrCode = null;

function generateQRCode() {
    const url = document.getElementById('url').value;
    const qrColor = document.getElementById('qr-color').value;
    const qrStyle = document.getElementById('qr-style').value;
    const backgroundColor = document.getElementById('background-color').value;
    const imageInput = document.getElementById('qr-image').files[0];
    const imageSizePercent = document.getElementById('image-size').value;

    // Configuration du QR Code
    const qrCodeOptions = {
        width: 300,
        height: 300,
        type: "svg",
        data: url,
        dotsOptions: {
            color: qrColor,
            type: qrStyle
        },
        backgroundOptions: {
            color: backgroundColor
        }
    };

    // Ajouter les options d'image si une image est sélectionnée
    if (imageInput) {
        const imageOptions = {
            crossOrigin: "anonymous",
            image: URL.createObjectURL(imageInput),
            size: imageSizePercent / 100
        };
        qrCodeOptions.image = imageOptions.image;
        qrCodeOptions.imageOptions = imageOptions;
    }

    // Création ou mise à jour du QR Code
    if (qrCode) {
        qrCode.update(qrCodeOptions);
    } else {
        qrCode = new QRCodeStyling(qrCodeOptions);
        qrCode.append(document.getElementById('canvas'));
    }
}

function toggleImageOptions() {
    const checkbox = document.getElementById('show-image-options');
    const imageOptionsDiv = document.querySelector('.image-options');
    imageOptionsDiv.style.display = checkbox.checked ? 'block' : 'none';
}

function downloadQRCode() {
    const format = document.getElementById('file-format').value;
    qrCode.download({ name: "qr_code", extension: format });
}

function refreshPage() {
    window.location.reload();
}

// Initialisation du thème dès le chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleButton.textContent = currentTheme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre';

    // Gestion du changement de thème
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleButton.textContent = newTheme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre';
    });
});
