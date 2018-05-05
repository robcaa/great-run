import GameDispatcher from '../GameDispatcher';
import GameObject from '../abstract/GameObject';
import * as Assets from '../assets';

/**
 * @class Background
 *
 * Animated two layered game background (the mountains)
 */
export default class Background extends GameObject {
    private mountainsBack: Phaser.TileSprite = null;
    private mountainsMid: Phaser.TileSprite = null;

    /**
     * Init the backgrounds, set size and fixed to camera
     *
     * @param gameDispatcher The GameDispatcher object
     */
    constructor(gameDispatcher: GameDispatcher) {
        super(gameDispatcher);

        this.mountainsBack = this.phaserGame.add.tileSprite(
            0,
            0,
            this.phaserGame.width,
            this.phaserGame.height,
            Assets.Images.ImagesBg1.getName()
        );
        this.mountainsBack.fixedToCamera = true;

        this.mountainsMid = this.phaserGame.add.tileSprite(
            0,
            this.phaserGame.height - this.phaserGame.cache.getImage(Assets.Images.ImagesBg2.getName()).height,
            this.phaserGame.width,
            this.phaserGame.height,
            Assets.Images.ImagesBg2.getName()
        );
        this.mountainsMid.fixedToCamera = true;

        this.phaserGame.world.sendToBack(this.mountainsMid);
        this.phaserGame.world.sendToBack(this.mountainsBack);
    }


    /**
     * Update the background (slowly move the layers)
     */
    public update(): void {
        if (this.mountainsBack) {
            this.mountainsBack.tilePosition.x = this.phaserGame.camera.x * -0.05;
            this.mountainsMid.tilePosition.x = this.phaserGame.camera.x * -0.2;
        }
    }
}