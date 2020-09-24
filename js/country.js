'use strict';

const $barBtn = document.querySelector('[bar-btn]');
const $dropdownMenu = document.querySelector('[dropdown-menu]');
const rapidoApiKey = "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6";




function toggleMenu () {
    if($dropdownMenu.style.display === 'none'){
       $dropdownMenu.style.display = '';
        console.log('yes');
        
        
    }else{
        $dropdownMenu.style.display = 'none';
}}

$barBtn.addEventListener("click", toggleMenu);
 

let results = {};


( async function showCountry (){
   await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": rapidoApiKey
        }
    })
    .then(data => {
            return data.json()})
            .then(d => {
            results=d;
            // country-stat = d.country_stat;
            Array.from(d.countries_stat).forEach((country) => {
                document.querySelector("#country").innerHTML+=`
                
                <div class="country" id="country-collapsible" country-chart >
                <div class="country-container">
              <div class="country-arrow-div"> <i class="arrow down" ></i>
                  <i class="arrow up"  style="display: none;"></i>
                 </div>
              <label for="country" class="country-lable" country-name-label> ${country.country_name}</label>
              <div class="total-case-div  country-divs" >
              <span class = "total-case-title  title-span">Total Cases:</span>
              <span class="total-case-data  data-span" total-case-data>${country.cases}</span>
              </div>
              <div class="recovery-case-div country-divs" >
              <span class = "recovery-case-title title-span">Recovery Cases:</span>
              <span class="recovery-case-data data-span" recovery-case-data>${country.total_recovered}</span>
              </div>
              <div class="total-death-div country-divs" >
              <span class = "death-case-title title-span">Death Cases:</span>
              <span class="death-case-data data-span" death-case-data >${country.deaths}</span>
              </div>
             <div class="chart-div"  chart-div>
          <canvas id="myChart" my-chart class="hide"> </canvas>
          </div>
            </div>
          </div> 
                `

                document.querySelector("[date-elem]").innerHTML = d.statistic_taken_at;
          
            })
            
        })
         .then(() => {
            const $countryChart =document.querySelectorAll('[country-chart]');
            $countryChart.forEach((item,index,arr) => {
                
                    const $upArrow = item.querySelector('[up-arrow]');
                    const $downArrow = item.querySelector('[down-arrow]');
                    item.addEventListener("click", togglefxn);
                       
                    function togglefxn (item){
                        const $chartElem = item.currentTarget.querySelector('[my-chart]');

                                
                                if($chartElem.classList.contains('hide') || $chartElem.style.display ==='none' ){
                                     $chartElem.classList.remove('hide');
                                     $chartElem.style.display =''
                                    let numTotalCase = parseInt( item.currentTarget.querySelector("[total-case-data]").innerText.replace(/\,/g,''));
                                    let numDeathCase = parseInt( item.currentTarget.querySelector("[death-case-data]").innerText.replace(/\,/g,''));
                                    let numTotalRecovered = parseInt( item.currentTarget.querySelector("[recovery-case-data]").innerText.replace(/\,/g,''));

                                   
                                    var ctx = item.currentTarget.querySelector('[my-Chart]').getContext('2d');
                                    var chart = new Chart(ctx, {
                                        // The type of chart we want to create
                                        type: 'pie',
                                    
                                        // The data for our dataset
                                        data : {
                                            datasets: [{
                                                label: 'My First dataset',
                                                backgroundColor: ['#FCC133','#3EB650', '#E12B38'],
                                                borderColor: '#292930',
                                                data: [(numTotalCase - (numTotalRecovered + numDeathCase)), numTotalRecovered, numDeathCase]
                                            }],
                                        
                                            // These labels appear in the legend and in the tooltips when hovering different arcs
                                            labels: [
                                                `Total Cases: ${country.cases}`,
                                                `Recovery Cases: ${country.total_recovered}`,
                                                `New Cases: ${country.total_recovered}`,
                                                
                                            ]
                                        },
                                        
                                        options: {}
                                    
                                    })
                              

                                    }else{                                    
                                        $chartElem.style.display = 'none';
                                      $chartElem.classList.add('hide');}     
                        }   
                    })
        })
    .then(() =>{
            const $loading = document.querySelector('[loading]');
             $loading.style.display='none';
             })
       
         }
      )();

      const searchInput = document.querySelector("[search-input]");
    let searchValue = searchInput.value;

    
    searchInput.addEventListener("keyup", function SearchCountry(e){
        if(e.keyCode === 13){
            event.preventDefault();
            findCountry();
        }
    })  

    function findCountry(searchCountry){
        const $countryChart =document.querySelectorAll('[country-chart]');
            $countryChart.forEach((item,index,arr) => {
           let $countryName = item.querySelector('[country-name-label]');
           let countryName = $countryName.innerText.toUpperCase() || $countryName.innerContent.toUpperCase() ;
          let SearchName = searchInput.value.toUpperCase();
        if(countryName.indexOf(SearchName) > -1){
            item.style.display = "";
        }else{
            item.style.display = "none";
        }

    })}
   

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
        /*If the arrow DOWN key 
        pressed,
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
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
