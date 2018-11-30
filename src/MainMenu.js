let MainMenu = {
    preload : function() {

    },

    create: function() {
        console.log("game MainMenu");
        game.state.start("MainState");
    }
}