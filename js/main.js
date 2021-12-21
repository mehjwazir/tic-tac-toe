/*----- constants -----*/
const xclass = 'x'
const oclass = 'o'
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];





/*----- cached element references -----*/
const board = document.getElementById('board')
const winmsg = document.getElementById('winmsg')
const winmsgelement = document.getElementById('element')
const allboxes = document.querySelectorAll('[data-box]')
const btn = document.getElementById('btn')

/*----- event listeners -----*/
let oturn
startgame()

btn.addEventListener('click', startgame)
function startgame(){
allboxes.forEach(box => {
box.classList.remove(xclass)
box.classList.remove(oclass)
box.removeEventListener('click', clicky)
box.addEventListener('click', clicky , { once : true})
})
  winmsg.classList.remove('show')
}


/*----- functions -----*/
function clicky(e){
const box = e.target
const currentclass = oturn ? oclass : xclass
mark(box, currentclass)
if (checkwin(currentclass)){
endgame(false)
} else if (isdraw()){
endgame(true)
} else {
changeturn()
}
}

function endgame(draw){
if (draw){
winmsgelement.innerText = 'DRAW!'
} else {
winmsgelement.innerText = `${oturn ? "O WON!" : "X WON!"}`
}
 winmsg.classList.add('show')
}

function isdraw(){
return [...allboxes].every(box => {
return box.classList.contains(oclass) || box.classList.contains(xclass)
})
}



function mark(box, currentclass){
box.classList.add(currentclass)
}
function changeturn(){
oturn = !oturn
}

function checkwin(currentclass){
return winCombos.some(combination => {
return combination.every(index => {
return allboxes[index].classList.contains(currentclass)
})
})
}