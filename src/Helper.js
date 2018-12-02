let Helper = {
    
    getColors: function() {
        return [
            {l: 0xC0E5C8, c: 0x694873, bg: 0x112320},
            {l: 0xAFA060, c: 0x764134, bg: 0x140C0F},
            {l: 0xBED558, c: 0x756D54, bg: 0x1E171A},
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
                text: "P U R G A T O R Y",
                ts: 10
            },

            // arenaA:
            {
                x: 220,
                y: 300,
                r: 50,
                g: circleA,
                o: 0.4,
                text: "A R E N A  I",
                ts: 12,
            },

            // arenaB:
            {
                x: 300,
                y: 300,
                r: 50,
                g: circleB,
                o: 0.6,
                text: "A R E N A  II",
                ts: 12,
            },

            // arenaC: 
            {
                x: 380,
                y: 300,
                r: 50, 
                g: circleC,
                o: 0.8,
                text: "A R E N A  III",
                ts: 12,
            },

            // heaven:
            {
                x: 450,
                y: 300,
                r: 20,
                g: graphics,
                o: 1,
                text: "H E A V E N",
                ts: 10
            }
        ];

        for (let i = 0; i < points.length - 1; i++) {
            graphics.lineStyle(3, rndColors.l, 0.5 + ((i + 1) / 10));
            graphics.moveTo(points[i].x + points[i].r / 2, 300);
            graphics.lineTo(points[i + 1].x - points[i + 1].r / 2, 300);
            graphics.lineStyle(0, rndColors.l, 1);
            graphics.endFill();
        }

        function hover(p, o, c) {
            p.g.clear();
            p.g.beginFill(c, o);
            p.g.drawCircle(p.x, p.y, p.r);
            p.g.endFill();
        }

        for (let i in points) {
            points[i].g.beginFill(rndColors.c, points[i].o);
            points[i].g.drawCircle(points[i].x, points[i].y, points[i].r);
            points[i].g.endFill();
            
            points[i].g.events.onInputOver.add(function() {
                hover(points[i], 1, rndColors.c);
            }, this);
            
            points[i].g.events.onInputOut.add(function() {
                hover(points[i], points[i].o, rndColors.c);
            }, this);

            let label = game.add.text(points[i].x, points[i].y + points[i].r / 1.5 + 5, points[i].text, { font: `${points[i].ts}px Slabo`, fill: `#${Number(rndColors.l).toString(16)}`});
            label.x = points[i].x - label.width / 2;
        }

        
        this.drawUpgradeMenuButton(300, 100, rndColors.c, rndColors.l);

        /****** */
    },

    drawUpgradeMenuButton: function(x, y, c, f) {
        colors = this.getColors();
        let r = 40;

        let points = [
            {x: x, y: y - r / 3.5, o: 0.2},
            {x: x - r / 3.5, y: y, o: 0.4},
            {x: x + r / 3.5, y: y, o: 0.6}
        ]

        let graphics = game.add.graphics(0, 0);
        graphics.inputEnabled = true;
        graphics.input.useHandCursor = true;

        function draw(o) {
            graphics.clear();
            for (let i in points) {
                graphics.beginFill(c, points[i].o + o);
                graphics.drawCircle(points[i].x, points[i].y, r);
                graphics.endFill();
            }
        }

        draw(0);

        graphics.events.onInputOver.add(function() {
            draw(0.4);
        }, this);

        graphics.events.onInputOut.add(function() {
            draw(0);
        }, this);

        let label = game.add.text(x, y + 10, "U P G R A D E S", { font: `12px Slabo`, fill: `#${Number(f).toString(16)}`});
        label.x = x - label.width / 2;
    }
}