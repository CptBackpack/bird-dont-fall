var BDF = {
    type: Phaser.AUTO,
    width: 600,
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

//#region Variables
var game = new Phaser.Game(BDF);
var score = 0;
var scoreText;
var progressText;
var bird;
var platforms;
var gameOver = false;
var MouseClick;
var feathers = null;
var feathers2 = null;
var feathers3 = null;
//#endregion Variables

function preload() {
    //#region Background
    this.load.image('background', './assets/images/background.png');
    //#endregion Background

    //#region Sprites
    this.load.image('ground', './assets/sprites/ground.png');
    this.load.image('hand', './assets/sprites/hand.png');
    this.load.image('bird', './assets/sprites/bird.png');
    //#endergion Sprites

    //#region Feathers
    this.load.image('feather', './assets/feather_particles/feather.png');
    this.load.image('feather2', './assets/feather_particles/feather_2.png');
    this.load.image('feather3', './assets/feather_particles/feather_3.png');
    //#endregion Feathers


    //#region Fonts
    this.load.bitmapFont('BDFFont', './assets/font/font.png', './assets/font/font.fnt');
    //#endregion Fonts
}

function create() {
    //#region Misc

    this.input.mouse.disableContextMenu();

    //#endregion Misc

    //#region Images Loading
    this.add.image(400, 300, 'background');
    //#endregion

    //#region Text
    scoreText = this.add.bitmapText(15, 15, 'BDFFont', 'Score: 0', 20);
    progressText = this.add.bitmapText(15, 40, 'BDFFont', '', 20);

    this.add.bitmapText(280, 5, 'BDFFont', 'Bird, Don\'t Fall!', 45);
    //#endregion Text

    //#region Feather Particles
    feathers = this.add.particles('feather').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.2, end: 0 },
        on: false
    });
    feathers.reserve(1000);

    feathers2 = this.add.particles('feather2').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.2, end: 0 },
        on: false
    });
    feathers2.reserve(1000);

    feathers3 = this.add.particles('feather3').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
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
    bird.setScale(0.7);

    this.physics.add.collider(bird, platforms, PlatformTouch, null, this);
    this.physics.add.collider(bird, ground, BirdFell, null, this);

    //this.physics.add.overlap(bird, platforms, PlatformTouch, null, this);
    //no way, it just becomes a ”click the bird” then

    bird.setBounce(1);
    bird.setCollideWorldBounds(true);
    bird.setVelocity(Phaser.Math.Between(-100, 100), 100);
    //#endregion Bird

    //#region Create Platforms On Click
    this.input.on('pointerdown', function(pointer) {
        if (pointer.leftButtonDown()) {
            if (platforms.countActive(true) == 0) {
                var hand = platforms.create(pointer.x, pointer.y, 'hand').setScale(0.2).refreshBody();
                hand.setOrigin(0.5, 0.9)
                hand.setScale(0.2);
                hand.setSize(75, 15, true);
            }
        }
        if (pointer.rightButtonDown()) {
            if ((score) - 100 >= 0) {

            }
            console.log("right");
        }
    }, this);
    //#endregion


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

        score += 10;
        scoreText.setText('Score: ' + score);
        switch (true) {
            case (score <= 100):
                progressText.setText('easy mode');
                break;
            case (score > 100 && score < 200):
                progressText.setText('not bad');
                break;
            case (score > 200 && score < 300):
                progressText.setText('amazing');
                break;
            case (score > 300):
                progressText.setText('mlg player');
                break;
            default:
                break;
        }




        feathers.emitParticleAt(bird.x, bird.y);
        feathers2.emitParticleAt(bird.x, bird.y);
        feathers3.emitParticleAt(bird.x, bird.y);
        //feathers.destroy();
        var jumpHeight = (score > 60 ? score : (60 + score) * 1.2);

        bird.setBounce(1);
        bird.setCollideWorldBounds(true);
        bird.setVelocity(
            //left-right
            Phaser.Math.Between(-10 + ((-1) * score * 2.5), 10 + (score * 2.5)),
            //up-down
            Phaser.Math.Between(-5 + ((-1) * jumpHeight * 2.5), -10 + ((-1) * jumpHeight * 2.5))
        );




    })
}