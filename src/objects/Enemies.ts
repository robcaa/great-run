import GameDispatcher from '../GameDispatcher';
import GameObject from '../abstract/GameObject';
import * as Assets from '../assets';

/**
 * @class Enemies
 *
 * All enemies handler class in the game
 */
export default class Enemies extends GameObject {


    /**
     * Create all enemies from tile map, and initialize those
     *
     * @param gameDispatcher The GameDispatcher object
     */
    constructor(gameDispatcher: GameDispatcher) {
        super(gameDispatcher);


        this.gameDispatcher.gameVars.map.createFromTiles(1, null, Assets.Spritesheets.SpritesheetsEnemy3232.getName(), 'stuff', this.gameDispatcher.gameVars.enemiesGroup);
        this.gameDispatcher.gameVars.enemiesGroup.callAll('animations.add', 'animations', 'walkLeft', [0, 1, 2], 8, true);
        this.gameDispatcher.gameVars.enemiesGroup.callAll('animations.add', 'animations', 'walkRight', [4, 5, 6], 8, true);
        this.gameDispatcher.gameVars.enemiesGroup.setAll('body.bounce.x', 1);
        this.gameDispatcher.gameVars.enemiesGroup.setAll('body.gravity.y', 500);

        this.gameDispatcher.gameVars.enemiesGroup.forEach((enemy) => {
            enemy.isInView = false;
        }, this);
    }


    /**
     * Update all enemies position
     *
     * Enemy only moves if it is in the viewport
     */
    public update(): void {
        this.phaserGame.physics.arcade.collide(this.gameDispatcher.gameVars.enemiesGroup, this.gameDispatcher.gameVars.solidLayer, this.enemyBounce, null, this);

        if (!this.gameDispatcher.gameVars.firstPause) {
            this.gameDispatcher.gameVars.enemiesGroup.forEach((enemy) => {
                if (!enemy.isInView && this.gameDispatcher.gameVars.tileBackgroundLayer.world.x <= enemy.x && this.gameDispatcher.gameVars.tileBackgroundLayer.world.x + this.phaserGame.width >= enemy.x) {
                    enemy.isInView = true;
                    enemy.animations.play('walkLeft');
                    enemy.body.velocity.x = -20;
                }
            }, this);
        }
    }

    /**
     * Enemy bounce event handler
     *
     * @param enemy Bounced enemy object
     * @param tile Bounced tile object
     */
    private enemyBounce(enemy: Phaser.Sprite, tile: Phaser.Tile) {
        if (enemy.body.blocked.left || enemy.body.blocked.right) {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('walkRight');
            } else {
                enemy.animations.play('walkLeft');
            }
        }
    }

    /**
     * Stop all enemy
     */
    public stopAll() {
        this.gameDispatcher.gameVars.enemiesGroup.forEach((enemy) => {
            enemy.body.enable = false;
            enemy.animations.stop();
        }, this);
    }

    /**
     * Stop all enemy animations
     */
    public stopAnimationAll() {
        this.gameDispatcher.gameVars.enemiesGroup.forEach((enemy) => {
            enemy.animations.stop();
        }, this);
    }

    /**
     * Play all enemy animations
     */
    public playAnimationAll() {
        this.gameDispatcher.gameVars.enemiesGroup.forEach((enemy) => {
            if (enemy.body.velocity.x > 0) {
                enemy.animations.play('walkRight');
            } else {
                enemy.animations.play('walkLeft');
            }
        }, this);
    }
}