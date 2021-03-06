
SweetieGame.Preloader = function (game) {
    
    this.preloadBar = null;
    this.ready = false;
    
};

SweetieGame.Preloader.prototype = {
    
    init: function () {
	this.preloadBar = null;
	this.ready = false;
    },
    
    preload: function () {
	this.load.path = 'assets/';
	
	this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloaderBar');		
	this.preloadBar.anchor.setTo(0.5);
	this.load.setPreloadSprite(this.preloadBar);
	console.log('Preloader preload');
 	this.load.bitmapFont('Banner', 'fonts/Lumberjack.png', 'fonts/Lumberjack.fnt');
	this.load.spritesheet('rbf', 'images/rbfanim.png', 450, 500);
	this.load.image('logo', 'images/logo.png');
	this.load.image('dish', 'images/dish.png');
	this.load.image('hand', 'images/hand.png');
	this.load.audio('meows', ['audio/12meows.ogg', 'audio/12meows.mp3']);
    },
    
    create: function () {
	
    },
    
    update: function () {
	
	if (this.cache.isSoundDecoded('meows') && this.ready == false) {
	    this.ready = true;
	    this.state.start('Menu');
	}
    }

};
