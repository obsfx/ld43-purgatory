let Preload = {
    preload : function() {

    },

    create: function() {
        console.log("game preload");
        game.state.start("MainMenu");
    }
}