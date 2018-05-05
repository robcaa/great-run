import GameDispatcher from '../GameDispatcher';
import GameObject from '../abstract/GameObject';
import * as Assets from '../assets';

/**
 * @class Player
 *
 * Player handler class
 */
export default class Player extends GameObject {
        public sprite: Phaser.Sprite = null;

        public alive: boolean = true;
        public jumpActive: boolean = false;
        public canJump: boolean = true;
        public bump: boolean = false;
        public goesRight: boolean = true;
        public jumptimer: number = 0;
        public jumpState: number = 0;
        public killTimer: Phaser.TimerEvent;

        private skin1Sprite: Phaser.Sprite = null;
        private skin2Sprite: Phaser.Sprite = null;


        /**
         * Create player and initialize
         *
         * @param gameDispatcher The GameDispatcher object
         */
        constructor(gameDispatcher: GameDispatcher) {
            super(gameDispatcher);

            this.sprite = this.phaserGame.add.sprite(0, 0, Assets.Spritesheets.SpritesheetsPlayer13232.getName(), null, this.gameDispatcher.gameVars.playerGroup);

            this.skin1Sprite = this.phaserGame.make.sprite(0, 0, Assets.Spritesheets.SpritesheetsPlayer13232.getName());
            this.skin2Sprite = this.phaserGame.make.sprite(0, 0, Assets.Spritesheets.SpritesheetsPlayer23232.getName());

            this.phaserGame.camera.follow(this.sprite);

            this.phaserGame.physics.arcade.enable(this.sprite);
            this.sprite.body.gravity.y = 740;
            this.sprite.animations.add('walkRight', [1, 2, 3], 8, true);
            this.sprite.animations.add('walkLeft', [8, 9, 10], 8, true);
            this.goesRight = true;
            this.sprite.body.enable = true;

            this.reset();
        }

        /**
         * Player  update method
         *
         * Handle collisions, jump, fall off and reaching end of the level
         */
        public update(): void {
            // collision with the solid map elements
            this.phaserGame.physics.arcade.collide(this.sprite, this.gameDispatcher.gameVars.solidLayer, this.collide, null, this);

            if (this.alive) {
                // coliision with enemies
                this.phaserGame.physics.arcade.overlap(this.sprite, this.gameDispatcher.gameVars.enemiesGroup, this.enemyOverlap, null, this);
                // coliision with coins
                this.phaserGame.physics.arcade.overlap(this.sprite, this.gameDispatcher.gameVars.coinsGroup, this.coinOverlap, null, this);
            }


            if (this.alive) {

                if (!this.gameDispatcher.gameVars.firstPause) {
                    // walk right
                    this.sprite.body.velocity.x = 180.0;
                    this.sprite.animations.play('walkRight');


                    // fall off?
                    if (this.sprite.body.position.y > this.phaserGame.world.height) {
                        this.kill();
                        this.gameDispatcher.soundService.play('die');
                        this.killTimer = this.phaserGame.time.events.add(Phaser.Timer.SECOND * 4, () => {
                            this.reset();
                        }, this);
                    }

                    // handle pointer down and jump states
                    if (this.isPointerLeftDown() && this.sprite.body.onFloor() && this.jumpState === 3) {
                        this.jumpState = 0; // on floor
                    }
                    if (this.isPointerLeftDown() && !this.sprite.body.onFloor() && this.jumpState === 3) {
                        this.jumpState = 2; // on air
                        this.jumptimer = 16;
                    }
                    if (!this.isPointerLeftDown() && !this.sprite.body.onFloor() && this.jumpState === 2) {
                        this.jumpState = 3; // on air button released
                    }
                    if (!this.isPointerLeftDown() && this.sprite.body.onFloor() && this.jumpState === 2) {
                        this.jumpState = 0; // on floor
                    }
                    if (this.isPointerLeftDown() && !this.sprite.body.onFloor() && this.jumpState === 1) {
                        this.jumpState = 2; // on air
                    }
                    if (this.isPointerLeftDown() && this.sprite.body.onFloor() && this.jumpState === 0) {
                        this.jumpState = 1; // begin jump
                    }

                    if (this.jumpState === 1) {
                        this.jumptimer = 0;
                        this.sprite.body.velocity.y = -200;
                        this.sprite.animations.stop();
                        this.gameDispatcher.soundService.play('jump');
                        this.bump = false;
                    } else if (this.jumpState === 2) {
                        if (this.jumptimer <= 15) {
                            this.jumptimer++;
                            this.sprite.body.velocity.y = -300;
                        }
                    }
                    if (!this.isPointerLeftDown() &&  this.jumpState === 5) {
                        this.jumpState = 0; // begin jump
                    }
                    if ((this.jumpState === 2 || this.jumpState === 3) && !this.sprite.body.onFloor()) {
                        this.sprite.frame = 5;
                    }
                } else {
                    // dsiable first pause
                    if (this.isPointerLeftDown()) {
                        this.jumpState = 5;
                        this.gameDispatcher.gameVars.firstPause = false;
                    }
                }


                // check if reach the end of the map
                let tile = this.gameDispatcher.gameVars.map.getTile(Math.round(this.sprite.body.position.x / 32), Math.round(this.sprite.body.position.y / 32), 0, true);
                if (tile != null && tile.index >= 50 && tile.index <= 51) {
                    this.phaserGame.sound.stopAll();
                    this.hide();
                    this.gameDispatcher.enemies.stopAll();
                    this.gameDispatcher.soundService.play('stage_clear');
                    this.gameDispatcher.gameVars.pause = true;
                    this.phaserGame.time.events.resume();
                    this.phaserGame.time.events.add(Phaser.Timer.SECOND * 6, () => {
                        this.gameDispatcher.gameVars.collectedCoin += this.gameDispatcher.gameVars.levelCoin;
                        this.gameDispatcher.gameVars.levelCoin = 0;
                        this.gameDispatcher.nextLevel();
                        this.reset();
                    });
                }

            }
        }


        /**
         * Space, left click, or touch
         */
        private isPointerLeftDown() {
            return (
                (this.gameDispatcher.gameVars.spaceKey.isDown) ||
                ((this.phaserGame.input.activePointer.x < this.phaserGame.width - 40 || this.phaserGame.input.activePointer.y > 40) && this.phaserGame.input.activePointer.isDown) ||
                ((this.phaserGame.input.pointer1.x < this.phaserGame.width - 40 || this.phaserGame.input.pointer1.y > 40) && this.phaserGame.input.pointer1.isDown)
            );
        }


        /**
         * Hide the player
         */
        public hide(): void {
            this.sprite.body.enable = false;
            this.sprite.animations.stop();
            this.sprite.visible = false;
        }


        /**
         * Kill the player
         */
        public kill(): Phaser.Sprite {
            this.alive = false;
            this.gameDispatcher.soundService.stopAll();
            this.gameDispatcher.removePendingEvents();
            this.sprite.frame = 6;
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.stop();
            this.gameDispatcher.gameVars.levelCoin = 0;
            this.gameDispatcher.gameVars.uiGroup.bringToTop(this.gameDispatcher.gameVars.tileBackgroundLayer);
            this.jumpState = 0;
            return this.sprite;
        }


        /**
         * Reset the player and the map
         */
        public reset(): void {
            this.jumpState = 0;
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.reset(32, 0);
            this.sprite.frame = 0;
            this.bump = false;
            this.alive = true;
            this.jumpActive = false;
            this.canJump = true;
            this.jumptimer = 0;
            this.sprite.body.enable = true;
            this.gameDispatcher.gameVars.levelCoin = 0;
            this.gameDispatcher.initMap();
        }


        /**
         * Handle collision with solid map elements
         */
        public collide(playerSprite: Phaser.Sprite, tile: Phaser.Tile) {
            if (playerSprite.body.blocked.up && !this.bump) {
                this.gameDispatcher.soundService.play('bump');
                this.bump = true;
            }
        }


        /**
         * Handle collision with enemies
         */
        private enemyOverlap(playerSprite: Phaser.Sprite, enemy: Phaser.Sprite) {
            if (playerSprite.body.touching.down) {
                enemy.animations.stop();
                enemy.frame = 3;
                enemy.body.enable = false;
                playerSprite.body.velocity.y = -80;
                this.gameDispatcher.soundService.play('kick');
                this.phaserGame.time.events.add(Phaser.Timer.SECOND, function() {
                    enemy.destroy();
                });
            } else {
                this.kill();
                this.gameDispatcher.soundService.play('die');
                this.killTimer = this.phaserGame.time.events.add(Phaser.Timer.SECOND * 4, () => {
                    this.reset();
                }, this);
            }
        }


        /**
         * Handle collision with coins
         */
        private coinOverlap(playerSprite: Phaser.Sprite, coin) {
            if (coin.disabled !== true) {
                coin.disabled = true;
                this.gameDispatcher.gameVars.levelCoin++;
                this.gameDispatcher.gameVars.coinText.setText(` ${(this.gameDispatcher.gameVars.collectedCoin + this.gameDispatcher.gameVars.levelCoin)} `);
                this.phaserGame.add.tween(coin).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
                this.phaserGame.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                    coin.kill();
                });
                coin.body.velocity.y = -120;
                this.gameDispatcher.soundService.play('coin');
            }
        }

        /**
         * Change player sprite
         *
         * @param value 1: Doora 2: Boots
         */
        public changeTexture(value: number = 1) {
            let animIndex = this.sprite.frame;
            if (value === 1) {
                this.sprite.loadTexture(this.skin1Sprite.texture);
            } else {
                this.sprite.loadTexture(this.skin2Sprite.texture);
            }
            this.sprite.frame = animIndex;
        }

        /**
         * Stop player animations
         */
        public stopAnimation() {
            this.sprite.animations.stop();
        }
    }