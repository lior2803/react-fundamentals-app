const texts = {
    increase_font: 'Increase Font',
    decrease_font: 'Decrease Font',
    black_and_white: 'Black and White',
};

exludedElements = ["sidebar-container"];

cookie_stuff =
{
    fontIncreaseFactor : 0,
    big_mouse: false
};

$(document).ready(function() {
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
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
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
           <button class="icon increase_font" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
         
    </div>
    </div>`);
}

function appendAccessabilityButton(){
  $('body').append
  (`<div class="btn_container">
        <button 
            class=float 
            onclick='openAccessabilityMenu()'>
        </button>
    </div>`);
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
