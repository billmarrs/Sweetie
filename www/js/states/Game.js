
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {
    
    preload: function () {
	
    },
    
    create: function () {

	this.sweetie = this.add.sprite(this.game.width *.5, this.game.height *.5, 'rbf');
	this.sweetie.scale.setTo(this.game.sweetiescale);
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

	this.meows.list = ['meow1','meow2','meow3','nastymeow','meow4','wheezymeow','meow5','meow6','yowl','meow7','scratchymeow'];

    },
    
    update: function () {
    },
    
    meow: function (pointer) {
	this.sweetie.animations.play('meow');
	var pick = this.meows.list[Math.floor(Math.random()*this.meows.list.length)];
	console.log(pick);
	this.meows.play(pick);
    },
        
};
