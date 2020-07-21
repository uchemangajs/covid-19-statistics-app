'use strict';

// const country_btn = document.querySelector('[country-btn]');
// country_btn.addEventListener('click', showCountry);


( async function showCountry (){
   await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
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
            Array.from(d.countries_stat).forEach((country) => {
                document.querySelector("#country").innerHTML+=`
                
                <div class="country" id="country-collapsible" country-chart >
                <div class="country-container">
              <div class="country-arrow-div"> <i class="arrow down" ></i>
                  <i class="arrow up"  style="display: none;"></i>
                 </div>
              <label for="country" class="country-lable"> ${country.country_name}</label>
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
              <span class="death-case-data data-span" >${country.deaths}</span>
              </div>
             <div class="chart-div"  chart-div>
          <canvas id="myChart" my-chart class="hide"> </canvas>
          </div>
            </div>
          </div> 
                `

                document.querySelector("[date-elem]").innerHTML = d.statistic_taken_at;
            //    const $countryCollapsible = document.querySelector('#country-collapsible');
            //     console.log($countryCollapsible);  
            })
            
        }).then(() => {
            const $countryChart =document.querySelectorAll('[country-chart]');
            //    console.log($countryChart);
            
     
               $countryChart.forEach((item,index,arr) => {
                //    console.log(arr[index]);
                  
                //    const $chartElem = item.querySelector('[my-chart]');
                    const $upArrow = item.querySelector('[up-arrow]');
                    const $downArrow = item.querySelector('[down-arrow]');
                    item.addEventListener("click", togglefxn);
                       
                    function togglefxn (item){
                        const $chartElem = item.currentTarget.querySelector('[my-chart]');

                                console.log(index, item.currentTarget);
                                if($chartElem.classList.contains('hide') ){
                                     $chartElem.classList.remove('hide');
                                    
                                    //showChart(); 
                                    }else{
                                            
                                    
                                        $chartElem.classList.add('hide');};
                                    
        
                        }   
                    
                    
                    
                    
                    // function togglefxn (){
                    //     switch (item){
                    //         case arr[index]:
                    //             console.log(item.currentTarget);
                    //             if($chartElem.classList.contains('hide') || $chartElem.style.display ==='none'){
                    //                  $chartElem.classList.remove('hide');
                    //                  $chartElem.style.display =''
                    //                 //showChart(); 
                    //                 }else{
                                            
                    //                 $chartElem.style.display = 'none';
                    //                     $chartElem.classList.add('hide');};
                    //                     break;
        
                    //     }   
                         
                            // console.log(index);
                            // if($chartElem.classList.contains('hide') || $chartElem.style.display ==='none'){
                            //      $chartElem.classList.remove('hide');
                            //      $chartElem.style.display =''
                            //     //showChart(); 
                            //     }else{
                                        
                            //     $chartElem.style.display = 'none';
                            //         $chartElem.classList.add('hide');}};

               })
        })
       
         }
      )();

    //   const $body = document.getElementsByTagName('body');
    //  const $country = document.querySelector("#country");
    //   if($country.readyState === "complete"){
    //   const $countryCollapsible =document.querySelector('#country-collapsible');
    //   console.log($countryCollapsible);}
     

      
    //   const country = document.querySelector("#country").innerHTML;
    //   country.onload('showC');

    //   showC = () => {const $countryCollapsible = country.querySelector("#country-collapsible");
    //   console.log($countryCollapsible);}

    //    function showCountryChart(){
    //   const $countryCollapsible = document.querySelector("#country-collapsible");


    //   for(let i=0; i < $countryCollapsible.length; i++){
        
    //      $countryCollapsible[i].addEventListener("click", togglefxn);
    //     function togglefxn (){
    //      console.log($countryCollapsible[i])
    //     }
    //      //  x.addListener(togglefxn);
     
        //  const $chartElem = $countryCollapsible[i].querySelector('[my-chart]');
     
        //  const $upArrow = $countryCollapsible[i].querySelector('[up-arrow]');
        //  const $downArrow = $countryCollapsible[i].querySelector('[down-arrow]');
     
        //  function togglefxn () {
        //      if($chartElem.classList.contains('hide') || $chartElem.style.display ==='none'){
        //        $chartElem.classList.remove('hide');
        //        $chartElem.style.display =''
        //     //    showChart(); 
        //       }else{
                
        //      $chartElem.style.display = 'none';
        //      $chartElem.classList.add('hide');
        //  };
         
         
        //      if($downArrow.style.display === ''){
        //        $downArrow.style.display = 'none';
        //        $upArrow.style.display = '';
        //         }else{
        //      $upArrow.style.display = 'none';
        //      $downArrow.style.display = '';
        //  }
          
             
        //  }
    //     }
    //  }