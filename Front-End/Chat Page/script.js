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

    // When the sidebar is closing, close all open dropdown menus.
    if (sidebar.classList.contains("close")) {
        const dropdowns = document.querySelectorAll('.nav-link.dropdown.is-active');
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove('is-active');
            
            const navText = dropdown.querySelector('.text.nav-text');
            if (navText) navText.classList.remove('active');
        });
    }
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
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="C.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="C.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
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

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownMenu.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 缓存DOM查询结果
    const dropdowns = document.querySelectorAll('.nav-link.dropdown');
    const body = document.body;
    
    // 使用事件代理处理下拉菜单的点击事件
    body.addEventListener('click', function(event) {
        let target = event.target;
        
        // 遍历所有下拉菜单
        dropdowns.forEach((dropdown) => {
            // 如果点击的是当前的下拉菜单或其子元素，切换.is-active类，否则移除.is-active类
            if (dropdown.contains(target) || dropdown === target) {
                dropdown.classList.toggle('is-active');
                
                // 如果存在.text.nav-text元素，则切换.active类
                const navText = dropdown.querySelector('.text.nav-text');
                if (navText) navText.classList.toggle('active');
                
            } else {
                dropdown.classList.remove('is-active');
                
                const navText = dropdown.querySelector('.text.nav-text');
                if (navText) navText.classList.remove('active');
            }
        });
        
        // 如果点击的是.dropdown-toggle，阻止默认行为
        if (target.classList.contains('dropdown-toggle')) event.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-link.dropdown');
    
    dropdowns.forEach((dropdown) => {
        // Assuming dropdown is the parent container of both the toggle and the dropdown menu.
        dropdown.addEventListener('mouseleave', function() {
            dropdown.classList.remove('is-active');
            
            const navText = dropdown.querySelector('.text.nav-text');
            if (navText) navText.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-link.dropdown');
    
    dropdowns.forEach((dropdown) => {
        
        // 鼠标离开下拉菜单时，关闭下拉菜单
        dropdown.addEventListener('mouseleave', function() {
            dropdown.classList.remove('is-active');
        });
        
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // 鼠标点击时，切换下拉菜单的显示状态
        toggle.addEventListener('click', function() {
            dropdown.classList.add('is-active');
        });
        
        if(dropdown.classList.contains('is-active')){
          dropdown.firstElementChild().add('active')
        }
        // 鼠标进入下拉菜单时，取消定时器
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(toggle.closeTimer);
        });
        
        // 鼠标离开 toggle 时，设置定时器关闭下拉菜单
        // toggle.addEventListener('mouseleave', function() {
        //     toggle.closeTimer = setTimeout(() => {
        //         dropdown.classList.remove('is-active');
        //     }, 300); // 300 milliseconds delay
        // });
    });
});
document.addEventListener('DOMContentLoaded', function () {
  const accountDropdown = document.querySelector('.nav-link.account');
  const sidebar = document.querySelector('.sidebar');
  const dotsDom = document.querySelector('.dots-button');
  const closeTanDom = document.querySelector('.closeTan');
  const accountDropdownMenu = document.querySelector('.nav-link.account .dropdown-menu');
  accountDropdown.addEventListener("click", () => {
    accountDropdown.classList.add('is-active');
    const spanText = accountDropdown.querySelector('.text.nav-text');
    if (spanText) spanText.classList.toggle('selected');
    if(accountDropdownMenu.style.display === 'block'){
      accountDropdown.classList.add('active');
    }
    if (sidebar.classList.contains('close')) {
      sidebar.classList.remove('close');
  }
  });

  accountDropdown.addEventListener("mouseleave", () => {
    accountDropdownMenu.style.display = 'none';
    accountDropdown.classList.remove('active');
  });

  // 账户的弹窗
  dotsDom.addEventListener("click", () => {
    $("#modal-overlay").fadeIn();
    $("#modal").fadeIn();
  })
  
  closeTanDom.addEventListener("click", () => {
    $("#modal-overlay").fadeOut();
    $("#modal").fadeOut();
  })
})
    // If the sidebar is closed when clicking on the dropdown, open the sidebar
    if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
    }


document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    // 侧边栏的打开/关闭代码...
        const accountDropdown = document.querySelector('.sidebar .nav-link.dropdown');
        if (accountDropdown.classList.contains('is-active')) {
            accountDropdown.classList.remove('is-active');
        }
    
    // 关闭所有打开的下拉菜单
    const dropdowns = document.querySelectorAll('.nav-link.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('is-active');
        const navText = dropdown.querySelector('.text.nav-text');
        if (navText) {
            navText.classList.remove('active');
        }
    });
});







const accountDropdownToggle = document.querySelector('.nav-link.dropdown .dropdown-toggle');
accountDropdownToggle.addEventListener('click', function() {
    if (sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
    }
});



toggle.addEventListener('click', () => {
    if (document.querySelector('.nav-link.dropdown.is-active')) {
        const accountDropdown = document.querySelector('.nav-link.dropdown');
        accountDropdown.classList.remove('is-active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.sidebar .nav-link.dropdown .dropdown-toggle');
    const sidebar = document.querySelector('.sidebar');
    const accountDropdown = document.querySelector('.sidebar .nav-link.dropdown');
    dropdownToggle.addEventListener('click', function() {
        // If the sidebar is closed, open it
        if (sidebar.classList.contains('close')) {
            sidebar.classList.remove('close');
        }

        // Toggle the dropdown menu
        accountDropdown.classList.toggle('is-active');
    });

    // If the sidebar is closed, close the dropdown menu as well
    const sidebarToggle = document.querySelector('.toggle');
    sidebarToggle.addEventListener('click', function() {
        if (accountDropdown.classList.contains('is-active')) {
            accountDropdown.classList.remove('is-active');
        }
    });
});


// Function to send message to OpenAI
function sendMessageToOpenAI(message, callback) {
    $.ajax({
        url: "https://api.openai.com/v1/engines/davinci/completions",
        type: "POST",
        headers: {
            "Authorization": "Bearer YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            prompt: message,
            max_tokens: 150
        }),
        success: function(response) {
            callback(response.choices[0].text.trim());
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}
