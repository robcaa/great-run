import * as Assets from '../assets';
import PixelUIPanel from './PixelUIPanel';
import PixelUIText from './PixelUIText';
import PixelUICheckbox from './PixelUICheckbox';
import { PixelUIRadio, PixelUIRadioGroup } from '../PixelUi/PixelUIRadio';
import PixelUIButton from './PixelUIButton';
import PixelUIRange from './PixelUIRange';

/**
 * @class PixelUI
 *
 * PixelUI base class
 *
 * Create a pixelUiGroup that will contains all ui elements.
 * PixelUI class contain a static preloader function that must call in the phaser preloader state.
 * You can add panels, buttons, texts, checkboxes, radio button groups, ranges and sprites.
 */
export default class PixelUI {
    protected phaserGame: Phaser.Game;
    public pixelUiGroup: Phaser.Group = null;
    public visible: boolean = true;

    /**
     * Create a PixelUI instance
     *
     * @param phaserGame Phaser game object
     * @param uiAtlasName PixelUI atlas name
     * @param uiFontName PixelUI font name
     * @param uiGroup If specified this group, it will be the parent group for all ui elements
     */
    constructor(phaserGame: Phaser.Game, uiAtlasName: string = 'pixel_ui', uiFontName: string = 'pixel_ui_font', uiGroup: Phaser.Group = null) {
        this.phaserGame = phaserGame;

        this.pixelUiGroup = this.phaserGame.add.group();
        if (uiGroup) {
            uiGroup.fixedToCamera = true;
            uiGroup.add(this.pixelUiGroup);
        }
    }

    /**
     * Load PixelUI assets. Call this method in a preloader state.
     *
     * @param phaserGame Phaser game object
     */
    public static preload(phaserGame: Phaser.Game) {
        phaserGame.load.atlasJSONArray(
            Assets.Atlases.AtlasesPixelUi.getName(),
            Assets.Atlases.AtlasesPixelUi.getPNG(),
            Assets.Atlases.AtlasesPixelUi.getJSONArray()
        );
    }

    /**
     * Show the UI, with a fade In animation
     *
     * @param callback Callback method
     */
    public show(callback: any = null): void {
        this.visible = true;
        let tween = this.phaserGame.add.tween(this.pixelUiGroup).to({
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
     * Hide the UI, with a fade out animation
     *
     * @param callback Callback method
     */
    public hide(callback: any = null): void {
        this.visible = false;
        let tween = this.phaserGame.add.tween(this.pixelUiGroup).to({
            alpha: 0,
            y: 20,
            visible: false,
        }
        , 500, Phaser.Easing.Exponential.Out, true);
        if (callback) {
            tween.onComplete.add(callback);
        }
    }

    /**
     * Show/Hide the UI, with a fade in/out animation
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
     * Create a PixelUI Panel
     *
     * @param x The left coordinate of the panel
     * @param y The top coordinate of the panel
     * @param width The width of the panel
     * @param height The height of the panel
     */
    public addPanel(x: number, y: number, width: number, height: number): PixelUIPanel {
        return new PixelUIPanel(this.phaserGame, x, y, width, height, this.pixelUiGroup);
    }

    /**
     * Create a PixelUI Text
     *
     * @param x The left coordinate of the text
     * @param y The top coordinate of the text
     * @param text Caption of the text
     */
    public addText(x: number, y: number, text: string): PixelUIText {
        return new PixelUIText(this.phaserGame, x, y, text, this.pixelUiGroup);
    }

    /**
     * Create a PixelUI Checkbox
     *
     * @param x The left coordinate of the checkbox
     * @param y The top coordinate of the checkbox
     * @param text Caption of the checkbox
     * @param checked Default state of the checkbox
     * @param callback On change callback method
     */
    public addCheckbox(x: number, y: number, text: string = '', checked: boolean = false, callback: any = null): PixelUICheckbox {
        return new PixelUICheckbox(this.phaserGame, x, y, text, checked, callback, this.pixelUiGroup);
    }

    /**
     * Create a PixelUI Radio button group
     *
     * @param onChangeCallback Callback method
     */
    public addRadioGroup(onChangeCallback: any = null): PixelUIRadioGroup {
        return new PixelUIRadioGroup(this.phaserGame, this.pixelUiGroup, onChangeCallback);
    }

    /**
     * Create a PixelUI Button
     *
     * @param x The left coordinate of the button
     * @param y The top coordinate of the button
     * @param width The width of the button. If this parameter is null the button width is automatically calculated. If this parameter is a number the text is wrapped to this with and the button height is automatically calculated.
     * @param text The caption of the button
     * @param callback On click callback method
     */
    public addButton(x: number, y: number, width: number = null, text: string = '', callback: any = null): PixelUIButton {
        return new PixelUIButton(this.phaserGame, x, y, width, text, callback, this.pixelUiGroup);
    }

    /**
     * Create a PixelUI Range
     *
     * @param x The left coordinate of the Range
     * @param y The top coordinate of the Range
     * @param width The width of the Range.
     * @param min The minimum value
     * @param max The maximum value
     * @param value The default value
     * @param title The caption of the Range
     * @param displayMode 0: No value display | 1: Percentage value display | 2: Value based display
     * @param callback On change callback method
     */
    public addRange(x: number, y: number, width: number = null, min: number = 0, max: number = 100, value: number = null, title: string = '', displayMode: number = 1, callback: any = null): PixelUIRange {
        return new PixelUIRange(this.phaserGame, x, y, width, min, max, value, title, displayMode, callback, this.pixelUiGroup);
    }

    /**
     * Create a sprite and add to PixelUI group
     *
     * @param x The left coordinate of the sprite
     * @param y The top coordinate of the sprite
     * @param key The sprite image
     * @param frame Frame of the sprite
     * @param callback On click callback method
     */
    public addSprite(x: number, y: number, key: any = null, frame: any = null, callback: any = null): Phaser.Sprite {
        let sprite = this.phaserGame.add.sprite(x, y, key, frame, this.pixelUiGroup);
        if (callback) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(callback);
        }
        return sprite;
    }
}