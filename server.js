const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    let color = COLORS[Math.floor(Math.random() * COLORS.length)]
    client.emit('user-color', color);
    client.on('new-message', chatMessage => {
        chatMessage.date = Date.now();
        io.emit('new-message', chatMessage);
    });

    // client.on('disconnect', () => { /* … */ }); x
});

app.use(express.static(__dirname+"/dist"));

app.get('*', (req,res) => {
    res.sendFile('/dist/index.html', {root: __dirname + "/"});
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const COLORS = [
    "Black",
    "Blue",
    "BlueViolet",
    "Brown",
    "CadetBlue",
    "Chocolate",
    "Crimson",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DodgerBlue",
    "FireBrick",
    "ForestGreen",
    "Green",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "Navy",
    "Orange",
    "OrangeRed",
    "Orchid",
    "Pink",
    "Plum",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SkyBlue",
    "SteelBlue",
    "Tomato",
    "Turquoise",
    "Violet",
  ];