var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// Persistent storage/utility object
var V = {
    mood: 4,
    game: null,
    debugLevel: null, // null to disable, "onscreen" or anything else for console logging
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
    },

    scaler: function(ratio, origwidth, origheight) {
	var desiredw = this.game.width * ratio;
	var desiredh = this.game.height * ratio;
	var wscale = desiredw / origwidth;
	var hscale = desiredh / origheight;
	var newscale = 1;
	if (wscale < hscale) newscale = wscale; else newscale = hscale;
	V.warn('scaler('+ratio+', '+origwidth+', '+origheight+') = '+newscale);
	return newscale;
    },
    
    moodToString: function() {
	switch(this.mood) {
	case 0:
	    return 'inconsolable';
	    break;
	case 1:
	    return 'despondent';
	    break;
	case 2:
	    return 'irritated';
	    break;
	case 3:
	    return 'cranky';
	    break;
	case 4:
	    return 'content';
	    break;
	case 5:
	    return 'asleep';
	    break;
	default:
	    return 'indeterminate';
	}	    
    },

    lowerMood: function() {
	if (this.mood > 0) this.mood--;
    },
    
    moodToTint: function() {
	switch(this.mood) {
	case 0:
	    return 0x990000;
	    break;
	case 1:
	    return 0xff3333;
	    break;
	case 2:
	    return 0xff6666;
	    break;
	case 3:
	    return 0xff9999;
	    break;
	case 4:
	    return 0xffCCCC;
	    break;
	case 5:
	    return 0xffffff;
	    break;
	default:
	    return 0xffffff;
	}
    },
}

V.game = game;

game.state.add('Boot', SweetieGame.Boot);
game.state.add('Preloader', SweetieGame.Preloader);
game.state.add('Home', SweetieGame.Home);
game.state.add('Food', SweetieGame.Food);
game.state.add('Pet', SweetieGame.Pet);
