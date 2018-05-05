import * as Assets from '../assets';

/**
 * @class PixelUICheckbox
 *
 * Checkbox UI
 */
export default class PixelUICheckbox {
    public checked: boolean = false;
    public sprite: Phaser.Sprite = null;
    public text: Phaser.BitmapText = null;
    private normalSprite: Phaser.Sprite = null;
    private checkedSprite: Phaser.Sprite = null;

    /**
     * Create a PixelUI Checkbox
     *
     * @param x The left coordinate of the checkbox
     * @param y The top coordinate of the checkbox
     * @param text Caption of the checkbox
     * @param checked Default state of the checkbox
     * @param callback On change callback method
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, text: string = '', checked: boolean = false, callback: any = null, group: Phaser.Group = null) {
        if (checked) {
            this.sprite = phaserGame.add.sprite(x, y, 'pixel_ui', 'checkbox_checked', group);
        } else {
            this.sprite = phaserGame.add.sprite(x, y, 'pixel_ui', 'checkbox', group);
        }
        this.normalSprite = phaserGame.make.sprite(0, 0, 'pixel_ui', 'checkbox');
        this.checkedSprite = phaserGame.make.sprite(0, 0, 'pixel_ui', 'checkbox_checked');

        this.checked = checked;
        this.sprite.smoothed = false;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(() => { this.callback(callback); }, this);

        if (text !== '') {
            this.text = phaserGame.add.bitmapText(
                x + 45, y + 3,
                'pixel_ui_font',
                text, 16, group);
            this.text.smoothed = false;
            this.text.inputEnabled = true;
            this.text.alpha = 0.7;
            this.text.events.onInputDown.add(() => { this.callback(callback); }, this);
        }
    }

    /**
     * State change callback
     *
     * @param callback On change callback method
     */
    private callback(callback: any) {
        this.checked = !this.checked;
        if (this.checked) {
            this.sprite.loadTexture(this.checkedSprite.texture);
        } else {
            this.sprite.loadTexture(this.normalSprite.texture);
        }
        if (callback) {
            callback(this);
        }
    }
}