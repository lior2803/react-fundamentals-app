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
    document.getElementById("sidebar-container").style.width = "250px";
}

function closeAccessabilityMenu() {
    document.getElementById("sidebar-container").style.width = "0";
}

function increaseFont() {

}

function decreaseFont() {

}
