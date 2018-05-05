import PixelUIText from './PixelUIText';
import PixelUICheckbox from './PixelUICheckbox';
import { PixelUIRadio, PixelUIRadioGroup } from '../PixelUi/PixelUIRadio';
import PixelUIBordered from './abstract/PixelUIBordered';
import PixelUIButton from './PixelUIButton';
import PixelUIRange from './PixelUIRange';

/**
 * @class PixelUIPanel
 *
 * Panel UI
 */
export default class PixelUIPanel extends PixelUIBordered {
    private group: Phaser.Group;
    public visible: boolean = true;
    public sprite: Phaser.Sprite = null;
    public text: Phaser.BitmapText = null;

    /**
     * Create a PixelUI Panel
     *
     * @param phaserGame Phaser game object
     * @param x The left coordinate of the panel
     * @param y The top coordinate of the panel
     * @param width The width of the panel
     * @param height The height of the panel
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, width: number, height: number, group: Phaser.Group = null) {
        super();
        this.phaserGame = phaserGame;

        this.group = this.phaserGame.add.group();
        group.add(this.group);

        let panel = phaserGame.make.sprite(0, 0, 'pixel_ui', 'panel');
        let bmd = this.createBitmapData(panel, width, height, 10, 10);
        this.sprite = phaserGame.add.sprite(x, y, bmd, null, this.group);
        this.sprite.smoothed = false;
    }


    /**
     * Show the panel, with a fade In animation
     *
     * @param callback Callback method
     */
    public show(callback: any = null): void {
        this.visible = true;
        let tween = this.phaserGame.add.tween(this.group).to({
            alpha: 1,
            y: 0,
            visible: true,
        }
        , 500, Phaser.Easing.Exponential.Out, true);
        if (callback) {
            tween.onComplete.add(callback);
        }
    }

    /**
     * Hide the panel, with a fade out animation
     *
     * @param callback Callback method
     */
    public hide(callback: any = null): void {
        this.visible = false;
        let tween = this.phaserGame.add.tween(this.group).to({
            alpha: 0,
            y: 20,
            visible: false,
        }
        , 500, Phaser.Easing.Exponential.Out, true);
        if (callback) {
            this.group.visible = true;
            tween.onComplete.add(callback);
        }
    }

    /**
     * Show/Hide the panel, with a fade in/out animation
     *
     * @param callback Callback method
     */
    public toggle(callback: any = null): void {
        this.visible = !this.visible;
        if (this.visible) {
            this.show(callback);
        } else {
            this.hide(callback);
        }
    }



    /**
     * Create a PixelUI Panel and add to the panel
     *
     * @param x The left coordinate of the panel, relative to the panel
     * @param y The top coordinate of the panel, relative to the panel
     * @param width The width of the panel
     * @param height The height of the panel
     */
    public addPanel(x: number, y: number, width: number, height: number): PixelUIPanel {
        return new PixelUIPanel(this.phaserGame, this.sprite.x + x, this.sprite.y + y, width, height, this.group);
    }

    /**
     * Create a PixelUI Text and add to the panel
     *
     * @param x The left coordinate of the text, relative to the panel
     * @param y The top coordinate of the text, relative to the panel
     * @param text Caption of the text
     */
    public addText(x: number, y: number, text: string): PixelUIText {
        return new PixelUIText(this.phaserGame, this.sprite.x + x, this.sprite.y + y, text, this.group);
    }

    /**
     * Create a PixelUI Checkbox and add to the panel
     *
     * @param x The left coordinate of the checkbox, relative to the panel
     * @param y The top coordinate of the checkbox, relative to the panel
     * @param text Caption of the checkbox
     * @param checked Default state of the checkbox
     * @param callback On change callback method
     */
    public addCheckbox(x: number, y: number, text: string = '', checked: boolean = false, callback: any = null): PixelUICheckbox {
        return new PixelUICheckbox(this.phaserGame, this.sprite.x + x, this.sprite.y + y, text, checked, callback, this.group);
    }

    /**
     * Create a PixelUI Radio button group
     *
     * @param onChangeCallback Callback method
     */
    public addRadioGroup(onChangeCallback: any = null): PixelUIRadioGroup {
        return new PixelUIRadioGroup(this.phaserGame, this.group, onChangeCallback, this.sprite.x, this.sprite.y);
    }

    /**
     * Create a PixelUI Button and add to the panel
     *
     * @param x The left coordinate of the button, relative to the panel
     * @param y The top coordinate of the button, relative to the panel
     * @param width The width of the button. If this parameter is null the button width is automatically calculated. If this parameter is a number the text is wrapped to this with and the button height is automatically calculated.
     * @param text The caption of the button
     * @param callback On click callback method
     */
    public addButton(x: number, y: number, width: number = null, text: string = '', callback: any = null): PixelUIButton {
        return new PixelUIButton(this.phaserGame, this.sprite.x + x, this.sprite.y + y, width, text, callback, this.group);
    }

    /**
     * Create a PixelUI Range and add to the panel
     *
     * @param x The left coordinate of the Range, relative to the panel
     * @param y The top coordinate of the Range, relative to the panel
     * @param width The width of the Range.
     * @param min The minimum value
     * @param max The maximum value
     * @param value The default value
     * @param title The caption of the Range
     * @param displayMode 0: No value display | 1: Percentage value display | 2: Value based display
     * @param callback On change callback method
     */
    public addRange(x: number, y: number, width: number = null, min: number = 0, max: number = 100, value: number = null, title: string = '', displayMode: number = 1, callback: any = null): PixelUIRange {
        return new PixelUIRange(this.phaserGame, this.sprite.x + x, this.sprite.y + y, width, min, max, value, title, displayMode, callback, this.group);
    }

    /**
     * Create a sprite and add to the panel
     *
     * @param x The left coordinate of the sprite, relative to the panel
     * @param y The top coordinate of the sprite, relative to the panel
     * @param key The sprite image
     * @param frame Frame of the sprite
     * @param callback On click callback method
     */
    public addSprite(x: number, y: number, key: any = null, frame: any = null, callback: any = null): Phaser.Sprite {
        let sprite = this.phaserGame.add.sprite(this.sprite.x + x, this.sprite.y + y, key, frame, this.group);
        if (callback) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(callback);
        }
        return sprite;
    }
}