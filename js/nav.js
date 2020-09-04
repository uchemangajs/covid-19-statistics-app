
'use strict'

//scripting for the responsive nav
window.onscroll = function() {navStyle()};


function navStyle() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector("[nav]").className = "nav-colored";
      document.querySelector("[sbstyle-scroll]").className = "sbstyle-scroll";
      document.querySelector("[topic-link]").className = "topic-link";
      
  } else {
    document.querySelector("[nav]").className = "";
      document.querySelector("[sbstyle-scroll]").className = "sbstyle";
      document.querySelector("[topic-link]").className = "";
  }
}