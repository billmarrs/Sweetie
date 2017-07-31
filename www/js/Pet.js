
SweetieGame.Pet = function(game) {
    this.padding = 15;
    this.dconsole = null;
    // NYI pull money from storage somehow
    if (typeof V.money === "undefined") V.money = 100;
    if (typeof V.mood === "undefined") V.mood = 'cranky'; // NYI random
};

SweetieGame.Pet.prototype = {
    
    preload: function() {
	
    },

    create: function() {

	if (typeof game.debugLevel !== "undefined" &&
	    this.game.debugLevel === "onscreen") {
	    this.dconsole = this.game.add.text(this.padding, this.padding, '',
					       { font: "20px Arial", fill: "#666666", align: "left" });
	    this.dconsole.setText(V.consoleLog.reverse().join("\n"));
	}

	this.nyi = this.add.bitmapText(this.game.width/2, this.game.height/2, 'Banner', 'NYI Pet', 48);
	this.nyi.anchor.set(.5);

	this.input.onDown.add(this.goHome, this);

	if (typeof game.debugLevel !== "undefined" &&
	    this.game.debugLevel === "onscreen") {
	    this.dconsole = this.game.add.text(this.padding, this.padding, '',
					       { font: "20px Arial", fill: "#666666", align: "left" });
	    this.dconsole.setText(V.consoleLog.reverse().join("\n"));
	}

	// Banner text
// 	this.moneyText = this.add.bitmapText(this.padding, this.padding, 'Banner', '$'+V.money, 48);
// 	this.moneyText.tint = 0x00ff00;
// 	this.moneyText.anchor.set(0,0);
	this.moodText = this.add.bitmapText(this.game.width-this.padding, this.padding, 'Banner', V.mood, 48);
	this.moodText.anchor.set(1,0);

	this.game.scale.setResizeCallback(this.orientAll, this);
	this.game.scale.onSizeChange.add(this.orientAll, this);
    },
    
    update: function() {
	if (V.consoleUpdate) {
	    this.dconsole.setText(V.consoleLog.reverse().join("\n"));
	    V.consoleUpdate = false;
	}
    },

    orientAll:function() {
	warn('orientAll (w/h) = ('+this.game.width+'/'+this.game.height+')');
	this.moodText.x = this.game.width-this.padding;
    },
	//this.game.stage.backgroundColor = "#444444";

    goHome: function(pointer) {
	this.state.start('Home');
    },

};
