const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = []
const dataPanel = document.querySelector('#data-panel')

function renderUsers(data) {
  let rawHTML = ''
  data.forEach(user => {
    rawHTML += `
    <div class="card m-3" data-bs-toggle="modal" data-bs-target="#user-modal" style = "width: 180px;" data-id=${user.id}>
        <img src=${user.avatar} class="card-img-top" alt="this is an avatar">
          <div class="card-body py-0 d-flex align-items-center">
            <p class="card-text fs-6">
            ${user.name + ' ' + user.surname}
            </p>
          </div>
    </div>
    `
    dataPanel.innerHTML = rawHTML
  })
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

// 新增事件監聽器
dataPanel.addEventListener('click', event => {
  if (event.target.matches('.card-img-top') || event.target.matches('.card-body')) {
    // 點擊的target可以有圖片或文字部分，但我的id綁在card上，使用closest來尋找.card的父元素
    const card = event.target.closest('.card')
    renderUserDetail(Number(card.dataset.id))
  }
})
