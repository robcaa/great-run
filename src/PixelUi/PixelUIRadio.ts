
/**
 * @class PixelUIRadioGroup
 *
 * Radio button UI
 */
export class PixelUIRadioGroup {
    private phaserGame: Phaser.Game;
    private group: Phaser.Group;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private onChangeCallback: any;
    public radioButtons: PixelUIRadio[];

    /**
     * Create a PixelUI Radio button group
     *
     * @param phaserGame Phaser game object
     * @param group Parent group
     * @param onChangeCallback Callback method
     * @param offsetX Parent left coord
     * @param offsetY Parent top coord
     */
    constructor(phaserGame: Phaser.Game, group: Phaser.Group = null, onChangeCallback: any = null, offsetX: number = 0, offsetY: number = 0) {
        this.phaserGame = phaserGame;
        this.onChangeCallback = onChangeCallback;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.group = group;
        this.radioButtons = [];
    }

    /**
     * Add a radio button to the radio group
     *
     * @param x The left coordinate of the radio button, relative to the parent
     * @param y The top coordinate of the radio button, relative to the parent
     * @param text The radio button caption
     * @param value The radio button value. On change callback pass these value
     * @param checked Default state
     */
    public addRadio(x: number, y: number, text: string = '', value: any = null, checked: boolean = false): PixelUIRadio {
        let ui = new PixelUIRadio(this.phaserGame, this.offsetX + x, this.offsetY + y, text, value, checked, this.callback.bind(this), this.group);
        this.radioButtons.push(ui);
        return ui;
    }

    /**
     * On change method. Set all radio button state in a radio group and call onChangeCallback
     *
     * @param radio The radio button instance
     */
    private callback(radio) {
        this.radioButtons.map(radioButton => {
            radioButton.setChecked(false);
        });
        radio.setChecked(true);
        if (this.onChangeCallback) {
            this.onChangeCallback(radio);
        }
    }

    public getSelectedValue(): any {
        let result = null;
        for (let i = 0; i < this.radioButtons.length; i++) {
            if (this.radioButtons[i].checked) {
                result = this.radioButtons[i].value;
            }
        }
        return result;
    }
}






export class PixelUIRadio {
    public checked: boolean = false;
    public value: any = null;
    public sprite: Phaser.Sprite = null;
    public text: Phaser.BitmapText = null;
    private normalSprite: Phaser.Sprite = null;
    private checkedSprite: Phaser.Sprite = null;

    /**
     * Create a radio button
     *
     * @param phaserGame Phaser game object
     * @param x The left coordinate of the radio button, relative to the parent
     * @param y The top coordinate of the radio button, relative to the parent
     * @param text The radio button caption
     * @param value The radio button value. On change callback pass these value
     * @param checked Default state
     * @param callback Callback method
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, text: string = '', value: any = null, checked: boolean = false, callback: any = null, group: Phaser.Group = null) {
        if (checked) {
            this.sprite = phaserGame.add.sprite(x, y, 'pixel_ui', 'radio_checked', group);
        } else {
            this.sprite = phaserGame.add.sprite(x, y, 'pixel_ui', 'radio', group);
        }
        this.normalSprite = phaserGame.make.sprite(0, 0, 'pixel_ui', 'radio');
        this.checkedSprite = phaserGame.make.sprite(0, 0, 'pixel_ui', 'radio_checked');
        this.checked = checked;
        this.sprite.smoothed = false;
        this.sprite.inputEnabled = true;
        this.value = value;
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
     * Callback method that handle texture change
     *
     * @param callback Callback method
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

    /**
     * Set the checkbox state
     *
     * @param checked The checkbox state
     */
    public setChecked(checked: boolean = true) {
        this.checked = checked;
        if (this.checked) {
            this.sprite.loadTexture(this.checkedSprite.texture);
        } else {
            this.sprite.loadTexture(this.normalSprite.texture);
        }
    }
}