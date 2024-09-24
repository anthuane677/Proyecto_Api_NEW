let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo');
let logoSpan = document.querySelectorAll('.logo-parts');

window.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => {
        logoSpan.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (index + 1) * 100); // Mantener la lógica correcta de animación
        });

        setTimeout(() => {
            logoSpan.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (index + 1) * 50); 
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    }, 500); 
});