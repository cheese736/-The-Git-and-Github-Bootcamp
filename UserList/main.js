const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const USERS_PER_PAGE = 20
const users = []
let filteredUsers = []
const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')
const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')

function renderUsers(data) {
  let rawHTML = ''
  data.forEach(user => {
    rawHTML += `
    <div class="card m-3 px-0"  style = "width: 180px;" data-id=${user.id}>
        <img src=${user.avatar} class="card-img-top" data-bs-toggle="modal" data-bs-target="#user-modal" data-id=${user.id} alt="this is an avatar">
          <div class="card-body p-0 d-flex align-items-center justify-content-between">
            <p class="card-text fs-6 m-2 ">
            ${user.name + ' ' + user.surname}
            </p>
            <button class="btn btn-sm btn-outline-secondary btn-add-user" data-id=${user.id}>+</button>
          </div>
    </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}


function renderPaginator(users) {
  let rawHTML = ''
  let pages = Math.ceil(users.length / USERS_PER_PAGE )
  for (let page = 1; page <= pages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(keyword) || user.surname.toLowerCase().includes(keyword))
  if (filteredUsers.length === 0) {
    return alert('查無資料: ' + keyword)
  }
  renderPaginator(filteredUsers)
  renderUsers(getUsersByPage(1))
})

function renderUserDetail(id) {
  // 定義好DOM物件
  const title = document.querySelector("#user-modal-title")
  const avatar = document.querySelector("#modal-avatar")
  const gender = document.querySelector("#modal-gender")
  const age = document.querySelector("#modal-age")
  const birthday = document.querySelector("#modal-birthday")
  const region = document.querySelector("#modal-region")
  const email = document.querySelector("#modal-email")

  // 複寫使用者資料
  axios
    .get(INDEX_URL + id)
    .then(response => {
      const data = response.data
      title.innerText = data.name + ' ' + data.surname
      avatar.src = data.avatar
      gender.innerText = "Gender: " + data.gender
      age.innerText = "Age: " + data.age
      birthday.innerText = "Birthday: " + data.birthday
      region.innerText = "Region: " + data.region
      email.innerText = "Region: " + data.email
    })
}

function addToFriend(id) {
  const list = JSON.parse(localStorage.getItem('friends')) || []
  const userToAdd = users.find(user => user.id === id)
  if (list.some(friend => friend.id === id)) {
    return alert('This user has been one of your friends')
  }
  list.push(userToAdd)
  localStorage.setItem('friends',JSON.stringify(list))
}

function getUsersByPage(page) {
  const data = filteredUsers.length ? filteredUsers : users
  start = (page - 1) * USERS_PER_PAGE
  return data.slice(start, start + USERS_PER_PAGE)
}


// 新增事件監聽器
dataPanel.addEventListener('click', event => {
  if (event.target.matches('.card-img-top')) {
    // 點擊的target可以有圖片或文字部分
    renderUserDetail(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-user')) {
    addToFriend(Number(event.target.dataset.id)) 
  }
})

paginator.addEventListener('click', function onPaginatorClick(event) {
  if (event.target.matches('.page-link')) {
    renderUsers(getUsersByPage(Number(event.target.innerText)))
  }
})

axios
  .get(INDEX_URL)
  .then(response => {
    users.push(...response.data.results)
    renderUsers(getUsersByPage(1))
    renderPaginator(users)
  })
  .catch(error => console.log(error))