var redis = require('redis').createClient();

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

server.listen(process.env.PORT || 9000);

app.get('/data.json', function (req, res) {
    // read sentiment data we saved in R:
    redis.get('sentiments', function(err, data) {
        res.end(data);
    });
});