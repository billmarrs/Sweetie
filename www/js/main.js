document.addEventListener("deviceready", onDeviceReady, false);

var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// place for persistent storage (like score), accessible from any state
var V = {};

game.state.add('Boot', SweetieGame.Boot);
game.state.add('Preloader', SweetieGame.Preloader);
game.state.add('Game', SweetieGame.Game);

function onDeviceReady() {
    game.state.start('Boot');
}


