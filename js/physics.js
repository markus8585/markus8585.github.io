var Physics = {
    update: function (data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
        if(Game.walkOn && !Game.hasRansom){
            Physics.walkTo(data, 73*3, "left");
        }
    },

    collisionDetection: function (data) {
        var jack = data.entities.jack;

        var entityCollisionCheck = function (entity) {
            if (jack.x < entity.x + entity.w &&
                jack.x + jack.w > entity.x &&
                jack.y < entity.y + entity.h &&
                jack.h + jack.y > entity.y) {
                //Collision Occured
                Physics.handleCollision(data, entity);
                // console.log(entity.type);
            }
        };

        data.entities.wallsArray.forEach(function (wall) {
            entityCollisionCheck(wall);
        });

        data.entities.barsArray.forEach(function (bar) {
            entityCollisionCheck(bar);
        });

        if(data.storyLine.ransom){
            data.entities.coinsArray.forEach(function (coin) {
                entityCollisionCheck(coin);
            });
        }

        entityCollisionCheck(data.entities.exitDoor);

            // console.log(data.storyLine.ransom+'  -  '+data.location);
        if(data.storyLine.ransom && data.location == "djs"){
        // console.log(data.entities.ransomNote);
            entityCollisionCheck(data.entities.ransomNote);
        }

        if(data.location == "outdoorChurch"){
            entityCollisionCheck(data.entities.dog);
        }

    },

    handleCollision: function (data, entity) {
        var jack = data.entities.jack;

        if (entity.type === "wall") {
            //Left Side Wall Collision
            if (jack.x < entity.x && jack.y >= entity.y) {
                jack.x = entity.x - jack.w;

                // if( (jack.x+jack.w) > 700 ){
                    // if(){}
                    if(data.location == "outdoorDJs"){
                        jack.exitReady = "outdoorChurch";
                        Game.travel(data);
                        jack.x = 10; jack.y = 168*3;
                    }
                // }
            }

            //Right Side Wall Collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;

                // if( (jack.x+jack.w) > 700 ){
                    // if(){}
                    if(data.location == "outdoorChurch"){
                        jack.exitReady = "outdoorDJs";
                        Game.travel(data);
                        jack.x = 700; jack.y = 168*3;
                    }
                // }
            }

            //Top of Wall Collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }

        if (entity.type === "bar") {
            // console.log('entity.x:'+entity.x+ ' entity.y:'+entity.y+' jack.x:'+jack.x+' jack.y:'+jack.y);
            //Top of Bar Collision
            if (
                (jack.y+jack.h-30) < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && 
                jack.velY >= 0
                ) {
                    jack.currentState = jack.states.standing
                    jack.y = entity.y - jack.h;
                    jack.velY = 0;
            }
        }

        if (entity.type === "coin") {
            var coinsArray = data.entities.coinsArray;
            var coinSound = entity.sound.cloneNode();
            var index = coinsArray.indexOf(entity);

            data.entities.score.value += 1;

            coinSound.play();
            Entities.locations[data.location].coinLocations.splice(index, 1);
            coinsArray.splice(index, 1);
        }

        if (entity.type === "exitPipe") {
            //Left Side Pipe Collision
            if (jack.x < entity.x && jack.y >= entity.y) {
                if (jack.velY === 0) {
                    //jack.x += 200;
                    jack.x = 60;
                    jack.y = 0;
                } else {
                    jack.x = entity.x - jack.w;
                }
            }

            //Right Side Pipe Collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }

            //Top of Pipe Collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }

        if (entity.type === "exitDoor") {
                    if( !Game.hasRansom && data.location == "djs"){
                        data.movieScreen = 0;
                        jack.direction = "left";   
                        Game.walkOn = true;
                    }

            // console.log( jack.x +' | '+ entity.x +' | '+ jack.y +' | '+ entity.y +' | '+ entity.w);
            // console.log( (jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w) );


            if ((jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w)) {
                jack.exitReady = entity.travelTo;
                if (jack.velY < 0) {
                    //IGNORE JUMP GO EXIT IN INPUT

                    // // jack.x = 305;
                    // // // jack.y = 0;
                    // // jack.y = 528 - 63; // Attach to ground
                    // // jack.velY = 23; //Cancel out jump velocity
                    // Game.walkOn = true;

                }

                // jack.direction = "left";   

            }else{
             if(jack.exitReady){ jack.exitReady = false; }
            }

            //Top of Door Collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }else{
            if(jack.exitReady){ jack.exitReady = false; }
        }

        if(entity.type === "ransomNote"){
            jack.actionState = "readNote";
        }else{
            if(jack.actionState){ jack.actionState = false; }
        }

        if(!data.entities.jack.collisionOff && entity.type === "dog"){
            if(entity.x > jack.x){
                if( (jack.x+jack.w-5) > (entity.x+10) ){
                    data.entities.jack.velY = -15;
                    data.entities.jack.x -= 13;
                    data.entities.jack.collisionOff = true;
                }

            }else{
                if( (entity.x+entity.w-10) > (jack.x+10) ){
                    data.entities.jack.velY = -15;
                    data.entities.jack.x += 13;
                    data.entities.jack.collisionOff = true;
                }
            }
            setTimeout(function(){ 
                data.entities.jack.collisionOff = false;
            }, 1000);
        }

    },

    walkTo: function(data, x, direction) {
        if(direction == "left"){
            //data.entities.jack.x > x
            doWalk = data.entities.jack.x > x;
        }else{
            //data.entities.jack.x < x
            doWalk = data.entities.jack.x < x;
        }
        if( doWalk ){
            if (data.entities.jack.velY === 0) {
                data.entities.jack.currentState = data.entities.jack.states.walking;
            } else {
                data.entities.jack.x -= data.entities.jack.velX;
            }
        }else{
            if(!Game.hasRansom){
                Game.movie(data);
            }
            Game.walkOn = false;
            Game.hasRansom = true;
            data.entities.jack.direction = "right";   
        }
    },

    helpers: {
        gravity: function (entity) {
            entity.velY += 1.2 * 1.5;
            entity.y += entity.velY;
        }
    }
};