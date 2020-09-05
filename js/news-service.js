(function showNews (){
    fetch("https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&page_size=20&media=True&q=covid", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-news.p.rapidapi.com",
		"x-rapidapi-key": "6195ba9f20mshde087fdcc4aa35dp124092jsna642f0179fa6"
	}
})
.then(response => {
    if (!response.ok) {
        throw Error(response.statusText);
      }
      return response; 
})    
.then(data => {
        return data.json()})
        .then(d => {
         // articles = d.articles;
        Array.from(d.articles).forEach(news => {
            document.querySelector("#news").innerHTML+=`
            <a href="${news.link}">
                <div class="article">
                 <h3>${news.title}</h3>
                 <div class="imgHolder">
                     <img src="${news.media}"  alt="">
                 </div>
                 <p>${news.summary}</p>
                </div>
                </a>`
        })
    });

  })();
