var Entities = {
    init: function (data) {
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35 * xScale, 256 * xScale, 200 * xScale),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 64, 64);
        var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);

        //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
        
        var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3);

        var score = new Entities.helpers.Score(290, 70);

        var modal = new Entities.helpers.Modal(290, 100);

        var wallLocations = [
                            [0, 0, 48, 600],
                            [0, 528, 768, 72],
                            [239*3, 0, 17*3, 600],
                            //[192, 384, 336, 216],
                            //[726, 0, 42, 600]
                            ];
        var passablebars = [
            [40*3, 161*3, 50*3, 6],
            [103*3, 166*3, 40*3, 6]
        ];

        var coinLocations = [[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                             [201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                             [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]]

        data.entities = {};

        data.entities.background = background;
        data.entities.score = score;
        data.entities.modal = modal;
        data.entities.jack = jack;
        data.entities.exitDoor = exitDoor;
        //data.entities.exitPipe = exitPipe;
        data.entities.wallsArray = [];
        data.entities.barsArray = [];
        data.entities.coinsArray = [];


        for (var i = 0, len = wallLocations.length; i < len; i++) {
            data.entities.wallsArray.push( 
                new Entities.helpers.Wall( 
                    //x,y,w,h
                    wallLocations[i][0], 
                    wallLocations[i][1], 
                    wallLocations[i][2], 
                    wallLocations[i][3] 
                ) 
            );
        }

        for (var i = 0, len = passablebars.length; i < len; i++) {
            data.entities.barsArray.push( 
                new Entities.helpers.Bar( 
                    //x,y,w,h
                    passablebars[i][0], 
                    passablebars[i][1], 
                    passablebars[i][2], 
                    passablebars[i][3] 
                ) 
            );
        }

        for (var i = 0, len = coinLocations.length; i < len; i++) {
            data.entities.coinsArray.push( 
                new Entities.helpers.Coin( 
                    // sprite,x,y,w,h
                    data.spriteSheet,
                    coinLocations[i][0], 
                    coinLocations[i][1], 
                    30, 
                    42 
                ) 
            );
        }
    },

    locations: {
        outdoorDJs: function (data) {
            var background = {
                sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 235 * xScale, 256 * xScale, 200 * xScale),
                x: 0,
                y: 0,
                w: 768,
                h: 600
            };

            var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 64);
            // var jack = new Entities.helpers.Jack(data.spriteSheet, 305, 528 - 63, 48, 63);

            //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
            
            var exitDoor = new Entities.helpers.ExitDoor(305, 152*3, 17*3, 24*3);

            var score = data.entities.score;

            var modal = new Entities.helpers.Modal(290, 100);

            var wallLocations = [
                                [0, 0, 48, 600],
                                [0, 528, 768, 72],
                                [239*3, 0, 17*3, 600],
                                //[192, 384, 336, 216],
                                //[726, 0, 42, 600]
                                ];
            var passablebars = [
                
            ];

            var coinLocations = [];

            data.entities = {};

            data.entities.background = background;
            data.entities.score = score;
            data.entities.modal = modal;
            data.entities.jack = jack;
            data.entities.exitDoor = exitDoor;
            //data.entities.exitPipe = exitPipe;
            data.entities.wallsArray = [];
            data.entities.barsArray = [];
            data.entities.coinsArray = [];


            for (var i = 0, len = wallLocations.length; i < len; i++) {
                data.entities.wallsArray.push( 
                    new Entities.helpers.Wall( 
                        //x,y,w,h
                        wallLocations[i][0], 
                        wallLocations[i][1], 
                        wallLocations[i][2], 
                        wallLocations[i][3] 
                    ) 
                );
            }

            for (var i = 0, len = passablebars.length; i < len; i++) {
                data.entities.barsArray.push( 
                    new Entities.helpers.Bar( 
                        //x,y,w,h
                        passablebars[i][0], 
                        passablebars[i][1], 
                        passablebars[i][2], 
                        passablebars[i][3] 
                    ) 
                );
            }

            for (var i = 0, len = coinLocations.length; i < len; i++) {
                data.entities.coinsArray.push( 
                    new Entities.helpers.Coin( 
                        // sprite,x,y,w,h
                        data.spriteSheet,
                        coinLocations[i][0], 
                        coinLocations[i][1], 
                        30, 
                        42 
                    ) 
                );
            }
        },
        djs: function (data) {
            var background = {
                sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35 * xScale, 256 * xScale, 200 * xScale),
                x: 0,
                y: 0,
                w: 768,
                h: 600
            };

            // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 64, 64);
            var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);

            //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
            
            var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3);

            var score = data.entities.score;

            var modal = new Entities.helpers.Modal(290, 100);

            var wallLocations = [
                                [0, 0, 48, 600],
                                [0, 528, 768, 72],
                                [239*3, 0, 17*3, 600],
                                //[192, 384, 336, 216],
                                //[726, 0, 42, 600]
                                ];
            var passablebars = [
                [40*3, 161*3, 50*3, 6],
                [103*3, 166*3, 40*3, 6]
            ];

            var coinLocations = [[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                                 [201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                                 [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]]

            var coinLocations = [];
            var coinsArray = data.entities.coinsArray;
            data.entities = {};

            data.entities.background = background;
            data.entities.score = score;
            data.entities.modal = modal;
            data.entities.jack = jack;
            data.entities.exitDoor = exitDoor;
            //data.entities.exitPipe = exitPipe;
            data.entities.wallsArray = [];
            data.entities.barsArray = [];
            data.entities.coinsArray = coinsArray;


            for (var i = 0, len = wallLocations.length; i < len; i++) {
                data.entities.wallsArray.push( 
                    new Entities.helpers.Wall( 
                        //x,y,w,h
                        wallLocations[i][0], 
                        wallLocations[i][1], 
                        wallLocations[i][2], 
                        wallLocations[i][3] 
                    ) 
                );
            }

            for (var i = 0, len = passablebars.length; i < len; i++) {
                data.entities.barsArray.push( 
                    new Entities.helpers.Bar( 
                        //x,y,w,h
                        passablebars[i][0], 
                        passablebars[i][1], 
                        passablebars[i][2], 
                        passablebars[i][3] 
                    ) 
                );
            }

            // for (var i = 0, len = coinLocations.length; i < len; i++) {
            //     data.entities.coinsArray.push( 
            //         new Entities.helpers.Coin( 
            //             // sprite,x,y,w,h
            //             data.spriteSheet,
            //             coinLocations[i][0], 
            //             coinLocations[i][1], 
            //             30, 
            //             42 
            //         ) 
            //     );
            // }
        }
    },

    helpers: {
        Sprite: function (img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },

        Jack: function (img, x, y, w, h) {
            var self = this;

            this.jumpSound = new Audio("audio/lumberjack_jump.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 260 * xScale, 0 * xScale, 16 * xScale, 21 * xScale);
            this.spriteAnimations = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, 260 * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 22 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 44 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 66 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 88 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 110 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 260 * xScale, 132 * xScale, 16 * xScale, 21 * xScale)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, 277 * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 22 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 44 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 66 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 88 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 110 * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, 277 * xScale, 132 * xScale, 16 * xScale, 21 * xScale)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, 260 * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                standLeft: new Entities.helpers.Sprite(img, 277 * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                jumpLeft: new Entities.helpers.Sprite(img, 277 * xScale, 132 * xScale, 16 * xScale, 21 * xScale),
                jumpRight: new Entities.helpers.Sprite(img, 260 * xScale, 132 * xScale, 16 * xScale, 21 * xScale)
            };
            this.states = {
                exitReady: false,
                jumping: {
                    movement: function (data) {
                        if (self.velY === 0) {
                            var jumpSound = self.jumpSound.cloneNode();
                            jumpSound.play();
                            self.velY -= 23;
                        }
                    },
                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.jumpRight;
                        } else {
                            self.sprite = self.spriteAnimations.jumpLeft;
                        }
                    }
                },
                crouching: {
                    movement: function (data) {
                        if (self.velY === 0) {
                            self.y += 10;
                            self.velY += 23;
                        }
                    },
                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.jumpRight;
                        } else {
                            self.sprite = self.spriteAnimations.jumpLeft;
                        }
                    }
                },
                standing: {
                    movement: function (data) {
                        return;
                    },
                    animation: function (data) {
                        if (self.direction === "right") {
                            self.sprite = self.spriteAnimations.standRight;
                        } else {
                            self.sprite = self.spriteAnimations.standLeft;
                        }
                    }
                },
                walking: {
                    movement: function (data) {
                        if (self.direction === "right") {
                            self.x += self.velX;
                        } else {
                            self.x -= self.velX;
                        }
                    },
                    animation: function (data) {
                        if (self.direction === "right") {
                            if (data.animationFrame % 6 === 0) {
                                self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame];
                                self.spriteAnimations.walkRight.currentFrame++;

                                if (self.spriteAnimations.walkRight.currentFrame > 5) {
                                    self.spriteAnimations.walkRight.currentFrame = 0;
                                }
                            }
                        } else {
                            if (data.animationFrame % 6 === 0) {
                                self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                                self.spriteAnimations.walkLeft.currentFrame++;

                                if (self.spriteAnimations.walkLeft.currentFrame > 5) {
                                    self.spriteAnimations.walkLeft.currentFrame = 0;
                                }
                            }
                        }
                    }
                }
            };
            this.currentState = self.states.standing;
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Coin: function (img, x, y, w, h) {
            var self = this;
            this.type = "coin";
            this.sound = new Audio("audio/lumberjack_coin.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 99, 0, 10, 14);
            this.spriteAnimations = {
                spin: {
                    frames: [new Entities.helpers.Sprite(img, 99 * xScale, 0 * xScale, 10 * xScale, 14 * xScale), new Entities.helpers.Sprite(img, 115 * xScale, 0 * xScale, 10 * xScale, 14 * xScale),
                             new Entities.helpers.Sprite(img, 131 * xScale, 0 * xScale, 10 * xScale, 14 * xScale), new Entities.helpers.Sprite(img, 147 * xScale, 0 * xScale, 10 * xScale, 14 * xScale)],
                    currentFrame: 0
                }
            };
            this.states = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;

                            if (self.spriteAnimations.spin.currentFrame > 3) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            };
            this.currentState = self.states.spinning;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Wall: function (x, y, w, h) {
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Bar: function (x, y, w, h) {
            this.type = "bar";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        ExitPipe: function (x, y, w, h) {
            this.type = "exitPipe";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        ExitDoor: function (x, y, w, h) {
            this.type = "exitDoor";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Score: function (x, y) {
            this.value = 0;
            this.x = x;
            this.y = y;
            this.size = "25px";
            this.font = "PixelEmulator";
            this.color = "white";
        },

        Modal: function (x, y) {
            this.value = 0;
            this.x = (768/2) - (122*3/2);
            this.y = y;
            this.w = 122*3;
            this.size = "25px";
            this.font = "PixelEmulator";
            this.color = "white";
        }
    }
};