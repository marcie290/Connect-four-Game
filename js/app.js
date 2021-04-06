let game;

/* calls startGame() on game object*/
document.getElementById('begin-game').addEventListener('click', function(){
    game = new Game();
    game.startGame();

    document.getElementById('form1').style.display = 'none';

    document.getElementById('game-scene').style.opacity = '1';
    document.getElementById('user-board').style.opacity = '1';
    document.getElementById('user-board2').style.opacity = '1';
});

/*listen for keyboard presses */
document.addEventListener('keydown', function(event){
    console.log('keydown')
    if(game)
        game.handleKeydown(event);
});
