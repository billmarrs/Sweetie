var SweetieGame = {};

SweetieGame.Boot = function (game) {
    
};

SweetieGame.Boot.prototype = {
    
    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    },
    
    preload: function () {
        this.load.image('preloaderBar', 'assets/images/preloadr_bar.png');
    },
    
    create: function () {
        this.state.start('Preloader');
    }

};
