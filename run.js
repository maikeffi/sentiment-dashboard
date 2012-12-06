var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    redis = require('redis'),
    Twit = require('twit');

var client = redis.createClient(),
    client2 = redis.createClient();

server.listen(9000);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/data.json', function (req, res) {
    client.get('sentiments', function(err, data) {
        res.end(data);
    });
});

io.sockets.on('connection', function (socket) {
    client2.on('message', function(channel, message) {
        console.log(channel + ': ' + message);
        socket.emit('sentiment', 'score');
    }).subscribe('sentiment');
    
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
var T = new Twit({
    consumer_key:         'AdNLMw3FCYFgxNJTS6xFw'
  , consumer_secret:      'OZ9WB0IlhKZIQcZd4WoxSRoemqQmUFnl3xeLLxrCCg'
  , access_token:         '36223965-Oge38wOSsCV2cuSfl5jOf5XX32fbsmE7qYw73VXhq'
  , access_token_secret:  'A9nyo0aaoCQrcMD0fpWu4PAnNheJ4lPZUD8lTPGvx7A'
});

// client.del('countries');
// client.del('tweets');

//
//  filter the twitter public stream by the word 'mango'. 
//  track: 'mongo'
// var stream = T.stream('statuses/filter', { track:'pasta', locations: [-177.1, -61.48, 13.71, 76.63] });
var stream = T.stream('statuses/filter', { track:'coke,mcdonalds,burger,fries' }) //, locations: [-180, -75, 180, 75] });

stream.on('tweet', function (tweet) {
  console.log(tweet.place['country_code'] + ' ' + tweet.text);
  client.lpush('countries', tweet.place['country_code']);
  client.lpush('tweets', tweet.text);
  client.set('update', 'yes');
});

//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
/*
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

var stream = T.stream('statuses/filter', { locations: sanFrancisco })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
*/

