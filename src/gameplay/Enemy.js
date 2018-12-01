let Enemy = function (x, y) {
    Phaser.Sprite.call(this, game, x, y, "EnemySprite", 1);

    this.acc = {
        a: 400,
        b: 800
    };

    this.bulletVel = 250;

    this.playerLastSeen = null;
    this.lookForPlayerRadius = 250;
    this.lookForPlayerShoot = null;

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10, "EnemyBullet")
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.bulletQueue = [];
    
    this.anim = this.animations.add('idle');
    this.anim.play(10, true);

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setCircle(20, 10, 10);
    
    game.add.existing(this);

    game.time.events.add(Phaser.Timer.SECOND * 1, this.shoot, this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    for (let i in this.bulletQueue) {
        game.physics.arcade.moveToXY(this.bulletQueue[i], this.lookForPlayerShoot.x, this.lookForPlayerShoot.y, this.bulletVel);
    }
}

Enemy.prototype.lookForPlayer = function(coords) {
    let d = Phaser.Math.distance(coords.x, coords.y, this.x, this.y);
    if (d < this.lookForPlayerRadius) {
        this.playerLastSeen = {x: coords.x, y: coords.y};
        game.physics.arcade.moveToXY(this, coords.x, coords.y, this.acc.a, this.acc.b, this.acc.b);  
    } else {
        if (this.playerLastSeen != null) {
            game.physics.arcade.moveToXY(this, this.playerLastSeen.x, this.playerLastSeen.y, this.acc.a, this.acc.b, this.acc.b);
        }
    } 
}

Enemy.prototype.shoot = function() {
    let bullet = this.bullets.getFirstDead();
    bullet.reset(this.x, this.y);
    
    game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(3, 5), function() {
        let tween = game.add.tween(bullet).to( { alpha: 0 }, 300, "Linear", true);
        bullet.enableBody = false;
        tween.onComplete.add(function() {
            bullet.alpha = 1;
            bullet.enableBody = true;
            bullet.kill();
        }, this)
    }, this);

    this.bulletQueue.push(bullet);
    game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(4, 8), this.shoot, this);
}