const sidebar = document.getElementById('sidebar');
const openButton = document.querySelector('.header .open');
const closeButton = document.querySelector('.history .close');

const modeSwitch = document.getElementById('modeSwitch');

// open sidebar
openButton.addEventListener('click', () => {
    sidebar.style.width = '300px';
});
// close sidebar
closeButton.addEventListener('click', () => {
    sidebar.style.width = '0';
});

// switch to light mode
modeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light');
});