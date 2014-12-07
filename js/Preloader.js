BaseNamespace.Preloader = function (game) {
    "use strict";

	this.ready = false;
};

BaseNamespace.Preloader.prototype = {
	preload: function () {
        "use strict";
        this.game.load.image('player', 'img/player.png');
        this.game.load.image('conveyor', 'img/conveyor.png');
        this.game.load.image('box1', 'img/box1.png');
        this.game.load.image('smallBox', 'img/boxSmall.png');
        this.game.load.image('scaffold', 'img/scaffold.png');
        this.game.load.image('smallScaffold', 'img/smallScaffold.png');

        this.game.load.image('frownie', 'img/frownie.png');
        this.game.load.image('starball', 'img/starball.png');

        this.game.load.image('coin', 'img/coin.png');
        this.game.load.image('heart', 'img/heart.png');

        this.game.load.audio('coinSFX', ['sfx/coin.mp3', 'sfx/coin.ogg']);
        this.game.load.audio('hurtSFX', ['sfx/hurt.mp3', 'sfx/hurt.ogg']);
	},

	create: function () {
        "use strict";
        this.game.state.start('Game');
	}
};
