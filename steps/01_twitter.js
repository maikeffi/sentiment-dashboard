var redis = require('redis').createClient();

var Twit   = require('twit');
var stream = new Twit({
    consumer_key:         'AdNLMw3FCYFgxNJTS6xFw'
  , consumer_secret:      'OZ9WB0IlhKZIQcZd4WoxSRoemqQmUFnl3xeLLxrCCg'
  , access_token:         '36223965-Oge38wOSsCV2cuSfl5jOf5XX32fbsmE7qYw73VXhq'
  , access_token_secret:  'A9nyo0aaoCQrcMD0fpWu4PAnNheJ4lPZUD8lTPGvx7A'
})

.stream('statuses/filter', 
    { track:'coke,mcdonalds,burger,fries' })

.on('tweet', function (tweet) {
    console.log(tweet.place['country_code'] + ' ' + tweet.text);
console.log(redis);
    redis.lpush('countries', tweet.place['country_code']);
    redis.lpush('tweets', tweet.text);
    redis.set('update', 'yes');
});
