const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4002;
const index = require("./routes/index");
const app = express();


app.use(index);
const server = http.createServer(app);
const io = socketIo(server);


var poll = {
  'title': "Which cuisine you like the most?",
  'options': ['Chinese', 'Indian', 'American', 'Italian']
}

var voteCount = {
  title: "Which cuisine you like the most?",
  options: ['Chinese', 'Indian', 'American', 'Italian'],
  responses:{
    'Chinese': 2,
    'Indian': 5,
    'American': 4,
    'Italian': 2
  }
};

io.on("connection", function (socket) {
  console.log('a client connected');

  io.emit('polls', poll)
  io.emit('votes', voteCount)

  socket.on('polls', function(vote){
    voteCount = voteCount + count;
    io.emit('polls', voteCount);
  });

  socket.on('votes', function(selectedOpt){
    voteCount.responses[selectedOpt]=(voteCount.responses[selectedOpt])?voteCount.responses[selectedOpt]+1:1;
    io.emit('votes', voteCount);
  });
  


  socket.on("disconnect", () => console.log("Client disconnected"));
});


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}


server.listen(port, () => console.log(`Listening on port ${port}`));