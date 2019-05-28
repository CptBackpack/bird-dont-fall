
var BDFGameSettings = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [MainMenu, GameScene, GameOver]
   
};

//#region Global Variables
var combo = 0;
var highestCombo = 0;
var score = 0;

var latestScore = 0;
var highScore = 0;
//#endregion Global Variables
var game = new Phaser.Game(BDFGameSettings);
