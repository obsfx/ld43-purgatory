let MainState = {
    
    create: function() {
        console.log("game MainState");
        this.stageWH = 1500;
        this.enemies = [];

        this.createStateBackground();

        game.world.setBounds(0, 0, this.stageWH, this.stageWH);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this._player = new Player();   
        this.createEnemies(); 
    },

    update: function() {
        this._player.update();
        
        game.physics.arcade.overlap(this._player.bullets, this.enemies, this.playerBullet_EnemyOverlapHandler, null, this);
        game.physics.arcade.collide(this._player, this.enemies, this.player_EnemyOverlapHandler, null, this);
        game.physics.arcade.collide(this.enemies, this.enemies, null, null, this);

        for (let i in this.enemies) {
            this.enemies[i].lookForPlayer({x: this._player.x, y: this._player.y});
            this.enemies[i].lookForPlayerShoot = {x: this._player.x, y: this._player.y};
        }

    },

    render: function() {
        
        //game.debug.body(this._player.sprite);

    },

    createEnemies: function() {

        let fr = 500;
        let enemyAmount = Math.floor(this.stageWH / fr);
        let rndRange = 300;

        for (let i = 0; i < enemyAmount; i++) {
            for (let j = 0; j < enemyAmount; j++) {
                let r = {x: j * fr - (Math.floor(Math.random() * rndRange)) - rndRange / 2, y: i * fr + (Math.floor(Math.random() * rndRange) - rndRange / 2) }
                if (r.x < 0) r.x *= -1;
                if (r.y < 0) r.y *= -1;

                this.enemies.push(new Enemy(r.x, r.y));
                this.enemies[this.enemies.length - 1].lookForPlayerShoot = {x: this._player.x, y: this._player.y};
            }
        }
    },

    playerBullet_EnemyOverlapHandler: function(enemy, bullet) {
        bullet.kill();
    },

    player_EnemyOverlapHandler: function(player, enemy) {
        console.log("dane");
    },

    createStateBackground: function() {
        let colors = [
            {l: 0x2f434c, c: 0xB2ABF2, bg: 0x1C3041},
            {l: 0xECE4B7, c: 0x95BF74, bg: 0x283F3B},
            {l: 0x2f434c, c: 0xD5F2E3, bg: 0x1C3041},
            {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
            {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
        ]

        let circleMargin = 150;
        let dotAmount = Math.floor(this.stageWH / circleMargin)
        let rndRange = 100;
        let rndColors = colors[game.rnd.between(0, colors.length - 1)];

        game.stage.backgroundColor = rndColors.bg;

        let graphics = game.add.graphics(circleMargin / 2, circleMargin / 2);
        let k = [];

        for (let i = 0; i < dotAmount; i++) {
            for (let j = 0; j < dotAmount; j++) {
                let r = {x: j * circleMargin - (Math.floor(Math.random() * rndRange)) - rndRange / 2, y: i * circleMargin + (Math.floor(Math.random() * rndRange * 2) - rndRange) }
                let a = {x: (j - 1) * circleMargin, y: i * circleMargin};
                let b = {x: (j + 1) * circleMargin, y: (i + 1) * circleMargin};
                let c = {x: (j - 1) * circleMargin, y: (i + 1) * circleMargin};

                graphics.lineStyle(3, rndColors.l, Math.random() * 0.2 + 0.05);
                
                graphics.moveTo(a.x, a.y);
                graphics.lineTo(b.x, b.y);
                graphics.lineStyle(0, rndColors.l, 1);
                graphics.endFill();

                k.push(r);
                k.push(a);
                k.push(b);
                k.push(c);
            }
        }

        for (let i in k) {
            graphics.beginFill(rndColors.c, Math.random() * 0.6 + 0.05);
            graphics.drawCircle(k[i].x, k[i].y, (Math.floor(Math.random() * 12)));
            graphics.endFill();
        }
    }
}