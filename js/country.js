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
   