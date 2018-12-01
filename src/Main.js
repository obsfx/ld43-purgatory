/// <reference path="../defs/phaser.d.ts" />

var game = new Phaser.Game(config);
function run() {
    game.state.add("Boot", Boot);
    game.state.add("Preload", Preload);
    game.state.add("MainMenu", MainMenu);
    game.state.add("MainState", MainState);
    game.state.add("ArenaSelection", ArenaSelection);

    console.log("game init");

    game.state.start("Boot");
}