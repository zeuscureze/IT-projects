const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
    //   searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");
      compareButton = document.querySelector('.compare');
      aiCloseButton = document.querySelector('.ai-close');




toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

// searchBtn.addEventListener("click" , () =>{
//     sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Dark mode"; // Change here
    } else {
        modeText.innerText = "Light mode"; // And here
    }
});

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