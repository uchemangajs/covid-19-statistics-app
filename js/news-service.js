const newsApi = "https://newsapi.org/v2/top-headlines?q=covid-19&apiKey=86bfe8e7d643485aa6586ebb6ba2e883&language=en"; 
(function showNews (){
    fetch(newsApi)
    .then(data => {
        return data.json()})
        .then(d => {
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
