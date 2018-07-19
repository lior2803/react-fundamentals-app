const localized_texts = {
    "en-US": {
        title: 'We-Accessible',
        screen_reader_adj: 'Screen Reader Adjustment',
        text_changes: 'Text Changes',
        blink_blocking: 'Blink Blocking',
        back_to_default: 'Back to Default',
        increase_font: 'Increase Font',
        decrease_font: 'Decrease Font',
        contrast_white: 'White Contrast',
        contrast_black: 'Black Contrast',
        contrast_regular: 'Revert Contrast',
        toggle_mouse_size_small: 'Enlarge Mouse',
        toggle_mouse_size_large: 'Minimize Mouse',
    },
    "fr-FR": {
        title: 'Omelet du fromage!',
        screen_reader_adj: 'Omelet du fromage!',
        text_changes: 'Omelet du fromage!',
        blink_blocking: 'Omelet du fromage!',
        back_to_default: 'Omelet du fromage!',
        increase_font: 'Omelet du fromage!',
        decrease_font: 'Omelet du fromage!',
        contrast_white: 'Omelet du fromage!',
        contrast_black: 'Omelet du fromage!!',
        contrast_regular: 'Omelet du fromage!!!',
        toggle_mouse_size_small: 'Omelet du fromage!',
        toggle_mouse_size_large: 'Omelet du fromage!',
    }
};

texts = localized_texts["en-US"];

exludedElements = ["sidebar-container"];

cookie_stuff =
    {
        fontIncreaseFactor: 0,
        contrastStatus: 0,
        big_mouse: false
    };

$(document).ready(function () {
    setLocalization();
    appendAccessabilityButton();
    appendAccessabilityMenu();
    collapsibleMenuButtons();
});

function openAccessabilityMenu() {
    document.getElementById('sidebar-container').style.width = "350px";
}

function appendAccessabilityMenu() {
    $('body').append(
        `<div id="sidebar-container" class="sidebar-container">
      <a href="javascript:void(0)" class="closebtn" onclick="closeAccessabilityMenu()">&times;</a>
      <button class="collapsible"> ${texts.text_changes} </button>
      <div class="buttons_wrapper content">
        <div class="button_container">
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon decrease_font" onClick='decreaseFont()'></button>
           <label class="button_text">${texts.decrease_font}</label>
        </div>
        <div class="button_container">
           <button class="icon toggle_cursor" onClick='toggleMouseSize()'></button>
           <label id="mouse_pointer" class="button_text">${get_mouse_button_text()}</label>
        </div>
        <div class="button_container">
           <button class="icon contrast" onClick='invertElements()'></button>
           <label id="contrast_button" class="button_text">${get_contrast_button_text()}</label>
        </div>
        <div class="button_container">
           <button class="icon contrast" onClick='invertElements()'></button>
           <label class="button_text">${texts.contrast_white}</label>
        </div>
        <div class="button_container">
           <button class="icon contrast" onClick='invertElements()'></button>
           <label class="button_text">${texts.contrast_white}</label>
        </div>
    </div>
    <button class="collapsible"> ${texts.screen_reader_adj} </button>
    <button class="collapsible"> ${texts.blink_blocking} </button>
    <button class="collapsible"> ${texts.back_to_default} </button>
    </button>`);
}

function appendAccessabilityButton() {
    $('body').append
    (`<div class="btn_container">
        <button 
            class=float 
            onclick='openAccessabilityMenu()'>
        </button>
    </div>`);
}


function closeAccessabilityMenu() {
    $("#sidebar-container").width("0");
}

function increaseFont() {
    if (cookie_stuff.fontIncreaseFactor === 4) return;
    cookie_stuff.fontIncreaseFactor++;
    iterateElementsFromDom($("body"), (element) => increase_element_font_size(element));
}

function decreaseFont() {
    if (cookie_stuff.fontIncreaseFactor === -4) return;
    cookie_stuff.fontIncreaseFactor--;
    iterateElementsFromDom($("body"), (element) => decrease_element_font_size(element));
}

function iterateElementsFromDom(root, f) {
    root.children().each(function (index, element) {
        var child = $(element);
        if (exludedElements.includes(child.prop("id")))
            return;
        f(child);
        iterateElementsFromDom(child, f);
    });
}

function increase_element_font_size(element) {
    let current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * 1.1);
}

function decrease_element_font_size(element) {
    let current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * (1.0 / 1.1));
}

function toggleMouseSize() {
    cookie_stuff.big_mouse = !cookie_stuff.big_mouse;
    $("#mouse_pointer").text(get_mouse_button_text());

    iterateElementsFromDom($("body"), (element) => toggleElementMouseSize(element, cookie_stuff.big_mouse));
}

function invertElements() {
    cookie_stuff.contrastStatus = (cookie_stuff.contrastStatus + 1) % 3;
    $("#contrast_button").text(get_contrast_button_text());
    iterateElementsFromDom($("body"), (element) => changeContrast(element, cookie_stuff.contrastStatus));
}

function changeContrast(domElement, status) {
    element = $(domElement);
    switch (status) {
        case 0:
            element.removeClass('white_contrast');
            element.removeClass('black_contrast');
            break;

        case 1:
            element.removeClass('black_contrast');
            element.addClass('white_contrast');
            break;

        case 2:
            element.removeClass('white_contrast');
            element.addClass('black_contrast');
            break;
    }
}

//* TODO: Handle different kind of cursors
function toggleElementMouseSize(domElement, isBigMouse) {
    element = $(domElement);
    if (isBigMouse) {
        element.addClass('big_cursor');
    }
    else {
        element.removeClass('big_cursor');
    }
}

function get_mouse_button_text() {
    if (cookie_stuff.big_mouse) {
        return texts.toggle_mouse_size_large;
    }
    else {
        return texts.toggle_mouse_size_small;
    }
}


function get_contrast_button_text() {
    if (cookie_stuff.contrastStatus == 0) {
        return texts.contrast_black;
    } else if (cookie_stuff.contrastStatus == 1) {
        return texts.contrast_white;
    }
    else if (cookie_stuff.contrastStatus == 2) {
        return texts.contrast_regular;
    }
}

function setLocalization() {
    Object.keys(localized_texts).forEach(function (key) {
        if ((window.location.href.indexOf("/" + key + "") >= 0) || (window.location.href.indexOf("=" + key + "") >= 0)) {
            texts = localized_texts[key];
        }
    });
}

function collapsibleMenuButtons() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.visibility === "visible") {
                content.style.visibility = "hidden";
            } else {
                content.style.visibility = "visible";
            }
        });
    }
}

