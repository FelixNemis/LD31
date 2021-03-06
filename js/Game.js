    /*
     * Automatically Included properties:
     * this.game;		//	a reference to the currently running game
     * this.add;		//	used to add sprites, text, groups, etc
     * this.camera;	//	a reference to the game camera
     * this.cache;		//	the game cache
     * this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
     * this.load;		//	for preloading assets
     * this.math;		//	lots of useful common math operations
     * this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
     * this.stage;		//	the game stage
     * this.time;		//	the clock
     * this.tweens;	//	the tween manager
     * this.world;		//	the game world
     * this.particles;	//	the particle manager
     * this.physics;	//	the physics manager
     * this.rnd;		//	the repeatable random number generator
     */
BaseNamespace.Game = function (game) {
    "use strict";
};

BaseNamespace.Game.prototype = {
	create: function () {
        "use strict";
        this.DEBUG_MODE = true;
        this.stage.backgroundColor = '#BBBBBB';
        this.add.sprite(0, 0, 'background');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1400;

        this.music = this.add.audio('bgMusic', 1, true);
        this.music.play('', 0, this.game.musicMute ? 0 : 0.8, true);

        this.mutePushed = false;
        this.muteToggle = 0;

        this.conveyor = this.game.add.sprite(this.game.world.centerX + 50, 561, 'conveyor');
        this.conveyor.animations.add('run');
        this.conveyor.animations.play('run', 27, true);

        this.coins = this.add.group();
        this.boxes = this.add.group();
        this.enemyBuffer = this.add.group();
        this.enemies = this.add.group();

        this.player = this.game.add.sprite(400, 500, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.setSize(26, 59, 0, 10);
        this.player.velocityControl = true;

        this.soundIcon = this.add.sprite(12, 548, this.sound.mute ? 'muted' : (this.game.musicMute ? 'noMusic' : 'soundOn'));

        this.player.health = 3;
        this.player.invincible = false;
        this.player.lastHit = 0;
        this.player.blinkTime = 0;
        this.player.blinkInterval = 60;

        this.score = 0;
        this.scoreText = this.add.text(32, 18, 'Score: 0', {font: "18pt Sans", fill: "#000000"});
        this.gameOverText = this.add.text(400, 300, '    Game Over\npress R to restart', {font: "30pt Georgia, Ariel", fill: "#900000", stroke: "#300000", strokeThickness: 5});
        this.gameOverText.x -= Math.round(this.gameOverText.width/2);
        this.gameOverText.y -= Math.round(this.gameOverText.height/2);
        this.gameOverText.visible = false;

        this.successText = this.add.text(400, 300, '      Success!\npress R to restart', {font: "30pt Georgia, Ariel", fill: "#009000", stroke: "#003000", strokeThickness: 5});
        this.successText.x -= Math.round(this.gameOverText.width/2);
        this.successText.y -= Math.round(this.gameOverText.height/2);
        this.successText.visible = false;

        this.coinSound = this.add.audio('coinSFX');
        this.hurtSound = this.add.audio('hurtSFX');

        this.conveyor.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.conveyor, Phaser.Physics.ARCADE);
        this.conveyor.body.setSize(756, 42);
        this.conveyor.body.allowGravity = false;
        this.conveyor.body.immovable = true;
		
        this.addStack(500, ['box1']);

        this.addStack(640, ['box1', 'box1']);
        this.addFrownie(720, 507);
        this.addCoin(780, 500);

        this.addCoin(740, 260);

        this.addStack(840, ['box1', 'box1', 'box1']);
        this.addStack(880, ['box1']);

        this.addStack(950, ['scaffold', 'smallScaffold', 'scaffold', 'smallScaffold', 'scaffold', 'smallScaffold', 'box1']);

        this.addStack(1070, ['box1', 'box1', 'scaffold', 'smallScaffold', 'box1', 'box1']);
        this.addStack(1110, ['box1']);

        this.addStack(1270, ['box1', 'box1', 'box1']);
        this.addStarball(1310, 492);
        this.addStarball(1310, 450);
        this.addStarball(1310, 408);
		this.addStack(1350, ['box1', 'box1', 'box1']);
	
        var addBoxOffset = 1600;
        var stack = null;
        var different = {
            0: ['box1', 'scaffold', 'box1', 'box1'],
            2: ['box1', 'scaffold', 'box1'],
            3: ['box1', 'scaffold', 'box1', 'scaffold', 'smallBox'],
            8: ['box1', 'scaffold', 'smallBox', 'smallScaffold', 'scaffold', 'smallScaffold', 'smallScaffold', 'box1'],
            9: ['box1', 'scaffold', 'scaffold', 'scaffold', 'box1'],
            13: ['box1', 'scaffold', 'box1', 'scaffold', 'smallScaffold', 'smallScaffold', 'smallBox', 'smallBox'],
        };
        for (var i = 0; i < 14; i++) {
            if (i in different) {
                stack = different[i];
            } else {
                stack = ['box1', 'scaffold', 'box1', 'scaffold', 'box1'];
            }
            this.addStack(addBoxOffset, stack);
            if (i > 1) {
                this.addCoin(addBoxOffset, 90);
            }
            if (i === 10) {
                this.addCoin(addBoxOffset, 240);
            }
            addBoxOffset += 40;
        }

        this.addStack(addBoxOffset + 120, ['box1']);
        this.addFrownie(addBoxOffset + 200, 507);
        this.addStack(addBoxOffset + 480, ['box1', 'box1']);
        this.addCoin(addBoxOffset + 680, 260);
		
		//megan's trial code
		addBoxOffset = 2000;
		this.addStack (addBoxOffset, ['box1', 'scaffold', 'smallBox']);
		this.addStack (addBoxOffset + 120, ['smallBox', 'smallBox', 'smallBox']);
		this.addStack (addBoxOffset + 160, ['smallBox', 'smallScaffold', 'smallScaffold', 'smallBox']);

		this.addStack (addBoxOffset + 240, ['smallBox', 'scaffold', 'box1', 'box1', 'box1']);
		
		addBoxOffset = 2600
		this.addStack (addBoxOffset, ['smallBox']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox', 'scaffold', 'box1']);
		this.addCoin (addBoxOffset, 340);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox', 'scaffold', 'box1']);
		this.addCoin (addBoxOffset, 480);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox', 'box1']);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox']);
		this.addCoin (addBoxOffset, 400);
		this.addCoin (addBoxOffset, 440);
		addBoxOffset += 40;
		this.addStack (addBoxOffset, ['smallBox', 'box1', 'box1']);
		this.addCoin (addBoxOffset, 320);
		this.addCoin (addBoxOffset, 280);
		this.addCoin (addBoxOffset, 240);
		//end of trial code

        addBoxOffset += 200;
        this.addStack(addBoxOffset, ['smallBox']);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        this.addStack(addBoxOffset, ['scaffold', 'smallBox']);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        this.addStack(addBoxOffset, ['scaffold', 'smallBox']);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);
        addBoxOffset += 40;
        this.addStarball(addBoxOffset, 500);

        addBoxOffset += 80;
        this.addCoin(addBoxOffset, 500);
        addBoxOffset += 80;
        this.addStack(addBoxOffset, ['smallBox']);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallBox', 'smallBox']);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallBox', 'smallBox', 'smallBox']);
        for (var i2 = 0; i2 < 6; i2++) {
            addBoxOffset += 40;
            this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox']);
            if (!i2) {
                this.addCoin(addBoxOffset, 500);
            }
            if (i2 >= 4) {
                this.addStarball(addBoxOffset, 340);
            }
        }
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox', 'scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 300);

        addBoxOffset += 280;
        this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox', 'box1', 'box1', 'box1']);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox', 'scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 280);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox']);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox']);
        this.addStack(addBoxOffset + 80, ['smallBox']);

        addBoxOffset += 180;
        this.addStack(addBoxOffset, ['scaffold', 'scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 280);
        this.addFrownie(addBoxOffset, 507, 'left');

        addBoxOffset += 260;
        this.addStack(addBoxOffset, ['scaffold', 'scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 280);

        addBoxOffset += 360;
        this.addStack(addBoxOffset, ['smallScaffold', 'scaffold', 'smallScaffold', 'smallBox', 'smallBox']);
        this.addCoin(addBoxOffset, 300);

        addBoxOffset += 180;
        var stack = null;
        var different = {
            0: ['scaffold', 'smallBox', 'box1', 'smallBox'],
            1: ['smallBox', 'smallScaffold', 'smallScaffold', 'smallScaffold', 'smallBox'],
            12: ['scaffold', 'smallBox'],
            22: ['scaffold', 'smallBox', 'box1', 'smallBox'],
        };
        for (var i3 = 0; i3 < 23; i3++) {
            if (i3 in different) {
                stack = different[i3];
            } else {
                stack = ['scaffold', 'smallBox', 'scaffold', 'smallBox'];
            }
            this.addStack(addBoxOffset, stack);
            if (i3 > 1 && i3 < 22) {
                this.addCoin(addBoxOffset, 400);
            }
            addBoxOffset += 40;
        }

        addBoxOffset += 120;
        this.addCoin(addBoxOffset, 400);

        addBoxOffset += 120;
        this.addStack(addBoxOffset, ['scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 410);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['scaffold', 'scaffold', 'smallBox']);
        this.addCoin(addBoxOffset, 320);
        addBoxOffset += 40;
        this.addStack(addBoxOffset, ['box1', 'scaffold', 'scaffold', 'smallBox']);
        addBoxOffset += 40;
        for (var i4 = 0; i4 < 13; i4++) {
            this.addCoin(addBoxOffset, 500);
            if (i4 !== 4) {
                this.addStarball(addBoxOffset, 460);
            }
            this.addStack(addBoxOffset, ['scaffold', 'scaffold', 'scaffold', 'smallBox']);
            addBoxOffset += 40;
        }
        this.addCoin(addBoxOffset + 160, 360);

        addBoxOffset += 320;
        for (var s = 0; s < 8; s++) {
            if (s < 2 || s > 3) {
                this.addStarball(addBoxOffset, 500 - (s * 40));
            }
        }
        this.addCoin(addBoxOffset, 400);

        addBoxOffset += 160;
        for (s = 0; s < 8; s++) {
            if (s > 2) {
                this.addStarball(addBoxOffset, 520 - (s * 42));
                this.addStarball(addBoxOffset + 100, 520 - (s * 42));
            }
            if (!s) {
                this.addStarball(addBoxOffset + 45, 520);
            }
        }
        this.addCoin(addBoxOffset, 460);
        this.addCoin(addBoxOffset + 45, 400);
        this.addCoin(addBoxOffset + 100, 460);

        addBoxOffset += 600;
        this.endTrigger = this.add.sprite(addBoxOffset, 0, 'player');
        this.endTrigger.frame = 1;
        this.physics.enable(this.endTrigger, Phaser.Physics.ARCADE);
        this.endTrigger.body.allowGravity = false;
        this.endTrigger.body.velocity.x = -90;

        this.addCoin(122, 28, false);
        this.addCoin(765, 500, false);
        this.addCoin(765, 200, false);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            'jump': this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            'C': this.input.keyboard.addKey(Phaser.Keyboard.C),
            'M': this.input.keyboard.addKey(Phaser.Keyboard.M),
            'R': this.input.keyboard.addKey(Phaser.Keyboard.R)
        };

        this.hearts = [];
        for (var h = 0; h < 3; h++) {
            this.hearts.push(this.add.sprite(768 - (46 * h), 32, 'heart'));
            this.hearts[h].anchor.setTo(0.5, 0.5);
        }

        this.jumpTime = 0;

        this.conveyorMove = [];
	},

    addStack: function (x, obstacles) {
        "use strict";
        var y = 540;
        var heights = {'box1': 80, 'scaffold': 80, 'smallBox': 20, 'smallScaffold': 20};
        var obs = null;
        var onTop = false;
        for (var i = 0; i < obstacles.length; i++) {
            if (i === obstacles.length - 1 || obstacles[i+1] !== 'box1') {
                onTop = true;
            } else {
                onTop = false;
            }
            obs = obstacles[i];
            y -= heights[obs] / 2;
            this.addBox (x, y, onTop, obs);
            y -= heights[obs] / 2;
        }
    },

    addStarball: function (x, y) {
        "use strict";
        var starball = this.game.add.sprite(x, y, 'starball');
        starball.anchor.setTo(0.5, 0.5);
        this.physics.enable(starball, Phaser.Physics.ARCADE);
        starball.body.setSize(20, 20);
        starball.body.immovable = true;
        starball.body.allowGravity = false;
        starball.body.velocity.x = -90;
        var posNeg = [-1, 1];
        starball.spin = Math.round((Math.random() * 3) + 2) * posNeg[Math.round(Math.random())];

        starball.type = 'starball';

        starball.enemyUpdate = function (game) {
            this.angle += this.spin;
        };

        this.enemies.add(starball);
    },

    addCoin: function (x, y, moves) {
        "use strict";
        moves = typeof moves !== 'undefined' ? moves : true;
        var coin = this.game.add.sprite(x, y, 'coin');
        coin.anchor.setTo(0.5, 0.5);
        this.physics.enable(coin, Phaser.Physics.ARCADE);
        coin.body.allowGravity = false;
        if (moves) {
            coin.body.velocity.x = -90;
        }

        this.coins.add(coin);
    },

    addFrownie: function (x, y, facing, image) {
        "use strict";
        facing = typeof facing !== 'undefined' ? facing : 'right';
        image = typeof image !== 'undefined' ? image : 'frownie';

        var frownie = this.game.add.sprite(x, y, image);
        frownie.anchor.setTo(0.5, 0.5);
        this.physics.enable(frownie, Phaser.Physics.ARCADE);
        frownie.body.setSize(55, 64, 0, 0);
        frownie.body.allowGravity = false;
        frownie.body.velocity.x = -90;

        frownie.active = false;
        frownie.facing = facing;

        frownie.type = 'frownie';

        frownie.enemyUpdate = function (game) {
            if (this.body.x < 770) {
                game.enemyBuffer.remove(this);
                game.enemies.add(this);

                this.body.allowGravity = true;
                this.active = true;
                this.body.velocity.x = 0;
                this.velocityControl = true;
            }
            
            if (this.active) {
                var turn = {'right': 'left', 'left': 'right'};
                if (this.body.touching[this.facing]) {
                    this.facing = turn[this.facing];
                }

                this.body.velocity.x = 100 * ((this.facing === 'left') ? -1 : 1);
            }
        };

        this.enemyBuffer.add(frownie);
    },

    addBox: function (x, y, onTop, image) {
        "use strict";
        image = typeof image !== 'undefined' ? image : 'box1';

        var collides = {'box1': true, 'smallBox': true, 'scaffold': false, 'smallScaffold': false};

        var box = this.game.add.sprite(x, y, image);
        box.anchor.setTo(0.5, 0.5);
        this.physics.enable(box, Phaser.Physics.ARCADE);
        box.body.immovable = true;
        box.body.allowGravity = false;
        box.body.velocity.x = -90;
        if (!onTop) {
            box.body.checkCollision.up = false;
        }
        box.boxUpdate = function (fallX) {
            if (this.body.right < fallX) {
                this.body.allowGravity = true;
                this.body.drag.x = 190;
            }

            if (this.y > 650) {
                this.exists = false;
            }
        };
        box.collides = collides[image];

        this.boxes.add(box);
    },

	update: function () {
        "use strict";
        if (!this.mutePushed && this.keys.M.isDown) {
            this.mutePushed = true;
            if (this.sound.mute) {
                this.sound.mute = false;
                this.soundIcon.loadTexture('soundOn');
            } else if (this.game.musicMute) {
                this.sound.mute = true;
                this.music.volume = 0.8;
                this.game.musicMute = false;
                this.soundIcon.loadTexture('muted');
            } else {
                this.music.volume = 0;
                this.game.musicMute = true;
                this.soundIcon.loadTexture('noMusic');
            }
        }

        if (!this.keys.M.isDown) {
            this.mutePushed = false;
        }
        var player = this.player;

        if (player.exists) {
            player.body.velocity.x = 0;

            this.scoreText.setText('Score: ' + this.score);

            if (player.health < 1) {
                this.die();
            }

            if (player.invincible) {
                if (this.time.now - player.blinkInterval > player.blinkTime) {
                    player.frame = player.frame === 0 ? 1 : 0;
                    player.blinkTime = this.time.now;
                }

                if (this.time.now - 1200 > player.lastHit) {
                    player.invincible = false;
                    player.frame = 0;
                }
            }

            if (this.endTrigger.x < 600) {
                this.success();
            }
        }

        this.conveyorMove = [];
        this.physics.arcade.collide(this.conveyor, player, this.touchConveyor, null, this);
        this.physics.arcade.collide(this.conveyor, this.enemies, this.touchConveyor, null, this);
        if (!this.DEBUG_MODE || !this.keys.C.isDown) {
            this.physics.arcade.collide(player, this.boxes, null, this.boxCollideCheck, this);
        }
        this.physics.arcade.collide(player, this.enemies, this.enemyCollide, null, this);
        this.physics.arcade.collide(this.enemies, this.boxes, null, this.boxCollideCheck, this);

        this.physics.arcade.overlap(player, this.coins, this.coinGrab, null, this);

        this.boxes.callAll('boxUpdate', null, this.conveyor.body.x + 10);
        this.enemies.callAll('enemyUpdate', null, this);
        var en = this.enemyBuffer.children.length;
        while (en--) {
            this.enemyBuffer.children[en].enemyUpdate(this);
        }

        if (player.exists) {
            if (this.cursors.left.isDown)
            {
                player.body.velocity.x -= 190;
            }
            else if (this.cursors.right.isDown)
            {
                player.body.velocity.x += 190;
            }

            if (player.x > 790 && player.body.velocity.x > 0) {
                player.body.velocity.x = 0;
                if (player.body.touching.down) {
                    player.body.velocity.x = 90;
                }
            }

            if (this.keys.jump.isDown && player.body.touching.down && this.time.now > this.jumpTime) {
                this.jumpTime = this.time.now + 250;
                player.body.velocity.y = - 550;
            }

            if (player.y > 800) {
                this.hurtSound.play();
                this.die();
            }
        }

        for (var i = 0; i < this.conveyorMove.length; i++) {
            if (this.conveyorMove[i].velocityControl) {
                this.conveyorMove[i].body.velocity.x += -90;
            } else {
                this.conveyorMove[i].body.velocity.x = -90;
            }
        }

        if (this.keys.R.isDown) {
            this.reset();
        }
	},

    enemyCollide: function (player, enemy) {
        "use strict";
        if (enemy.type === 'starball') {
            if (!player.invincible) {
                this.getHit();
            }
        }
    },

    getHit: function () {
        "use strict";
        this.player.health--;
        this.hearts[this.player.health].visible = false;
        this.player.lastHit = this.time.now;
        this.player.invincible = true;
        this.player.body.velocity.y = -100;
        this.hurtSound.play();
    },

    die: function () {
        "use strict";
        this.player.exists = false;
        this.player.invincible = false;
        this.gameOver();
    },

    success: function () {
        "use strict";
        this.player.exists = false;
        this.player.invincible = false;
        this.successText.visible = true;
        this.successText.text = '        Success!\nYou got ' +
            this.score + '/' + this.coins.length + ' coins' +
            '\n press R to play again';
    },

    coinGrab: function (player, coin) {
        "use strict";
        coin.exists = false;
        this.score++;
        this.coinSound.play();
    },

    boxCollideCheck: function (player, box) {
        "use strict";
        if (!box.collides) {
            return false;
        }
        return true;
    },

    touchConveyor: function (conveyor, obj) {
        "use strict";
        this.conveyorMove.push(obj);
    },

    reset: function () {
        "use strict";
        this.music.stop();
        this.game.state.start('Game');
    },

    gameOver: function () {
        "use strict";
        this.gameOverText.visible = true;
    }
};
