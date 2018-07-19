const texts = {
  title: 'We-Accessible',
  screen_reader_adj: 'Screen Reader Adjustment',
  text_changes: 'Text Changes',
  blink_blocking: 'Blink Blocking',
  back_to_default: 'Back to Default',
  increase_font: 'Increase Font',
  decrease_font: 'Decrease Font',
  black_and_white: 'Black and White',
};

exludedElements = ["sidebar-container"];

cookie_stuff =
{
    fontIncreaseFactor : 0
};

$(document).ready(function() {
  appendAccessabilityButton();
  appendAccessabilityMenu();

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.visibility === "visible") {
        content.style.visibility = "hidden";
      } else {
        content.style.visibility = "visible";
      }
    });
  }
});

function openAccessabilityMenu() {
    document.getElementById('sidebar-container').style.width = "350px";
}

function appendAccessabilityMenu() {
  $('body').append(
    `<div id="sidebar-container" class="sidebar-container">
      <a href="javascript:void(0)" class="closebtn" onclick="closeAccessabilityMenu()">&times;</a>
      <div class="title"> ${texts.title} </div>
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
           <button class="icon toggle_cursor" onClick='increaseFont()'></button>
           <label class="button_text">${texts.increase_font}</label>
        </div>
        <div class="button_container">
           <button class="icon contrast" onClick='increaseFont()'></button>
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
    <div class="title"> ${texts.screen_reader_adj} </div>
    <div class="title"> ${texts.blink_blocking} </div>
    <div class="title"> ${texts.back_to_default} </div>
    </button>`);
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