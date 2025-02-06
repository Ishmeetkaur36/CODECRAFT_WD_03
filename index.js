let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newGameBtn = document.querySelector("#new-Btn");
let playAiBtn = document.querySelector("#play-ai-Btn");
let mesgContainer = document.querySelector(".msg-container");
let mesg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    mesgContainer.classList.add("hide");
}; 


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            count++;
            if (checkWinner()) return;
            turnO = !turnO;
            if (playWithAI && !turnO) {
                setTimeout(aiMove, 500);
            }
            let isWinner = checkWinner();

            if(count === 9 && !isWinner){
           drawGame();
       }
        }
    });
});


const disableBoxes = () => {
    boxes.forEach((box) =>{
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) =>{
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
   mesg.innerText = `Congralulations! Winner is ${winner}`;
   mesgContainer.classList.remove("hide");
   disableBoxes();
}

const checkWinner = () => {
  for(let pattern of winPatterns){
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    if(posVal1 != "" && posVal2 != "" && posVal3 !=""){
        if(posVal1 === posVal2 && posVal2 === posVal3){
            console.log("Winner" , posVal1);
            showWinner(posVal1);
        }
    }
  }
};

const drawGame = () => {
    mesg.innerText = `Game is draw`;
    mesgContainer.classList.remove("hide");
    disableBoxes();
};

const aiMove = () => {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    count++;
    if (checkWinner()) return;
    turnO = true;
};


playAiBtn.addEventListener("click", () => { 
    playWithAI = true; resetGame(); 

});
newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);