// var xScale = 1;
var xScale = 3;
var lastLoop = Date.now();

var Game = {
    init: function () {
        var bgCanvas = document.getElementById("bg-canvas");
        var fgCanvas = document.getElementById("fg-canvas");
        var movieCanvas = document.getElementById("movie-canvas");

        var canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            movieCanvas: movieCanvas,
            bgCtx: bgCanvas.getContext("2d"),
            fgCtx: fgCanvas.getContext("2d"),
            movieCtx: movieCanvas.getContext("2d")
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
                location: "djs",
                movieScreen: 0
            };

            backgroundMusic.play();

            Input.init(data);
            Entities.init(data);
            Render.init(data);
            Game.run(data);

            data.location = "outdoorDJs";

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

        /*if(data.entities.score.value == 2){
            console.log('MOVIE I');
            var spriteSheet = new Image();
            if(xScale < 1){
                spriteSheet.src = "img/sprite_sheet_x3.png";
            }else{
                spriteSheet.src = "img/sprite_sheet.png";
            }

            var background = {
                sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35 * xScale, 256 * xScale, 200 * xScale),
                x: 0,
                y: 0,
                w: 768,
                h: 600
            };

            Render.helpers.drawEntity(data.entities.background, data.canvas.movieCtx);

        }*/
    },

    render: function (data) {
        Render.update(data);
    },

    movie: function (data) {
        data.canvas.movieCtx.clearRect(0, 0, data.canvas.movieCanvas.width, data.canvas.movieCanvas.height);
        
        var screenShot = [
            [0, 0, "img/scene-1-screen-1.png"],
            [0, 0, "img/scene-1-screen-2.png"],
            [0, 0, "img/scene-1-screen-3.png"],
            [0, 0, "img/scene-1-screen-4.png"],
            [0, 0, "img/scene-1-screen-5.png"],
            [0, 0, "img/scene-1-screen-6.png"],
            [0, 0, "img/scene-1-screen-7.png"],
            // [0, 35, "img/sprite_sheet_x3.png"],
            // [0, 435, "img/sprite_sheet_x3.png"]
        ];

        if( screenShot[data.movieScreen] ){
            Render.helpers.drawEntity(data.entities.background, data.canvas.movieCtx);
            var movieSprite = new Image();
                movieSprite.src = screenShot[data.movieScreen][2];

                var background = {
                    sprite: new Entities.helpers.Sprite(movieSprite, screenShot[data.movieScreen][0], screenShot[data.movieScreen][1] * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                movieSprite.addEventListener("load", function () {
                    console.log('LOADED SPRITE');
                Render.helpers.drawEntity(background, data.canvas.movieCtx);
                });

            Render.helpers.drawEntity(background, data.canvas.movieCtx);
            data.movieScreen++;

        }

        // console.log(screenShot);
        // console.log(data.movieScreen);
        // console.log(screenShot[data.movieScreen][0]);
        // console.log(screenShot[data.movieScreen][1]);


    }
};

Game.init();