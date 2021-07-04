// Config
const PREFIX = '/api';
const PORT = 3002;

//
// Initialize the json-server
//
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
server.use(middlewares); // Set default middlewares (logger, static, cors and no-cache)

//
// Handle resolve-url:s.
//
const resolveUrl = require('./resolve-url.js');
server.use(PREFIX + '/resolve-url', (req, res, next) => {
    const newUrl = resolveUrl(req.query.path);
    if (newUrl) {
        res.redirect(PREFIX + newUrl);
    } else next();
});

// Rewrite routed responses
router.render = (req, res) => {
    res.json({
        code: res.statusCode,
        data: res.locals.data
    });
};

// Add the router as middleware
server.use(PREFIX, router);

// Start the server
server.listen(PORT, () => {
    console.log('JSON Server is running on port ' + PORT + '.');
});
