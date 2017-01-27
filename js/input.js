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

            //Down Arrow
            if (Input.helpers.isPressed(40)) {
                jack.currentState = jack.states.crouching;
                if(jack.actionState == "readNote"){
                    Game.movie(data, 8);
                }
            }
            
        }

        //Spacebar
        if (Input.helpers.isPressed(32)) {
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