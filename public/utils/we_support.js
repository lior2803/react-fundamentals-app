texts = {
    accessability_button: 'Open Accesability Menu'
};

$( document ).ready(function() {
    $( "body" ).append(`<button id=accessability_button type=button class=float onclick='openAccessabilityMenu()'>${texts.accessability_button}</button>`);
});

function openAccessabilityMenu()
{
    /* hide after we finish : $( "#accessability_button" ).hide(); */

    //alert("Add menu show");
    document.getElementById("sidebar-container").style.width = "250px";
}

function closeAccessabilityMenu() {
    document.getElementById("sidebar-container").style.width = "0";
}
