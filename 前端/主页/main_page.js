const sidebar = document.getElementById('sidebar');
const openButton = document.querySelector('.header .open');
const closeButton = document.querySelector('.history .close');

const modeSwitch = document.getElementById('modeSwitch');

// 打开侧边栏
openButton.addEventListener('click', () => {
    sidebar.style.width = '300px';
});
// 关上侧边栏
closeButton.addEventListener('click', () => {
    sidebar.style.width = '0';
});

// 切换白天模式
modeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light');
});