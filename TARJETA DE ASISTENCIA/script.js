const url = "https://script.google.com/macros/s/AKfycbyDjHKCfNlv1E-CBfJFzq-Iw7Ef3Z2bONf4VAq2zZheMExOCGO2JkTnNQNeI4MhqPJW/exec";

    document.getElementById("formulario").addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const asistencia = document.getElementById("asistencia").value;

        // Validación básica
        if (!nombre || !asistencia) {
            document.getElementById("mensaje").innerText = "Por favor completa todos los campos.";
            document.getElementById("mensaje").style.color = "red";
            return;
        }

        fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `nombre=${encodeURIComponent(nombre)}&asistencia=${encodeURIComponent(asistencia)}`
        }).then(() => {
            document.getElementById("mensaje").innerText = "¡Gracias por confirmar tu asistencia!";
            document.getElementById("mensaje").style.color = "green";
            document.getElementById("formulario").reset();
        }).catch((error) => {
            document.getElementById("mensaje").innerText = "Ocurrió un error. Intenta nuevamente.";
            document.getElementById("mensaje").style.color = "red";
            console.error("Error:", error);
        });
    });