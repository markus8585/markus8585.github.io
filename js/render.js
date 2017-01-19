var Render = {
    init: function (data) {
        Render.helpers.drawEntity(data.entities.background, data.canvas.bgCtx);
    },

    update: function (data) {
        data.canvas.fgCtx.clearRect(0, 0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);
        
        Render.helpers.drawModal(data.entities.modal, data.canvas.fgCtx);

        Render.helpers.drawText(data.entities.score, data.canvas.fgCtx);

        Render.helpers.drawEntity(data.entities.jack, data.canvas.fgCtx);

        data.entities.coinsArray.forEach(function (coin) {
            Render.helpers.drawEntity(coin, data.canvas.fgCtx);
        });
    },

    helpers: {
        drawEntity: function (entity, ctx) {
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
            ctx.font = text.size + " " + text.font;
            ctx.fillStyle = text.color;
            ctx.textAlign = "center";
            ctx.fillText("Text Oh No!", 768/2, text.y, 400);
            // console.log( getLines(ctx, "Text Oh No!", 40) );
        }
    }
};