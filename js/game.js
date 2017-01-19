// var xScale = 1;
var xScale = 3;
var lastLoop = Date.now();

var Game = {
    init: function () {
        var bgCanvas = document.getElementById("bg-canvas");
        var fgCanvas = document.getElementById("fg-canvas");

        var canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            bgCtx: bgCanvas.getContext("2d"),
            fgCtx: fgCanvas.getContext("2d")
        };

        var backgroundMusic = new Audio("audio/underground_theme.mp3");
        backgroundMusic.loop = true;

        var spriteSheet = new Image();
        if(xScale > 1){
            spriteSheet.src = "img/sprite_sheet_x3.png";
        }else{
            spriteSheet.src = "img/sprite_sheet.png";
        }

        spriteSheet.addEventListener("load", function () {
            var spriteSheet = this;

            var data = {
                animationFrame: 0,
                spriteSheet: spriteSheet,
                canvas: canvas,
                location: "initial"
            };

            backgroundMusic.play();

            Input.init(data);
            Entities.init(data);
            Render.init(data);
            Game.run(data);
        });
    },

    run: function (data) {
        var loop = function () {
            Game.input(data);
            Game.update(data);
            Game.render(data);

            var thisLoop = Date.now();
            var fps = 1000 / (thisLoop - lastLoop);
            lastLoop = thisLoop;

            document.getElementById("content").innerHTML = fps;

            data.animationFrame++;

            window.requestAnimationFrame(loop);
        };

        loop();
    },

    input: function (data) {
        Input.update(data);
    },

    update: function (data) {
        Animation.update(data);
        Movement.update(data);
        Physics.update(data);
    },

    render: function (data) {
        Render.update(data);
    }
};

Game.init();