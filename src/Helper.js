let Helper = {
    
    getColors: function() {
        return [
            {l: 0x2f434c, c: 0xB2ABF2, bg: 0x1C3041},
            {l: 0xECE4B7, c: 0x95BF74, bg: 0x283F3B},
            {l: 0x2f434c, c: 0xD5F2E3, bg: 0x1C3041},
            {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
            {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
        ]
    },

    createStateBackground: function(game, stageWH, m) {
        colors = this.getColors();

        let circleMargin = m;
        let dotAmount = Math.floor(stageWH / circleMargin)
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
    },

    createArenaGraphics: function() {
        colors = this.getColors();
        let graphics = game.add.graphics(0, 0);
        let rndColors = colors[game.rnd.between(0, colors.length - 1)];

        game.stage.backgroundColor = rndColors.bg;

        graphics.beginFill(rndColors.c, 0.2);
        graphics.drawCircle(150, 300, 20);
        graphics.endFill();

        graphics.lineStyle(3, rndColors.l, 0.8);
        graphics.moveTo(160, 300);
        graphics.lineTo(195, 300);
        graphics.lineStyle(0, rndColors.l, 1);
        graphics.endFill();

        graphics.beginFill(rndColors.c, 0.4);
        graphics.drawCircle(220, 300, 50);
        graphics.endFill();

        graphics.lineStyle(3, rndColors.l, 0.85);
        graphics.moveTo(245, 300);
        graphics.lineTo(275, 300);
        graphics.lineStyle(0, rndColors.l, 1);
        graphics.endFill();

        graphics.beginFill(rndColors.c, 0.6);
        graphics.drawCircle(300, 300, 50);
        graphics.endFill();

        graphics.lineStyle(3, rndColors.l, 0.9);
        graphics.moveTo(325, 300);
        graphics.lineTo(355, 300);
        graphics.lineStyle(0, rndColors.l, 1);
        graphics.endFill();

        graphics.beginFill(rndColors.c, 0.8);
        graphics.drawCircle(380, 300, 50);
        graphics.endFill();

        graphics.lineStyle(3, rndColors.l, 0.95);
        graphics.moveTo(405, 300);
        graphics.lineTo(440, 300);
        graphics.lineStyle(0, rndColors.l, 1);
        graphics.endFill();

        graphics.beginFill(rndColors.c, 1);
        graphics.drawCircle(450, 300, 20);
        graphics.endFill();
    }
}