document.addEventListener("deviceready", onDeviceReady, false);

var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// Persistent storage/utility object
var V = {
    mood: 'cranky',

    debugLevel: "onscreen", // null to disable, "onscreen" or anything else for console logging

    consoleLog: ['start'],
    consoleUpdate: false,
    
    warn: function(msg) {
	var type = typeof this.debugLevel;
	if (type === "undefined") return null;
	if (this.debugLevel === "onscreen") {
	    this.consoleLog.unshift(msg);
	    this.consoleLog = this.consoleLog.slice(0,5);
	    this.consoleUpdate = true;
	} else {
	    console.log(msg);
	}
    },

    onScreenDebug: function() {
	console.log('onScreenDebug = '+(typeof this.debugLevel !== "undefined" &&
					this.debugLevel === "onscreen"));
	
	return (typeof this.debugLevel !== "undefined" &&
		this.debugLevel === "onscreen");
    },
    
    displayLogClearUpdate: function() {
	this.consoleUpdate = false;
	return this.consoleLog.slice().reverse().join("\n");
    }
}

game.state.add('Boot', SweetieGame.Boot);
game.state.add('Preloader', SweetieGame.Preloader);
game.state.add('Home', SweetieGame.Home);
game.state.add('Food', SweetieGame.Food);
game.state.add('Pet', SweetieGame.Pet);

function onDeviceReady() {
    game.state.start('Boot');
}
