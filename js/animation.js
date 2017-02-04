var Animation = {
    update: function (data) {
        Animation.jack(data);
        if(data.location == "rogers"){
            Animation.dog(data);
        }
        Animation.coins(data);
    },

    jack: function (data) {
        data.entities.jack.currentState.animation(data);
    },

    dog: function (data) {
        var dog = data.entities.dog;
        dog.currentState.animation(data);
        if(dog.direction == "right"){
            dog.x += dog.velX;

            if( dog.x + dog.w >= 256*3){
                dog.direction = "left";
            }
        }else if(dog.direction == "left"){
            dog.x -= dog.velX;
            if( dog.x <= 0){
                dog.direction = "right";
            }
        }
    },

    coins: function (data) {
        data.entities.coinsArray.forEach(function (coin) {
            coin.currentState.animation(data);
        });
    }
};