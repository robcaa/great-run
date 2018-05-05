import GameDispatcher from '../GameDispatcher';
import GameObject from '../abstract/GameObject';
import * as Assets from '../assets';

/**
 * @class Coins
 *
 * All coin handler class in the game
 */
export default class Coins extends GameObject {

    /**
     * Create all coins from tile map, and initialize those
     *
     * @param gameDispatcher The GameDispatcher object
     */
    constructor(gameDispatcher: GameDispatcher) {
        super(gameDispatcher);

        this.gameDispatcher.gameVars.map.createFromTiles(2, null, Assets.Spritesheets.SpritesheetsCoin3232.getName(), 'stuff', this.gameDispatcher.gameVars.coinsGroup);
        this.gameDispatcher.gameVars.coinsGroup.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2, 3, 4, 4, 5, 6, 7, 8], 12, true);
        this.gameDispatcher.gameVars.coinsGroup.callAll('animations.play', 'animations', 'spin');
        this.gameDispatcher.gameVars.coinsGroup.callAll('disabled', false);
    }

}