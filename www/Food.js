
SweetieGame.Food = function(game) {
    this.dconsole = null;
    this.padding = 15;
};

SweetieGame.Food.prototype = {
    
    preload: function() {
	
    },

    create: function() {

	if (V.onScreenDebug()) this.createDebugText();

	this.nyi = this.add.bitmapText(this.game.width/2, this.game.height/2, 'Banner', 'NYI Food', 48);
	this.nyi.anchor.set(.5);
	
	this.input.onDown.add(this.goHome, this);
	
	this.moodText = this.add.bitmapText(this.game.width-this.padding, this.padding, 'Banner', V.mood, 48);
	this.moodText.anchor.set(1,0);

	this.game.scale.setResizeCallback(this.orientAll, this);
	this.game.scale.onSizeChange.add(this.orientAll, this);
	
	//  Press D to toggle the debug display
        this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.debugKey.onDown.add(this.toggleDebug, this);
	this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
    },
    
    createDebugText: function () {
	this.dconsole = this.game.add.text(this.padding, this.padding, '',
					   { font: "20px Arial", fill: "#666666", align: "left" });
	this.dconsole.setText(V.displayLogClearUpdate());
    },
    
    toggleDebug: function () {
	if (V.onScreenDebug()) this.dconsole.kill();
	V.toggleDebug();
	if (V.onScreenDebug()) this.createDebugText();
    },

    update: function() {
	if (V.consoleUpdate) this.dconsole.setText(V.displayLogClearUpdate());
    },

    orientAll:function() {
	V.warn('orientAll (w/h) = ('+this.game.width+'/'+this.game.height+')');
	this.moodText.x = this.game.width-this.padding;
    },

    goHome: function(pointer) {
	V.warn('goHome');
	this.state.start('Home');
    },
    
};
