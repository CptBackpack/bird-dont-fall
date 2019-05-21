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

function preload() {
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('bird', './assets/bird.png');

}

function create() {
    this.input.mouse.disableContextMenu();
    //#region Images Loading
    this.add.image(400, 300, 'sky');
    //#endregion

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
                platforms.create(pointer.x, pointer.y, 'ground').setScale(0.2).refreshBody();
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

function PlatformTouch(game) {
    platforms.children.iterate(function(child) {
        child.destroy();
        
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
        scoreText.setText('Score: ' + score);


    })
}