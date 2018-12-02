let Preload = {
    preload : function() {
        for (let i in AssetsPath.Preloads) {
            if (AssetsPath.Preloads[i].type == "spritesheet") {
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
        this.UI = new UI(Screen.Width, 100);
        this.UI.createStageText(`L O A D I N G`, Screen.Width / 2, Screen.Height / 2);

        this.UI.bgFadeOut(function(){game.state.start("MainMenu");})
    }
}