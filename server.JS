window.onload = () => {
    setTimeout(() => {
        alert("¡Advertencia!\n\nIniciando proceso...");

        // Abrir 1000 ventanas emergentes
        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                window.open('about:blank', '_blank').document.write('<html><head><title>Virus Detected</title></head><body><h1 style="color:red;">¡Virus detectado! Su dispositivo ha sido infectado.</h1></body></html>');
            }, i * 100); // Mostrar una ventana cada 100ms
        }
    }, 1000); // Mostrar después de 1 segundo
};
