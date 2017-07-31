document.addEventListener("deviceready", onDeviceReady, false);

var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// place for persistent storage (like score), accessible from any state
var V = {};
V.consoleLog = [];

game.state.add('Boot', SweetieGame.Boot);
game.state.add('Preloader', SweetieGame.Preloader);
game.state.add('Home', SweetieGame.Home);
game.state.add('Food', SweetieGame.Food);
game.state.add('Pet', SweetieGame.Pet);

function onDeviceReady() {
    game.state.start('Boot');
}

function warn(msg) {
    var type = typeof game.debugLevel;
    if (type === "undefined") return null;
    if (game.debugLevel === "onscreen") {
	V.consoleLog.unshift(msg);
	V.consoleLog = V.consoleLog.slice(0,5); // limit length to 3 lines
	V.consoleUpdate = true;
    } else {
	console.log(msg);
    }
}
