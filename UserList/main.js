const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'

const users = []
const dataPanel = document.querySelector('#data-panel')

function renderUsers(data) {
  let rawHTML = ''
  data.forEach(user => {
    rawHTML += `
    <div class="card m-3" style = "width: 180px;">
    <img src=${user.avatar} class="card-img-top" alt="this is an avatar">
      <div class="card-body py-0">
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




