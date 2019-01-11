var path = require("path");
var friends = require("../data/friend.js");

module.exports = function(app) {


    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });


    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newFriend = req.body;

        var fScore = newFriend.scores;

        var diffScores=[];

        for(var i=0; i<friends.length;i++) {
            diffScores[i] = checkScores(friends[i].scores,fScore);
        }

       // console.log("diffScores is "+diffScores);

        var index = 0;
        var value = diffScores[0];
        for (var i = 1; i < 10; i++) {
        if (diffScores[i] < value) {
            value = diffScores[i];
            index = i;
        }
        }
       // console.log(index);
        friends.push(newFriend);

        // We then display the JSON to the users
        res.json(friends[index]);

    });

    function checkScores(compScore,fScore) {

        var diff=0;
        for (var i=0; i<10; i++) {
            diff+=Math.abs(compScore[i]-fScore[i]);
        }
        return diff;
    }

} 