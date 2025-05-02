document.getElementById('investmentForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de manera tradicional

    // Obtener los datos del formulario
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let initialInvestment = document.getElementById('initialInvestment').value;
    let investmentType = document.getElementById('investmentType').value;

    // Validar que el número de celular tenga 9 dígitos y empiece con 9
    if (phone.match(/^9\d{8}$/)) {
        // Enviar los datos al Web App de Google Apps Script
        submitToGoogleSheets(name, phone, initialInvestment, investmentType);
    } else {
        alert("El número de celular debe empezar con 9 y tener 9 dígitos.");
    }
});

function submitToGoogleSheets(name, phone, initialInvestment, investmentType) {
    // Aquí pones la URL de tu Web App que obtuviste
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxBXhe6rgRjLOGG27m1kYg0yTFmhYKbF-z8BMcXpbonV6Ae-xfC3CaR9W2ICrd6OUVQ/exec';  // Reemplaza esta URL con la tuya
    
    fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams({
            'name': name,
            'phone': phone,
            'initialInvestment': initialInvestment,
            'investmentType': investmentType
        })
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar el mensaje de confirmación
        document.getElementById('confirmationMessage').style.display = 'block';

        // Ocultar el formulario
        document.getElementById('investmentForm').style.display = 'none';

        // Esperar 3 segundos antes de ocultar el mensaje y mostrar el formulario nuevamente
        setTimeout(function() {
            document.getElementById('confirmationMessage').style.display = 'none';  // Ocultar el mensaje de confirmación
            document.getElementById('investmentForm').style.display = 'block';  // Mostrar el formulario
        }, 3000);  // 3000 milisegundos = 3 segundos
    })
    .catch(error => {
        alert('Hubo un error al enviar el formulario');
        console.error(error);
    });
}

//zoom al formulario


