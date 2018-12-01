const ContainerName = "content";
const AssetsDir = "assets";

const CellSize = 30;
const TotalCOL = 20;
const TotalROW = 20;

const Screen = {
    Width: TotalCOL * CellSize,
    Height: TotalROW * CellSize
}

const AssetsPath = {
    Preloads: [
        {type: "spritesheet", key: "PlayerSprite", path: `${AssetsDir}/units/playerSprite.png`, w: 64, h: 64, f: 9},
        {type: "spritesheet", key: "ObjectiveSprite", path: `${AssetsDir}/units/objectiveSprite.png`, w: 64, h: 64, f: 10},
        {type: "spritesheet", key: "EnemySprite", path: `${AssetsDir}/units/enemySprite.png`, w: 64, h: 64, f: 10},
        {type: "image", key: "PlayerTail", path: `${AssetsDir}/units/tail.png`},
        {type: "image", key: "PlayerBullet", path: `${AssetsDir}/units/bullet.png`},
        {type: "image", key: "EnemyBullet", path: `${AssetsDir}/units/enemyBullet.png`},
        {type: "image", key: "bg", path: `${AssetsDir}/temp.png`}
    ]
}

const config = {
    width: Screen.Width,
    height: Screen.Height,
    type: Phaser.AUTO,
    parent: ContainerName,
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    pixelArt: true,
    antialias: true
};