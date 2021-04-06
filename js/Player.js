class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }
    
    
   /*creates token objects for player */
    createTokens(num) {
        //num - Number of token objects to be created
        const tokens = [];
        
        for (let i = 0; i < num; i++) {
            let token = new Token(i, this);
            tokens.push(token);
        }
        
        return tokens;
    }
    
    
    /* gets all tokens that haven't been dropped, returns array of unused tokens*/
    get unusedTokens(){
        return this.tokens.filter(token => !token.dropped);
    }
    
    
    /* returns the first token in the array of unused tokens */
	get activeToken() {
        return this.unusedTokens[0];
    }
    

    /*checks if a player has any undropped tokens left*/
    checkTokens(){
        return this.unusedTokens.length == 0 ? false : true;
    }
}