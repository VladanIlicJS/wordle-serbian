
const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay=document.querySelector(".message-container");
const words=["ПЕТАО","СРЕЋА","СУНЦЕ","УЧИТИ","КОЦКА","КОВАЧ","ЗНАЊЕ","ЉУБАВ","ХРАНА","ЛИШЋЕ"]
const randomNum=Math.floor(Math.random()*words.length)
const wordle = words[randomNum];
console.log(wordle,randomNum)

const keys = [
  "Љ",
  "Њ",
  "Е",
  "Р",
  "Т",
  "З",
  "У",
  "И",
  "О",
  "П",
  "Ш",
  "А",
  "С",
  "Д",
  "Ф",
  "Г",
  "Х",
  "Ј",
  "К",
  "Л",
  "Ч",
  "Ћ",
  "ENTER",
  "Џ",
  "Ц",
  "В",
  "Б",
  "Н",
  "М",
  "Ђ",
  "Ж",
  "<<",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver=false;
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);

  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });

  tileDisplay.append(rowElement);
});


keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});


const handleClick = (letter) => {
  if (letter === "<<") {
    deleteLetter();
    return;
  }
  if (letter === "ENTER") {
    checkRow()
    return;
  }
  addLetter(letter);
};


const addLetter = (letter) => {
    if(currentTile<5 && currentRow<6){
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute("data", letter);
        currentTile++;
    }
};

const deleteLetter = (letter) => {
    if (currentTile>0){
        currentTile--
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent=''
        guessRows[currentRow][currentTile] = be.setAttribute("data", '');
    }

}
const checkRow = () =>{
    const guess=guessRows[currentRow].join('')
    flipTile()
    if(currentTile>4){
        // console.log('guess is'+ guess,'wordle is'+wordle)
        if(wordle==guess){
            showMessage('БРАВОО')
            isGameOver=true
            return
        }else{
            if( currentRow>=5){
                isGameOver=true;
                showMessage('ИГРА ЈЕ ЗАВРШЕНА')
                return
            }
            if (currentRow<5){
                currentRow++
                currentTile=0
            }
        }
    }
}
const messageElement=document.querySelector('p')
const showMessage=(message)=>{
    messageElement.textContent=message;
    messageElement.style.borderRadius='10px'
    messageElement.style.padding='10px'
    messageDisplay.append(messageElement)
    setTimeout(()=>messageDisplay.removeChild(messageElement),10000)
}

const addColorToKey = (keyLetter,color) =>{
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () =>{
    const rowTiles=document.querySelector('#guessRow-'+ currentRow).childNodes
    console.log(rowTiles)
    let checkWordle = wordle;
    const guess=[]


    
    rowTiles.forEach((tile,index)=>{
        const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
        let checkWordle = wordle
        const guess = []
    
        rowTiles.forEach(tile => {
            guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
        })
    
        guess.forEach((guess, index) => {
            if (guess.letter == wordle[index]) {
                guess.color = 'green-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })
    
        guess.forEach(guess => {
            if (checkWordle.includes(guess.letter)) {
                guess.color = 'yellow-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })
    
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip')
                tile.classList.add(guess[index].color)
                addColorToKey(guess[index].letter, guess[index].color)
            }, 500 * index)
        })
    })
    





}