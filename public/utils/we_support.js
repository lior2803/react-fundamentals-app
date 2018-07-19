const localized_texts = {
    "en-US": {
        increase_font: 'Increase Font',
        decrease_font: 'Decrease Font',
        black_and_white: 'Black and White',
        toggle_mouse_size_big: 'Enlarge Mouse',
        toggle_mouse_size_small: 'Minimize Mouse',
        invert_elements: 'Change Contrast',
    },
    "fr-FR": {
        increase_font: 'omelet du fromage',
        decrease_font: 'omelet du fromage!',
        black_and_white: 'omelet du fromage!!',
        toggle_mouse_size_big: 'omelet du fromage!!!',
        toggle_mouse_size_small: 'omelet du fromage!!!!',
        invert_elements: 'omelet du fromage',
    }
};

texts = localized_texts["en-US"];

exludedElements = ["sidebar-container"];

cookie_stuff =
    {
        fontIncreaseFactor : 0,
        contrastStatus: 0,
        big_mouse: false
    };

$(document).ready(function () {
    setLocalization();
    appendAccessabilityButton();
    appendAccessabilityMenu();
});

function openAccessabilityMenu() {
    document.getElementById('sidebar-container').style.width = "350px";
}

function appendAccessabilityMenu() {
    $('body').append(
        `<div id="sidebar-container" class="sidebar-container">
      <a href="javascript:void(0)" class="closebtn" onclick="closeAccessabilityMenu()">&times;</a>
      <div class="buttons_wrapper">
        <div class="button_container">
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon decrease_font" onClick='decreaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon increase_font" onClick='toggleMouseSize()'></button>
           <label id="mouse_pointer" class="button_text">${get_mouse_button_text()}</label>
        </div>
        <div class="button_container">
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon increase_font" onClick='invertElements()'></button>
           <label class="button_text">${texts.invert_elements}</label>
        </div>
         
    </div>
    </div>`);
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
        child = $(element);
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
    iterateElementsFromDom($( "body" ), (element) => changeContrast(element, cookie_stuff.contrastStatus));
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
            element.addClass('white_contrast')
            break;

        case 2:
            element.removeClass('white_contrast');
            element.addClass('black_contrast')
            break;
    }
}


    function toggleMouseSize() {
        cookie_stuff.big_mouse = !cookie_stuff.big_mouse;
        iterateElementsFromDom($("body"), (element) => toggleElementMouseSize(element, cookie_stuff.big_mouse));

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
            return texts.toggle_mouse_size_small;
        }
        else {
            return texts.toggle_mouse_size_big;
        }
    }

function setLocalization()
{
    Object.keys(localized_texts).forEach(function (key) {
        if ((window.location.href.indexOf("/"+key+"") >= 0) || (window.location.href.indexOf("="+key+"") >= 0)) {
            texts = localized_texts[key];
        }
    });
}

