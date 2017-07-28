
SweetieGame.Game = function(game) {
    //game.debugLevel = 'onscreen';
    //game.debugLevel = 'console';
    this.consoleLog = [];
    this.dconsole = null;

    // NYI pull money from storage somehow
    if (typeof V.money === "undefined") V.money = 100;
    if (typeof V.mood === "undefined") V.mood = 'cranky'; // NYI random
};

SweetieGame.Game.prototype = {
    
    warn: function(msg) {
	var type = typeof game.debugLevel;
	if (type === "undefined") return null;
	if (game.debugLevel === "onscreen") {
	    this.consoleLog.unshift(msg);
	    this.consoleLog = this.consoleLog.slice(0,5); // limit length to 3 lines
	    this.dconsole.setText(this.consoleLog.reverse().join("\n"));
	    this.consoleLog.reverse();
	} else {
	    console.log(msg);
	}
    },

    preload: function() {
	
    },

    create: function() {

	if (typeof game.debugLevel !== "undefined" &&
	    this.game.debugLevel === "onscreen") {
	    this.dconsole = this.game.add.text(10, this.game.height-150, '',
					       { font: "20px Arial", fill: "#666666", align: "left" });
	}
	
	this.moneyText = this.add.bitmapText(20, 15, 'Banner', '$'+V.money, 48);
	this.moneyText.tint = 0x00ff00;
	this.moodText = this.add.bitmapText(this.game.width-150, 15, 'Banner', V.mood, 48);
	// NYI random mood init?
	// NYI vary color of mood based on severity
	//this.moodText.tint = 0x00ff00;
	
	this.sweetie = this.add.sprite(this.game.width *.5, this.game.height *.5, 'rbf');
	this.sweetie.origwidth  = this.sweetie.width;
	this.sweetie.origheight = this.sweetie.height;
	this.sweetiescale();
	this.sweetie.anchor.set(0.5);
 	this.sweetie.inputEnabled = true;
 	// this.sweetie.input.enableDrag(true);
	this.sweetie.events.onInputDown.add(this.meow, this);

	this.sweetie.animations.add('meow', [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ,0], 20, false);

	this.meows = this.add.audio('meows');
	this.meows.allowMultiple = true;
	this.meows.addMarker('meow1',           .051,  .909);
	this.meows.addMarker('meow2',           .953,  .749);
	this.meows.addMarker('meow3',          1.702,  .851);
	this.meows.addMarker('nastymeow',      2.699,  .895);
	this.meows.addMarker('meow4',          3.623, 1.040);
	this.meows.addMarker('wheezymeow',     4.648,  .604);
	this.meows.addMarker('meow5',          5.238,  .866);
	this.meows.addMarker('meow6',          6.249,  .975);
	this.meows.addMarker('yowl',           7.223, 1.353);
	this.meows.addMarker('meow7',          8.606,  .786);
	this.meows.addMarker('scratchymeow',   9.377, 1.317);
	this.meows.addMarker('modulatedmeow', 10.853,  .960);
	this.meows.addMarker('silence',       12.000,  .500);
	this.meows.list = [];

	this.game.scale.setResizeCallback(this.orientAll, this);
	this.game.scale.onSizeChange.add(this.orientAll, this);
    },
    
    update: function() {

    },

    orientAll:function() {
	this.warn('orientAll (w/h) = ('+this.game.width+'/'+this.game.height+')');
	if (this.dconsole) this.dconsole.y = this.game.height-150;
	this.sweetie.x = this.game.width *.5;
	this.sweetie.y = this.game.height *.5;
	this.sweetiescale();
	this.moodText.x = this.game.width-150;
    },
    
    sweetiescale: function() {
	var ratio = .66666;
	var desiredw = this.game.width * ratio;
	var desiredh = this.game.height * ratio;
	var wscale = desiredw / this.sweetie.origwidth;
	var hscale = desiredh / this.sweetie.origheight;
	var sweetiescale = 1;
	if (wscale < hscale) sweetiescale = wscale; else sweetiescale = hscale;
	this.sweetie.scale.setTo(sweetiescale);
    },

    pickMeow: function() {
	if (this.meows.list.length <= 0) {
	    this.warn('shuffling...');
	    this.meows.list = Phaser.ArrayUtils.shuffle(['meow1','meow2','meow3','nastymeow','meow4','wheezymeow','meow5','meow6','meow7','scratchymeow']);
	}
	return this.meows.list.pop();
    },
    
    meow: function(pointer) {
	this.sweetie.animations.play('meow');
	var pick = this.pickMeow();
	this.warn(pick);
	this.meows.play(pick);
    },

// debug sounds
//     render: function() {
// 	game.debug.soundInfo(this.meows, 20, 32);
//     }

};
