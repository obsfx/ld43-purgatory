let Preload = {
    preload : function() {
        for (let i in AssetsPath.Preloads) {
            if (AssetsPath.Preloads[i].type == "spritesheet") {
                console.log("SSSSSSSS")
                game.load.spritesheet(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path, 
                    AssetsPath.Preloads[i].w, 
                    AssetsPath.Preloads[i].h,
                    AssetsPath.Preloads[i].f
                );
            } else {
                game.load.image(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            }
        }
    },

    create: function() {
        console.log("game preload");
        //game.state.start("MainMenu");
        game.state.start("ArenaSelection");
    }
}