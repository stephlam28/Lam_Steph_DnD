/*Bug #1 : Able to drag and drop more than one piece into drop zone
Solution: 
Check if current drop zone has a child node (a puzzle piece), if it doesn't then allow for piece to be placed.

Bug #2 : Reset button does not work properly for a fresh board, pieces do not reset on drop zone or choosing a new puzzle.
Solution: 
create a function handleReset(e) and resetButton event listener on click for reset button to work,
create a puzzle piece change based on bg image selected under changeBGImage()
Create a constant to select puzzle pieces per board based on background image and input function that allows for images to change based on bg image*/

//variables
const theButtons = document.querySelectorAll("#buttonHolder img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePiecesBoard = document.querySelector(".puzzle-pieces"), //Bug #2 - Gets the div containing all puzzle pieces
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll(".drop-zone"),
    resetButton = document.getElementById("resetBut"); // Bug #2 - Gets the reset button by calling the resetButtons ID
//store the dragged piece in a global variable
//we will need it in the handleDrop function    
let draggedPiece;

function changeBGImage(e) {
    //console.log("changeBGImage called");
    //url('../images/backGround0.jpg');
    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`

    // Bug 2 - Calls the handleReset to move the pieces back to the puzzle board
    handleReset(e);

    // Bug 2 - Puzzle pieces were not changing to their respective puzzle boards
    // Goes through each puzzle piece
    puzzlePieces.forEach(piece => {
        // If the current puzzle piece is the top left piece, checks the current background puzzle and changes it to the respective puzzle piece
        if (piece.currentSrc.includes("topLeft")) {
            piece.src = `images/topLeft${this.id}.jpg`;
        }
        // Same as the above but for top right piece
        else if (piece.currentSrc.includes("topRight")) {
            piece.src = `images/topRight${this.id}.jpg`;
        }
        // Same as the above but for the bottom left piece
        else if (piece.currentSrc.includes("bottomLeft")) {
            piece.src = `images/bottomLeft${this.id}.jpg`;
        }
        // Same as the above but for the bottom right piece
        else {
            piece.src = `images/bottomRight${this.id}.jpg`;
        }
    });
}

function handleStartDrag() {
    //console.log("Started dragging this piece:", this)
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    //this will prevent the default dragover behaviour
    //e is short for event, could be e, evt a well
    console.log("dragged over me");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("dropped something on me");
    //this line moves the dragged piece from the left side of the board
    //into whatever dropzone we choose.

    // BUG #1
    // This checks if the puzzle board has a piece in it, if current drop zone doesn't have a first child, then allow for piece to be dropped/append zone.
    if(!this.firstChild) {
        this.appendChild(draggedPiece);
    }
}


//BUG 2
// Allows for reset button to work alongside resetButton event listener
function handleReset(e) {
    e.preventDefault();
    
    // reset pieces from the puzzle board, Goes through each drop zone
    dropZones.forEach(zone => {
        // Checks if the first child of the drop zone to see if it exists, if there is a child, that means the current drop zone has a piece
        if (zone.firstElementChild) {
            puzzlePiecesBoard.appendChild(zone.firstElementChild);
        }
    });
}

//event Listeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage)); 

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

//Bug #2 continuous - added on click event listener for reset button, calls the handleReset function when the reset button is clicked
resetButton.addEventListener("click", handleReset);