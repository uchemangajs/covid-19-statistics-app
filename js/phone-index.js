'use strict';

const $collapsible = document.getElementsByClassName('collapsible');
const $dropdownMenu = document.querySelector('[dropdown-menu]');
const $barBtn = document.querySelector('[bar-btn]');
const $totalCases = document.querySelector('[total_cases]');
const $totalRecovered = document.querySelector('[total_recovered]');
const $totalDeaths = document.querySelector('[total_deaths]');
const $dateElem = document.querySelector('[date-elem]');
const $countryName = document.querySelector("[country-name]");

let data = {};

// Implementing toggle menu

    function toggleMenu () {
        if($dropdownMenu.style.display === 'none'){
           $dropdownMenu.style.display = '';
            console.log('yes');
            
            
        }else{
            $dropdownMenu.style.display = 'none';
    }}

$barBtn.addEventListener("click", toggleMenu);


// Implementing toggle div function

for(let i=0; i < $collapsible.length; i++){
   console.log($collapsible[i])
    $collapsible[i].addEventListener("click", togglefxn);

    const $chartElem = $collapsible[i].querySelector('[my-chart]');

    const $upArrow = $collapsible[i].querySelector('[up-arrow]');
    const $downArrow = $collapsible[i].querySelector('[down-arrow]');

    function togglefxn () {
        if($chartElem.classList.contains('hide') || $chartElem.style.display ==='none'){
          $chartElem.classList.remove('hide');
          $chartElem.style.display =''
          showChart(); 
         }else{
           
        $chartElem.style.display = 'none';
        $chartElem.classList.add('hide');
    };
    
    
        if($downArrow.style.display === ''){
          $downArrow.style.display = 'none';
          $upArrow.style.display = '';
           }else{
        $upArrow.style.display = 'none';
        $downArrow.style.display = '';
    }
     
        
    }

// Implementing the chart function using chart.js

   function showChart () {
      let numTotalCase = parseInt(data.total_cases.replace(/\,/g,''));
      let numNewCase = parseInt(data.new_cases.replace(/\,/g,''));
      let numRecoverCase = parseInt(data.total_recovered.replace(/\,/g,''));
      let numTotalDeath= parseInt(data.total_deaths.replace(/\,/g,''));
      let numTotalPer_1m= parseInt(data.total_cases_per_1m_population.replace(/\,/g,''));
      console.log(numRecoverCase);

      switch ($collapsible[i]) {
        case $collapsible[0]:
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
                      data: [1000000, numTotalPer_1m]
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
          
         
          break;

          case $collapsible[1]:
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
                        data: [numRecoverCase, numTotalCase]
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

            break;

            case $collapsible[2]:
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
                          data: [numTotalCase, numTotalDeath]
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
          }
        }
      
  
function logResult(result) {
   
   console.log(result);
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
   

  (function fetchJSON() {
    
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6"
        }
    })
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
  })();

 
  