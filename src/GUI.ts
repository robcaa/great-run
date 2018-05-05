import * as Assets from './assets';
import PixelUI from './PixelUi/PixelUi';
import GameDispatcher from './GameDispatcher';

// SERVICES
import StorageService from './services/StorageService';


/**
 * @class GUI
 *
 * Create all graphical user interface
 */
export default class GUI {

    private game: Phaser.Game;
    private pixelUI: PixelUI;
    private gameDispatcher: GameDispatcher;

    constructor(phaserGame: Phaser.Game, pixelUI: PixelUI, gameDispatcher: GameDispatcher) {
        this.game           = phaserGame;
        this.pixelUI        = pixelUI;
        this.gameDispatcher = gameDispatcher;



        // OPEN MENU BUTTON
        let menuBtn = this.game.add.sprite(this.game.width - 46, 10, Assets.Atlases.AtlasesPixelUi.getName(), 'menu', this.gameDispatcher.gameVars.uiGroup);
        menuBtn.inputEnabled = true;
        menuBtn.events.onInputDown.add(() => {
            menuBtn.visible = false;
            this.showMenu();
        });

        // MENU PICTURES
        let bg = this.pixelUI.addSprite(0, 0, Assets.Images.ImagesMenuBg.getName());
        bg.sendToBack();
        this.pixelUI.addSprite(10, -10, Assets.Images.ImagesLogo.getName());
        this.pixelUI.addSprite(10, this.game.height - 110, Assets.Images.ImagesPEGI3.getName(), null, () => {
            window.open('http://www.pegi.info', '_blank');
        });

        // MENU PANEL
        let panel = this.pixelUI.addPanel(this.game.width - 260, 10, 250, this.game.height - 20);
        panel.sprite.alpha = 0.85;

        // LEVEL CHOOSER PANEL
        let lvlPanel = this.pixelUI.addPanel(110, 110, 220, 280);
        lvlPanel.sprite.alpha = 0.85;
        lvlPanel.hide();
        let y = 10;
        for (let i = 0; i < this.gameDispatcher.LEVEL_COUNT; i++) {
            if (i % 5 === 0 && i > 0)
                y += 40;
            if (i % 10 === 0 && i > 0)
                y += 10;

            // CHANGE LEVEL
            lvlPanel.addButton(i * 40 % 200 + 10, y, 40, i + 1 + ' ', () => {
                let lvl = i + 1;
                this.game.time.events.removeAll();
                this.gameDispatcher.gameVars.level = lvl;
                this.gameDispatcher.gameVars.lvlText.setText(' ' + this.gameDispatcher.gameVars.level + ' ');
                this.gameDispatcher.player.reset();
                this.closeMenu();
                menuBtn.visible = true;
                this.gameDispatcher.gameVars.uiGroup.bringToTop(this.gameDispatcher.gameVars.tileBackgroundLayer);
                this.gameDispatcher.player.stopAnimation();
                this.gameDispatcher.enemies.stopAnimationAll();
                menuBtn.bringToTop();
                this.gameDispatcher.soundService.stopAllThenPlayRandomMusic();
            });
        }

        // MENU CLOSE BUTTON
        let menuCloseBtn = panel.addSprite(214, 0, Assets.Atlases.AtlasesPixelUi.getName(), Assets.Atlases.AtlasesPixelUi.Frames.Close, () => {
            menuBtn.visible = true;
            this.closeMenu();
            StorageService.localStorage.set('options', this.gameDispatcher.gameVars.options);
        });

        // MENU TITLE
        panel.addText(10, 10, 'MENU');

        // RESTART LEVEL BUTTON
        panel.addButton(10, 60, 110, 'Restart', () => {
            this.gameDispatcher.player.reset();
            this.closeMenu();
            menuBtn.visible = true;
            this.gameDispatcher.gameVars.uiGroup.bringToTop(this.gameDispatcher.gameVars.tileBackgroundLayer);
            this.gameDispatcher.player.stopAnimation();
            this.gameDispatcher.enemies.stopAnimationAll();
            this.gameDispatcher.soundService.stopAllThenPlayRandomMusic();
            menuBtn.bringToTop();
        });

        // LEVEL CHANGER PANEL TOGGLE
        panel.addButton(130, 60, 110, 'Set level', () => {
            lvlPanel.toggle();
        });


        // PLAYER SKIN SWITCH
        let playerSelect = panel.addRadioGroup((btn) => {
            this.gameDispatcher.player.changeTexture(btn.value);
            this.gameDispatcher.gameVars.options.playerActiveSkin = btn.value;
        });
        playerSelect.addRadio(10, 110, 'Dora', 1, this.gameDispatcher.gameVars.options.playerActiveSkin === 1);
        playerSelect.addRadio(10, 150, 'Boots', 2, this.gameDispatcher.gameVars.options.playerActiveSkin === 2);
        if (this.gameDispatcher.gameVars.options.playerActiveSkin === 2) {
            this.gameDispatcher.player.changeTexture(2);
        }

        // FULL SCREEN BUTTON
        panel.addCheckbox(10, 210, 'Full screen', false, (checkbox) => {
            if (checkbox.checked)
                this.game.scale.startFullScreen(false);
            else
                this.game.scale.stopFullScreen();
        });

        // MUSIC CHECKBOX
        panel.addCheckbox(10, 260, 'Music', this.gameDispatcher.gameVars.options.musicEnabled, (checkbox) => {
            this.gameDispatcher.gameVars.options.musicEnabled = checkbox.checked;
            this.gameDispatcher.soundService.backgroundMusicEnabled = checkbox.checked;

            if (checkbox.checked) {
                this.gameDispatcher.soundService.playRandomMusic();
            } else {
                this.gameDispatcher.soundService.stopAll();
            }
        });
        if (this.gameDispatcher.gameVars.options.musicEnabled !== null) {
            this.gameDispatcher.soundService.backgroundMusicEnabled = this.gameDispatcher.gameVars.options.musicEnabled;
        }

        // SOUND VOLUME SLIDER
        if (this.gameDispatcher.gameVars.options.soundVolume) {
            this.game.sound.volume = this.gameDispatcher.gameVars.options.soundVolume;
        } else {
            this.game.sound.volume = 0.5;
        }
        panel.addRange(20, 350, 200, 0, 1, this.game.sound.volume, 'Volume', 1, (range) => {
            this.game.sound.volume = range.value;
            this.gameDispatcher.gameVars.options.soundVolume = range.value;
        });

        // GAME SPEED SLIDER
        let slowMotionValue = 2;
        if (this.gameDispatcher.gameVars.options.gameSpeed) {
            this.game.time.slowMotion = 4 - this.gameDispatcher.gameVars.options.gameSpeed;
            slowMotionValue = this.gameDispatcher.gameVars.options.gameSpeed;
        } else {
            this.game.time.slowMotion = 2;
        }
        panel.addRange(20, 410, 200, 1, 3, slowMotionValue, 'Speed', 1, (range) => {
            this.game.time.slowMotion = 4 - range.value;
            this.gameDispatcher.player.sprite.animations.currentAnim.speed = range.value * 4;
            this.gameDispatcher.gameVars.coinsGroup.setAll('animations.currentAnim.speed', (range.value + 2) * 3);
            this.gameDispatcher.gameVars.enemiesGroup.setAll('animations.currentAnim.speed', range.value * 4);
            this.gameDispatcher.gameVars.options.gameSpeed = range.value;
        });
    }


    private showMenu() {
        this.pixelUI.show();
        this.gameDispatcher.gameVars.pause = true;
        this.game.physics.arcade.isPaused = true;
        this.gameDispatcher.player.sprite.animations.stop();
        this.gameDispatcher.enemies.stopAnimationAll();
    }


    private closeMenu() {
        this.pixelUI.hide();
        this.gameDispatcher.gameVars.pause = false;
        this.game.physics.arcade.isPaused = false;
        this.gameDispatcher.enemies.playAnimationAll();
    }
}