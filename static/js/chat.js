const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

modeSwitch.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.remove("light");
        modeText.innerText = "Dark mode";
    } else {
        body.classList.add("light");
        modeText.innerText = "Light mode";
    }
});

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Dark mode";
    } else {
        modeText.innerText = "Light mode";
    }
});

// Below is the jQuery code
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hello.How can I help?',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="static/images/C.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="static/images/C.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1500);
}

const root = document.documentElement;
const dropdownTitleIcon = document.querySelector(".dropdown-title-icon");
const dropdownTitle = document.querySelector(".dropdown-title");
const dropdownList = document.querySelector(".dropdown-list");
const mainButton = document.querySelector(".main-button");
const floatingIcon = document.querySelector(".floating-icon");


const icons = {
  flash: "M6 0L0 10h5l-2 6L16 6h-5L14 0z",
  star: "M8 0L6 5H1L4.5 8L3 13L8 10.5L13 13L11.5 8L15 5H10L8 0z",
};

const menuToIconKey = {
  "chatgpt-3.5": "flash",
  "chatgpt-4.0": "star"
};



const listItems = ["ChatGPT-4.0", "ChatGPT-3.5"];

function iconTemplate(path) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="${path}"/>
    </svg>
  `;
}

const listItemTemplate = (text, translateValue) => {
  let iconPath = "";
  if (text === "ChatGPT-3.5") {
    iconPath = icons.flash;
  } else if (text === "ChatGPT-4.0") {
    iconPath = icons.star;
  }
  return `
    <li class="dropdown-list-item">
      <button class="dropdown-button list-button dropdown-item-btn" data-translate-value="${translateValue}%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="list-icon">
          <path d="${iconPath}" />
        </svg>
        <span class="text-truncate">${text}</span>
      </button>
    </li>
  `;
};

const renderListItems = () => {
  dropdownList.innerHTML += listItems
    .map((item, index) => {
      return listItemTemplate(item, 100 * index);
    })
    .join("");
};

window.addEventListener("load", () => {
  renderListItems();
});



mainButton.addEventListener("click", () => {
  const listWrapperSizes = 3.5; // margins, paddings & borders
  const dropdownOpenHeight = 4.6 * listItems.length + listWrapperSizes;
  const currDropdownHeight =
    root.style.getPropertyValue("--dropdown-height") || "0";

  currDropdownHeight === "0"
});

dropdownList.addEventListener("mouseover", (e) => {
  const translateValue = e.target.dataset.translateValue;
  root.style.setProperty("--translate-value", translateValue);
});


dropdownList.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item-btn")) {
        const clickedItemText = e.target.innerText.toLowerCase().trim();
        
        // 使用menuToIconKey对象将clickedItemText转换为icons对象中的键
        const iconKey = menuToIconKey[clickedItemText];
        const clickedItemIcon = icons[iconKey];

        dropdownTitleIcon.innerHTML = iconTemplate(clickedItemIcon); // 更新图标
        dropdownTitle.innerHTML = clickedItemText;
    }
});


dropdownList.addEventListener("mouseleave", () => {
});



dropdownList.addEventListener("mousemove", (e) => {
    const iconSize = root.style.getPropertyValue("--floating-icon-size") || 0;
    const x = e.clientX - dropdownList.getBoundingClientRect().x;
    const y = e.clientY - dropdownList.getBoundingClientRect().y;
    const targetText = e.target.innerText.trim().toLowerCase();
    const iconKey = menuToIconKey[targetText];
    const hoverItemIcon = icons[iconKey];

    floatingIcon.innerHTML = iconTemplate(hoverItemIcon);
    root.style.setProperty("--floating-icon-left", x - iconSize / 2 + "px");
    root.style.setProperty("--floating-icon-top", y - iconSize / 2 + "px");
});


document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.querySelector(".main-button");
    const dropdownWrapper = document.querySelector(".dropdown-list-wrapper");
    const dropdownList = dropdownWrapper.querySelector("ul.dropdown-list");
    
    let isOpen = false;

    dropdownButton.addEventListener("click", function() {
        isOpen = !isOpen;
        if (isOpen) {
            document.documentElement.style.setProperty("--dropdown-height", `${dropdownList.scrollHeight}px`);
            document.documentElement.style.setProperty("--list-opacity", "1");
            document.documentElement.style.setProperty("--rotate-arrow", "180deg");
            dropdownWrapper.style.opacity = "1";
            dropdownWrapper.style.visibility = "visible";
        } else {
            closeDropdown();
        }
    });

    dropdownList.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item-btn")) {
            const clickedItemText = e.target.innerText.toLowerCase().trim();
            const iconKey = menuToIconKey[clickedItemText];
            const clickedItemIcon = icons[iconKey];

            dropdownTitleIcon.innerHTML = iconTemplate(clickedItemIcon); // 更新图标
            dropdownTitle.innerHTML = clickedItemText;
            closeDropdown();
        }
    });

    dropdownList.addEventListener("mouseleave", () => {
        closeDropdown();
    });

    function closeDropdown() {
        document.documentElement.style.setProperty("--dropdown-height", "0");
        document.documentElement.style.setProperty("--list-opacity", "0");
        document.documentElement.style.setProperty("--rotate-arrow", "0deg");
        setTimeout(() => {
            dropdownWrapper.style.opacity = "0";
            dropdownWrapper.style.visibility = "hidden";
        }, 200); // 注意这里的400ms是过渡的时间，必须与CSS中的--transition-time一致
    }
});