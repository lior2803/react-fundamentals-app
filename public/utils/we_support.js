$(document).ready(function() {
  appendAccessabilityButton();
  appendAccessabilityMenu();
});

function openAccessabilityMenu() {
    document.getElementById('sidebar-container').style.width = "250px";
}

function appendAccessabilityMenu() {
  $('body').append(
    `<div id="sidebar-container" class="sidebar-container">
      <a href="javascript:void(0)" class="closebtn" onclick="closeAccessabilityMenu()">&times;</a>
      <button class="icon_increase-font" onClick='increaseFont()'>Increase Font</button>
      <button class="icon_decrease-font" onClick='decreaseFont()'>Decrease Font</button>
      <button>Black and White</button>
      <button>Increase Font</button>
      <button>Increase Font</button>
      <button>Increase Font</button>
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
