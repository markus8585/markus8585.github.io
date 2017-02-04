// var xScale = 1;
//re-order reveal
//no-beans at start
//no allison talk
//
var xScale = 3;
var scoreGoal = 100;
var lastLoop = Date.now();

var Game = {
    allowInput: true,
    orderCoffee: true,
    orderCoco: true,
    modal: false, //true = open
    walkOn: false, //true = open
    hasRansom: false,
    rogerSafe: false,
    loadedDJ: false, 
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

            //document.getElementById("content").innerHTML = fps;

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

    movie: function (data, screenNum, callBack) {
        data.canvas.movieCtx.clearRect(0, 0, data.canvas.movieCanvas.width, data.canvas.movieCanvas.height);
        var screenNum = screenNum;
        if (screenNum === undefined) {
            screenNum = data.movieScreen;
            data.movieScreen++;
        }

        var screenShot = [
            [0, 0, "img/scene-1-screen-1.png", false, false],
            [0, 0, "img/jojo.png", false, false],
            [0, 0, "img/dexter.png", false, false],
            [0, 0, "img/scene-1-screen-2.png", true, false],
            [0, 0, "img/scene-1-screen-3.png", true, false],
            [0, 0, "img/tay-idk.png", false, false],
            [0, 0, "img/reb-idk.png", false, false],
            [0, 0, "img/scene-1-screen-4.png", true, false],
            [0, 0, "img/scene-1-screen-5.png", true, false],
            [0, 0, "img/scene-1-screen-6.png", true, false], //RANSOM NOTE
            [0, 0, "img/scene-1-screen-7.png", true, false],
            false,
            [0, 0, "img/ransom.png", false, false],
            false,
            [0, 0, "img/no-beans.png", false, false], //10
            [0, 0, "img/i-have-em.png", false, false],
            [0, 0, "img/who.png", false, false],
            [0, 0, "img/too-late.png", false, false],
            [0, 0, "img/reb.png", false, false],
            [0, 0, "img/tay.png", false, false],
            [0, 0, "img/reveal.png", false, false],
            [0, 0, "img/why.png", false, false],
            [0, 0, "img/need-coffee.png", false, false],
            [0, 0, "img/one-of-us.png", false, false],
            [0, 0, "img/what.png", false, false],
            [0, 0, "img/pregnant.png", false, false],
            false,
            [0, 0, "img/coffee-q.png", false, false], //20
            [0, 0, "img/coco.png", false, false], //21
            false,
            [0, 0, "img/yay.png", false, false], //21
            false,
            [0, 0, "img/mom.png", false, false], //21
            false,
            [0, 0, "img/allison.png", false, false], //21
            false,
            [0, 0, "img/roger.png", false, false], //21
            false,
            [0, 0, "img/explore.png", false, false], //21
            false,

            // [0, 35, "img/sprite_sheet_x3.png"],
            // [0, 435, "img/sprite_sheet_x3.png"]
        ];

        console.log('MOVIE: '+ screenNum +' | '+ screenNum[2]);

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

                if(data.movieScreen == 9){
                    data.storyLine.ransom = true;
                }

                if(screenNum == 25 ){
                    Game.allowInput = false;
                    setTimeout(function(){ 
                        data.movieScreen = 30;
                        Game.movie(data);
                    }, 6000);
                    confetti.start();
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
























var retina = window.devicePixelRatio,

    // Math shorthands
    PI = Math.PI,
    sqrt = Math.sqrt,
    round = Math.round,
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,

    // Local WindowAnimationTiming interface
    rAF = window.requestAnimationFrame,
    cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame,
    _now = Date.now || function () {return new Date().getTime();};

// Local WindowAnimationTiming interface polyfill
(function (w) {
  /**
                * Fallback implementation.
                */
  var prev = _now();
  function fallback(fn) {
    var curr = _now();
    var ms = Math.max(0, 16 - (curr - prev));
    var req = setTimeout(fn, ms);
    prev = curr;
    return req;
  }

  /**
                * Cancel.
                */
  var cancel = w.cancelAnimationFrame
  || w.webkitCancelAnimationFrame
  || w.clearTimeout;

  rAF = w.requestAnimationFrame
  || w.webkitRequestAnimationFrame
  || fallback;

  cAF = function(id){
    cancel.call(w, id);
  };
}(window));

var confetti = {};

document.addEventListener("DOMContentLoaded", function() {
  var speed = 50,
      duration = (1.0 / speed),
      confettiRibbonCount = 11,
      ribbonPaperCount = 30,
      ribbonPaperDist = 8.0,
      ribbonPaperThick = 8.0,
      confettiPaperCount = 95,
      DEG_TO_RAD = PI / 180,
      RAD_TO_DEG = 180 / PI,
      colors = [
        ["#df0049", "#660671"],
        ["#00e857", "#005291"],
        ["#2bebbc", "#05798a"],
        ["#ffd200", "#b06c00"]
      ];

  function Vector2(_x, _y) {
    this.x = _x, this.y = _y;
    this.Length = function() {
      return sqrt(this.SqrLength());
    }
    this.SqrLength = function() {
      return this.x * this.x + this.y * this.y;
    }
    this.Add = function(_vec) {
      this.x += _vec.x;
      this.y += _vec.y;
    }
    this.Sub = function(_vec) {
      this.x -= _vec.x;
      this.y -= _vec.y;
    }
    this.Div = function(_f) {
      this.x /= _f;
      this.y /= _f;
    }
    this.Mul = function(_f) {
      this.x *= _f;
      this.y *= _f;
    }
    this.Normalize = function() {
      var sqrLen = this.SqrLength();
      if (sqrLen != 0) {
        var factor = 1.0 / sqrt(sqrLen);
        this.x *= factor;
        this.y *= factor;
      }
    }
    this.Normalized = function() {
      var sqrLen = this.SqrLength();
      if (sqrLen != 0) {
        var factor = 1.0 / sqrt(sqrLen);
        return new Vector2(this.x * factor, this.y * factor);
      }
      return new Vector2(0, 0);
    }
  }
  Vector2.Lerp = function(_vec0, _vec1, _t) {
    return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
  }
  Vector2.Distance = function(_vec0, _vec1) {
    return sqrt(Vector2.SqrDistance(_vec0, _vec1));
  }
  Vector2.SqrDistance = function(_vec0, _vec1) {
    var x = _vec0.x - _vec1.x;
    var y = _vec0.y - _vec1.y;
    return (x * x + y * y + z * z);
  }
  Vector2.Scale = function(_vec0, _vec1) {
    return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
  }
  Vector2.Min = function(_vec0, _vec1) {
    return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
  }
  Vector2.Max = function(_vec0, _vec1) {
    return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
  }
  Vector2.ClampMagnitude = function(_vec0, _len) {
    var vecNorm = _vec0.Normalized;
    return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
  }
  Vector2.Sub = function(_vec0, _vec1) {
    return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
  }

  function EulerMass(_x, _y, _mass, _drag) {
    this.position = new Vector2(_x, _y);
    this.mass = _mass;
    this.drag = _drag;
    this.force = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.AddForce = function(_f) {
      this.force.Add(_f);
    }
    this.Integrate = function(_dt) {
      var acc = this.CurrentForce(this.position);
      acc.Div(this.mass);
      var posDelta = new Vector2(this.velocity.x, this.velocity.y);
      posDelta.Mul(_dt);
      this.position.Add(posDelta);
      acc.Mul(_dt);
      this.velocity.Add(acc);
      this.force = new Vector2(0, 0);
    }
    this.CurrentForce = function(_pos, _vel) {
      var totalForce = new Vector2(this.force.x, this.force.y);
      var speed = this.velocity.Length();
      var dragVel = new Vector2(this.velocity.x, this.velocity.y);
      dragVel.Mul(this.drag * this.mass * speed);
      totalForce.Sub(dragVel);
      return totalForce;
    }
  }

  function ConfettiPaper(_x, _y) {
    this.pos = new Vector2(_x, _y);
    this.rotationSpeed = (random() * 600 + 800);
    this.angle = DEG_TO_RAD * random() * 360;
    this.rotation = DEG_TO_RAD * random() * 360;
    this.cosA = 1.0;
    this.size = 5.0;
    this.oscillationSpeed = (random() * 1.5 + 0.5);
    this.xSpeed = 40.0;
    this.ySpeed = (random() * 60 + 50.0);
    this.corners = new Array();
    this.time = random();
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    for (var i = 0; i < 4; i++) {
      var dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
      var dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
      this.corners[i] = new Vector2(dx, dy);
    }
    this.Update = function(_dt) {
      this.time += _dt;
      this.rotation += this.rotationSpeed * _dt;
      this.cosA = cos(DEG_TO_RAD * this.rotation);
      this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt
      this.pos.y += this.ySpeed * _dt;
      if (this.pos.y > ConfettiPaper.bounds.y) {
        this.pos.x = random() * ConfettiPaper.bounds.x;
        this.pos.y = 0;
      }
    }
    this.Draw = function(_g) {
      if (this.cosA > 0) {
        _g.fillStyle = this.frontColor;
      } else {
        _g.fillStyle = this.backColor;
      }
      _g.beginPath();
      _g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
      for (var i = 1; i < 4; i++) {
        _g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
      }
      _g.closePath();
      _g.fill();
    }
  }
  ConfettiPaper.bounds = new Vector2(0, 0);

  function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag) {
    this.particleDist = _dist;
    this.particleCount = _count;
    this.particleMass = _mass;
    this.particleDrag = _drag;
    this.particles = new Array();
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    this.xOff = (cos(DEG_TO_RAD * _angle) * _thickness);
    this.yOff = (sin(DEG_TO_RAD * _angle) * _thickness);
    this.position = new Vector2(_x, _y);
    this.prevPosition = new Vector2(_x, _y);
    this.velocityInherit = (random() * 2 + 4);
    this.time = random() * 100;
    this.oscillationSpeed = (random() * 2 + 2);
    this.oscillationDistance = (random() * 40 + 40);
    this.ySpeed = (random() * 40 + 80);
    for (var i = 0; i < this.particleCount; i++) {
      this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
    }
    this.Update = function(_dt) {
      var i = 0;
      this.time += _dt * this.oscillationSpeed;
      this.position.y += this.ySpeed * _dt;
      this.position.x += cos(this.time) * this.oscillationDistance * _dt;
      this.particles[0].position = this.position;
      var dX = this.prevPosition.x - this.position.x;
      var dY = this.prevPosition.y - this.position.y;
      var delta = sqrt(dX * dX + dY * dY);
      this.prevPosition = new Vector2(this.position.x, this.position.y);
      for (i = 1; i < this.particleCount; i++) {
        var dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
        dirP.Normalize();
        dirP.Mul((delta / _dt) * this.velocityInherit);
        this.particles[i].AddForce(dirP);
      }
      for (i = 1; i < this.particleCount; i++) {
        this.particles[i].Integrate(_dt);
      }
      for (i = 1; i < this.particleCount; i++) {
        var rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
        rp2.Sub(this.particles[i - 1].position);
        rp2.Normalize();
        rp2.Mul(this.particleDist);
        rp2.Add(this.particles[i - 1].position);
        this.particles[i].position = rp2;
      }
      if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
        this.Reset();
      }
    }
    this.Reset = function() {
      this.position.y = -random() * ConfettiRibbon.bounds.y;
      this.position.x = random() * ConfettiRibbon.bounds.x;
      this.prevPosition = new Vector2(this.position.x, this.position.y);
      this.velocityInherit = random() * 2 + 4;
      this.time = random() * 100;
      this.oscillationSpeed = random() * 2.0 + 1.5;
      this.oscillationDistance = (random() * 40 + 40);
      this.ySpeed = random() * 40 + 80;
      var ci = round(random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
      this.particles = new Array();
      for (var i = 0; i < this.particleCount; i++) {
        this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
      }
    }
    this.Draw = function(_g) {
      for (var i = 0; i < this.particleCount - 1; i++) {
        var p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
        var p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
        if (this.Side(this.particles[i].position.x, this.particles[i].position.y, this.particles[i + 1].position.x, this.particles[i + 1].position.y, p1.x, p1.y) < 0) {
          _g.fillStyle = this.frontColor;
          _g.strokeStyle = this.frontColor;
        } else {
          _g.fillStyle = this.backColor;
          _g.strokeStyle = this.backColor;
        }
        if (i == 0) {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
          _g.beginPath();
          _g.moveTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        } else if (i == this.particleCount - 2) {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
          _g.beginPath();
          _g.moveTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        } else {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        }
      }
    }
    this.Side = function(x1, y1, x2, y2, x3, y3) {
      return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
    }
  }
  ConfettiRibbon.bounds = new Vector2(0, 0);
  confetti = {};
  confetti.Context = function(id) {
    var i = 0;
    var canvas = document.getElementById(id);
    var canvasParent = canvas.parentNode;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    //canvas.width = canvasWidth * retina;
    //canvas.height = canvasHeight * retina;
    var context = canvas.getContext('2d');
    var interval = null;
    var confettiRibbons = new Array();
    ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
    for (i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons[i] = new ConfettiRibbon(random() * canvasWidth, -random() * canvasHeight * 2, ribbonPaperCount, ribbonPaperDist, ribbonPaperThick, 45, 1, 0.05);
    }
    var confettiPapers = new Array();
    ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
    for (i = 0; i < confettiPaperCount; i++) {
      confettiPapers[i] = new ConfettiPaper(random() * canvasWidth, random() * canvasHeight);
    }
    this.resize = function() {
      // canvasWidth = canvasParent.offsetWidth;
      // canvasHeight = canvasParent.offsetHeight;
      // canvas.width = canvasWidth * retina;
      // canvas.height = canvasHeight * retina;
      // ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
      // ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
    }
    this.start = function() {
      this.stop()
      var context = this;
      this.update();
    }
    this.stop = function() {
      cAF(this.interval);
    }
    this.update = function() {
      var i = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < confettiPaperCount; i++) {
        confettiPapers[i].Update(duration);
        confettiPapers[i].Draw(context);
      }
      for (i = 0; i < confettiRibbonCount; i++) {
        confettiRibbons[i].Update(duration);
        confettiRibbons[i].Draw(context);
      }
      this.interval = rAF(function() {
        confetti.update();
      });
    }
  }
  confetti = new confetti.Context('confetti-canvas');
                    // confetti.start();

  window.addEventListener('resize', function(event){
    // confetti.resize();
  });
});