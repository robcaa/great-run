
/**
 * @class PixelUIRange
 *
 * Range UI
 */
export default class PixelUIRange {
    protected phaserGame: Phaser.Game;

    private displayMode: number = 1;
    public max: number = 100;
    public min: number = 0;
    public value: number = 0;
    public dragging: boolean = false;
    public text: Phaser.BitmapText = null;
    public title: Phaser.BitmapText = null;

    public rangeSprite: Phaser.Sprite = null;
    private rangeHorizontalSprite: Phaser.Sprite = null;
    private rangeEndSprite1: Phaser.Sprite = null;
    private rangeEndSprite2: Phaser.Sprite = null;


    /**
     * Create a PixelUI Range
     *
     * @param phaserGame Phaser game object
     * @param x The left coordinate of the Range
     * @param y The top coordinate of the Range
     * @param width The width of the Range
     * @param min The minimum value
     * @param max The maximum value
     * @param value The default value
     * @param title The caption of the Range
     * @param displayMode 0: No value display | 1: Percentage value display | 2: Value based display
     * @param callback On change callback method
     * @param group Parent group
     */
    constructor(phaserGame: Phaser.Game, x: number, y: number, width: number = null, min: number = 0, max: number = 100, value: number = null, title: string = '', displayMode: number = 1, callback: any = null, group: Phaser.Group = null) {
        this.phaserGame = phaserGame;
        this.min = min;
        this.max = max;
        this.displayMode = displayMode;

        // set the current value
        if (value) {
            this.value = parseFloat(value.toPrecision(2));
            if (this.value < this.min)
                this.value = this.min;
            if (this.value > this.max)
                this.value = this.max;
        } else {
            this.value = this.min;
        }
        // calculate the range left coord
        let rangeXPos = ((this.value - this.min) / (this.max - this.min)) * width - 10 + x;

        // create title
        if (title && title !== '') {
            this.title = phaserGame.add.bitmapText(
                x + width / 2, y - 40,
                'pixel_ui_font',
                title, 16, group);
            this.title.smoothed = false;
            this.title.alpha = 0.7;
            this.title.anchor.x = 0.5;

            this.title.x = x + width / 2 + 4;
            if (this.displayMode === 0) {
                this.title.y = y - 20;
            }
        }

        // create display text
        if (this.displayMode > 0) {
            this.text = phaserGame.add.bitmapText(
                x + width / 2, y - 20,
                'pixel_ui_font',
                `${((rangeXPos - x + 10) / width * 100)}%`
                , 16, group
            );
            this.text.smoothed = false;
            this.text.alpha = 0.7;
            this.text.anchor.x = 0.5;
            this.text.x = x + width / 2 + 4;
            if (this.displayMode === 2) {
                this.text.setText(Math.round(this.value) + '');
            }
        }

        // create Range sprite parts
        this.rangeHorizontalSprite = phaserGame.add.sprite(x, y + 3, 'pixel_ui', 'slider_horizontal', group);
        this.rangeHorizontalSprite.width = width;
        this.rangeEndSprite1 = phaserGame.add.sprite(x, y, 'pixel_ui', 'slider_end', group);
        this.rangeEndSprite2 = phaserGame.add.sprite(x + width, y, 'pixel_ui', 'slider_end', group);
        this.rangeSprite = phaserGame.add.sprite(rangeXPos, y - 20, 'pixel_ui', 'slider', group);
        this.rangeSprite.alpha = 0.7;

        this.rangeSprite.inputEnabled = true;
        let rect: Phaser.Rectangle = new Phaser.Rectangle(x - 10, y - 20, width + 30, y - 20);
        this.rangeSprite.input.enableDrag(false, false, true, 0, rect);
        this.rangeSprite.input.allowVerticalDrag = false;

        this.rangeSprite.smoothed = false;
        this.rangeHorizontalSprite.smoothed = false;
        this.rangeEndSprite1.smoothed = false;
        this.rangeEndSprite2.smoothed = false;

        // attach events
        this.rangeSprite.events.onDragStart.add(() => { this.dragging = true; }, this);
        this.rangeSprite.events.onDragStop.add(() => { this.dragging = false; }, this);
        this.rangeSprite.events.onDragUpdate.add((pointer, pointer_x, pointer_y) => {
            let value: number = (pointer.x - x + 10) / width; // range between 0 and 1
            if (value < 0)
                value = 0;
            if (value > 1)
                value = 1;
            this.value = this.min + (this.max - this.min) * value; // range between min and max

            if (this.displayMode > 0) {
                if (this.displayMode === 1) {
                    this.text.setText(Math.floor(value * 100) + '%');
                } else {
                    this.text.setText(Math.round(this.value) + '');
                }
                this.text.x = x + width / 2 + 4;
            }

            if (callback) {
                callback(this);
            }
        }, this);
    }


}