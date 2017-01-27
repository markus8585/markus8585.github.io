// var xScale = 1;
var xScale = 3;
var lastLoop = Date.now();

var Game = {
    modal: false, //true = open
    walkOn: false, //true = open
    hasRansom: false,
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
                movieScreen: 0,
                storyLine: {
                    ransom: false
                }
            };

            backgroundMusic.play();

            Input.init(data);
            Entities.init(data);
            Render.init(data);
            Game.run(data);

            data.location = "djs";

            data.entities.jack.exitReady = "outdoorDJs";
            Game.travel(data);

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

    travel: function (data) {
        var jack = data.entities.jack;
        if(jack.exitReady){
            console.log('EXIT to: ' + jack.exitReady);

            if(jack.exitReady == "outdoorDJs"){

                if (Entities.locations.outdoorDJs.init){
                    console.log('DJS OUTDOOR INIT 0a');
                    Entities.locations.outdoorDJs.init(data);
                    // Entities.locations.outdoorDJs.init = false;
                }else{
                    console.log('DJS OUTDOOR INIT 0b');
                    Entities.locations.outdoorDJs.entities(data);
                }
                data.location = "outdoorDJs";

            }else if(jack.exitReady == "outdoorChurch"){

                if (Entities.locations.outdoorChurch.init){
                    console.log('OUTDOOR CHURCH INIT 0a');
                    Entities.locations.outdoorChurch.init(data);
                    // Entities.locations.outdoorDJs.init = false;
                }else{
                    console.log('OUTDOOR CHURCH INIT 0b');
                    Entities.locations.outdoorChurch.entities(data);
                }
                data.location = "outdoorChurch";

            }else if(jack.exitReady == "indoorChurch"){

                if (Entities.locations.indoorChurch.init){
                    console.log('inDOOR CHURCH INIT 0a');
                    Entities.locations.indoorChurch.init(data);
                    // Entities.locations.indoorDJs.init = false;
                }else{
                    console.log('inDOOR CHURCH INIT 0b');
                    Entities.locations.indoorChurch.entities(data);
                }
                data.location = "indoorChurch";

            }else{

                if (Entities.locations.djs.init){
                    console.log('DJS INDOOR INIT 0a');
                    Entities.locations.djs.init(data);
                    // Entities.locations.djs.init = false;
                }else{
                    console.log('DJS INDOOR INIT 0b');
                    Entities.locations.djs.entities(data);
                }
                data.location = "djs";
            }
            Render.init(data);
        }
    },

    movie: function (data, screenNum) {
        data.canvas.movieCtx.clearRect(0, 0, data.canvas.movieCanvas.width, data.canvas.movieCanvas.height);
        var screenNum = screenNum;
        if (screenNum === undefined) {
            screenNum = data.movieScreen;
            data.movieScreen++;
        }
        var screenShot = [
            [0, 0, "img/scene-1-screen-1.png", false],
            [0, 0, "img/scene-1-screen-2.png", true],
            [0, 0, "img/scene-1-screen-3.png", true],
            [0, 0, "img/scene-1-screen-4.png", true],
            [0, 0, "img/scene-1-screen-5.png", true],
            [0, 0, "img/scene-1-screen-6.png", true], //RANSOM NOTE
            [0, 0, "img/scene-1-screen-7.png", true],
            false,
            // [0, 0, "img/scene-1-screen-8.png", false],
            [0, 0, "img/ransom.png", false],
            // [0, 35, "img/sprite_sheet_x3.png"],
            // [0, 435, "img/sprite_sheet_x3.png"]
        ];

        if( screenShot[screenNum] ){
            Game.modal = true;
            if(screenShot[screenNum][3]){
                //cover screen
                Render.helpers.drawEntity(data.entities.background, data.canvas.movieCtx);
            }
            var movieSprite = new Image();
                movieSprite.src = screenShot[screenNum][2];

                var background = {
                    sprite: new Entities.helpers.Sprite(movieSprite, screenShot[screenNum][0], screenShot[screenNum][1] * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                movieSprite.addEventListener("load", function () {
                    console.log('LOADED SPRITE');
                    Render.helpers.drawEntity(background, data.canvas.movieCtx);
                });

                if(data.movieScreen > 5){
                    data.storyLine.ransom = true;
                }

            Render.helpers.drawEntity(background, data.canvas.movieCtx);

        }else{
            Game.modal = false;
        }

        // console.log(screenShot);
        // console.log(data.movieScreen);
        // console.log(screenShot[data.movieScreen][0]);
        // console.log(screenShot[data.movieScreen][1]);


    }
};

Game.init();