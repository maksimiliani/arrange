var sections_color;
var header_transparent;

function update_header() {

	function isNight(color) {
    var r, g, b, hsp; // Variables for red, green, blue values
    if (color.match(/^rgb/)) { // Check the format of the color, HEX or RGB?
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/); // If HEX --> store the red, green, blue values in separate variables
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else { // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt( // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    if (hsp>185) { // hsp>127.5 Using the HSP value, determine whether the color is light or dark
        return false; //'day'
      }
    else {
        return true; //'night'
      }
	}

  var header_color = getComputedStyle(sections_color, null).backgroundColor;

  if (window.scrollY > 119) {
    if (header_transparent) {
      header_transparent = false;
      $('.logo .image').removeClass('night');
      $('.nav-link').removeClass('night');
      $('.dropdown-toggle').removeClass('night');
      $('.topnav-button').removeClass('night');
      $('.topnav-button').addClass('white');
    }
  } else {
    if (!header_transparent) {
      header_transparent = true;
      if (isNight(header_color) {
        $('.logo .image').addClass('night');
        $('.nav-link').addClass('night');
        $('.dropdown-toggle').addClass('night');
        $('.topnav-button').addClass('night');
      } else {
        $('.logo .image').removeClass('night');
        $('.nav-link').removeClass('night');
        $('.dropdown-toggle').removeClass('night');
        $('.topnav-button').removeClass('night');
      }
      $('.topnav-button').removeClass('white');
    }
  }
}

$(document).ready(function() {
  sections_color = document.getElementsByClassName("Section")[0];
  update_header();

  $(window).scroll(function() {
    setTimeout(update_header(), 150);
  });
});
