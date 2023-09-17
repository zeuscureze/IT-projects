const sidebar = document.getElementById('sidebar');
const openButton = document.querySelector('.header .open');
const closeButton = document.querySelector('.history .close');
const modeSwitch = document.getElementById('modeSwitch');
const compareButton = document.querySelector('.compare');
const generationArea = document.querySelector('.generation-area');
const aiTextAreaContainer = document.querySelector('.ai-text-area-container');
const aiCloseButton = document.querySelector('.ai-close');



// 打开ai区
compareButton.addEventListener('click', () => {
    if(!document.body.classList.contains('ai-active')) {
        document.body.classList.toggle('ai-active');
    }
});
// 关闭ai区
aiCloseButton.addEventListener('click', () => {
    document.body.classList.remove('ai-active');
});
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
    if(document.body.classList.contains('light')) {
    } else {
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // 获取相关元素
    const settingButton = document.querySelector(".open_setting");
    const settingPopup = document.querySelector(".setting-popup");

    // 监听点击事件
    settingButton.addEventListener('click', function(event) {
        // 阻止事件的默认行为，因为我们不希望触发任何默认操作
        event.preventDefault();

        // 切换 setting-popup 的显示状态
        if (settingPopup.style.display === "none" || settingPopup.style.display === "") {
            settingPopup.style.display = "block";
        } else {
            settingPopup.style.display = "none";
        }
    });
});
