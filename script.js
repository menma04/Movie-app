const API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bd7c1708f789e977825072d2422ef87a&page=2'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'http://api.themoviedb.org/3/search/movie?api_key=bd7c1708f789e977825072d2422ef87a&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')

// get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average,overview} = movie 
    
    
    const movieEL = document.createElement
    ('div')
    movieEL.classList.add('movie')

    movieEL.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
 <div class="movie-info">
     <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
 </div>
 <div class="overview">
     <h3>Movie overview</h3>
     ${overview}

 </div>`
 main.appendChild(movieEL)
     } )
    
}
function getClassByRate(vote){
    if(vote>= 8) {
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }
    else { return 'red'}
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''

    } else {
        window.location.reload()
    }

})
