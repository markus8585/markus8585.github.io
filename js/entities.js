
var Entities = {
    init: function (data) {

        console.log('Entities Init');
        
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35 * xScale, 256 * xScale, 200 * xScale),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);
        var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);

        //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
        
        var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3, "outdoorDJs");

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

        var coinLocations = [
                            // [16*3, 18*3],[32*3,18*3],[48*3,18*3],[64*3,18*3],[80*3,18*3],[96*3,18*3],[112*3,18*3],[128*3,18*3],[144*3,18*3],[160*3,18*3],[176*3,18*3],[192*3,18*3],[208*3,18*3],[224*3,18*3],
                            // [16*3, 50*3],[32*3,50*3],[48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],[160*3,50*3],[176*3,50*3],[192*3,50*3],[208*3,50*3],[224*3,50*3],
                            // [16*3, 82*3],[32*3,82*3],[48*3,82*3],[64*3,82*3],[80*3,82*3],[96*3,82*3],[112*3,82*3],[128*3,82*3],[144*3,82*3],[160*3,82*3],[176*3,82*3],[192*3,82*3],[208*3,82*3],[224*3,82*3],
                            // [16*3, 114*3],[32*3,114*3],[48*3,114*3],[64*3,114*3],[80*3,114*3],[96*3,114*3],[112*3,114*3],[128*3,114*3],[144*3,114*3],[160*3,114*3],[176*3,114*3],[192*3,114*3],[208*3,114*3],[224*3,114*3],
                            // [16*3, 146*3],[32*3,146*3],[48*3,146*3],[64*3,146*3],[80*3,146*3],[96*3,146*3],[112*3,146*3],[128*3,146*3],[144*3,146*3],[160*3,146*3],[176*3,146*3],[192*3,146*3],[208*3,146*3],[224*3,146*3],
                            ];

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

        Entities.locations[data.location].init(data);
        
    },

    locations: {
        outdoorDJs: {
            coinLocations:[
                            [64*3,18*3],[80*3,18*3],[160*3,18*3],[176*3,18*3],
                            [48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],[160*3,50*3],[176*3,50*3],
                            [48*3,82*3],[64*3,82*3],[160*3,82*3],[176*3,82*3],
                            [16*3, 114*3],[32*3,114*3],[48*3,114*3],[64*3,114*3],[160*3,114*3],[176*3,114*3],[192*3,114*3],[208*3,114*3],[224*3,114*3],
                            [16*3, 146*3],[32*3,146*3],[48*3,146*3],[64*3,146*3],[160*3,146*3],[176*3,146*3],[192*3,146*3],[208*3,146*3],[224*3,146*3],
                            ],
            init: function (data) {
                console.log('DJS OUTDOOR INIT 1');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 235 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;
                // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 64);
                // var jack = new Entities.helpers.Jack(data.spriteSheet, 305, 528 - 63, 48, 63);

                //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
                
                var exitDoor = new Entities.helpers.ExitDoor(305, 152*3, 17*3, 24*3,"djs");
                // var exitDoor = new Entities.helpers.ExitDoor(305, 152*3, 17*3, 24*3,"indoorLab");


                var score = data.entities.score;

                var modal = new Entities.helpers.Modal(290, 100);

                var wallLocations = [
                                    [-55, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3+7+48, 0, 17*3, 600],
                                    //[192, 384, 336, 216],
                                    //[726, 0, 42, 600]
                                    ];
                var passablebars = [
                    [35*3, 171*3, 21*3, 6], //bench
                    [93*3, 130*3, 56*3, 6], //sign
                    [131*3, 153*3, 19*3, 6], //window lvl1
                    [91*3, 104*3, 9*3, 6], //window lvl2
                    [91*3, 104*3, 9*3, 6], //window lvl2
                    [117*3, 107*3, 9*3, 6], //window lvl2
                    [75*3, 88*3, 91*3, 6], //roof
                    [87*3, 76*3, 67*3, 6], //roof
                    [172*3, 166*3, 26*3, 6], //table
                    
                ];

                var coinLocations = Entities.locations.outdoorDJs.coinLocations;

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
            entities: function (data) {
                console.log('DJS OUTDOOR INIT 2');
                //Entities.locations.outdoorDJs.init(data);
            },
        },

        djs: {
            coinLocations: [
                            // [48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],[160*3,50*3],[176*3,50*3],[192*3,50*3],
                            [48*3,82*3],[64*3,82*3],[80*3,82*3],[96*3,82*3],[112*3,82*3],[128*3,82*3],[144*3,82*3],[160*3,82*3],[176*3,82*3],[192*3,82*3],
                            [32*3,114*3],[48*3,114*3],[64*3,114*3],[80*3,114*3],[96*3,114*3],[112*3,114*3],[128*3,114*3],[144*3,114*3],[160*3,114*3],[176*3,114*3],[192*3,114*3],[208*3,114*3],
                            ],
            init: function (data) {
                console.log('DJS INIT');
                // console.log(data);
                 var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 64, 64);
                var dex = new Entities.helpers.dex(data.spriteSheet, 100, 154*3, 17*3, 22*3);
                
                var jo = new Entities.helpers.stillChar(data.spriteSheet, 180, 154*3, 17*3, 22*3, 430*3, 22*3);

                var jack = data.entities.jack;
                // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);
                var ransomNote = new Entities.helpers.RansomNote(data.spriteSheet,178*3, 175*3, 10*3, 6*3);

                //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
                
                var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3,"outdoorDJs");

                // var score = new Entities.helpers.Score(290, 70);

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
                    [103*3, 166*3, 40*3, 6],
                    [76*3, 133*3, 33*3, 6], // shelf
                    [128*3, 133*3, 33*3, 6], // shelf
                ];


                var coinLocations = Entities.locations.djs.coinLocations;

                // data.entities = {};

                data.entities.background = background;
                // data.entities.score = score;
                data.entities.modal = modal;
                data.entities.jo = jo;
                data.entities.jack = jack;
                data.entities.dex = dex;
                data.entities.ransomNote = ransomNote;

                data.entities.exitDoor = exitDoor;
                //data.entities.exitPipe = exitPipe;
                data.entities.wallsArray = [];
                data.entities.barsArray = [];
                data.entities.coinsArray = [];

                // console.log(data);
                // console.log(data.entities);



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

            entities: function (data) {
                console.log('DJS INIT 2');
            },
        },
        outdoorChurch: {
            coinLocations: [
                            //[48*3,18*3],[64*3,18*3],[80*3,18*3],[96*3,18*3],[112*3,18*3],[128*3,18*3],
                            [16*3, 50*3],[32*3,50*3],[48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],[160*3,50*3],[176*3,50*3],
                            [16*3, 82*3],[160*3,82*3],[176*3,82*3],
                            [16*3, 114*3],[160*3,114*3],[176*3,114*3],[192*3,114*3],[208*3,114*3],[224*3,114*3],
                            [16*3, 146*3],[160*3,146*3],[176*3,146*3],[192*3,146*3],[208*3,146*3],[224*3,146*3],
                            ],
            init: function (data) {
                console.log('DJS OUTDOOR INIT 1');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 256*3, 235 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;

                var dog = new Entities.helpers.dog(data.spriteSheet, 60, 159*3, 24*3, 17*3);
                var exitDoor = new Entities.helpers.ExitDoor(101*3, 152*3, 17*3, 24*3,"indoorChurch");
                var score = data.entities.score;
                var modal = new Entities.helpers.Modal(290, 100);
                var wallLocations = [
                        [-55, 0, 48, 600],
                        [0, 528, 768, 72],
                        [239*3+7+48, 0, 17*3, 600],
                    ];
                var passablebars = [
                        [61*3, 121*3, 97*3, 6],
                        [50*3, 81*3, 98*3, 6],
                        [117*3, 99*3, 23*3, 6]
                    ];
                
                var coinLocations = Entities.locations.outdoorChurch.coinLocations;
                data.entities = {};

                data.entities.background = background;
                data.entities.score = score;
                data.entities.modal = modal;
                data.entities.jack = jack;
                data.entities.dog = dog;
                data.entities.exitDoor = exitDoor;
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
            entities: function (data) {
                console.log('DJS OUTDOOR INIT 2');
                //Entities.locations.outdoorDJs.init(data);
            },
        },
        indoorChurch: {
            coinLocations: [
                //[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                //[201, 246], [249, 246], [297, 246], [345, 246], [393, 246], [441, 246], [489, 246],
                [201, 342], [249, 342], [297, 342], [345, 342], [393, 342], [441, 342], [489, 342]
                ],
            init: function (data) {
                console.log('Indoor Church INIT');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 435 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;
                var ransomNote = new Entities.helpers.RansomNote(data.spriteSheet,178*3, 175*3, 10*3, 6*3);
                var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3,"outdoorChurch");
                var modal = new Entities.helpers.Modal(290, 100);
                var wallLocations = [
                                    [0, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3, 0, 17*3, 600],
                                    ];
                var passablebars = [
                    //[96*3, 164*3, 54*3, 12*3], //choir
                    [37*3, 122*3, 43*3, 6], //window lvl1
                    [105*3, 122*3, 43*3, 6], //window lvl1
                    [173*3, 122*3, 43*3, 6], //window lvl1
                ];
                var coinLocations = Entities.locations.indoorChurch.coinLocations;

                data.entities.background = background;
                data.entities.modal = modal;
                data.entities.jack = jack;
                data.entities.ransomNote = ransomNote;
                data.entities.exitDoor = exitDoor;
                data.entities.wallsArray = [];
                data.entities.barsArray = [];
                data.entities.coinsArray = [];



                for (var i = 0, len = wallLocations.length; i < len; i++) {
                    data.entities.wallsArray.push( 
                        new Entities.helpers.Wall( 
                            //x,y,w,h
                            wallLocations[i][0], wallLocations[i][1], wallLocations[i][2], wallLocations[i][3] 
                        ) 
                    );
                }

                for (var i = 0, len = passablebars.length; i < len; i++) {
                    data.entities.barsArray.push(
                        new Entities.helpers.Bar(
                            //x,y,w,h
                            passablebars[i][0], passablebars[i][1], passablebars[i][2], passablebars[i][3] 
                        ) 
                    );
                }

                for (var i = 0, len = coinLocations.length; i < len; i++) {
                    data.entities.coinsArray.push(
                        new Entities.helpers.Coin(
                            // sprite,x,y,w,h
                            data.spriteSheet, coinLocations[i][0], coinLocations[i][1], 30, 42 
                        )
                    );
                }
            },

            entities: function (data) {
                console.log('Indoor church INIT 2');                
                Entities.locations.indoorChurch.init(data);
            },
        },
        outdoorLab: {
            coinLocations: [
                // [96*3,18*3],[112*3,18*3],[128*3,18*3],[144*3,18*3],[160*3,18*3],
                [48*3,50*3],[64*3,50*3],[192*3,50*3],[208*3,50*3],
                [16*3, 82*3],[32*3,82*3],[48*3,82*3],[64*3,82*3],[192*3,82*3],[208*3,82*3],
                [16*3, 114*3],[32*3,114*3],[48*3,114*3],[192*3,114*3],[208*3,114*3],[224*3,114*3],
                [16*3, 146*3],
                ],
            init: function (data) {
                console.log('Lab OUTDOOR INIT 1');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 512*3, 235 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;
                var exitDoor = new Entities.helpers.ExitDoor(141*3, 152*3, 17*3, 24*3,"indoorLab");
                var score = data.entities.score;
                var modal = new Entities.helpers.Modal(290, 100);
                var wallLocations = [
                                    [-55, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3+7+48, 0, 17*3, 600],
                                    //[192, 384, 336, 216],
                                    //[726, 0, 42, 600]
                                    ];
                var passablebars = [
                    [9*3, 160*3, 52*3, 6], //bar
                    [172*3, 160*3, 48*3, 6], //bar
                    [42*3, 145*3, 19*3, 6], //pipe
                    [61*3, 120*3, 21*3, 6], //roof-half
                    [82*3, 79*3, 104*3, 6], //roof
                    [106*3, 57*3, 56*3, 6], //sign
                    [186*3, 145*3, 10*3, 6], //ac
                    [93*3, 91*3, 14*3, 6], //window lvl2
                    [115*3, 91*3, 14*3, 6], //window lvl2
                    [138*3, 91*3, 14*3, 6], //window lvl2
                    [160*3, 91*3, 14*3, 6], //window lvl2
                    [72*3, 135*3, 14*3, 6], //window lvl1
                    [93*3, 135*3, 14*3, 6], //window lvl1
                    [166*3, 135*3, 14*3, 6], //window lvl1
                ];

                var coinLocations = Entities.locations.outdoorLab.coinLocations;

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
            entities: function (data) {
                console.log('DJS OUTDOOR INIT 2');
                Entities.locations.outdoorLab.init(data);
                //Entities.locations.outdoorDJs.init(data);
            },
        },
        indoorLab: {
            init: function (data) {
                console.log('Lab INDOOR INIT 1');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 256*3, 435 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;
                var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3,"outdoorLab");
                var score = data.entities.score;
                var modal = new Entities.helpers.Modal(290, 100);



                data.halt = new Image();
                data.halt.src = "img/no-beans.png";
                var halt = {
                type: "halt",
                sprite: new Entities.helpers.Sprite(data.halt, 0, 0, 256 * xScale, 200 * xScale),
                //sprite: new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 5 * xScale),
                x: 0,
                y: 0,
                w: 256*xScale,
                h: 200*xScale
                }
                // Render.helpers.drawEntity(data.entities.halt, data.canvas.bgCtx);


                var wallLocations = [
                                    [0, 0, 486, 600],
                                    [0, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3, 0, 17*3, 600],
                                    ];
                if(data.storyLine.ransom){
                    var wallLocations = [
                                    [0, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3, 0, 17*3, 600],
                                    ];
                }
                var passablebars = [
                    
                ];

                var coinLocations = [];

                data.entities = {};

                data.entities.halt = new Entities.helpers.stillChar(data.halt, 0, 0, 256*3, 200*3, 0, 0);

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
            entities: function (data) {
                console.log('DJS OUTDOOR INIT 2');
                Entities.locations.indoorLab.init(data);
                //Entities.locations.outdoorDJs.init(data);
            },
        },
        rogers: {
            coinLocations: [
                [32*3,50*3],[48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],
                [32*3,82*3],[48*3,82*3],[64*3,82*3],[80*3,82*3],[96*3,82*3],[112*3,82*3],[128*3,82*3],[144*3,82*3],
                [176*3,114*3],[192*3,114*3],[208*3,114*3],[224*3,114*3],
                [176*3,146*3],[192*3,146*3],[208*3,146*3],[224*3,146*3],
                ],
            init: function (data) {
                console.log('Rogers OUTDOOR INIT 1');
                var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 512*3, 435 * xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                var jack = data.entities.jack;
                var exitDoor = new Entities.helpers.ExitDoor(89*3, 152*3, 17*3, 24*3,"indoorRogers");
                var score = data.entities.score;
                var modal = new Entities.helpers.Modal(290, 100);
                var wallLocations = [
                                    [-55, 0, 48, 600],
                                    [0, 528, 768, 72],
                                    [239*3+7+48, 0, 17*3, 600],
                                    //[192, 384, 336, 216],
                                    //[726, 0, 42, 600]
                                    ];
                var passablebars = [
                    [67*3, 159*3, 13*3, 6], //pillar
                    [113*3, 159*3, 13*3, 6], //pillar
                    [26*3, 134*3, 141*3, 6], //roof 1
                    [36*3, 103*3, 121*3, 6], //roof 2
                ];

                var coinLocations = Entities.locations.rogers.coinLocations;

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
            entities: function (data) {
                console.log('DJS OUTDOOR INIT 2');
                Entities.locations.rogers.init(data);
                //Entities.locations.outdoorDJs.init(data);
            },
        },
        indoorRogers: {
            coinLocations: [
                            [48*3,50*3],[64*3,50*3],[80*3,50*3],[96*3,50*3],[112*3,50*3],[128*3,50*3],[144*3,50*3],[160*3,50*3],[176*3,50*3],[192*3,50*3],
                            [48*3,82*3],[64*3,82*3],[80*3,82*3],[96*3,82*3],[112*3,82*3],[128*3,82*3],[144*3,82*3],[160*3,82*3],[176*3,82*3],[192*3,82*3],
                            [32*3,114*3],[48*3,114*3],[64*3,114*3],[80*3,114*3],[96*3,114*3],[112*3,114*3],[128*3,114*3],[144*3,114*3],[160*3,114*3],[176*3,114*3],[192*3,114*3],[208*3,114*3],
                            ],
            init: function (data) {
                console.log('DJS INIT');
                // console.log(data);
                 var background = {
                    sprite: new Entities.helpers.Sprite(data.spriteSheet, 512*3, 35*xScale, 256 * xScale, 200 * xScale),
                    x: 0,
                    y: 0,
                    w: 768,
                    h: 600
                };

                // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 64, 64);
                var jack = data.entities.jack;
                // var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 48, 63);
                var ransomNote = new Entities.helpers.RansomNote(data.spriteSheet,178*3, 175*3, 10*3, 6*3);

                //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144 * xScale, 168 * xScale);
                
                var exitDoor = new Entities.helpers.ExitDoor(201*3, 146*3, 17*3, 30*3,"rogers");

                // var score = new Entities.helpers.Score(290, 70);

                var modal = new Entities.helpers.Modal(290, 100);

                if(data.storyLine.ransom){
                    var wallLocations = [
                        [0, 0, 48, 600],
                        [0, 528, 768, 72],
                        [239*3, 0, 17*3, 600],
                        //[192, 384, 336, 216],
                        //[726, 0, 42, 600]
                        ];
                }else{
                    var wallLocations = [
                        [0, 0, 48, 600],
                        [0, 528, 768, 72],
                        [239*3, 0, 17*3, 600],
                        //[192, 384, 336, 216],
                        //[726, 0, 42, 600]
                        ];
                }
                var passablebars = [
                    [40*3, 161*3, 50*3, 6],
                    [103*3, 166*3, 40*3, 6],
                    [76*3, 133*3, 33*3, 6], // shelf
                    [128*3, 133*3, 33*3, 6], // shelf
                ];


                var coinLocations = Entities.locations.indoorRogers.coinLocations;

                // data.entities = {};

                data.entities.background = background;
                // data.entities.score = score;
                data.entities.modal = modal;
                data.entities.jack = jack;
                data.entities.ransomNote = ransomNote;

                data.entities.exitDoor = exitDoor;
                //data.entities.exitPipe = exitPipe;
                data.entities.wallsArray = [];
                data.entities.barsArray = [];
                data.entities.coinsArray = [];

                // console.log(data);
                // console.log(data.entities);



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

            entities: function (data) {
                console.log('rogersS inDOOR INIT 2');
                Entities.locations.indoorRogers.init(data);
            },
        },
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
            // var spriteX = 260;
            var spriteX = 362;
            var spriteY = 0;
            this.collisionOff = false;
            this.actionState = false,
            this.jumpSound = new Audio("audio/lumberjack_jump.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 260 * xScale, 0 * xScale, 16 * xScale, 21 * xScale);
            this.spriteAnimations = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+0) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+22) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+44) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+66) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+88) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+110) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+132) * xScale, 16 * xScale, 21 * xScale)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+0) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+22) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+44) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+66) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+88) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+110) * xScale, 16 * xScale, 21 * xScale),
                            new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, (spriteY+132) * xScale, 16 * xScale, 21 * xScale)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, spriteX * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                standLeft: new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, 0 * xScale, 16 * xScale, 21 * xScale),
                jumpLeft: new Entities.helpers.Sprite(img, (spriteX + 17) * xScale, 132 * xScale, 16 * xScale, 21 * xScale),
                jumpRight: new Entities.helpers.Sprite(img, spriteX * xScale, 132 * xScale, 16 * xScale, 21 * xScale)
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
        dog: function (img, x, y, w, h) {
            var self = this;
            this.type = "dog";
            // var spriteX = 260;
            var spriteX = 0;
            var spriteY = 635*3;
            this.actionState = false,
            this.sprite = new Entities.helpers.Sprite(img, spriteX, spriteY, w, h);
            this.spriteAnimations = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, spriteX, (spriteY+0), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h+h), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h+h+h), w, h)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+0), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h+h), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h+h+h), w, h)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+0) * xScale, 24 * xScale, 17 * xScale),
                standLeft: new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+0) * xScale, 24 * xScale, 17 * xScale),
            };
            this.states = {
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
                            if (data.animationFrame % 11 === 0) {
                                self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame];
                                self.spriteAnimations.walkRight.currentFrame++;

                                if (self.spriteAnimations.walkRight.currentFrame > 3) {
                                    self.spriteAnimations.walkRight.currentFrame = 0;
                                }
                            }
                        } else {
                            if (data.animationFrame % 11 === 0) {
                                self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                                self.spriteAnimations.walkLeft.currentFrame++;

                                if (self.spriteAnimations.walkLeft.currentFrame > 3) {
                                    self.spriteAnimations.walkLeft.currentFrame = 0;
                                }
                            }
                        }
                    }
                }
            };
            this.currentState = self.states.walking;
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        dex: function (img, x, y, w, h) {
            var self = this;
            this.type = "dex";
            // var spriteX = 260;
            var spriteX = 260*3;
            var spriteY = 0;
            this.actionState = false,
            this.sprite = new Entities.helpers.Sprite(img, spriteX, spriteY, w, h);
            this.spriteAnimations = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, spriteX, (spriteY+0), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h+h), w, h),
                            new Entities.helpers.Sprite(img, spriteX, (spriteY+h+h+h), w, h)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+0), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h+h), w, h),
                            new Entities.helpers.Sprite(img, (spriteX + w), (spriteY+h+h+h), w, h)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+0) * xScale, 24 * xScale, 17 * xScale),
                standLeft: new Entities.helpers.Sprite(img, spriteX * xScale, (spriteY+0) * xScale, 24 * xScale, 17 * xScale),
            };
            this.states = {
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
                            if (data.animationFrame % 11 === 0) {
                                self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame];
                                self.spriteAnimations.walkRight.currentFrame++;

                                if (self.spriteAnimations.walkRight.currentFrame > 3) {
                                    self.spriteAnimations.walkRight.currentFrame = 0;
                                }
                            }
                        } else {
                            if (data.animationFrame % 11 === 0) {
                                self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                                self.spriteAnimations.walkLeft.currentFrame++;

                                if (self.spriteAnimations.walkLeft.currentFrame > 3) {
                                    self.spriteAnimations.walkLeft.currentFrame = 0;
                                }
                            }
                        }
                    }
                }
            };
            this.currentState = self.states.walking;
            this.direction = "right";
            this.velY = 0;
            this.velX = 3.8;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        stillChar: function (img, x, y, w, h, SpriteX, SpriteY) {
            this.type = "stillChar";
            this.sprite = new Entities.helpers.Sprite(img, SpriteX, SpriteY, w, h);
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

        RansomNote: function (img, x, y, w, h) {
            this.type = "ransomNote";
            this.sprite = new Entities.helpers.Sprite(img, 0 * xScale, 0 * xScale, 10 * xScale, 6 * xScale);
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

        ExitDoor: function (x, y, w, h, travelTo) {
            this.type = "exitDoor";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.travelTo = travelTo;
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