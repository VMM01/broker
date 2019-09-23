// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// function getData(){
//     console.log('eeee')
//     alert('huy');
//     console.log('haha');
//     var PORT = 33333;
//     var HOST = '127.0.0.1';
    
//     var dgram = require('dgram');
//     var message = new Buffer('My Parkour is God!');
//     var client = dgram.createSocket('udp4');
//     client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
//       if (err) throw err;
//       console.log('UDP message sent to ' + HOST +':'+ PORT);
//       client.close();
//     })
//   }
  // document.getElementById('btnEd').addEventListener('click', () => {
  //   getData();
  // })

  
  // This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// var PORT = 33333;
// var HOST = '127.0.0.1';

// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');

// server.on('listening', function() {
//   var address = server.address();
//  console.log('UDP Server listening on ' + address.address + ':' + address.port);
// });

// server.on('message', function(message, remote) {
//  console.log(remote.address + ':' + remote.port +' - ' + message);
// });

// server.bind(PORT, HOST);

// function sendData(){
//     console.log('haha');
//     var PORT = 33333;
//     var HOST = '127.0.0.1';
    
//     var dgram = require('dgram');
//     var message = new Buffer('My Parkour is God!');
//     var client = dgram.createSocket('udp4');
//     client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
//       if (err) throw err;
//       console.log('UDP message sent to ' + HOST +':'+ PORT);
//       client.close();
//     });
//       }
//       document.getElementById('btnEd').addEventListener('click', () => {
//         sendData();
//       })
    
      