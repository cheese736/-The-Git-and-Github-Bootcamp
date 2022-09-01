let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')

// write your code here
//define variables of icon source
const up = '<i class = "fa fa-plus-circle up"></i>'
const down = '<i class = "fa fa-minus-circle down"></i>'

// updating function
function displayPlayerList(players) {
  let content = ``
  players.forEach((player) => {
    content += `
    <tr>`
    for (let i in player) {
      if (i == 'name') { //姓名不用加按鈕
        content += `
        <td>${player[i]}</td>
        `
      } else {
        content += `
        <td>${player[i]}${up}${down}</td>
        `
      }
    }
    content += `
    </tr>`
  })
  return content
}

//update dataPanel with function: displayPlayerList
dataPanel.innerHTML = displayPlayerList(players)

//make plus/minus button fuctional
table = document.querySelector('.table')
table.addEventListener('click', (event) => {
  let target = event.target
  if (target.classList.contains('up')) {
    const scoreNode = target.parentNode
    let score = parseInt(scoreNode.firstChild.textContent)
    scoreNode.firstChild.textContent = ++score
  } else if (target.classList.contains('down') &
    parseInt(target.parentNode.firstChild.textContent) > 0) {
    const scoreNode = target.parentNode
    let score = parseInt(scoreNode.firstChild.textContent)
    scoreNode.firstChild.textContent = --score
  }
})