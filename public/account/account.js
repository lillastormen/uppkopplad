const menu = document.querySelector('details');

document.addEventListener('click', (event) => {
  
    if (!menu) return;

    if (!menu.contains(event.target)) {
        menu.removeAttribute('open');
    }
});