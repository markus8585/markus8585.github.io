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
                console.log('EXIT to: ' + data.location);

                if(data.location == "outdoorDJs"){

                    if (Entities.locations.outdoorDJs.init){
                        console.log('DJS OUTDOOR INIT 0a');
                        Entities.locations.outdoorDJs.init(data);
                        // Entities.locations.outdoorDJs.init = false;
                    }else{
                        console.log('DJS OUTDOOR INIT 0b');
                        Entities.locations.outdoorDJs.entities(data);
                    }
                    data.location = "djs";

                }else{

                    if (Entities.locations.djs.init){
                        console.log('DJS INDOOR INIT 0a');
                        Entities.locations.djs.init(data);
                        // Entities.locations.djs.init = false;
                    }else{
                        console.log('DJS INDOOR INIT 0b');
                        Entities.locations.djs.entities(data);
                    }
                    data.location = "outdoorDJs";
                }
                Render.init(data);
            }
        }

        //Down Arrow
        if (Input.helpers.isPressed(40)) {
            jack.currentState = jack.states.crouching;
        }

        //Spacebar
        if (Input.helpers.isPressed(32)) {
            Game.movie(data);
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