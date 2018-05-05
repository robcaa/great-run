
/**
 * @class GameVars
 *
 * Global game variables
 */
export default class GameVars {

    /** Current level tilemap */
    public map: Phaser.Tilemap                      = null;
    /** Background layer */
    public tileBackgroundLayer: Phaser.TilemapLayer = null;
    /** Solid tile map elements layer */
    public solidLayer: Phaser.TilemapLayer          = null;



    /** Current level */
    public level: number          = 1;
    /** Global collected coins counter */
    public collectedCoin: number  = 0;
    /** Local collected coins counter for the current level. Every new map or player die reset this value. When the map is completed this value added to this.collectedCoin */
    public levelCoin: number      = 0;
    /** If true the game is paused by user. Opened menu. */
    public pause: boolean         = false;
    /** True when a map started. Space or left click unlock this state. */
    public firstPause: boolean    = true;
    /** Space key binding */
    public spaceKey: Phaser.Key;



    /** Group of the map elements */
    public mapGroup: Phaser.Group     = null;
    /** Group of the coins */
    public coinsGroup: Phaser.Group   = null;
    /** Group of the enemies */
    public enemiesGroup: Phaser.Group = null;
    /** Group of the player */
    public playerGroup: Phaser.Group  = null;
    /** Group of the UI */
    public uiGroup: Phaser.Group      = null;



    /** HUD coin sprite */
    public coinUISprite: Phaser.Sprite = null;
    /** HUD map sprite */
    public mapUISprite: Phaser.Sprite  = null;
    /** HUD collected coins displayer text object  */
    public coinText: Phaser.Text       = null;
    /** HUD current level displayer text object */
    public lvlText: Phaser.Text        = null;



    /** Object that contain all game options. Loaded from storage. */
    public options: any;
}