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
const ipcRenderer = require('electron').ipcRenderer;

(function enterText() {
  let channel = document.getElementById("addChannel")
  channel.addEventListener('click', () => {
    let name = document.getElementById('chanelName')
    createNewChat(name.value)
    reloadCategories()
    chat.className = "chat_list active_chat"
    ipcRenderer.send("categoryChosen", chatName.innerText)
  })
})()
ipcRenderer.on('getChannels', (event, message) => {
console.log(message)
message.forEach( (x) => {
    createNewChat(x)
  })
})

channelExist = (channelName) => {
  const chats = document.getElementsByClassName("inbox_chat")[0].childNodes
  for (let chat of chats) {
  chat.className = "chat_list"
  
  var peopleNode = document.createElement("div");
  peopleNode.className = "chat_people";
  var chatMain = document.createElement("div");
  chatMain.className = "chat_ib"
  var chatName = document.createElement("h5")
  if (chatName.innerText == chatName) { return true}
  }
  return false
}

createNewChat = (category) => {
  console.log(category)
  if (channelExist(category)) { return true }
  const chats = document.getElementsByClassName("inbox_chat")[0]
  var chat = document.createElement("div");
  chat.className = "chat_list"

  var peopleNode = document.createElement("div");
  peopleNode.className = "chat_people";
  var chatMain = document.createElement("div");
  chatMain.className = "chat_ib"
  var chatName = document.createElement("h5")
  chatName.innerText = category ;
  chatMain.appendChild(chatName);
  peopleNode.appendChild(chatMain)
  chat.appendChild(peopleNode)
  chat.addEventListener('click', function() { 
    reloadCategories()
    chat.className = "chat_list active_chat"
    ipcRenderer.send("categoryChosen", chatName.innerText)
  }, false);
  chats.appendChild(chat);
  // console.log(message) // Prints 'whoooooooh!'
}

reloadCategories = () => {
  const chats = document.getElementsByClassName("inbox_chat")[0].childNodes
  for (let chat of chats) {
    if (chat.className == "chat_list active_chat") {
      chat.className = "chat_list"
    }
  }
}



ipcRenderer.on('getMessages', (event, message) => {
  console.log(message) // Prints 'whoooooooh!'

  var parser = document.createElement("html")
  parser.innerHTML = message;
  var mesgs = document.getElementsByClassName('msg_history')[0]  
  mesgs.innerHTML = '';
  mesgs.appendChild(parser)
  


})

      