import * as Utils from '../utils/utils';
import * as Assets from '../assets';


/**
 * @class Boot
 *
 * The boot state
 */
export default class Boot extends Phaser.State {

    /**
     * Load any assets that need the preloader state
     */
    public preload(): void {
        this.game.load.atlasJSONArray(Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.getPNG(), Assets.Atlases.AtlasesPreloadSpritesArray.getJSONArray());
    }

    /**
     * Game setup code before the game actually starts doing anything
     */
    public create(): void {

        this.input.maxPointers = 1; // disable multitouch
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // set scale mode
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        if (this.game.device.desktop) { // desktop specific stuff
            // ...
        } else { // mobile specific stuff
            this.game.scale.forceOrientation(true, false); // force landscape
        }

        // Use DEBUG to wrap code that should only be included in a DEBUG build of the game
        // DEFAULT_GAME_WIDTH is the safe area width of the game
        // DEFAULT_GAME_HEIGHT is the safe area height of the game
        // MAX_GAME_WIDTH is the max width of the game
        // MAX_GAME_HEIGHT is the max height of the game
        // game.width is the actual width of the game
        // game.height is the actual height of the game
        // GOOGLE_WEB_FONTS are the fonts to be loaded from Google Web Fonts
        // SOUND_EXTENSIONS_PREFERENCE is the most preferred to least preferred order to look for audio sources
        console.log(
            `DEBUG....................... ${DEBUG}
           \nSCALE_MODE.................. ${SCALE_MODE}
           \nDEFAULT_GAME_WIDTH.......... ${DEFAULT_GAME_WIDTH}
           \nDEFAULT_GAME_HEIGHT......... ${DEFAULT_GAME_HEIGHT}
           \nMAX_GAME_WIDTH.............. ${MAX_GAME_WIDTH}
           \nMAX_GAME_HEIGHT............. ${MAX_GAME_HEIGHT}
           \ngame.width.................. ${this.game.width}
           \ngame.height................. ${this.game.height}
           \nGOOGLE_WEB_FONTS............ ${GOOGLE_WEB_FONTS}
           \nSOUND_EXTENSIONS_PREFERENCE. ${SOUND_EXTENSIONS_PREFERENCE}`
        );

        this.game.state.start('preloader'); // go to the preloaer state
    }
}
