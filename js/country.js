// const country_btn = document.querySelector('[country-btn]');
// country_btn.addEventListener('click', showCountry);

(function showCountry (){
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6"
        }
    })
    .then(data => {
            return data.json()})
            .then(d => {
            console.log(d);
            // country-stat = d.country_stat;
            Array.from(d.countries_stat).forEach(country => {
                document.querySelector("#country").innerHTML+=`
                
                <div class="country">
              <div class="country-arrow-div"> <i class="arrow down" ></i>
                  <i class="arrow up"  style="display: none;"></i>
                 </div>
              <label for="country" class="country-lable"> ${country.country_name}</label>
              <div class="total-case-div  country-divs" ><span class = "total-case-title  title-span">Total Cases:</span><span class="total-case-data  data-span" total-case-data>${country.cases}</span></div>
              <div class="recovery-case-div country-divs" ><span class = "recovery-case-title title-span">Recovery Cases:</span><span class="recovery-case-data data-span" recovery-case-data>${country.total_recovered}</span></div>
              <div class="total-death-div country-divs" ><span class = "death-case-title title-span">Death Cases:</span><span class="death-case-data data-span" >${country.deaths}</span></div>
             <div class="chart-div"  chart-div>
          <canvas id="myChart3" my-chart class="hide"> </canvas>
          </div>
    
          </div>
           
                
                `
                document.querySelector("[date-elem]").innerHTML = d.statistic_taken_at;
               
            })
        });
    
    
    
      })();