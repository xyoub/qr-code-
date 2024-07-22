let qrCode = null;

function generateQRCode() {
    const url = document.getElementById('url').value;
    const qrColor = document.getElementById('qr-color').value;
    const qrStyle = document.getElementById('qr-style').value;
    const imageSizePercent = document.getElementById('image-size').value;
    const backgroundColor = document.getElementById('background-color').value;
    const imageInput = document.getElementById('qr-image').files[0];

    const imageOptions = {
        crossOrigin: "anonymous",
        margin: 20
    };

    if (qrCode) {
        qrCode.update({
            data: url,
            dotsOptions: {
                color: qrColor,
                type: qrStyle
            },
            backgroundOptions: {
                color: backgroundColor
            },
            imageOptions: imageInput ? {
                ...imageOptions,
                image: URL.createObjectURL(imageInput),
                size: imageSizePercent / 100 // Convertir en proportion
            } : undefined
        });
    } else {
        qrCode = new QRCodeStyling({
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
            },
            imageOptions: imageInput ? {
                ...imageOptions,
                image: URL.createObjectURL(imageInput),
                size: imageSizePercent / 100 // Convertir en proportion
            } : undefined
        });

        qrCode.append(document.getElementById('canvas'));
    }
}

function updateQRCodeImage() {
    const imageInput = document.getElementById('qr-image').files[0];
    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            qrCode.update({
                image: e.target.result
            });
        };
        reader.readAsDataURL(imageInput);
    }
}

function changeQRCodeColor() {
    generateQRCode(); // Re-génère le QR code pour appliquer la nouvelle couleur
}

function downloadQRCode() {
    const format = document.getElementById('file-format').value;
    qrCode.download({ name: "qr", extension: format });
}
