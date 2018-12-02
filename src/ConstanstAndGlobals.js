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
        {type: "spritesheet", key: "PlayerSprite", path: `${AssetsDir}/playerSprite.png`, w: 64, h: 64, f: 9},
        {type: "spritesheet", key: "EnemySprite0", path: `${AssetsDir}/enemySprite0.png`, w: 64, h: 64, f: 10},
        {type: "spritesheet", key: "EnemySprite1", path: `${AssetsDir}/enemySprite1.png`, w: 64, h: 64, f: 10},
        {type: "image", key: "Soul", path: `${AssetsDir}/soul.png`},
        {type: "image", key: "PlayerTail", path: `${AssetsDir}/tail.png`},
        {type: "image", key: "PlayerBullet", path: `${AssetsDir}/bullet.png`},
        {type: "image", key: "EnemyBullet0", path: `${AssetsDir}/enemyBullet0.png`},
        {type: "image", key: "EnemyBullet1", path: `${AssetsDir}/enemyBullet1.png`}
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

const EnemySpecs = [
    {
        acc: {a: 400, b: 800},
        bulletVel: 220,
        lookForPlayerRadius: 250,
        bulletTimeRnd: {min: 4, max: 8},
        damage: 2,
        hp: 100,
        soulValue: 10,
    },

    {
        acc: {a: 400, b: 800},
        bulletVel: 250,
        lookForPlayerRadius: 250,
        bulletTimeRnd: {min: 4, max: 8},
        damage: 2,
        hp: 100,
        soulValue: 10,
    }
]

let Game = {
    souls: 0,
    currentArena: 0,
    escape: true
}