import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';

export default class Preloader extends Phaser.State {
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;

    /**
     * Progress indicator bar implementation
     */
    public preload(): void {
        // progress bar sprite initialization
        this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar);
        this.preloadBarSprite.anchor.setTo(0, 0.5);
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5;

        this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame);
        this.preloadFrameSprite.anchor.setTo(0.5);

        this.game.load.setPreloadSprite(this.preloadBarSprite);

        // load assets
        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }

    /**
     * Sound decoding
     */
    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    /**
     * Preloader oncomplete fade the screen and start main state
     */
    private startGame(): void {
        this.game.camera.onFadeComplete.addOnce(this.loadMain, this);
        this.game.camera.fade(0x000000, 1000);
    }

    /**
     * Start the main state
     */
    private loadMain(): void {
        this.game.state.start('main'); // go to the main state
    }
}
