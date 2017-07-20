
BasicGame.Preloader = function (game) {
    
    this.preloadBar = null;
    this.ready = false;
    
};

BasicGame.Preloader.prototype = {
    
    init: function () {
	this.preloadBar = null;
	this.ready = false;
    },
    
    preload: function () {
	
	this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloaderBar');		
	this.preloadBar.anchor.setTo(0.5);
	this.load.setPreloadSprite(this.preloadBar);

	var ratio = .66666;
	var rbfw = 450;
	var rbfh = 500;
	this.load.spritesheet('rbf', 'assets/images/rbfanim.png', rbfw, rbfh);

	// NYI - Move this into game and have it respond to screen events (like orientation change)
	// can use sprite.width vs. these hard-coded numbers
	var desiredw = this.game.width * ratio;
	var desiredh = this.game.height * ratio;
	var wscale = desiredw / rbfw;
	var hscale = desiredh / rbfh;
	if (wscale < hscale) this.game.sweetiescale = wscale; else this.game.sweetiescale = hscale;
	
	this.load.audio('meows', ['assets/audio/12meows.ogg', 'assets/audio/12meows.mp3']);
    },
    
    create: function () {
	
    },
    
    update: function () {
	
	if (this.cache.isSoundDecoded('meows') && this.ready == false) {
	    this.ready = true;
	    this.state.start('Game');
	}
    }

};
