// Assets
import * as Assets from './assets';

// SERVICES
import SoundService from './services/SoundService';
import StorageService from './services/StorageService';

// GAME OBJECTS
import Player from './objects/Player';
import Enemies from './objects/Enemies';
import Coins from './objects/Coins';
import Background from './objects/Background';

// GAME VARIABLES
import GameVars from './GameVars';


/**
 * @class GameDispatcher
 *
 * Handle the game
 */
export default class GameDispatcher {
    public readonly LEVEL_COUNT: number = 30;

    public gameVars: GameVars = null;
    public phaserGame: Phaser.Game = null;
    public soundService: SoundService = null;

    public player: Player = null;
    public enemies: Enemies = null;
    public coins: Coins = null;
    public background: Background = null;


    /**
     * Initialize the game. Instanitate the game objects.
     *
     * @param phaserGame Phaser game object
     */
    constructor(phaserGame: Phaser.Game) {
        this.gameVars = new GameVars();
        this.phaserGame = phaserGame;


        // LOAD OPTIONS
        this.gameVars.options = StorageService.localStorage.get('options');
        if (this.gameVars.options == null) {
            this.gameVars.options = {
                gameSpeed: 2,
                musicEnabled: true,
                playerActiveSkin: 1,
                soundVolume: 0.5
            };
        }


        // PHASER SETTINGS
        this.phaserGame.time.advancedTiming = true;
        Phaser.Canvas.setImageRenderingCrisp(this.phaserGame.canvas);
        this.phaserGame.scale.pageAlignHorizontally = true;
        this.phaserGame.scale.pageAlignVertically = true;
        this.phaserGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.phaserGame.physics.startSystem(Phaser.Physics.ARCADE);
        this.phaserGame.stage.backgroundColor = '#5c94fc';

        this.phaserGame.time.slowMotion = 1.0;
        this.phaserGame.sound.volume = 0.02;
        this.phaserGame.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


        // LAYERS AND GROUPS
        this.gameVars.mapGroup = this.phaserGame.add.group();
        this.gameVars.coinsGroup = this.phaserGame.add.group();
        this.gameVars.coinsGroup.enableBody = true;
        this.gameVars.enemiesGroup = this.phaserGame.add.group();
        this.gameVars.enemiesGroup.enableBody = true;
        this.gameVars.playerGroup = this.phaserGame.add.group();
        this.gameVars.uiGroup = this.phaserGame.add.group();
        this.gameVars.uiGroup.fixedToCamera = true;


        // HUD
        this.gameVars.coinUISprite = this.phaserGame.add.sprite(5, 2, Assets.Spritesheets.SpritesheetsCoin3232.getName(), 1, this.gameVars.uiGroup);
        this.gameVars.mapUISprite = this.phaserGame.add.sprite(180, 2, Assets.Images.ImagesMapIcon.getName(), 1, this.gameVars.uiGroup);

        let style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
        this.gameVars.coinText = this.phaserGame.add.text(32, 0, ' 0 ', style, this.gameVars.uiGroup);
        this.gameVars.coinText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        this.gameVars.lvlText = this.phaserGame.add.text(200, 0, ` ${this.gameVars.level} `, style, this.gameVars.uiGroup);
        this.gameVars.lvlText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);


        // INSTANITATE GAME OBJECTS
        this.soundService = new SoundService(this);
        this.initMap();
        this.background = new Background(this);
        this.player = new Player(this);


        // KEY BINDINGS
        this.gameVars.spaceKey = this.phaserGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }


    /**
     * Initialize the map, play music, and remove pending events
     */
    public initMap(): void {
        if (this.gameVars.map) {
            this.gameVars.map.destroy();
            this.gameVars.tileBackgroundLayer.destroy();
            this.gameVars.solidLayer.destroy();
        }

        // set the collision tiles
        this.gameVars.map = this.phaserGame.add.tilemap(`level${this.gameVars.level}`);
        this.gameVars.map.setTileSize(32, 32);
        this.gameVars.map.addTilesetImage('tiles', Assets.Images.ImagesTiles.getName());
        this.gameVars.map.setCollisionBetween(3, 3, true, 'solid');
        this.gameVars.map.setCollisionBetween(7, 9, true, 'solid');
        this.gameVars.map.setCollisionBetween(13, 15, true, 'solid');
        this.gameVars.map.setCollisionBetween(6, 6, true, 'solid');
        this.gameVars.map.setCollisionBetween(12, 12, true, 'solid');
        this.gameVars.map.setCollisionBetween(39, 39, true, 'solid');
        this.gameVars.map.setCollisionBetween(19, 21, true, 'solid');
        this.gameVars.map.setCollisionBetween(58, 60, true, 'solid');
        this.gameVars.map.setCollisionBetween(64, 66, true, 'solid');

        // create layers
        this.gameVars.tileBackgroundLayer = this.gameVars.map.createLayer('background', null, null, this.gameVars.mapGroup);
        this.gameVars.solidLayer = this.gameVars.map.createLayer('solid', null, null, this.gameVars.mapGroup);
        this.gameVars.solidLayer.resizeWorld();

        this.gameVars.coinsGroup.removeAll();
        this.coins = new Coins(this);
        this.gameVars.enemiesGroup.removeAll();
        this.enemies = new Enemies(this);

        this.gameVars.firstPause = true;
        this.gameVars.pause = false;

        this.gameVars.levelCoin = 0;
        this.gameVars.coinText.setText(` ${this.gameVars.collectedCoin + this.gameVars.levelCoin} `);

        this.gameVars.uiGroup.bringToTop(this.gameVars.tileBackgroundLayer);

        if (this.gameVars.options.musicEnabled !== null && this.gameVars.options.musicEnabled) {
            this.soundService.playRandomMusic();
        }

        this.removePendingEvents();
    }

    /**
     * Remove all pending events
     */
    public removePendingEvents() {
        for (let event of this.phaserGame.time.events.events) {
            this.phaserGame.time.events.remove(event);
        }
    }


    /**
     * Go to next level
     */
    public nextLevel() {
        this.gameVars.level++;
        if (this.gameVars.level > this.LEVEL_COUNT) {
            this.gameVars.level = 1;
        }

        this.gameVars.firstPause = true;
        this.player.reset();
        this.gameVars.lvlText.setText(' ' + this.gameVars.level + ' ');
    }


    /**
     * Update all game objects
     */
    public update() {
        if (this.gameVars.pause || !this.player) {
            return;
        }
        this.player.update();
        this.enemies.update();
        this.background.update();
    }


}