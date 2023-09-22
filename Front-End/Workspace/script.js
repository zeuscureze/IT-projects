const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");
      compareButton = document.querySelector('.compare');
      aiCloseButton = document.querySelector('.ai-close');

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Dark mode"; // Change here
        editor.setOption("theme", "base16-dark");
    } else {
        modeText.innerText = "Light mode"; // And here
        editor.setOption("theme", "base16-light");
    }
});

// open answer area
compareButton.addEventListener('click', () => {
    if(!document.body.classList.contains('ai-active')) {
        document.body.classList.toggle('ai-active');
    }
});
// close answer area
aiCloseButton.addEventListener('click', () => {
    document.body.classList.remove('ai-active');
});

var codeEditor = document.getElementById("editor");
var editor = CodeMirror.fromTextArea(codeEditor, {
    lineNumbers: true,
    matchBrackets: true,
    theme: "base16-dark",
    mode: "python"
});
editor.setSize("100%", "100%")