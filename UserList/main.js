const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = []
const dataPanel = document.querySelector('#data-panel')

function renderUsers(data) {
  let rawHTML = ''
  data.forEach(user => {
    rawHTML += `
    <div class="card m-3"  style = "width: 180px;" data-id=${user.id}>
        <img src=${user.avatar} class="card-img-top" data-bs-toggle="modal" data-bs-target="#user-modal" data-id=${user.id} alt="this is an avatar">
          <div class="card-body py-0 d-flex align-items-center">
            <p class="card-text fs-6" data-bs-toggle="modal" data-bs-target="#user-modal" data-id=${user.id}>
            ${user.name + ' ' + user.surname}
            </p>
            <button class="btn btn-outline-secondary btn-add-user" data-id=${user.id}>+</button>
          </div>
    </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}

axios
  .get(INDEX_URL)
  .then(response => {
    users.push(...response.data.results)
    renderUsers(users)
  })
  .catch(error => console.log(error))




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




// 新增事件監聽器
dataPanel.addEventListener('click', event => {
  console.log(event.target)
  if (event.target.matches('.card-img-top') || event.target.matches('.card-text')) {
    // 點擊的target可以有圖片或文字部分
    renderUserDetail(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-user')) {
    addToFriend(Number(event.target.dataset.id)) 
  }
})