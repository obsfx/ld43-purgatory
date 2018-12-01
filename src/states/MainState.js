let MainState = {
    
    create: function() {
        console.log("game MainState");
        this.stageWH = 1500;
        this.enemies = [];

        Helper.createStateBackground(game, this.stageWH, 150);

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
            this.enemies[i].lookForPlayer({x: this._player.x + 25, y: this._player.y + 25});
            this.enemies[i].lookForPlayerShoot = {x: this._player.x + 25, y: this._player.y + 25};
            game.physics.arcade.overlap(this._player, this.enemies[i].bullets, this.player_EnemyBulletOverlapHandler, null, this);
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

    player_EnemyBulletOverlapHandler: function(player, bullet) {
        bullet.kill();
        console.log("tick");
    }
}