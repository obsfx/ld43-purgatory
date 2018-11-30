module Main {
    export class Game extends Phaser.Game {
        constructor() {
            super(Constants.config);
            this.state.add("Boot", Boot, false);
            this.state.add("Preload", Preload, false);
            this.state.add("MainMenu", MainMenu, false);
            this.state.add("MainState", MainState, false);

            this.state.start("Boot");
        }
    }
}