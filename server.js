const express = require('express');
const axios = require('axios');
const app = express();




app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{

    let url = 'https://api.themoviedb.org/3/movie/493529?api_key=40bdba9749dd9a833b64010c4c847777';
    axios.get(url)
    .then(response=>{
        let data = response.data;
        let currentYear=new Date().getFullYear();
        let movieDuration = data.runtime/60-data.runtime%60/60 + 'h '+data.runtime%60+'min';
       
        let date = new Date(data.release_date);
        let releaseDate = date.getDate()+'.'+date.getMonth()+1+'.'+date.getFullYear()+' '+data.production_countries[0].iso_3166_1;
        
        genresLoop = '';
        data.genres.forEach(genre => {
            genresLoop=genresLoop + `${genre.name}, `;
        });
        let genresLoopUpdate= genresLoop.slice(0, -2) + '.';

        let posterPath = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + data.poster_path;
        

    
        res.render('index',{dataTorender: data, year: currentYear,runTime: movieDuration, releasedate: releaseDate, genres: genresLoopUpdate, poster: posterPath });
    });


});


app.listen(process.env.PORT ||3000, ()=>{
    console.log('Server is running on Port 3000.');
});