let Boot = {
    create: function() {
        console.log("game boot");
        game.state.start("Preload");
    }
}