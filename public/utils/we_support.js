const texts = {
    increase_font: 'Increase Font',
    decrease_font: 'Decrease Font',
    black_and_white: 'Black and White',
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
    document.getElementById("sidebar-container").style.width = "0";
}

function increaseFont() {

}

function decreaseFont() {

}
