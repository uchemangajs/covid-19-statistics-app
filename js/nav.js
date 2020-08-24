
'use strict'

//scripting for the responsive nav
window.onscroll = function() {navStyle()};


function navStyle() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector("[nav]").className = "nav-colored";
  } else {
    document.querySelector("[nav]").className = "";
  }
}