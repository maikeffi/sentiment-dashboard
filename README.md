Are the Tweets happy?

Real-time Twitter sentiment dashboard.

Bash
====

    brew install git node redis   *)
    npm install -g git://github.com/opani/node-opani.git
    git clone git@opani.com:dirkneumann/sentiment-dashboard.git
    npm install

    cd steps
    node 01_twitter.js

R
====

    install.packages('rredis', repos='http://cran.r-project.org')
    library(rredis)
    redisConnect()
    redisLRange('tweets', 0, 3) -> tweets
    tweets <- unlist(tweets)

    install.packages(c('stringr', 'plyr'))
    source('02_sentiment.r')
    sentiment(tweets)
    Rscript 03_process.r

Node
====

    node 04_data.js
    open 05_index.html
    node 06_server.js
    cd ..
    node run.js


*) Redis
====

    # To have launchd start redis at login:
    ln -sfv /Users/dirk/homebrew/opt/redis/*.plist ~/Library/LaunchAgents
    # Then to load redis now:
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
    # Or, if you don't want/need launchctl, you can just run:
    redis-server /Users/dirk/homebrew/etc/redis.conf

