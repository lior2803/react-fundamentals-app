texts = {
    accessability_button: 'Open Accesability Menu'
};

exludedElements = ["sidebar-container"]

cookie_stuff =
    {
        fontIncreaseFactor : 0,
        contrastStatus: 0,
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
