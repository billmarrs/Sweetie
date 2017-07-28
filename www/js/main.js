document.addEventListener("deviceready", onDeviceReady, false);

var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// place for persistent storage (like score), accessible from any state
var V = {};

game.state.add('Boot', SweetieGame.Boot);
game.state.add('Preloader', SweetieGame.Preloader);
game.state.add('Home', SweetieGame.Home);
game.state.add('Food', SweetieGame.Food);
game.state.add('Pet', SweetieGame.Pet);

function onDeviceReady() {
    game.state.start('Boot');
}


