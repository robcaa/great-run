
/**
 * @class PixelUIBordered
 *
 * Abstract class to resizeable ui elements
 */
export default abstract class PixelUIBordered {
    protected phaserGame: Phaser.Game;

    /**
     * Crop a sprite and make another one. All border is filled not stretched.
     *
     * @param sprite Original sprite
     * @param width New width
     * @param height New height
     * @param borderX Border horizontal size
     * @param borderY Border vertical size
     */
    protected createBitmapData(sprite: Phaser.Sprite, width: number, height: number, borderX: number, borderY: number) {
        let bmd = this.phaserGame.add.bitmapData(width, height);

        bmd.copyRect(sprite, new Phaser.Rectangle(0, 0, borderX, borderY)); // Left corner
        bmd.copy(
            sprite,
            borderX + 1,
            0,
            1,
            borderY,
            borderX,
            0,
            width - borderX * 2,
            borderY
        ); // Top border

        bmd.copyRect(sprite, new Phaser.Rectangle(sprite.width - borderX, 0, borderX, borderY), width - borderX); // Right corner

        bmd.copy(
            sprite,
            0,
            borderY + 1,
            borderX,
            1,
            0,
            borderY,
            borderX,
            height - borderY * 2
        ); // Left border

        bmd.copy(
            sprite,
            sprite.width - borderX,
            borderY + 1,
            borderX,
            1,
            width - borderX,
            borderY,
            borderX,
            height - borderY * 2
        ); // Right border

        bmd.copyRect(sprite, new Phaser.Rectangle(0, sprite.height - borderY, borderX, borderY), 0, height - borderY); // Left bottom corner
        bmd.copyRect(sprite, new Phaser.Rectangle(sprite.width - borderX, sprite.height - borderY, borderX, borderY), width - borderX, height - borderY); // Right bottom corner
        bmd.copy(
            sprite,
            borderX + 1,
            sprite.height - borderY,
            1,
            borderY,
            borderX,
            height - borderY,
            width - borderX * 2,
            borderY
        ); // Bottom border

        bmd.copy(
            sprite,
            borderX,
            borderY,
            1,
            1,
            borderX,
            borderY,
            width - borderX * 2,
            height - borderY * 2
        ); // Body

        return bmd;
    }

}