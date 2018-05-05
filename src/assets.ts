/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class ImagesBg1 {
        static getName(): string { return 'bg1'; }

        static getPNG(): string { return require('assets/images/bg1.png'); }
    }
    export class ImagesBg2 {
        static getName(): string { return 'bg2'; }

        static getPNG(): string { return require('assets/images/bg2.png'); }
    }
    export class ImagesLogo {
        static getName(): string { return 'logo'; }

        static getPNG(): string { return require('assets/images/logo.png'); }
    }
    export class ImagesMapIcon {
        static getName(): string { return 'map_icon'; }

        static getPNG(): string { return require('assets/images/map_icon.png'); }
    }
    export class ImagesMenuBg {
        static getName(): string { return 'menu_bg'; }

        static getPNG(): string { return require('assets/images/menu_bg.png'); }
    }
    export class ImagesPEGI3 {
        static getName(): string { return 'PEGI3'; }

        static getJPG(): string { return require('assets/images/PEGI3.jpg'); }
    }
    export class ImagesTiles {
        static getName(): string { return 'tiles'; }

        static getPNG(): string { return require('assets/images/tiles.png'); }
    }
}

export namespace Spritesheets {
    export class SpritesheetsCoin3232 {
        static getName(): string { return 'coin.[32,32]'; }

        static getPNG(): string { return require('assets/spritesheets/coin.[32,32].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return -1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsEnemy3232 {
        static getName(): string { return 'enemy.[32,32]'; }

        static getPNG(): string { return require('assets/spritesheets/enemy.[32,32].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return -1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsPlayer13232 {
        static getName(): string { return 'player1.[32,32]'; }

        static getPNG(): string { return require('assets/spritesheets/player1.[32,32].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return -1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
    export class SpritesheetsPlayer23232 {
        static getName(): string { return 'player2.[32,32]'; }

        static getPNG(): string { return require('assets/spritesheets/player2.[32,32].png'); }
        static getFrameWidth(): number { return 32; }
        static getFrameHeight(): number { return 32; }
        static getFrameMax(): number { return -1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
}

export namespace Atlases {
    export class AtlasesPixelUi {
        static getName(): string { return 'pixel_ui'; }

        static getJSONArray(): string { return require('assets/atlases/pixel_ui.json'); }

        static getPNG(): string { return require('assets/atlases/pixel_ui.png'); }
    }
    export namespace AtlasesPixelUi {
        export enum Frames {
            Button = 'button',
            ButtonPressed = 'button_pressed',
            Checkbox = 'checkbox',
            CheckboxChecked = 'checkbox_checked',
            Close = 'close',
            Menu = 'menu',
            Panel = 'panel',
            Radio = 'radio',
            RadioChecked = 'radio_checked',
            Slider = 'slider',
            SliderEnd = 'slider_end',
            SliderHorizontal = 'slider_horizontal',
        }
    }
    export class AtlasesPreloadSpritesArray {
        static getName(): string { return 'preload_sprites_array'; }

        static getJSONArray(): string { return require('assets/atlases/preload_sprites_array.json'); }

        static getPNG(): string { return require('assets/atlases/preload_sprites_array.png'); }
    }
    export namespace AtlasesPreloadSpritesArray {
        export enum Frames {
            PreloadBar = 'preload_bar.png',
            PreloadFrame = 'preload_frame.png',
        }
    }
    export class AtlasesPreloadSpritesHash {
        static getName(): string { return 'preload_sprites_hash'; }

        static getJSONArray(): string { return require('assets/atlases/preload_sprites_hash.json'); }

        static getPNG(): string { return require('assets/atlases/preload_sprites_hash.png'); }
    }
    export namespace AtlasesPreloadSpritesHash {
        export enum Frames {
            PreloadBar = 'preload_bar.png',
            PreloadFrame = 'preload_frame.png',
        }
    }
    export class AtlasesPreloadSpritesXml {
        static getName(): string { return 'preload_sprites_xml'; }

        static getPNG(): string { return require('assets/atlases/preload_sprites_xml.png'); }

        static getXML(): string { return require('assets/atlases/preload_sprites_xml.xml'); }
    }
    export namespace AtlasesPreloadSpritesXml {
        export enum Frames {
            PreloadBar = 'preload_bar.png',
            PreloadFrame = 'preload_frame.png',
        }
    }
}

export namespace Audio {
    export class AudioMusic1 {
        static getName(): string { return 'music1'; }

        static getMP3(): string { return require('assets/audio/music1.mp3'); }
    }
    export class AudioMusic2 {
        static getName(): string { return 'music2'; }

        static getMP3(): string { return require('assets/audio/music2.mp3'); }
    }
    export class AudioMusic3 {
        static getName(): string { return 'music3'; }

        static getMP3(): string { return require('assets/audio/music3.mp3'); }
    }
    export class AudioMusic4 {
        static getName(): string { return 'music4'; }

        static getMP3(): string { return require('assets/audio/music4.mp3'); }
    }
}

export namespace Audiosprites {
    export class AudiospritesSfx {
        static getName(): string { return 'sfx'; }

        static getAC3(): string { return require('assets/audiosprites/sfx.ac3'); }
        static getJSON(): string { return require('assets/audiosprites/sfx.json'); }
        static getM4A(): string { return require('assets/audiosprites/sfx.m4a'); }
        static getMP3(): string { return require('assets/audiosprites/sfx.mp3'); }
        static getOGG(): string { return require('assets/audiosprites/sfx.ogg'); }
    }
    export namespace AudiospritesSfx {
        export enum Sprites {
            Bump = 'bump',
            Coin = 'coin',
            Die = 'die',
            Jump = 'jump',
            Kick = 'kick',
            Pause = 'pause',
            StageClear = 'stage_clear',
        }
    }
}

export namespace GoogleWebFonts {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace CustomWebFonts {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace BitmapFonts {
    export class FontsPixelUiFont {
        static getName(): string { return 'pixel_ui_font'; }

        static getPNG(): string { return require('assets/fonts/pixel_ui_font.png'); }
        static getXML(): string { return require('assets/fonts/pixel_ui_font.xml'); }
    }
}

export namespace JSON {
    export class JSONLevel1 {
        static getName(): string { return 'level1'; }

        static getJSON(): string { return require('assets/JSON/level1.json'); }
    }
    export class JSONLevel10 {
        static getName(): string { return 'level10'; }

        static getJSON(): string { return require('assets/JSON/level10.json'); }
    }
    export class JSONLevel11 {
        static getName(): string { return 'level11'; }

        static getJSON(): string { return require('assets/JSON/level11.json'); }
    }
    export class JSONLevel12 {
        static getName(): string { return 'level12'; }

        static getJSON(): string { return require('assets/JSON/level12.json'); }
    }
    export class JSONLevel13 {
        static getName(): string { return 'level13'; }

        static getJSON(): string { return require('assets/JSON/level13.json'); }
    }
    export class JSONLevel14 {
        static getName(): string { return 'level14'; }

        static getJSON(): string { return require('assets/JSON/level14.json'); }
    }
    export class JSONLevel15 {
        static getName(): string { return 'level15'; }

        static getJSON(): string { return require('assets/JSON/level15.json'); }
    }
    export class JSONLevel16 {
        static getName(): string { return 'level16'; }

        static getJSON(): string { return require('assets/JSON/level16.json'); }
    }
    export class JSONLevel17 {
        static getName(): string { return 'level17'; }

        static getJSON(): string { return require('assets/JSON/level17.json'); }
    }
    export class JSONLevel18 {
        static getName(): string { return 'level18'; }

        static getJSON(): string { return require('assets/JSON/level18.json'); }
    }
    export class JSONLevel19 {
        static getName(): string { return 'level19'; }

        static getJSON(): string { return require('assets/JSON/level19.json'); }
    }
    export class JSONLevel2 {
        static getName(): string { return 'level2'; }

        static getJSON(): string { return require('assets/JSON/level2.json'); }
    }
    export class JSONLevel20 {
        static getName(): string { return 'level20'; }

        static getJSON(): string { return require('assets/JSON/level20.json'); }
    }
    export class JSONLevel21 {
        static getName(): string { return 'level21'; }

        static getJSON(): string { return require('assets/JSON/level21.json'); }
    }
    export class JSONLevel22 {
        static getName(): string { return 'level22'; }

        static getJSON(): string { return require('assets/JSON/level22.json'); }
    }
    export class JSONLevel23 {
        static getName(): string { return 'level23'; }

        static getJSON(): string { return require('assets/JSON/level23.json'); }
    }
    export class JSONLevel24 {
        static getName(): string { return 'level24'; }

        static getJSON(): string { return require('assets/JSON/level24.json'); }
    }
    export class JSONLevel25 {
        static getName(): string { return 'level25'; }

        static getJSON(): string { return require('assets/JSON/level25.json'); }
    }
    export class JSONLevel26 {
        static getName(): string { return 'level26'; }

        static getJSON(): string { return require('assets/JSON/level26.json'); }
    }
    export class JSONLevel27 {
        static getName(): string { return 'level27'; }

        static getJSON(): string { return require('assets/JSON/level27.json'); }
    }
    export class JSONLevel28 {
        static getName(): string { return 'level28'; }

        static getJSON(): string { return require('assets/JSON/level28.json'); }
    }
    export class JSONLevel29 {
        static getName(): string { return 'level29'; }

        static getJSON(): string { return require('assets/JSON/level29.json'); }
    }
    export class JSONLevel3 {
        static getName(): string { return 'level3'; }

        static getJSON(): string { return require('assets/JSON/level3.json'); }
    }
    export class JSONLevel30 {
        static getName(): string { return 'level30'; }

        static getJSON(): string { return require('assets/JSON/level30.json'); }
    }
    export class JSONLevel4 {
        static getName(): string { return 'level4'; }

        static getJSON(): string { return require('assets/JSON/level4.json'); }
    }
    export class JSONLevel5 {
        static getName(): string { return 'level5'; }

        static getJSON(): string { return require('assets/JSON/level5.json'); }
    }
    export class JSONLevel6 {
        static getName(): string { return 'level6'; }

        static getJSON(): string { return require('assets/JSON/level6.json'); }
    }
    export class JSONLevel7 {
        static getName(): string { return 'level7'; }

        static getJSON(): string { return require('assets/JSON/level7.json'); }
    }
    export class JSONLevel8 {
        static getName(): string { return 'level8'; }

        static getJSON(): string { return require('assets/JSON/level8.json'); }
    }
    export class JSONLevel9 {
        static getName(): string { return 'level9'; }

        static getJSON(): string { return require('assets/JSON/level9.json'); }
    }
}

export namespace XML {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Text {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}

export namespace Scripts {
    export class ScriptsBlurX {
        static getName(): string { return 'BlurX'; }

        static getJS(): string { return require('assets/scripts/BlurX.js'); }
    }
    export class ScriptsBlurY {
        static getName(): string { return 'BlurY'; }

        static getJS(): string { return require('assets/scripts/BlurY.js'); }
    }
}
export namespace Shaders {
    export class ShadersPixelate {
        static getName(): string { return 'pixelate'; }

        static getFRAG(): string { return require('assets/shaders/pixelate.frag'); }
    }
}
export namespace Misc {
    class IExistSoTypeScriptWillNotComplainAboutAnEmptyNamespace {}
}
