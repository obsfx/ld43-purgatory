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

        let circleA = game.add.graphics(0, 0);
        circleA.inputEnabled = true;
        circleA.input.useHandCursor = true;

        let circleB = game.add.graphics(0, 0);
        circleB.inputEnabled = true;
        circleB.input.useHandCursor = true;
        
        let circleC = game.add.graphics(0, 0);
        circleC.inputEnabled = true;
        circleC.input.useHandCursor = true;

        let rndColors = colors[game.rnd.between(0, colors.length - 1)];
        game.stage.backgroundColor = rndColors.bg;

        let points = [
            
            // purgatory:
            {
                x: 150,
                y: 300,
                r: 20,
                g: graphics,
                o: 0.2,
                text: "P U R G A T O R Y"
            },

            // arenaA:
            {
                x: 220,
                y: 300,
                r: 50,
                g: circleA,
                o: 0.4,
                text: "A R E N A  I"
            },

            // arenaB:
            {
                x: 300,
                y: 300,
                r: 50,
                g: circleB,
                o: 0.6,
                text: "A R E N A  II"
            },

            // arenaC: 
            {
                x: 380,
                y: 300,
                r: 50, 
                g: circleC,
                o: 0.8,
                text: "A R E N A  III"
            },

            // heaven:
            {
                x: 450,
                y: 300,
                r: 20,
                g: graphics,
                o: 1,
                text: "H E A V E N"
            }
        ];

        for (let i = 0; i < points.length - 1; i++) {
            graphics.lineStyle(3, rndColors.l, 0.5 + ((i + 1) / 10));
            graphics.moveTo(points[i].x + points[i].r / 2, 300);
            graphics.lineTo(points[i + 1].x - points[i + 1].r / 2, 300);
            graphics.lineStyle(0, rndColors.l, 1);
            graphics.endFill();
        }

        for (let i in points) {
            points[i].g.beginFill(rndColors.c, points[i].o);
            points[i].g.drawCircle(points[i].x, points[i].y, points[i].r);
            points[i].g.endFill();
        }

        for (let i in points) {
            let label = game.add.text(points[i].x, points[i].y + points[i].r / 1.5 + 10, points[i].text, { font: '12px Slabo', fill: '#fff'});
            label.x = points[i].x - label.width / 2;
        }

        /****** */
    }
}