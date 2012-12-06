Where are the Republican and Democratic Tweets?

To have launchd start redis at login:
    ln -sfv /Users/dirk/homebrew/opt/redis/*.plist ~/Library/LaunchAgents
Then to load redis now:
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
Or, if you don't want/need launchctl, you can just run:
    redis-server /Users/dirk/homebrew/etc/redis.conf
