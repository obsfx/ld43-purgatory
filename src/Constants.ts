module Main {
    export class Constants {
        
        public static ContainerName = "content";
        public static AssetsDir = "assets";

        public static CellSize = 30;
        public static TotalCOL = 20;
        public static TotalROW = 20;

        public static Screen = {
            Width: Constants.TotalCOL * Constants.CellSize,
            Height: Constants.TotalROW * Constants.CellSize
        }

        public static AssetsPath = {
            Preloads: [
            ]
        }

        public static config = {
            width: Constants.Screen.Width,
            height: Constants.Screen.Height,
            type: Phaser.AUTO,
            parent: Constants.ContainerName,
            input: {
                keyboard: true,
                mouse: true,
                touch: false,
                gamepad: false
            },
            pixelArt: true,
            antialias: false
        };

    }
}