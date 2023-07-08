const fs = require('fs')
const net = require('net');

const HOST = 'localhost';
const PORT = 12345;
const pipe_name = 'my_pipe'
const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received data(${new Date()}):`, data.toString());
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, HOST, () => {
  console.log('Server listening on', HOST + ':' + PORT);
});
// setInterval(()=>{
//     // console.log('this is hit')
//     fs.stat(pipe_name, (err, stats)=>{
//         if(err){console.error(`Errror checking pipe stats: ${err}`); return}
//         if (stats.size>0){pipe.read();}
//     })
// },1000)

