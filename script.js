let qrCode = null;

function generateQRCode() {
    const url = document.getElementById('url').value;
    const qrColor = document.getElementById('qr-color').value;
    const qrStyle = document.getElementById('qr-style').value;
    const imageSizePercent = document.getElementById('image-size').value;
    const backgroundColor = document.getElementById('background-color').value;
    const imageInput = document.getElementById('qr-image').files[0];

    // Options pour l'image
    const imageOptions = imageInput ? {
        crossOrigin: "anonymous",
        image: URL.createObjectURL(imageInput),
        size: imageSizePercent / 100 // Convertir en proportion
    } : undefined;

    // Configuration du QR Code
    const qrCodeOptions = {
        width: 300,
        height: 300,
        type: "svg",
        data: url,
        dotsOptions: {
            color: qrColor,
            type: qrStyle // Utiliser les styles intégrés
        },
        backgroundOptions: {
            color: backgroundColor
        },
        imageOptions: imageOptions
    };

    // Création ou mise à jour du QR Code
    if (qrCode) {
        qrCode.update(qrCodeOptions);
    } else {
        qrCode = new QRCodeStyling(qrCodeOptions);
        qrCode.append(document.getElementById('canvas'));
    }
}

function updateQRCodeImage() {
    const imageInput = document.getElementById('qr-image').files[0];
    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            qrCode.update({
                image: e.target.result,
                imageOptions: {
                    size: document.getElementById('image-size').value / 100
                }
            });
        };
        reader.readAsDataURL(imageInput);
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
