var game = new Phaser.Game("100%", "100%", Phaser.AUTO);

// Persistent storage/utility object
var V = {
    defmood: 4,
    mood: this.defmood,
    maxmood: 5,
    level: 1,
    game: null,
    debugLevel: "off", // "onscreen", "console" anything else is no logging
    consoleLog: ['start'],
    consoleUpdate: false,
    startLevel: false,

    reset: function() {
	this.mood = this.defmood;
	this.level = 1;
	this.startLevel = true;
    },

    isLevelStart: function() {
	if (this.startLevel) {
	    this.startLevel = false;
	    return true;
	} else
	    return false;
    },

    toggleDebug: function() {
	if (this.debugLevel === "onscreen")
	    this.debugLevel = "off";
	else
	    this.debugLevel = "onscreen";
    },
    
    warn: function(msg) {
	switch(this.debugLevel) {
	case "onscreen":
	    this.consoleLog.unshift(msg);
	    this.consoleLog = this.consoleLog.slice(0,5);
	    this.consoleUpdate = true;
	    break;
	case "console":
	    console.log(msg);
	    break;
	default:
	    break;
	}
    },

    onScreenDebug: function() {
	return this.debugLevel === "onscreen";
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
	this.warn('scaler('+ratio+', '+origwidth+', '+origheight+') = '+newscale);
	return newscale;
    },

    moodToPercent: function() {
	this.warn('moodToPercent = '+Math.round(100 * this.mood / this.maxmood));
	return Math.round(100 * this.mood / this.maxmood);
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

    isGameOver: function() {
	return (this.mood == 0);
    },

    isLevelWon: function() {
	return this.mood == this.maxmood;
    },

    readyForNextLevel: function() {
	this.level++;
	this.mood = this.defmood;
	this.startLevel = true;
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
game.state.add('Menu', SweetieGame.Menu);
game.state.add('Home', SweetieGame.Home);
game.state.add('Food', SweetieGame.Food);
game.state.add('Pet', SweetieGame.Pet);
