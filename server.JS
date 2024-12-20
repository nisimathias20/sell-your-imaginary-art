window.onload = () => {
    setTimeout(() => {
        alert("¡Advertencia!\n\nIniciando proceso...");
        
        // Abrir 1000 ventanas emergentes de error
        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                alert("¡Virus detectado! Su dispositivo ha sido infectado.");
            }, i * 100); // Mostrar una alerta cada 100ms
        }
    }, 1000); // Mostrar después de 1 segundo
};

