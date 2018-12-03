let MainState = {
    
    create: function() {
        this.stageWH = 1500;
        this.wave = 1;
        this.wavemulp = 1;
        this.waveinc = 50;
        this.mainFR = 500;
        this.enemies = [];
        this.souls = [];

        game.world.setBounds(0, 0, this.stageWH, this.stageWH);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        Game.main_music.stop();
        Game.arena_music.restart("", 0.1, 0.1, true);

        this.UI = new UI(this.stageWH, 150);

        this.UI.createStateBackground();

        this.stageCircle = game.add.graphics(0, 0);
        this.stageCircle.beginFill(this.UI.rndColors.c, 0.8);
        this.stageCircle.lineStyle(3, this.UI.rndColors.l, 0.8);
        this.stageCircle.drawCircle(this.stageWH / 2, this.stageWH / 2, 400);
        this.stageCircle.endFill();
        this.stageCircle.alpha = 0.2;

        this._player = new Player(); 
        this._player.damage = Game.D * 11;

        this.UI.bgFadeIn(function() {
            this.createEnemies(this.mainFR - this.wavemulp * this.waveinc);

            this.stageSoulsText = this.UI.createStageText(`S O U L S : ${Game.souls}`, 80, 30);
            this.stageWaveText = this.UI.createStageText(`W A V E : ${this.wave}`, 250, 30);
            this.stageArenaEscapeText = this.UI.createStageText(`P R E S S  [ R ]  T O`, this.stageWH / 2, this.stageWH / 2 - 20);
            this.stageArenaEscapeText2 = this.UI.createStageText(`E S C A P E  F R O M  A R E N A`, this.stageWH / 2, this.stageWH / 2);
            this.stageArenaEscapeText.fixedToCamera = false;
            this.stageArenaEscapeText.alpha = 0.5;
            this.stageArenaEscapeText2.fixedToCamera = false;
            this.stageArenaEscapeText2.alpha = 0.5;
        }.bind(this));
    },

    update: function() {
        game.physics.arcade.overlap(this._player.bullets, this.enemies, this.playerBullet_EnemyOverlapHandler, null, this);
        game.physics.arcade.overlap(this._player, this.souls, this.soul_PlayerOverlapHandler, null, this);

        game.physics.arcade.collide(this._player, this.enemies, this.player_EnemyOverlapHandler, null, this);
        game.physics.arcade.collide(this.enemies, this.enemies, null, null, this);

        for (let i in this.enemies) {
            //game.debug.body(this.enemies[i]);
            this.enemies[i].lookForPlayer({x: this._player.x + 25, y: this._player.y + 25});
            this.enemies[i].lookForPlayerShoot = {x: this._player.x + 25, y: this._player.y + 25};
            this.enemies[i].bulletUpdate({x: this._player.x + 25, y: this._player.y + 25});
            game.physics.arcade.overlap(this._player, this.enemies[i].bullets, this.player_EnemyBulletOverlapHandler, null, this);
        }

        for (let i in this.souls) {
            //game.debug.body(this.souls[i]);
            this.souls[i].moveToPlayer({x: this._player.x + 25, y: this._player.y + 25});
        }

        this._player.checkForCircle({x: this.stageWH / 2, y: this.stageWH / 2}, this.stageCircle, this.UI);

    },

    render: function() {
        
        //game.debug.body(this._player.sprite);

    },

    createEnemies: function(fr) {

        this._fr = fr;
        this.enemyAmount = Math.floor(this.stageWH / fr);
        let rndRange = 100;

        for (let i = 0; i < this.enemyAmount; i++) {
            for (let j = 0; j < this.enemyAmount; j++) {
                let r = {x: j * fr + (Math.floor(Math.random() * rndRange)) + rndRange / 2, y: i * fr + (Math.floor(Math.random() * rndRange) + rndRange / 2) }
                if (r.x < 0) r.x *= -1;
                if (r.y < 0) r.y *= -1;

                this.enemies.push(new Enemy(r.x, r.y, Game.currentArena));
                this.enemies[this.enemies.length - 1].lookForPlayerShoot = {x: this._player.x, y: this._player.y};
                this.enemies[this.enemies.length - 1].__revive();
            }
        }
    },

    playerBullet_EnemyOverlapHandler: function(enemy, bullet) {
        bullet.kill();
        enemy.hp -= this._player.damage;
        Game.enemytake.restart("", 0, 0.2, false);
        if (enemy.hp <= 0) {
            let __soul = new Soul(enemy.x, enemy.y, enemy.soulValue);
            __soul.__revive();
            this.souls.push(__soul);
            Game.enemydestroy.restart("", 0, 0.2, false);
            enemy.__kill();

            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            //console.log(this.enemies);

            if (this.enemies.length < Math.floor(this.enemyAmount * this.enemyAmount / 2)) {
                if (this.mainFR - this.wavemulp * (this.waveinc + 1) > 0) this.waveinc += 1;
                this.wave += 1;
                this.updateWaveLabel();
                this.createEnemies(this.mainFR - this.wavemulp * this.waveinc);
            }
        }
    },

    soul_PlayerOverlapHandler: function(player, soul) {
        Game.souls += soul.value;
        this.updateSoulLabel();
        //console.log(Game.souls);
        soul.__collected();
        Game.collect.restart("", 0, 0.2, false);
    },

    player_EnemyOverlapHandler: function(player, enemy) {
        Game.souls -= enemy.damage;
        Game.takedmg.restart("", 0, 0.2, false);
        game.camera.flash(0xf21818, 80, 10, 0.4);
        if (Game.souls <= 0) {this.UI.bgFadeOut(function() { game.state.start("GameOver") });}
        this.updateSoulLabel();
    },

    player_EnemyBulletOverlapHandler: function(player, bullet) {
        bullet.kill();
        Game.souls -= bullet.damage;
        Game.takedmg.restart("", 0, 0.2, false);
        game.camera.flash(0xf21818, 80, 10, 0.4);
        if (Game.souls <= 0) {this.UI.bgFadeOut(function() { game.state.start("GameOver") });}
        this.updateSoulLabel();
    },

    updateSoulLabel: function() {
        this.stageSoulsText.text = `S O U L S : ${Game.souls}`;
    },

    updateWaveLabel: function() {
        this.stageWaveText.text = `W A V E : ${this.wave}`;
    }
}