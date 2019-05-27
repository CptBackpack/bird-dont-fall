
// mein menu scene

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
    },

    preload: function ()
    {
		this.load.image('background', './assets/images/background.png');
		this.load.image('hand', './assets/sprites/hand.png');
		this.load.image('bird', './assets/sprites/bird.png');
		this.load.bitmapFont('BDFFont', './assets/font/font.png', './assets/font/font.fnt');
	
		this.load.image('play', './assets/buttons/play.png');

		this.load.image('feather', './assets/feather_particles/feather.png');
		this.load.image('feather2', './assets/feather_particles/feather_2.png');
		this.load.image('feather3', './assets/feather_particles/feather_3.png');
	},

    create: function ()
    {
		this.add.image(400, 300, 'background').setScale(3);

	
		
		//#region Feather Particles
		feathers = this.add.particles('feather').createEmitter({
			x: window.innerWidth - 160,
			y: 160,
			angle: { min: 0, max: 180 },
			speed: { min: 50, max: 150 },
			quantity: Phaser.Math.Between(1, 4),
			lifespan: 500,
			scale: { start: 0.15, end: 0 },
			frequency: 900,
			on: false
		});
		feathers.reserve(1000);

		feathers2 = this.add.particles('feather2').createEmitter({
			x: window.innerWidth - 160,
			y: 160,
			angle: { min: 0, max: 180 },
			speed: { min: 200, max: 300 },
			quantity: Phaser.Math.Between(1, 4),
			lifespan: 500,
			scale: { start: 0.15, end: 0 },
			frequency: 900,
			on: false
		});
		feathers2.reserve(1000);

		feathers3 = this.add.particles('feather3').createEmitter({
			x: window.innerWidth - 160,
			y: 160,
			angle: { min: 0, max: 180 },
			speed: { min: 200, max: 300 },
			quantity: Phaser.Math.Between(1, 4),
			lifespan: 500,
			scale: { start: 0.15, end: 0 },
			frequency: 900,
			on: false
		});
		feathers3.reserve(1000);
		//#endregion Feather Particles
		
		bird = this.add.sprite(window.innerWidth - 160, 115, 'bird');
		hand = this.add.sprite(window.innerWidth - 185, 150, 'hand');
		hand.setScale(0.3);

		
		

		feathers.emitParticleAt(bird.x + 25, bird.y + 50);
		feathers2.emitParticleAt(bird.x + 25, bird.y + 50);
		feathers3.emitParticleAt(bird.x + 25, bird.y + 50);

		feathers.start();
		feathers2.start();
		feathers3.start();

		this.add.bitmapText(15, 15, 'BDFFont', 'Bird, Don\'t Fall!', 50);
		this.add.bitmapText(15, window.innerHeight - 50, 'BDFFont', 'v: 0.3.3-proto', 20);



		// add tutorial and start button
		//this.btnstart = this.addButton(window.innerWidth - 400, 400, 'sprites', this.doStart, this);
		this.btnstart = this.addButton((window.innerWidth/2), 400, 'play', this.doStart, this);

	},
	
	doStart: function ()
    {
		this.scene.start('gamescene');
    }

});