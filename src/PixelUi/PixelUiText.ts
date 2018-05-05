
/**
 * @class PixelUIText
 *
 * Text UI
 */
export default class PixelUIText {
    public text: Phaser.BitmapText = null;

    /**
     * Create a PixelUI Text
     *
     * @param phaserGame Phaser game object
     * @param x The left coordinate of the text
     * @param y The top coordinate of the text
     * @param text Caption of the text
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, text: string = '', group: Phaser.Group = null) {
        this.text = phaserGame.add.bitmapText(
            x, y,
            'pixel_ui_font',
            text, 16, group
        );
        this.text.smoothed = false;
        this.text.alpha = 0.7;
    }

}