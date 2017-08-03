
SweetieGame.Menu = function(game) {
    this.dconsole = null;
    this.padding = 15;
    this.logo = null;
};

SweetieGame.Menu.prototype = {
    
    preload: function() {
	
    },

    create: function() {

	if (V.onScreenDebug()) {
	    this.dconsole = this.game.add.text(this.padding, this.padding, '',
					       { font: "20px Arial", fill: "#666666", align: "left" });
	    this.dconsole.setText(V.displayLogClearUpdate());
	}

	this.logo = this.add.sprite(this.game.width/2, this.game.height/2, 'logo');
	this.logo.origwidth  = this.logo.width;
	this.logo.origheight = this.logo.height;
	this.logo.anchor.set(.5);
	
	this.input.onDown.add(this.goHome, this);
	
	this.game.scale.setResizeCallback(this.orientAll, this);
	this.game.scale.onSizeChange.add(this.orientAll, this);
    },
    
    update: function() {
	if (V.consoleUpdate) this.dconsole.setText(V.displayLogClearUpdate());
    },

    orientAll:function() {
	V.warn('orientAll (w/h) = ('+this.game.width+'/'+this.game.height+')');
	this.logo.x = this.game.width *.5;
	this.logo.y = this.game.height *.5;
	this.logoscale();
    },

    logoscale: function() {
	this.logo.scale.setTo(V.scaler(1, this.logo.origwidth, this.logo.origheight));
    },
    
    goHome: function(pointer) {
	V.warn('goHome');
	this.state.start('Home');
    },
    
};
