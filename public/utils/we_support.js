texts = {
    accessability_button: 'Open Accesability Menu'
};

exludedElements = ["sidebar-container"]

cookie_stuff =
{
    fontIncreaseFactor : 0,
    big_mouse: false
};

$(document).ready(function() {
    $('body').append
    (`<div class="btn_container">
        <button 
            class=float 
            onclick='openAccessabilityMenu()'>
        </button>
    </div>`);
});

function openAccessabilityMenu() {
    $( "#sidebar-container" ).width("250px");
}

function closeAccessabilityMenu() {
    $( "#sidebar-container" ).width("0");
}

function increaseFont()
{
    if (cookie_stuff.fontIncreaseFactor === 4) return;
    cookie_stuff.fontIncreaseFactor++;
    iterateElementsFromDom($( "body" ), (element) => increase_element_font_size(element));
}

function decreaseFont()
{
    if (cookie_stuff.fontIncreaseFactor === -4) return;
    cookie_stuff.fontIncreaseFactor--;
    iterateElementsFromDom($( "body" ), (element) => decrease_element_font_size(element));
}

function iterateElementsFromDom(root, f) {
   root.children().each(function(index, element) {
       child = $( element );
       if (exludedElements.includes(child.prop("id")))
           return;
       f(child);
       iterateElementsFromDom(child, f);
   });
}

function increase_element_font_size(element)
{
    let current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * 1.1);
}

function decrease_element_font_size(element)
{
    let current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * (1.0 / 1.1));
}

function toggleMouseSize() {
    cookie_stuff.big_mouse = !cookie_stuff.big_mouse;

    iterateElementsFromDom($("body"), (element) => toggleElementMouseSize(element, cookie_stuff.big_mouse));
}

//* TODO: Handle different kind of cursors
function toggleElementMouseSize(domElement, isBigMouse)
{
    element = $( domElement );
    if (isBigMouse) {
        element.addClass('big_cursor');
    }
    else
    {
        element.removeClass('big_cursor');
    }
}
