texts = {
    accessability_button: 'Open Accesability Menu'
};

exludedElements = ["accessibility_button"]

cookie_stuff =
{
    fontIncreaseFactor : 0
};

$( document ).ready(function() {
    $( "body" ).append(`<button id=accessibility_button type=button class=float onclick='openAccessabilityMenu()'>${texts.accessability_button}</button>`);
});

function openAccessabilityMenu()
{
    /* hide after we finish : $( "#accessability_button" ).hide(); */
    increase_site_font_size();
}

function increase_site_font_size()
{
    if (cookie_stuff.fontIncreaseFactor === 4) return;
    cookie_stuff.fontIncreaseFactor++;
    iterateElementsFromDom($( "body" ), (element) => increase_font_size(element));
}

function decrease_site_font_size()
{
    if (cookie_stuff.fontIncreaseFactor === -4) return;
    cookie_stuff.fontIncreaseFactor--;
    iterateElementsFromDom($( "body" ), (element) => increase_font_size(element));
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

function increase_font_size(element)
{
    var current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * 1.1);
}

function decrease_font_size(element)
{
    var current_size = parseFloat(element.css('font-size'));
    element.css('font-size', current_size * (1.0 / 1.1));
}