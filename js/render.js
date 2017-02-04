var Render = {
    init: function (data) {
        console.log('Render Init');
        // Entities.init(data);
        Render.helpers.drawEntity(data.entities.background, data.canvas.bgCtx);
    },

    update: function (data) {
        data.canvas.fgCtx.clearRect(0, 0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);
        
        // if(!Game.modal && data.storyLine.ransom){
        if( data.storyLine.ransom){
            data.entities.coinsArray.forEach(function (coin) {
                Render.helpers.drawEntity(coin, data.canvas.fgCtx);
            });
        }

        if(data.dialog){
            Render.helpers.drawEntity(data.entities.dialog, data.canvas.fgCtx);
        }

        Render.helpers.drawModal(data.entities.modal, data.canvas.fgCtx);

        Render.helpers.drawText(data.entities.score, data.canvas.fgCtx);


        if(Game.modal == false && data.location == "indoorLab"){
            if(data.entities.score.value >= scoreGoal){
                data.movieScreen = 15;
                Game.modal = true;
                Game.movie(data);
            }else{
                if(data.storyLine.ransom){
                    Render.helpers.drawEntity(data.entities.halt, data.canvas.fgCtx);
                }
            }
        }

        if(!data.storyLine.ransom && data.location == "djs"){
                if(false){
                    data.entities.jo = new Entities.helpers.stillChar(data.spriteSheet, 200, 154*3, 17*3, 22*3, 430*3, 0);
                }
                Render.helpers.drawEntity(data.entities.jo, data.canvas.fgCtx);
        }

        if(Game.modal == false && data.location == "rogers"){
            data.entities.roger = new Entities.helpers.stillChar(data.spriteSheet, 189*3, 154*3, 17*3, 22*3, 464*3, 22*3);
            if(Game.rogerSafe){
                data.entities.roger = new Entities.helpers.stillChar(data.spriteSheet, 189*3, 154*3, 17*3, 22*3, 464*3, 0*3);
            }
            Render.helpers.drawEntity(data.entities.roger, data.canvas.fgCtx);
        }

        if(Game.modal == false && data.location == "indoorRogers"){
            data.entities.allison = new Entities.helpers.stillChar(data.spriteSheet, 121*3, 154*3, 17*3, 22*3, 447*3, 0*3);
            Render.helpers.drawEntity(data.entities.allison, data.canvas.fgCtx);
        }

        if(data.location == "indoorChurch"){
            data.entities.mom = new Entities.helpers.stillChar(data.spriteSheet, 66*3, 154*3, 17*3, 22*3, 328*3, 88*3);
            Render.helpers.drawEntity(data.entities.mom, data.canvas.fgCtx);
        }



        if(data.storyLine.ransom && data.location == "djs"){
            // data.entities.ransomNote = new Entities.helpers.Sprite(img, 260 * xScale, 0 * xScale, 16 * xScale, 21 * xScale);
            // console.log(data.entities.ransomNote);
            Render.helpers.drawEntity(data.entities.ransomNote, data.canvas.fgCtx);
        }

        // // if(!Game.modal && data.storyLine.ransom){
        // if( data.storyLine.ransom){
        //     data.entities.coinsArray.forEach(function (coin) {
        //         Render.helpers.drawEntity(coin, data.canvas.fgCtx);
        //     });
        // }

        if(data.location == "rogers"){
            Render.helpers.drawEntity(data.entities.dog, data.canvas.fgCtx);
        }
        if(data.location == "djs"){
            if(Game.orderCoffee){
                Game.orderCoffee = false;
                data.movieScreen = 27;
                Game.movie(data);
                Game.modal = true;

                setTimeout(function(){ 
                    data.movieScreen = 28;
                    Game.movie(data);
                }, 2000);
                setTimeout(function(){ 
                        Game.movie(data, 29);
                        Game.modal = false;
                }, 4000);
            }


            Render.helpers.drawEntity(data.entities.dex, data.canvas.fgCtx);
        }



        


        if(data.entities.jack.actionState == "explore"){
            data.modal = new Image();
            data.modal.src = "img/explore.png";
            var ransomNote = {
                type: "explore",
                sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                x: 0,
                y: 0,
                w: 256*xScale,
                h: 200*xScale
            }
            Render.helpers.drawEntity(ransomNote, data.canvas.fgCtx);
        }
        if(data.entities.jack.actionState == "readNote" && data.movieScreen < 13){
            //Game.modal = true;
            data.modal = new Image();
            data.modal.src = "img/looks-like-a-note.png";
            var ransomNote = {
                type: "ransomNote",
                sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                x: 0,
                y: 0,
                w: 256*xScale,
                h: 200*xScale
            }
            Render.helpers.drawEntity(ransomNote, data.canvas.fgCtx);
        }else{
            //Game.modal = false;
        }

        //JACK LAST TO BE IN FRONT
        Render.helpers.drawEntity(data.entities.jack, data.canvas.fgCtx);

    },

    helpers: {
        drawEntity: function (entity, ctx) {
            // console.log(entity);
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX, entity.sprite.srcY,
                entity.sprite.srcW, entity.sprite.srcH,
                entity.x, entity.y,
                entity.w, entity.h);
        },

        getLines: function (ctx, text, maxWidth) {

            var words = text.split(" ");
            var lines = [];
            var currentLine = words[0];

            for (var i = 1; i < words.length; i++) {
                var word = words[i];
                var width = ctx.measureText(currentLine + " " + word).width;
                if (width < maxWidth) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
            return lines;
        },

        drawText: function (text, ctx) {
            ctx.font = text.size + " " + text.font;
            ctx.fillStyle = text.color;
            ctx.textAlign = "center";
            // ctx.fillText("Coins:" + " " + text.value, text.x, text.y);
            ctx.fillText("Coins:" + " " + text.value, 768/2, text.y, 400);
        },

        drawModal: function (text, ctx) {
            if(text.value != 0){
                ctx.font = text.size + " " + text.font;
                ctx.fillStyle = text.color;
                ctx.textAlign = "center";
                ctx.fillText(text.value, 768/2, text.y, 400);
                // console.log( getLines(ctx, "Text Oh No!", 40) );
            }
        }
    }
};