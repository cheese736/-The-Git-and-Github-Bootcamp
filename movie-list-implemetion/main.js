const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const movies = []
let filteredMovies = []

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  const start = (page - 1) * MOVIES_PER_PAGE
  return data.slice(start, start + MOVIES_PER_PAGE)
}

function renderPaginator(amount) {
  const totalPage = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= totalPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

function renderMovieList(data) {
  //title, image
  let rawHTML = ''
  data.forEach(item => {
    rawHTML +=
      `
    <div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img
            src=${POSTER_URL + item.image}
            class="card-img-top px-0" alt="Movie Poster" />
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
              data-bs-target="#movie-modal" data-id=${item.id}>More</button>
            <button class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
          </div>
        </div>
      </div>
    </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}

axios
  .get(INDEX_URL)
  .then(response => {
    // array
    movies.push(...response.data.results)
    renderMovieList(getMoviesByPage(1))
    renderPaginator(movies.length)
  })
  .catch(err => console.log(err))

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios
    .get(INDEX_URL + id)
    .then(response => {
      const data = response.data.results
      modalTitle.innerText = data.title
      modalDate.innerText = 'Release date: ' + data.release_date
      modalDescription.innerText = data.description
      modalImage.innerHTML = `<img src="${POSTER_URL + data.image
        }" alt="movie-poster" class="img-fluid">`
    })
}

function addToFavorite(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movieToAdd = movies.find(movie => movie.id === id)
    if (list.some(existedMovie => existedMovie.id === id)) {
        return alert('movie already exists')
    }
    list.push(movieToAdd)
    localStorage.setItem('favoriteMovies', JSON.stringify(list))

}





dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(keyword))
  if (filteredMovies.length === 0) {
    return alert('查無資料: ' + keyword)
  }
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPage(1))
})

paginator.addEventListener('click', function onPaginatorClick(event){
  if (event.target.matches('.page-link')) {
    let page = Number(event.target.innerText)
    renderMovieList(getMoviesByPage(page))
  }
})