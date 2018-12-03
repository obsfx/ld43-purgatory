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
        {type: "spritesheet", key: "EnemySprite2", path: `${AssetsDir}/enemySprite2.png`, w: 64, h: 64, f: 10},
        {type: "image", key: "Soul", path: `${AssetsDir}/soul.png`},
        {type: "image", key: "PlayerTail", path: `${AssetsDir}/tail.png`},
        {type: "image", key: "PlayerBullet", path: `${AssetsDir}/bullet.png`},
        {type: "image", key: "EnemyBullet0", path: `${AssetsDir}/enemyBullet0.png`},
        {type: "image", key: "EnemyBullet1", path: `${AssetsDir}/enemyBullet1.png`},
        {type: "image", key: "EnemyBullet2", path: `${AssetsDir}/enemyBullet2.png`},
        {type: "audio", key: "arena", path: [`${AssetsDir}/arena_bg.mp3`, `${AssetsDir}/arena_bg.ogg`]},
        {type: "audio", key: "main", path: [`${AssetsDir}/main_bg.mp3`, `${AssetsDir}/main_bg.ogg`]},
        {type: "audio", key: "collect", path: `${AssetsDir}/collect.wav`},
        {type: "audio", key: "takedmg", path: `${AssetsDir}/takedmg.wav`},
        {type: "audio", key: "enemydestroy", path: `${AssetsDir}/enemydestroy.wav`},
        {type: "audio", key: "enemytake", path: `${AssetsDir}/enemytake.wav`},
        {type: "audio", key: "fire", path: `${AssetsDir}/fire.wav`}
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
        acc: {a: 500, b: 800},
        bulletVel: 280,
        lookForPlayerRadius: 300,
        bulletTimeRnd: {min: 4, max: 8},
        damage: 15,
        hp: 160,
        soulValue: 40,
    },

    {
        acc: {a: 530, b: 800},
        bulletVel: 300,
        lookForPlayerRadius: 350,
        bulletTimeRnd: {min: 3, max: 7},
        damage: 40,
        hp: 450,
        soulValue: 120,
    },

    {
        acc: {a: 560, b: 800},
        bulletVel: 320,
        lookForPlayerRadius: 400,
        bulletTimeRnd: {min: 2, max: 7},
        damage: 90,
        hp: 866,
        soulValue: 300,
    }
]

let Game = {
    souls: 350,
    baseSouls: 200,
    baseSacrifice: 100,
    sacrificedSouls: 0,
    uCount: 0,
    currentArena: 0,
    arenaStatus: [true, false, false, false],
    arenaReq: [0, 666, 4366, 6666],
    D: 1,
    main_music: null,
    arena_music: null,
}