import GameDispatcher from '../GameDispatcher';

/**
 * @class GameObject
 *
 * Abstract class to the game objects
 */
export default abstract class GameObject {
    protected gameDispatcher: GameDispatcher;
    protected phaserGame: Phaser.Game;

    constructor(gameDispatcher: GameDispatcher) {
        this.gameDispatcher = gameDispatcher;
        this.phaserGame = gameDispatcher.phaserGame;
    }
}