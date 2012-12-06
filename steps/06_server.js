var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    redis = require('redis'),
    Twit = require('twit');

var redis = redis.createClient();

server.listen(process.env.PORT || 9000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/data.json', function (req, res) {
    redis.get('sentiments', function(err, data) {
        res.end(data);
    });
});

var T = new Twit({
    consumer_key:         'AdNLMw3FCYFgxNJTS6xFw'
  , consumer_secret:      'OZ9WB0IlhKZIQcZd4WoxSRoemqQmUFnl3xeLLxrCCg'
  , access_token:         '36223965-Oge38wOSsCV2cuSfl5jOf5XX32fbsmE7qYw73VXhq'
  , access_token_secret:  'A9nyo0aaoCQrcMD0fpWu4PAnNheJ4lPZUD8lTPGvx7A'
});

var stream = T.stream('statuses/filter', { track:'coke,mcdonalds,burger,fries' }) //, locations: [-180, -75, 180, 75] });

stream.on('tweet', function (tweet) {
  console.log(tweet.place['country_code'] + ' ' + tweet.text);
  redis.lpush('countries', tweet.place['country_code']);
  redis.lpush('tweets', tweet.text);
});

