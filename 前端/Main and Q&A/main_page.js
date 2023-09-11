const sidebar = document.getElementById('sidebar');
const openButton = document.querySelector('.header .open');
const closeButton = document.querySelector('.history .close');
const modeSwitch = document.getElementById('modeSwitch');
const textArea = document.querySelector('.text-area'); // 替换为实际的选择器
const headerElement = document.querySelector('.header'); // 假设头部已经有一个.header的类名
const gptArea = document.querySelector('.gpt-area'); // 替换为实际的选择器

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
        textArea.style.backgroundColor = '#FFFFFF'; // 设置为白色背景
        headerElement.style.backgroundColor = '#FFFFFF'; // 设置为白色背景
        gptArea.style.backgroundColor = '#FFFFFF'; // 设置为白色背景
    } else {
        textArea.style.backgroundColor = ''; // 重置为原始背景颜色
        headerElement.style.backgroundColor = ''; // 重置为原始背景颜色
        gptArea.style.backgroundColor = ''; // 重置为原始背景颜色
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