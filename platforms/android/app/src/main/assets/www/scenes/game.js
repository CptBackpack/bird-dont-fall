 //#region Variables
 var scoreText;
 var progressText;
 var comboText;
 var livesText;

 var bird;
 var platforms;

 var MouseClick;

 var feathers = null;
 var feathers2 = null;
 var feathers3 = null;

 var score = 0;
 var absolutescore = 0;
 var gameOver = false;
 var lives = 3;
 var combo = 0;
 //#endregion Variables

var GameScene = new Phaser.Class({

    Extends:Phaser.Scene,
    initialize:
    function GameScene()
    {
        Phaser.Scene.call(this, { key: 'gamescene' });
    },

preload :function() {
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

    
},


create: function() {
   

    //#region Misc
    //console.log(window.innerWidth);
    this.input.mouse.disableContextMenu();

    //#endregion Misc

    //#region Images Loading
    this.add.image(400, 300, 'background').setScale(3);
    //#endregion

    //#region Text
    scoreText = this.add.bitmapText(15, 15, 'BDFFont', 'Score: 0', 20);
    progressText = this.add.bitmapText(15, 40, 'BDFFont', '', 20);
    livesText = this.add.bitmapText(15, 70, 'BDFFont', 'HP: 3', 20);
    comboText = this.add.bitmapText(window.innerWidth - 130, 25, 'BDFFont', 'x0', 50);
   

    //.this.add.bitmapText(window.innerWidth - 200, 5, 'BDFFont', 'Bird, Don\'t Fall!', 25);
    //#endregion Text

    //#region Feather Particles
    feathers = this.add.particles('feather').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.15, end: 0 },
        on: false
    });
    feathers.reserve(1000);

    feathers2 = this.add.particles('feather2').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.15, end: 0 },
        on: false
    });
    feathers2.reserve(1000);

    feathers3 = this.add.particles('feather3').createEmitter({
        angle: { min: 0, max: 180 },
        speed: { min: 200, max: 300 },
        quantity: Phaser.Math.Between(1, 4),
        lifespan: 500,
        scale: { start: 0.15, end: 0 },
        on: false
    });
    feathers3.reserve(1000);
    //#endregion Feather Particles

    //#region Ground
    ground = this.physics.add.staticGroup();
    ground.create(0, window.innerHeight, 'ground').setScale(10, 2).refreshBody();

    //#endregion Ground

    //#region Jumping Platform
    platforms = this.physics.add.staticGroup();
    //#endregion Jumping Platform

    //#region Bird 
    bird = this.physics.add.group();

    bird = this.physics.add.sprite(Phaser.Math.Between(0, 800), 10, 'bird');
    bird.setScale(0.7);
    bird.setOrigin(0, 0);
    bird.setSize(80, 70, false);
    this.physics.add.collider(bird, platforms, this.PlatformTouch, null, this);
    this.physics.add.collider(bird, ground, this.BirdFell, null, this);

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
                var hand = platforms.create(pointer.x, pointer.y, 'hand').setScale(0.23).refreshBody();
                hand.setOrigin(0.5, 0.9)
                hand.setScale(0.2);
                hand.setSize(75, 15, true);
            }
        }
        if (pointer.rightButtonDown()) {
            if ((score) - 100 >= 0) {

            }
            //console.log("right");
        }
    }, this);
    //#endregion


},

update: function () {
    scoreText.setText('Score: ' + score);
    comboText.setText('x' + combo);
    livesText.setText('HP: ' + lives);
    this.SetScoreText(score);
   
    if (lives == 0) {
        this.scene.start('mainmenu');

    }


},

//#region Game Mechanics Functions
BirdFell: function() {
    //this.physics.pause();

    lives -= 1;
    score -= (50 * (combo / 5));
    combo = 0;
    platforms.children.iterate(function(child) {

        child.destroy();
    });
    bird.setBounce(1);
    bird.setCollideWorldBounds(true);
    bird.setVelocity(
        //left-right
        Phaser.Math.Between(-10 + ((-1) * Math.abs(score) * 2.5), 10 + (Math.abs(score) * 2.5)),
        //up-down
        -900
    );

  

},

PlatformTouch: function(){
    platforms.children.iterate(function(child) {
        child.destroy();
    })
    
        score += 10 * ((combo > 0 ? combo : 1) / 10);
        absolutescore += 5 * ((combo > 0 ? combo : 1) / 10);

        if (combo == 0 && lives < 3) {
            absolutescore = (10 * 3);
            //console.log("HP Loss ABS:" + absolutescore);
        }

        //console.log("General ABS:" + absolutescore);
        combo++;
       
        

        //#region Spawn Feathers
        feathers.emitParticleAt(bird.x + 25, bird.y + 50);
        feathers2.emitParticleAt(bird.x + 25, bird.y + 50);
        feathers3.emitParticleAt(bird.x + 25, bird.y + 50);
        //#endregion Spawn Feathers

        //#region Resolve jumping
        var jumpHeight = (absolutescore > 70 ? absolutescore : (70 + Math.abs(absolutescore) * 1.2));

        bird.setBounce(1);
        bird.setCollideWorldBounds(true);
        bird.setVelocity(
            //left-right
            Phaser.Math.Between(-10 + ((-1) * Math.abs(absolutescore) * 2.5), 10 + (Math.abs(absolutescore) * 2.5)),
            //up-down
            Phaser.Math.Between(-5 + ((-1) * jumpHeight * 2.5), -10 + ((-1) * jumpHeight * 2.5))
        );
        //#endregion Resolve jumping



    
},
//#endregion Game Mechanics Functions


//#region Utility Functions

 SetScoreText: function(score) {
    score = Math.round(score);
    switch (true) {
        case (score < 0):
            progressText.setText(':(');
            break;
        case (score >= 0 && score < 100):
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

}
//#endregion Utility Functions

});


