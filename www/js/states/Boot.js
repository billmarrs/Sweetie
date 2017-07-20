var BasicGame = {};

BasicGame.Boot = function (game) {
    
};

BasicGame.Boot.prototype = {
    
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
