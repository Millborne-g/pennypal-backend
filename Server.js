const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const { Server } = require("socket.io");
// const socketIo = require('socket.io');
const http = require("http");

const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const jwtRoutes = require("./routes/authRoutes");

require("dotenv").config();

// Server
const app = express();
const PORT = process.env.port || 5000;
app.use(express.json());
app.use(cors());

// Middleware to set security headers
// app.use((req, res, next) => {
//     // HSTS header
//     res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
//     // X-Content-Type-Options header
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     // X-Frame-Options header
//     res.setHeader('X-Frame-Options', 'DENY');
//     // X-XSS-Protection header
//     res.setHeader('X-XSS-Protection', '1; mode=block');
//     next();
// });

// app.use(function (req, res, next) {
//     res.setHeader(
//       'Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
//     );
//     console.log("test");
//     next();
// });

// Enable the necessary security headers
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.frameguard({ action: 'sameorigin' }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));

// routes
app.use(expenseRoutes);
app.use(incomeRoutes);
app.use(userRoutes);
app.use(messageRoutes);
app.use(jwtRoutes);

// Socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
    },
});
// const io = socketIo(server);

// Socket.IO
io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);

    // Handle real-time events here
    // Example: socket.on('chat message', (message) => { ... });

    socket.on("sendMessage", (data) => {
        socket.broadcast.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB..."))
    .catch((err) => console.log(err));

server.listen(PORT, () => console.log(`Listening to ${PORT}...`));
