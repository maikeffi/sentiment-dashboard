var redis = require('redis').createClient();

var Twit   = require('twit');
var stream = new Twit({
    consumer_key:         'CrtktWvOl0xR1lDV4rMVAA'
  , consumer_secret:      'guNeZTl3He5yD3kJ4lIH5T52Xnbti1A4Umauj4V08jM'
  , access_token:         '202459962-JWLKxFw9R09h1samBCAwqjFCulzNyN70vJnWwc3B'
  , access_token_secret:  'nBSRcQlTHVzUFnRqyj0K5Cc3ajRgugeZw5HFSdyY'
})

.stream('statuses/filter', 
    { track:'coke,mcdonalds,burger,fries' })

.on('tweet', function (tweet) {
    console.log(tweet.place['country_code'] + ' ' + tweet.text);
    redis.lpush('countries', tweet.place['country_code']);
    redis.lpush('tweets', tweet.text);
});
