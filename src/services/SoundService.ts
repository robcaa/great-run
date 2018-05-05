import GameDispatcher from '../GameDispatcher';
import GameObject from '../abstract/GameObject';
import * as Assets from '../assets';

/**
 * @class SoundService
 *
 * Handle the game music and sounds
 */
export default class SoundService extends GameObject {

    private readonly BACKGROUND_MUSIC_COUNT: number = 4;

    private sfx: Phaser.AudioSprite = null;
    private backgroundMusic: Phaser.Sound[] = [];
    public backgroundMusicEnabled: boolean = true;


    /**
     * Init the sound service, add all music to the backgroundMusic array
     *
     * @param gameDispatcher The GameDispatcher object
     */
    constructor(gameDispatcher: GameDispatcher) {
        super(gameDispatcher);
        this.sfx = this.phaserGame.add.audioSprite(Assets.Audiosprites.AudiospritesSfx.getName());
        for (let i = 1; i <= this.BACKGROUND_MUSIC_COUNT; i++) {
            this.backgroundMusic.push(this.phaserGame.add.audio(`music${i}`));
        }
    }

    /**
     * Play a random background music
     */
    public playRandomMusic() {
        if (!this.backgroundMusicEnabled) {
            return;
        }
        this.stopMusic();
        this.backgroundMusic[(Math.random() * this.backgroundMusic.length) | 0].play();
    }

    /**
     * Stop the music
     */
    public stopMusic() {
        for (let i = 0; i < this.backgroundMusic.length; i++) {
            this.backgroundMusic[i].stop();
        }
    }


    /**
     * Stop all sound
     */
    public stopAll() {
        this.phaserGame.sound.stopAll();
    }


    /**
     * Stop all sound and music, then play a random music if the music is enabled in the options menu
     */
    public stopAllThenPlayRandomMusic() {
        this.stopAll();
        if (this.gameDispatcher.gameVars.options.musicEnabled) {
            this.playRandomMusic();
        }
    }


    /**
     * Play the specified sound
     *
     * @param name Sound name
     */
    public play(name: string) {
        this.sfx.play(name);
    }
}