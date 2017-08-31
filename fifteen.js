// Xiaodan Hu
// Section AF
// TA: Chris

// This file gives the fifteen.html page some functions.
// It can play a game with the user. Each tiles next to
// the empty tile can move. When the user click the shuffle
// bottom, it will randomly change the positions of puzzles.
// To win the game the user wants to change the tiles back
// to the orginal status. 

(function() {
    "use strict";
    
    var emptyX = 3;
	var emptyY = 3;
	var NUM = 4;
	var SIZE = 100;

    	window.onload = function() {
			beginGame();
			document.getElementById("shufflebutton").onclick = shuffle;
    	};
		
        function beginGame() { 
	       for (var i = 0; i < NUM * NUM - 1; i++) {
		       var x = (i % NUM) * SIZE;
			   var y = Math.floor(i / NUM) * SIZE;
	           var squares = document.createElement("div");
	           squares.innerHTML = i + 1;
	           squares.style.left = x + "px";
	    	   squares.style.top = y + "px";
	           squares.classList.add("square");
	           squares.id="square_" + x / SIZE + "_" + y / SIZE;
	           document.getElementById("puzzlearea").appendChild(squares);
	           squares.style.backgroundImage = "url('background.jpg')";
	           squares.style.backgroundPosition= -x +"px " + -y +"px";
	           squares.onclick = movePiece; 
	           squares.onmouseover = highlight;
          } 
        }
    
	    function movePiece() {
			var moveX = parseInt(this.style.left);
			var moveY = parseInt(this.style.top); 
			if (canMove(this)) {
				setNewPos(this, moveX, moveY);
			}
		}
		
       
	    function shuffle() {
			for (var i = 0; i < 1000; i++) {
				 var neighbors = [];
		    	 var position = [];
				 neighbors.push(document.getElementById("square_" + (emptyX + 1) + "_" + emptyY));
				 neighbors.push(document.getElementById("square_" + (emptyX - 1) + "_" + emptyY));
				 neighbors.push(document.getElementById("square_" + emptyX + "_" + (emptyY + 1)));
				 neighbors.push(document.getElementById("square_" + emptyX +  "_" + (emptyY - 1)));
				 for (var j = 0 ; j < neighbors.length; j++) {
					if (neighbors[j] !== null) {
						position.push(neighbors[j]);
					}
				 }
			     var randPiece = position[parseInt(Math.random() * position.length)];
		         var xCor = parseInt(randPiece.style.left);
			     var yCor = parseInt(randPiece.style.top);
				 setNewPos(randPiece,xCor, yCor);
			}
		}
	
	function highlight() {
		this.onmouseout = unhighlight;
		if (canMove(this)) {
			this.classList.add("highlight");
		}
	}

	function unhighlight() {
		this.classList.remove("highlight");
		this.classList.add("unhighlight");
	}
	
	function setNewPos(target, moveX, moveY) {
		target.style.left = emptyX * SIZE + "px";
		target.style.top = emptyY * SIZE+ "px";
		target.id = "square_" + emptyX + "_" + emptyY;
		emptyX = moveX / SIZE;
		emptyY = moveY / SIZE;
	}
	
	function canMove(target) {
			return target.id == "square_" + (emptyX + 1) + "_" + emptyY ||
			       target.id == "square_" + (emptyX - 1) + "_" + emptyY ||
			       target.id == "square_" + emptyX + "_" + (emptyY + 1) ||
			       target.id == "square_" + emptyX + "_" + (emptyY - 1);
	}

}) ();