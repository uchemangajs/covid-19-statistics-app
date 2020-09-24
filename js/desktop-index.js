'use strict';

const $collapsible = document.getElementsByClassName('collapsible');
const $dropdownMenu = document.querySelector('[dropdown-menu]');
const $barBtn = document.querySelector('[bar-btn]');
const $totalCases = document.querySelector('[total_cases]');
const $totalRecovered = document.querySelector('[total_recovered]');
const $totalDeaths = document.querySelector('[total_deaths]');
const $dateElem = document.querySelector('[date-elem]');
const $countryName = document.querySelector("[country-name]");
const rapidoApiKey = "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6";

let data = {};

    function toggleMenu () {
        if($dropdownMenu.style.display === 'none'){
           $dropdownMenu.style.display = '';
            
            
        }else{
            $dropdownMenu.style.display = 'none';
    }}

$barBtn.addEventListener("click", toggleMenu);
  
function logResult(result) {
   
    data = result;
    $totalCases.innerText = data.total_cases;
    $totalRecovered.innerText  = data.total_recovered;
    $totalDeaths.innerText = data.total_deaths;
    $dateElem.innerText= data.statistic_taken_at;
  }
  
  function logError(error) {
    console.log('Looks like there was a problem:', error);
  }
  
  function validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  function readResponseAsJSON(response) {
    return response.json();
    
  }
  
  function showChart () {
    let numTotalCase = parseInt(data.total_cases.replace(/\,/g,''));
      let numNewCase = parseInt(data.new_cases.replace(/\,/g,''));
      let numRecoverCase = parseInt(data.total_recovered.replace(/\,/g,''));
      let numTotalDeath= parseInt(data.total_deaths.replace(/\,/g,''));
      
      let total_cases_per1m = data.total_cases_per_1m_population || data.total_cases_per1m;
      
      let numTotalPer_1m= parseInt(total_cases_per1m.replace(/\,/g,''));


      var ctx = document.getElementById('myChart1').getContext('2d');
      var chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
      
          // The data for our dataset
          data : {
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: ['#FCC133', '#292930'],
                  borderColor: '#292930',
                  data: [(1000000 - numTotalPer_1m) || (1000000 - numTotalPer_1m_country) , numTotalPer_1m || numTotalPer_1m_country]
              }],
          
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  `Total Cases Per 1m: ${data.total_cases_per_1m_population}`,
                  `New Cases: ${data.new_cases}`,
                  
              ]
             
          },
          // data: {
          //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //     datasets: [{
          //         label: 'My First dataset',
          //         backgroundColor: 'rgb(255, 99, 132)',
          //         borderColor: 'rgb(255, 99, 132)',
          //         data: [0, 10, 5, 2, 20, 30, 45]
          //     }]
          // },
      
          // Configuration options go here
          options: {}
      });
     

      var ctx = document.getElementById('myChart2').getContext('2d');
      var chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
      
          // The data for our dataset
          data : {
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: ['#FCC133', '#3EB650'],
                  borderColor: 'none',
                  data: [(numTotalCase - numRecoverCase), numRecoverCase]
              }],
          
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                `Total Cases: ${data.total_cases}`,
                `Recovered Cases: ${data.total_recovered}`,
                
            ]
          },
      
          // Configuration options go here
          options: {}
      });

      var ctx = document.getElementById('myChart3').getContext('2d');
      var chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'pie',
      
          // The data for our dataset
          data : {
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: ['#FCC133', '#E12B38'],
                  borderColor: 'none',
                  data: [(numTotalCase - numTotalDeath), numTotalDeath ]
              }],
          
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  'Total Cases',
                  'Total Deaths',
                  
              ]
          },
      
          // Configuration options go here
          options: {}
      });
      
    }
  


  (function fetchJSON() {
    
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": rapidoApiKey
        }
    })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .then(showChart)
      .catch(logError);
  })();

  const searchInput = document.querySelector("[search-input]");
  let searchValue = searchInput.value;
  const usa = "United States of America"
  
   searchInput.addEventListener("keyup", function SearchCountry(e){
  if(e.keyCode === 13 ){
      event.preventDefault();
     if(COUNTRIES.indexOf(searchValue)){
        findCountry();
     }else{
       return
     }
    
    }
      
   
  })


function findCountry(country){      
  
  country=searchInput.value;
  if(!COUNTRIES.includes(country)){
    return
  }else{

      fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${country}`, {
  "method": "GET",
  "headers": {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": rapidoApiKey
  }
})
.then(validateResponse)
.then(readResponseAsJSON)
.then((result) => {
  data = result.latest_stat_by_country[0];
   
    $totalCases.innerText = data.total_cases;
    $totalRecovered.innerText  = data.total_recovered;
    $totalDeaths.innerText = data.total_deaths;
    $countryName.innerText= data.country_name;
})
.then(() => showChart()
)
.catch(logError);
} }



function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              findCountry();
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
            
        }
      }
  });
  
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina",
"Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
"Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei",
"Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic",
"Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
"Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
"Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies",
"Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea",
"Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
"Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
"Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi",
"Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia",
"New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay",
"Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino",
"Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
"South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden",
"Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan",
"Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City",
"Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), COUNTRIES);


  
