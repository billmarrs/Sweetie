
SweetieGame.Home = function(game) {
    this.dconsole = null;
    this.padding = 15;
    this.gameOvered = false;
};

SweetieGame.Home.prototype = {
    
    preload: function() {
	
    },

    create: function() {
	this.gameOvered = false;
	
	this.game.stage.backgroundColor = "#444444";
	
	if (V.onScreenDebug()) {
	    this.dconsole = this.game.add.text(this.padding, this.padding, '',
					       { font: "20px Arial", fill: "#666666", align: "left" });
	    this.dconsole.setText(V.displayLogClearUpdate());
	}

// 	// Banner text
// 	this.moneyText = this.add.bitmapText(this.padding, this.padding, 'Banner', '$'+V.money, 48);
// 	this.moneyText.tint = 0x00ff00;
// 	this.moneyText.anchor.set(0,0);

	var hbwidth = 240;
	var hbheight = 50;
	this.myHealthBar = new HealthBar(this.game,
					 {
					     width: hbwidth, // NYI Scale
					     height: hbheight,
					     bg: { color: '#000000' },
					     bar: { color: '#990303' },
					     x: this.game.width-this.padding-hbwidth/2,
					     y: this.padding+hbheight/2,
					 }
					);
	//this.myHealthBar.anchor.set(1,0);
	this.myHealthBar.setPercent(V.moodToPercent()); 
	
	this.moodText = this.add.bitmapText(this.game.width-this.padding*2, this.padding, 'Banner', V.moodToString(), 48);
	this.moodText.anchor.set(1,0);
	this.updateMoodDisplay();
	// NYI random mood init?
	// NYI vary color of mood based on severity
	//this.moodText.tint = 0x00ff00;

	// Sweetie!
	this.sweetie = this.add.sprite(this.game.width *.5, this.game.height *.5, 'rbf');
	this.sweetie.origwidth  = this.sweetie.width;
	this.sweetie.origheight = this.sweetie.height;
	this.sweetiescale();
	this.sweetie.anchor.set(0.5);
 	this.sweetie.inputEnabled = true;
 	// this.sweetie.input.enableDrag(true);
	this.sweetie.events.onInputDown.add(this.moodDecline, this);
	this.sweetie.animations.add('meow', [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ,0], 20, false);

	// Food Dish
	this.dish = this.add.sprite(this.padding, this.game.height-this.padding, 'dish');
	this.dish.origwidth  = this.dish.width;
	this.dish.origheight = this.dish.height;
	this.dish.anchor.set(0,1);
	this.dish.tint = 0xFFAAAA;
	this.dishscale();
	this.dish.inputEnabled = true;
	this.dish.events.onInputDown.add(this.touchDish, this);
	
	// Petting Hand
	this.hand = this.add.sprite(this.game.width-this.padding, this.game.height-this.padding, 'hand');
	this.hand.origwidth  = this.hand.width;
	this.hand.origheight = this.hand.height;
	this.hand.anchor.set(1,1);
	//this.hand.tint = 0xFFAAAA;
	this.handscale();
	this.hand.inputEnabled = true;
	this.hand.events.onInputDown.add(this.touchHand, this);
	
	// Sound
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

	this.timer = this.game.time.create(false);
	this.timer.loop(5000, this.moodDecline, this);
	this.timer.start();
    },
    
    update: function() {
	if (V.consoleUpdate) this.dconsole.setText(V.displayLogClearUpdate());
	if (V.isGameOver()) this.gameOver();
    },

    gameOver: function() {
	if (!this.gameOvered) {
	    V.warn('gameOver');
	    this.gameover = this.add.bitmapText(this.game.width/2, this.game.height/2, 'Banner', 'Game Over', 96);
	    this.gameover.anchor.set(.5);
	    this.tween = this.game.add.tween(this.sweetie).to( { alpha: 0 }, 2000, "Linear", true);
	    this.tween.onComplete.add(this.backToMenu, this);
	    this.meows.play('yowl');
	    this.gameOvered = true;
	}
    },

    backToMenu: function() {
	V.warn('backToMenu');
	this.state.start('Menu');
    },
    
    orientAll:function() {
	V.warn('orientAll (w/h) = ('+this.game.width+'/'+this.game.height+')');
	this.sweetie.x = this.game.width *.5;
	this.sweetie.y = this.game.height *.5;
	this.sweetiescale();
	this.dish.y = this.game.height - this.padding;
	this.dishscale();
	this.hand.x = this.game.width-this.padding; 
	this.hand.y = this.game.height-this.padding;
	this.handscale();
	this.moodText.x = this.game.width-this.padding*2;
    },

    sweetiescale: function() {
	this.sweetie.scale.setTo(V.scaler(.666, this.sweetie.origwidth, this.sweetie.origheight));
    },
    
    dishscale: function() {
	this.dish.scale.setTo(V.scaler(.2, this.dish.origwidth, this.dish.origheight));
    },

    handscale: function() {
	this.hand.scale.setTo(V.scaler(.2, this.hand.origwidth, this.hand.origheight));
    },

    pickMeow: function() {
	if (this.meows.list.length <= 0) {
	    V.warn('shuffling...');
	    this.meows.list = Phaser.ArrayUtils.shuffle(['meow1','meow2','meow3','nastymeow','meow4','wheezymeow','meow5','meow6','meow7','scratchymeow']);
	}
	return this.meows.list.pop();
    },
    
    meow: function() {
	this.sweetie.animations.play('meow');
	var pick = this.pickMeow();
	V.warn('meow pick = '+pick);
	this.meows.play(pick);
    },

    touchDish: function(pointer) {
	V.warn('touchDish');
	this.state.start('Food');
    },

    touchHand: function(pointer) {
	V.warn('touchHand');
	this.state.start('Pet');
    },

    updateMoodDisplay: function() {
	this.moodText.tint = V.moodToTint();
	this.moodText.setText(V.moodToString());
	this.myHealthBar.setPercent(V.moodToPercent()); 
    },
    
    moodDecline: function() {
	V.lowerMood();
	this.updateMoodDisplay();
	this.meow();
    },
    
    render: function() {
	//game.debug.spriteInfo(this.sweetie, this.padding, this.padding);
 	//game.debug.soundInfo(this.meows, this.padding, this.game.height/2);
    }

};
