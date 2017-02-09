var Input = {
    init: function (data) {
        var self = this;

        $(window).on("keydown", function (event) {
                self.helpers.down[event.keyCode] = true;
        });

        $(window).on("keyup", function () {
            delete self.helpers.down[event.keyCode];
            delete self.helpers.pressed[event.keyCode];
        });
    },

    update: function (data) {
        var jack = data.entities.jack;

        //Left Arrow
        if(!Game.walkOn && !Game.modal){
            if (Input.helpers.isDown(37)) {
                if (jack.velY === 0) {
                    jack.currentState = jack.states.walking;
                } else {
                    jack.x -= jack.velX;
                }

                jack.direction = "left";
            }

            //Right Arrow
            if (Input.helpers.isDown(39)) {
                if (jack.velY === 0) {
                    jack.currentState = jack.states.walking;
                } else {
                    jack.x += jack.velX;
                }

                jack.direction = "right";
            }

            //Up Arrow
            if (Input.helpers.isPressed(38)) {
                jack.currentState = jack.states.jumping;
                if(jack.exitReady){
                    if(data.location == "outdoorDJs" && !Game.rogerSafe){
                        data.modal = new Image();
                            data.modal.src = "img/explore.png";
                            data.entities.dialog = {
                                type: "ransomNote",
                                sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                                //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                                x: 0,
                                y: 0,
                                w: 256*xScale,
                                h: 200*xScale
                            }
                    }else{
                        Game.travel(data);
                        if(data.entities.exitDoor){
                            data.entities.jack.x = data.entities.exitDoor.x;
                            if( !Game.hasRansom && data.location == "djs"){
                                data.entities.jack.x = data.entities.exitDoor.x - 70;
                                data.entities.jack.direction = "left";
                            }
                            data.entities.jack.y = data.entities.exitDoor.y;
                        }
                        data.entities.jack.velY = 23;
                    }
                }

            }

            //Down Arrow
            if (Input.helpers.isPressed(40)) {
                jack.currentState = jack.states.crouching;
                if(jack.actionState == "readNote"){
                    data.movieScreen = 12;
                    Game.movie(data);
                }
                if(jack.actionState == "saveRoger"){
                    Game.rogerSafe = true;
                    ga('send', 'event', 'Game', 'saveroger', 'Game Save Roger', 0);

                }
            }
            
        }

        //Spacebar
        if (Game.allowInput && Input.helpers.isPressed(32)) {
            console.log(data);
            if(Game.modal){
                Game.movie(data);
            }
        }
    },

    helpers: {
        isDown: function (code) {
            return Input.helpers.down[code];
        },

        isPressed: function (code) {
            if (Input.helpers.pressed[code]) {
                return false;
            } else if (Input.helpers.down[code]) {
                return Input.helpers.pressed[code] = true;
            }

            return false;
        },

        down: {},
        pressed: {}
    }
};