const rateLimit = require("express-rate-limit");

// access token limit
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window per minute
    message: {
        message:
            "Too many login attempts from this IP, please try again after a 60 second pause",
    },
    handler: (req, res, next, options) => {
        // console.log();(`Too Many Requests: ${options.{req.headers.origin}`, 'errLog. log')
        console.log(`Too Many Requests: `);
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-** headers
    legacyHeaders: false, // Disable the *X-RateLimit-** headers
});
module.exports = loginLimiter;
