class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }
    
    
    /*returns active player. */
	get activePlayer() {
        const ptr = this.players.find(player => player.active);
        if(ptr.id === 1) {
            document.getElementById("user-board").style.borderBottom = "10px solid #ff5c7c";
            document.getElementById("user-board2").style.borderBottom = "none";
        }
        else{
            document.getElementById("user-board2").style.borderBottom = "10px solid #50d4fc";
            document.getElementById("user-board").style.borderBottom = "none";
        }
        return ptr;
	}
    
    /* creates two player objects  */
    createPlayers() {
        const name1 = document.getElementById("name1").value;
        const name2 = document.getElementById("name2").value;

        const players = [new Player(name1, 1, '#ff5c7c', true),
                         new Player(name2, 2, '#50d4fc')];
        
        document.getElementById('user-board').textContent = name1;
        document.getElementById('user-board2').textContent = name2;
        return players;
    }
    
    
    /*initializes game. */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }
	
	handleKeydown(e) {
        //e - keydown event object
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }
    
    /* finds Space object to drop Token into, drops Token */
    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

		for (let space of targetColumn) {
			if (space.token === null) {
				targetSpace = space;
			}
        }

        if (targetSpace !== null) {
			const game = this;
            game.ready = false;

    		activeToken.drop(targetSpace, function(){
                game.updateGameState(activeToken, targetSpace);           
    		});  
        }              
    }

    updateGameState(token, target) {
        //token - the token that's being dropped
        //target - targeted space for dropped token
		target.mark(token);

        if (!this.checkForWin(target)) {
            console.log('no win');
			this.switchPlayers();
            
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens');
            }
        } else {
			console.log('win');
            this.gameOver(`${target.owner.name} wins!`)
        }			
    }

    checkForWin(target){
        //target - Targeted space for dropped 
        //tells whether the game has been won (true) or not (false)
    	const owner = target.token.owner;
    	let win = false;
		console.log('checkforwin called');
    	// vertical
    	for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
				console.log(x,y);
				console.log(y+1);
				console.log(y+2);
				console.log(y+3);
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x][y+1].owner === owner && 
    				this.board.spaces[x][y+2].owner === owner && 
    				this.board.spaces[x][y+3].owner === owner) {
                    	win = true;
						console.log(win);
                }           
            }
        }
	
    	// horizontal
    	for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x+1][y].owner === owner && 
    				this.board.spaces[x+2][y].owner === owner && 
    				this.board.spaces[x+3][y].owner === owner) {
                    	win = true;
                }           
            }
        }
		
    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y+1].owner === owner && 
    				this.board.spaces[x-2][y+2].owner === owner && 
    				this.board.spaces[x-3][y+3].owner === owner) {
                    	win = true;
                }           
            }
        }
	
    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
    				this.board.spaces[x-1][y-1].owner === owner && 
    				this.board.spaces[x-2][y-2].owner === owner && 
    				this.board.spaces[x-3][y-3].owner === owner) {
                    	win = true;
                }           
            }
        }
	
    	return win;
    }


    /* switches active player.*/
	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
    }
    

    /* displays winner info  */
    gameOver(message) {
        document.getElementById('game-over').style.display = 'inline-block';
        //message - game over message.
        document.getElementById('game-over-message').textContent = message;
        console.log(document.getElementById('begin-game2'));
        
        document.getElementById('begin-game2').addEventListener('click', function(){

            document.getElementById('game-over').style.display = 'none';
            
            const myNode = document.getElementById("game-board-underlay");
            myNode.innerHTML = '';
            game = new Game();
            game.startGame();
        
        });
        
   
    }
}