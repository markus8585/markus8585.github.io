// var xScale = 1;
var xScale = 3;
var lastLoop = Date.now();

var Game = {
    orderCoffee: true,
    orderCoco: true,
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
                location: "outdoorDJs",
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

            }else if(jack.exitReady == "outdoorLab"){

                if (Entities.locations.outdoorLab.init){
                    console.log('OUTDOOR LAB INIT 0a');
                    Entities.locations.outdoorLab.init(data);
                    // Entities.locations.outdoorDJs.init = false;
                }else{
                    console.log('OUTDOOR Lab INIT 0b');
                    Entities.locations.outdoorLab.entities(data);
                }
                data.location = "outdoorLab";

            }else if(jack.exitReady == "indoorLab"){

                if (Entities.locations.indoorLab.init){
                    console.log('INDOOR LAB INIT 0a');
                    Entities.locations.indoorLab.init(data);
                    // Entities.locations.outdoorDJs.init = false;
                }else{
                    console.log('INDOOR Lab INIT 0b');
                    Entities.locations.indoorLab.entities(data);
                }
                data.location = "indoorLab";

            }else if(jack.exitReady == "rogers"){

                if (Entities.locations.rogers.init){
                    console.log('Rogers INIT 0a');
                    Entities.locations.rogers.init(data);
                }else{
                    console.log('Rogers INIT 0b');
                    Entities.locations.rogers.entities(data);
                }
                data.location = "rogers";

            }else if(jack.exitReady == "indoorRogers"){

                if (Entities.locations.indoorRogers.init){
                    console.log('indoorRogers INIT 0a');
                    Entities.locations.indoorRogers.init(data);
                }else{
                    console.log('indoorRogers INIT 0b');
                    Entities.locations.indoorRogers.entities(data);
                }
                data.location = "indoorRogers";

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
            [0, 0, "img/jojo.png", false],
            [0, 0, "img/dexter.png", false],
            [0, 0, "img/scene-1-screen-1.png", false],
            [0, 0, "img/scene-1-screen-2.png", true],
            [0, 0, "img/scene-1-screen-3.png", true],
            [0, 0, "img/tay-idk.png", false],
            [0, 0, "img/reb-idk.png", false],
            [0, 0, "img/scene-1-screen-4.png", true],
            [0, 0, "img/scene-1-screen-5.png", true],
            [0, 0, "img/scene-1-screen-6.png", true], //RANSOM NOTE
            [0, 0, "img/scene-1-screen-7.png", true],
            false,
            // [0, 0, "img/scene-1-screen-8.png", false],
            [0, 0, "img/ransom.png", false],
            false,

            [0, 0, "img/no-beans.png", false], //10
            [0, 0, "img/i-have-em.png", false],
            [0, 0, "img/who.png", false],
            [0, 0, "img/too-late.png", false],
            [0, 0, "img/reveal.png", false],
            [0, 0, "img/why.png", false],
            [0, 0, "img/what.png", false],
            [0, 0, "img/need-coffee.png", false],
            [0, 0, "img/one-of-us.png", false],
            false,
            [0, 0, "img/coffee-q.png", false], //20
            [0, 0, "img/coco.png", false], //21
            false,

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
                    console.log('LOADED SPRITE:' + data.movieScreen);
                    Render.helpers.drawEntity(background, data.canvas.movieCtx);
                });

                if(data.movieScreen == 6){
                    data.storyLine.ransom = true;
                }

            Render.helpers.drawEntity(background, data.canvas.movieCtx);

        }else{
            if(data.movieScreen > 17){
                data.movieScreen = 0;
            }
            Game.modal = false;
        }

        // console.log(screenShot);
        // console.log(data.movieScreen);
        // console.log(screenShot[data.movieScreen][0]);
        // console.log(screenShot[data.movieScreen][1]);


    }
};

// bg-canvas
// fg-canvas
// movie-canvas
// get element references
var foo = document.querySelector('#foo');
var bgC = document.querySelector('#bg-canvas');
var fgC = document.querySelector('#fg-canvas');
var mvC = document.querySelector('#movie-canvas');

var resizeFunction = function(){
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if(w > 768 && h > 600){
        bgC.style = '';
        fgC.style = '';
        mvC.style = '';
    }else{
        fit( bgC, foo);
        fit( fgC, foo);
        fit( mvC, foo);
    }
}

Game.init();