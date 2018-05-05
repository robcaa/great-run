import * as Assets from '../assets';
import GameDispatcher from '../GameDispatcher';
import PixelUI from '../PixelUi/PixelUi';

import GUI from '../GUI';



/**
 * @class Main
 *
 * Main state
 */
export default class Main extends Phaser.State {
    public gameDispatcher: GameDispatcher = null;
    public pixelUI: PixelUI = null;
    public gui: GUI = null;


    public preload(): void {
        // preload maps
        for (let i = 1; i <= 30; i++) {
            this.game.load.tilemap(Assets.JSON[`JSONLevel${i}`].getName(), Assets.JSON[`JSONLevel${i}`].getJSON(), null, Phaser.Tilemap.TILED_JSON);
        }

        // preload pixelUI texture
        PixelUI.preload(this.game);
    }


    public create(): void {
        // To prevent this: 'The AudioContext was not allowed to start. It must be resume (or created) after a user gesture on the page.'
        this.game.input.onTap.addOnce(this.game.sound.context.resume, this.game.sound.context);
        this.game.input.keyboard.addCallbacks( this.game.sound.context, this.game.sound.context.resume);

        // initialize game objects
        this.gameDispatcher = new GameDispatcher(this.game);
        this.pixelUI = new PixelUI(this.game, 'pixel_ui', 'pixel_ui_font', this.gameDispatcher.gameVars.uiGroup);
        this.pixelUI.hide();
        this.gui = new GUI(this.game, this.pixelUI, this.gameDispatcher);
    }


    public update(): void {
        // main update
        this.gameDispatcher.update();
    }

}
