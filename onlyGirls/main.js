button = document.querySelector('button')
users = document.querySelector('#users')
// 先製作一個factory function用來生產female user
function userGenerator() {
  // 創建必要的html元素
  const user = document.createElement("div");
  user.classList.add('user')
  const name = document.createElement("h1")
  const avatar = document.createElement("img")
  const email = document.createElement("h6")
  // 寫一個recurrsive的性別篩選器
  axios
    .get("https://randomuser.me/api/?gender=female")
    .then((response) => {
      //     查看資料後先將我們需要的部分存成result
      const result = response["data"]["results"][0];
      //     名字做字串合併
      name.textContent = result["name"]["first"] + " " + result["name"]["last"];
      // 圖片來源網址存入src
      avatar.src = result["picture"]["large"];
      // email
      email.textContent = result["email"];
    })
    .catch((error) => console.log(error));
  // 把name,avatar,email都裝進user
  user.appendChild(name)
  user.appendChild(avatar)
  user.appendChild(email)
  // 回傳user
  return user
}

// 這個userAdder用來加入user到頁面上，數量可由i指定
function userAdder() {
  for (let i = 0; i < 3; i++) {
    users.appendChild(userGenerator())
  }
}

button.addEventListener("click", userAdder)
