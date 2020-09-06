var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";

if (screen.width() < 739) 
{
    js.src = "js/phone-index.js";
}
else
{
    js.src = "js/desktop-index.js";
}

head.appendChild(js);