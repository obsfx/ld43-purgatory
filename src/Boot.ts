module Main {
    export class Boot extends Phaser.State {
        preload() {

        }

        create() {
            document.getElementById(Constants.ContainerName).style.width = Constants.Screen.Width + "px";
            document.getElementById(Constants.ContainerName).style.height = Constants.Screen.Height + "px";

            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.game.renderer.renderSession.roundPixels = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

            this.state.start("Preload", true, false);
        }
    }
}