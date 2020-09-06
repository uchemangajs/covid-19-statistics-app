'use strict';

const $collapsible = document.getElementsByClassName('collapsible');
const $dropdownMenu = document.querySelector('[dropdown-menu]');
const $barBtn = document.querySelector('[bar-btn]');
const $totalCases = document.querySelector('[total_cases]');
const $totalRecovered = document.querySelector('[total_recovered]');
const $totalDeaths = document.querySelector('[total_deaths]');
const $dateElem = document.querySelector('[date-elem]');
// const $chartDivMedia = document.querySelector('[chart-div]');
// const x = window.matchMedia("(min-width: 48rem)");

let data = {};
console.log($collapsible);


//     function mediaQuery (){
//       if($chartDivMedia.style.display === 'none'){
//         $chartDivMedia.style.display = '';
          
//       }else{
//       $chartDivMedia.style.display = 'none';
//   }

//     }
    function toggleMenu () {
        if($dropdownMenu.style.display === 'none'){
           $dropdownMenu.style.display = '';
            console.log('yes');
            
            
        }else{
            $dropdownMenu.style.display = 'none';
    }}

$barBtn.addEventListener("click", toggleMenu);


for(let i=0; i < $collapsible.length; i++){
   console.log($collapsible[i])
    $collapsible[i].addEventListener("click", togglefxn);
    //  x.addListener(togglefxn);

    const $chartDiv = $collapsible[i].querySelector('[chart-div]');

    const $upArrow = $collapsible[i].querySelector('[up-arrow]');
    const $downArrow = $collapsible[i].querySelector('[down-arrow]');

    function togglefxn () {
        if($chartDiv.style.display === 'none' ){
          $chartDiv.style.display = '';
           
         }else{
        $chartDiv.style.display = 'none';
    };
    
    
        if($downArrow.style.display === ''){
          $downArrow.style.display = 'none';
          $upArrow.style.display = '';
           }else{
        $upArrow.style.display = 'none';
        $downArrow.style.display = '';
    }
     
         showChart(); 
    }

}

   function showChart () {
      let numTotalCase = parseInt(data.total_cases.replace(/\,/g,''));
      let numNewCase = parseInt(data.new_cases.replace(/\,/g,''));
      let numRecoverCase = parseInt(data.total_recovered.replace(/\,/g,''));
      let numTotalDeath= parseInt(data.total_deaths.replace(/\,/g,''));
      console.log(numTotalCase);
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
              data: [numTotalCase, numNewCase]
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              `Total Cases: ${data.total_cases}`,
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
              data: [numTotalCase, numRecoverCase]
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Total Cases',
              'Total Recovered',
              
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
  };
    

    
    
    

    

  
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
  
  function readResponseAsBlob(response) {
    return response.blob();
  }
  
  function readResponseAsText(response) {
    return response.text();
  }
  
  function showImage(responseAsBlob) {
    const container = document.getElementById('img-container');
    const imgElem = document.createElement('img');
    container.appendChild(imgElem);
    const imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }
  
  function showText(responseAsText) {
    const message = document.getElementById('message');
    message.textContent = responseAsText;
  }

  

  (function fetchJSON() {
    //   const apiLink = https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php;
    //   const apiKey = 6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6;
    //   const api = 'apiLink/apiKey'
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

  (function showNews (){
    fetch("https://newsapi.org/v2/top-headlines?q=covid-19&apiKey=86bfe8e7d643485aa6586ebb6ba2e883")
    .then(data => {
        return data.json()})
        .then(d => {
        console.log(d);
        // articles = d.articles;
        Array.from(d.articles).forEach(news => {
            document.querySelector("#news").innerHTML+=`
            <a href="${news.url}">
                <div class="article">
                 <h3>${news.title}</h3>
                 <div class="imgHolder">
                     <img src="${news.urlToImage}"  alt="">
                 </div>
                 <p>${news.description} </p>
                </div>
                </a>`
        })
    });

  })();
  






