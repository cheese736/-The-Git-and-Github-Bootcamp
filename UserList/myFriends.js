const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = JSON.parse(localStorage.getItem('friends'))
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
            <button class="btn btn-outline-danger btn-remove-user" data-id=${user.id}>X</button>
          </div>
    </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}

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
  const user = users.find(user => user.id === id)
  title.innerText = user.name + ' ' + user.surname
  avatar.src = user.avatar
  gender.innerText = "Gender: " + user.gender
  age.innerText = "Age: " + user.age
  birthday.innerText = "Birthday: " + user.birthday
  region.innerText = "Region: " + user.region
  email.innerText = "Region: " + user.email
}

function removeFromFriends(id) {
  if (!users || !users.length) return 

  //透過 id 找到要刪除user的 index
  const userIndex = users.findIndex((user) => user.id === id)
  if(userIndex === -1) return

  //刪除該筆電影
  users.splice(userIndex,1)

  //存回 local storage
  localStorage.setItem('friends', JSON.stringify(users))
  console.log(users)
  //更新頁面
  renderUsers(users)
}








renderUsers(users)





// 新增事件監聽器
dataPanel.addEventListener('click', event => {
  if (event.target.matches('.card-img-top') || event.target.matches('.card-body')) {
    // 點擊的target可以有圖片或文字部分
    renderUserDetail(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-user')) {
    console.log(event.target.dataset.id)
    removeFromFriends(Number(event.target.dataset.id))
  }
})
