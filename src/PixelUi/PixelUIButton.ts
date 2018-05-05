import PixelUIBordered from './abstract/PixelUIBordered';

/**
 * @class PixelUIButton
 *
 * Button UI
 */
export default class PixelUIButton extends PixelUIBordered {
    private normal: Phaser.Sprite = null;
    private pressed: Phaser.Sprite = null;
    public sprite: Phaser.Sprite = null;
    public text: Phaser.BitmapText = null;
    public hover: boolean = false;


    /**
     * Create a PixelUI Button
     *
     * @param phaserGame Phaser game object
     * @param x The left coordinate of the button
     * @param y The top coordinate of the button
     * @param width The width of the button. If this parameter is null the button width is automatically calculated. If this parameter is a number the text is wrapped to this with and the button height is automatically calculated.
     * @param text The caption of the button
     * @param callback On click callback method
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, width: number= null, text: string = '', callback: any = null, group: Phaser.Group = null) {
        super();
        this.phaserGame = phaserGame;

        this.sprite = phaserGame.add.sprite(x, y, null, null, group);

        let w = width;
        let h = 136;
        if (text !== '') {
            this.text = phaserGame.add.bitmapText(
                x + 8, y + 5,
                'pixel_ui_font',
                text, 16, group);
            this.text.smoothed = false;
            this.text.alpha = 0.7;
            if (width === null) {
                w = this.text.width + 16;
            } else {
                this.text.maxWidth = width - 14;
            }
            h = this.text.height + 24;
        }

        let normal = phaserGame.make.sprite(0, 0, 'pixel_ui', 'button');
        let normalBitmap = this.createBitmapData(normal, w, h, 8, 8);
        this.normal = phaserGame.make.sprite(0, 0, normalBitmap);
        let pressed = phaserGame.make.sprite(0, 0, 'pixel_ui', 'button_pressed');
        let pressedBitmap = this.createBitmapData(pressed, w, h, 8, 8);
        this.pressed = phaserGame.make.sprite(0, 0, pressedBitmap);
        this.sprite.loadTexture(this.normal.texture);
        normal.destroy();
        pressed.destroy();

        this.sprite.smoothed = false;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.onDown, this);
        this.sprite.events.onInputUp.add(() => { this.onUp(callback); }, this);
        this.sprite.events.onInputOver.add(function() { this.hover = true; }, this);
        this.sprite.events.onInputOut.add(function() { this.hover = false; }, this);
    }

    /**
     * Pointer on down state
     */
    private onDown() {
        this.sprite.loadTexture(this.pressed.texture);
        this.sprite.y++;
        this.text.y++;
    }

    /**
     * Pointer release state
     *
     * @param callback On click callback
     */
    private onUp(callback: any) {
        this.sprite.loadTexture(this.normal.texture);
        this.sprite.y--;
        this.text.y--;
        if (callback && this.hover) {
            callback(this);
        }
    }


}