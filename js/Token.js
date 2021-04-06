class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }
    

    /*gets associated htmlToken, returns html element associated with token object.*/
    get htmlToken() {
        return document.getElementById(this.id);
    }
    
    
    /* gets left offset of html element */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }
	
    
    /* draws new HTML token */
    drawHTMLToken(){
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }
	
	
    /* moves html token one column to left */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            //this.htmlToken.style.left = (this.columnLocation - 1) * 76;
            this.columnLocation -= 1;
        } 
    }
    
    
    /* moves html token one column to right */
    moveRight(columns) {
        // columns - number of columns on the game board    
        if (this.columnLocation < columns - 1) {
            console.log(this.offsetLeft);
            this.htmlToken.style.left = this.offsetLeft + 76;
            //this.htmlToken.style.left = (this.columnLocation + 1) * 76;
            this.columnLocation += 1;
        }
    }
    
    
    /* drops html token into targeted board space */
    drop(target, reset) {
        //target - targeted space for dropped token
        //reset - function to call after the drop animation has completed
        this.dropped = true;
        
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
	}
}