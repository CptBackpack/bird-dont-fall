var BDF = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(BDF);
var score = 0;
var scoreText;
var bird;
var platforms;
var gameOver = false;
var MouseClick;
var feathers = null;
var feathers2 = null;
var feathers3 = null;
function preload() {
    this.load.image('background', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('platform', './assets/platform.png');
    this.load.image('bird', './assets/bird.png');
    this.load.image('feather', './assets/feather.png');
    this.load.image('feather2', './assets/feather_2.png');
    this.load.image('feather3', './assets/feather_3.png');
}

function create() {
    this.input.mouse.disableContextMenu();
    //#region Images Loading
    this.add.image(400, 300, 'background');
    //#endregion

    //#region Feather Particles
    feathers = this.add.particles('feather').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity:  Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.2, end: 0 },
        on: false
    });
    feathers.reserve(1000);

    feathers2 = this.add.particles('feather2').createEmitter({
    angle: { min: 0, max: 180 },
    speed: { min: 200, max: 300 },
    quantity:  Phaser.Math.Between(1, 4),
    lifespan: 500,
    scale: { start: 0.2, end: 0 },
    on: false
    });
    feathers2.reserve(1000);

    feathers3 = this.add.particles('feather3').createEmitter({
    angle: { min: 0, max: 180 },
    speed: { min: 200, max: 300 },
    quantity:  Phaser.Math.Between(1, 4),
    lifespan: 500,
    scale: { start: 0.2, end: 0 },
    on: false
    });
    feathers3.reserve(1000);
    //#endregion Feather Particles
    
    //#region Ground
    ground = this.physics.add.staticGroup();
    ground.create(400, 620, 'ground').setScale(2).refreshBody();
    //#endregion Ground

    //#region Jumping Platform
    platforms = this.physics.add.staticGroup();
    //#endregion Jumping Platform

    //#region Bird 
    bird = this.physics.add.group();

    bird = this.physics.add.sprite(Phaser.Math.Between(0, 800), 10, 'bird');

    this.physics.add.collider(bird, platforms, PlatformTouch, null, this);
    this.physics.add.collider(bird, ground, BirdFell, null, this);


    bird.setBounce(1);
    bird.setCollideWorldBounds(true);
    bird.setVelocity(Phaser.Math.Between(-100, 100), 100);
    //#endregion Bird

    //#region Create Platforms On Click
    this.input.on('pointerdown', function(pointer) {
        if (pointer.leftButtonDown()) {
            if (platforms.countActive(true) == 0)
                platforms.create(pointer.x, pointer.y, 'platform').setScale(0.2).refreshBody();
        }
        if (pointer.rightButtonDown()) {
            if ((score) - 100 >= 0) {

            }
            console.log("right");
        }
    }, this);
    //#endregion

    //#region Score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '24px', fill: '#ffffff' });
    //#endregion Score
}

function update() {

    if (gameOver) {
        this.scene.restart();
        gameOver = false;
        score = 0;
    }


}


function BirdFell(game) {
    this.physics.pause();
    gameOver = true;
}

function PlatformTouch() {
    platforms.children.iterate(function(child) {
        
        child.destroy();
        feathers.emitParticleAt(bird.x, bird.y);
        feathers2.emitParticleAt(bird.x, bird.y);
        feathers3.emitParticleAt(bird.x, bird.y);
        //feathers.destroy();
        var jumpHeight = (score > 50 ? score : 60);

        bird.setBounce(1);
        bird.setCollideWorldBounds(true);
        bird.setVelocity(
            //left-right
            Phaser.Math.Between(-60 * (score / 10),
                                 60 * (score / 10)),
            //up-down
            Phaser.Math.Between(-50 * (jumpHeight / 10),
                                 -60 * (jumpHeight / 10))
        );
       
        score += 10;
        scoreText.setText('score: ' + score);


    })
}