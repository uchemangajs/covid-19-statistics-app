const searchInput = document.querySelector("[search-input]");
  let searchValue = searchInput.value;
  // console.log(searchValue)
  
   searchInput.addEventListener("keyup", function SearchCountry(e){
  if(e.keyCode === 13){
      event.preventDefault();
      console.log(searchInput.value);            
      findCountry();
  }
})

function findCountry(country){      
  
  country=searchInput.value;
      console.log(country);

      fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${country}`, {
  "method": "GET",
  "headers": {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6"
  }
})
.then(validateResponse)
.then(readResponseAsJSON)
.then((result) => {
  data = result.latest_stat_by_country[0];
   console.log(data);
   console.log($totalCases);
    $totalCases.innerText = data.total_cases;
    $totalRecovered.innerText  = data.total_recovered;
    $totalDeaths.innerText = data.total_deaths;
    $countryName.innerText= data.country_name;
})
.catch(logError);
}  

  