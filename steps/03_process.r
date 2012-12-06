library(rjson)
library(rredis)

redisConnect(timeout=1)
# read tweets from Redis
tweets    <- unlist(redisLRange('tweets', 0, -1))
countries <- unlist(redisLRange('countries', 0, length(tweets)))

data <- data.frame(countries=countries, tweets=tweets,
    stringsAsFactors=FALSE)

# aggregate sentiments over countries
scores <- aggregate(tweets ~ countries, data, 
    function(sentences) {
        mean(sentiment(sentences, ref.words=pos)) -
        mean(sentiment(sentences, ref.words=neg))
    }
)
# save sentiments to Redis
redisSet('sentiments', charToRaw(toJSON(scores)))

cat(redisGet('sentiments'), '\n')
redisClose()