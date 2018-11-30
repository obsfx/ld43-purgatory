module Main {
    export class Preload extends Phaser.State {
        preloadCover: Phaser.Sprite;
        bg: Phaser.Sprite;

        preload() {
            for (let i in Constants.AssetsPath.Preloads) {
                this.load.image(Constants.AssetsPath.Preloads[i].key, Constants.AssetsPath.Preloads[i].path);
            }


        }

        create() {
            this.game.stage.backgroundColor = "#090d0c";
            
        }
    }
}