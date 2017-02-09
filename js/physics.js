var Physics = {
    update: function (data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
        if(Game.walkOn && !Game.hasRansom && data.location == "djs"){
            Physics.walkTo(data, 73*3, "left");
            ga('send', 'event', 'Game', 'enterdjs', 'Game Enter djs', 0);
                
        }
        if(Game.walkOn && !Game.hasRansom && data.location == "indoorLab"){
            Physics.walkTo(data, 580, "left");
        }
    },

    collisionDetection: function (data) {
        var jack = data.entities.jack;
        data.dialog = false;
        data.entities.dialog = "";

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

        if(data.location == "rogers"){
            entityCollisionCheck(data.entities.dog);
        }

        if(data.location == "djs"){
            entityCollisionCheck(data.entities.dex);
        }

        if(data.location == "indoorChurch" && data.entities.mom){
            entityCollisionCheck(data.entities.mom);
        }

        if(data.location == "indoorRogers" && data.entities.allison){
            entityCollisionCheck(data.entities.allison);
        }

        if(data.location == "rogers" && data.entities.roger){
            entityCollisionCheck(data.entities.roger);
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
                    if( (jack.x+jack.w) > 700  && data.location == "outdoorDJs"){
                        jack.exitReady = "outdoorChurch";
                        Game.travel(data);
                        jack.x = 10; jack.y = 168*3;
                    }

                    if( (jack.x+jack.w) > 700  && data.location == "outdoorChurch"){
                        jack.exitReady = "rogers";
                        Game.travel(data);
                        jack.x = 10; jack.y = 168*3;
                    }

                    if( (jack.x+jack.w) > 700  && data.location == "rogers"){
                        jack.exitReady = "outdoorLab";
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

                    if( (jack.x+jack.w) < 100  && data.location == "rogers"){
                        jack.exitReady = "outdoorChurch";
                        Game.travel(data);
                        jack.x = 700; jack.y = 168*3;
                    }

                    if( (jack.x+jack.w) < 100  && data.location == "outdoorLab"){
                        jack.exitReady = "rogers";
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
            //Top of Bar Collision
            if (
                // (jack.y+jack.h-30) < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                // jack.x < (entity.x + entity.w) - 10 && 
                // jack.velY >= 0
                (jack.y+jack.h-20) < entity.y && 
                (jack.x + jack.w - 15) > entity.x &&
                (jack.x + 15 ) < (entity.x + entity.w) && 
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
                    if(data.location == "outdoorDJs" && !Game.rogerSafe){
                        // jack.actionState = "explore";
                        data.dialog = true;
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

                    }
                    if( !Game.hasRansom && data.location == "djs"){
                        data.movieScreen = 0;
                        jack.direction = "left";   
                        Game.walkOn = true;
                    }
                    if( data.entities.score.value > 10 && data.location == "indoorLab"){
                        if (data.movieScreen < 9 ){
                            data.movieScreen = 9;
                            Game.walkOn = true;
                        }
                        jack.direction = "left";   
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

        if(data.location == "djs" && entity.type === "ransomNote"){
            jack.actionState = "readNote";
        }else{
            if(data.location == "djs" && jack.actionState){ jack.actionState = false; }
        }

        if(!data.entities.jack.collisionOff && entity.type === "dog"){
            if(entity.x > jack.x && (jack.y+jack.h) > (entity.y+8) ){
                if( (jack.x+jack.w-5) > (entity.x+10) ){
                    data.entities.jack.velY = -15;
                    data.entities.jack.x -= 13;
                    data.entities.jack.collisionOff = true;
                }

            }else{
                if( (entity.x+entity.w-10) > (jack.x+10) && (jack.y+jack.h) > (entity.y+8) ){
                    data.entities.jack.velY = -15;
                    data.entities.jack.x += 13;
                    data.entities.jack.collisionOff = true;
                }
            }
            setTimeout(function(){ 
                data.entities.jack.collisionOff = false;
            }, 1000);
        }

        if(entity.type === "dex"){
            if ((jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w)) {
                data.dialog = true;
                if(!data.storyLine.ransom){
                        data.modal = new Image();
                        data.modal.src = "img/cant-talk-coffee.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                        // data.entities.dexModal = new Entities.helpers.stillChar(data.modal, 0, 0, 256*3, 200*3, 0, 0);
                }else{
                    data.modal = new Image();
                        data.modal.src = "img/dj-napped-jo.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                }
                // Render.helpers.drawEntity(dexModal, data.canvas.movieCtx);
            }
        }




        if(data.location == "indoorRogers" && entity.type === "stillChar"){
            if ((jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w)) {
                data.dialog = true;
                if(!data.storyLine.ransom){
                        data.modal = new Image();
                        data.modal.src = "img/busy-weaving.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                        // data.entities.dexModal = new Entities.helpers.stillChar(data.modal, 0, 0, 256*3, 200*3, 0, 0);
                }else{
                    data.modal = new Image();
                        data.modal.src = "img/jos-kidnapped.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                }
                // Render.helpers.drawEntity(dexModal, data.canvas.movieCtx);
            }
        }


        if(data.location == "indoorChurch" && entity.type === "stillChar"){
            if ((jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w)) {
                data.dialog = true;
                if(!data.storyLine.ransom){
                        data.modal = new Image();
                        data.modal.src = "img/love-jojo.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                        // data.entities.dexModal = new Entities.helpers.stillChar(data.modal, 0, 0, 256*3, 200*3, 0, 0);
                }else{
                    data.modal = new Image();
                        data.modal.src = "img/jojo-worry.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                }
                // Render.helpers.drawEntity(dexModal, data.canvas.movieCtx);
            }
        }

        if(data.location == "rogers" && entity.type === "stillChar"){
            jack.actionState = "saveRoger";
        }else{
            if(data.location == "rogers" && jack.actionState){ jack.actionState = false; }
        }

        if(data.location == "rogers" && entity.type === "stillChar"){

            if ((jack.x+15) > entity.x && jack.y >= entity.y && (jack.x + jack.w) <= (entity.x + 15 + entity.w)) {
                data.dialog = true;
                if(!data.storyLine.ransom){
                        data.modal = new Image();
                        if(Game.rogerSafe){
                            data.modal.src = "img/roger-thx.png";
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
                            data.modal.src = "img/roger-save.png";
                            data.entities.dialog = {
                                type: "ransomNote",
                                sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                                //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                                x: 0,
                                y: 0,
                                w: 256*xScale,
                                h: 200*xScale
                            }
                        }
                        // data.entities.dexModal = new Entities.helpers.stillChar(data.modal, 0, 0, 256*3, 200*3, 0, 0);
                }else{
                    data.modal = new Image();
                        // data.modal.src = "img/roger-thx.png";
                        data.modal.src = "img/that-way.png";
                        data.entities.dialog = {
                            type: "ransomNote",
                            sprite: new Entities.helpers.Sprite(data.modal, 0, 0, 256 * xScale, 200 * xScale),
                            //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                            x: 0,
                            y: 0,
                            w: 256*xScale,
                            h: 200*xScale
                        }
                }
                // Render.helpers.drawEntity(dexModal, data.canvas.movieCtx);
            }
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
            if(data.location == "indoorLab"){
                Game.movie(data);
            }
            Game.walkOn = false;
            Game.hasRansom = true;
            data.entities.jack.direction = "right"; 
        }
    },

    helpers: {
        gravity: function (entity) {
            // entity.velY += 1.2 * 1.5; //1.8
            entity.velY += 2.4;
            entity.y += entity.velY;
        }
    }
};