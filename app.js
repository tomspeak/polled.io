let express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    path = require('path'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8000,
    env = process.env.NODE_ENV || 'dev';


let app = express();
let mongoUri = '';

/**
 * MongoDB setup
 */
if (env === 'dev') {
  mongoUri = 'mongodb://localhost/poll';
} else {
  mongoUri = process.env.MONGOLAB_URI;
}

app.db = mongoose.connect(mongoUri);



/**
 * App Config Setup
 */
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));

if (env == 'dev') {
  app.use(errorHandler());
} else {
  app.use(function(err, req, res, next) {
    console.error(err);
    res.send(500, 'Sorry, there\'s been an error!');
  });
}


/**
 * Routes
 */
let routes = {
  index: require('./routes/index.js'),
  poll: require('./routes/poll.js'),
};

/**
 * Routing
 */

//Poll
app.get('/api/poll/:url', routes.poll.getPoll);
app.post('/api/poll', routes.poll.createPoll);
app.put('/api/poll/:url/vote', function(req, res, next) {
  routes.poll.vote(req, res, function(poll) {
    io.sockets.in(req.headers.referer).emit('voted', poll);
  });
});

//Direct all normal traffic to / and allow backbone to dictate navigation.
app.use(function(req, res, next) {
  return res.render('index');
});

//404
app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', {
      url: req.url
    });
    return;
  }

  res.type('txt').send('Not found');
});


/**
 * Server setup
 */
let server = app.listen(port, function() {
  let host = server.address().address,
  port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});


/**
 * Socket IO setup
 */
let io = require('socket.io')(server);

/**
 * The sockets are set up so when a user connects, they join a socket.io 'room' of their requested URL.
 * A connection is only made when a user sends a GET request to /api/poll. This is triggered via /poll/:url.
 * So an example 'room' would be: http://polled.io/poll/udwkwa
 *
 * All users that view the URL join that room, so when a poll is sent a PUT request, a 'voted' event is emited to everyone
 * viewing that poll, because the PUT's request URL is passed in as the room to trigger. .join() can be viewed as, everyone on the
 * same web page.
 */
io.sockets.on('connection', function(socket) {
  socket.join(socket.handshake.headers.referer);

  socket.on('disconnect', function() {
    socket.leave(socket.handshake.headers.referer);
  });
});
