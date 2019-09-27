// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const net = require('net');
const name = "vadim";
const publicIp = require('public-ip');
const {ipcMain}	= require('electron');
var bindPORT = 0;
var bindHOST = require("ip").address();

var PORT = 616;
var fp = require('find-free-port');
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

const serverAddress = '192.168.1.196';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')  

  var client = new net.Socket();
  client.connect(13000, serverAddress, function() {
    console.log(`[HELLO-${name}]`);
    fp(3000).then(([freep]) => {
      console.log('found ' + freep);
      bindPORT = freep;
      client.write(`[HELLO-${name}-${bindPORT}]`);
      listenUdp()
    }).catch((err) => {
        console.error(err);
    });
  });

  // let messaging = document.getElementsByClassName('messaging')[0];
  // messaging.style.backgroundColor = 'red'
  getButtonAction();
  mainWindow.on('closed', function () {
    var client = new net.Socket();
    client.connect(13000, serverAddress, function() {
      console.log(`[CLOSED]-${guid}`);
      client.write(`[CLOSED]-${name}-${bindPORT}`);
    });
    mainWindow = null
  })
}

function getButtonAction() {
  ipcMain.on("btnclick",function (event, arg) {
    var message = {action: "send", message: arg[0], channel: arg[1], name: name};
    sendData(JSON.stringify(message));
   event.sender.send("btnclick-task-finished", "yes");
  });

  ipcMain.on("categoryChosen",function (event, arg) {
    console.log(arg)
    var message = {action: "get", channel: arg};
    getDataFromServer(JSON.stringify(message));    
  });

  // ipcMain.on('channels', (event, arg) => {
  //   console.log(arg) // prints "ping"
  //   event.returnValue = ["casino","jopa","pizda"]
  // })
}

function sendData(message) {
  var HOST = serverAddress;//'127.0.0.1';
  var dgram = require('dgram');
  client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to server ' + HOST +':'+ PORT);
    var jsonMessage = JSON.parse(message)
    console.log('MESSAGE AFTER SENT', jsonMessage.channel)
    var server = {action: "get", channel: jsonMessage.channel};
    getDataFromServer(JSON.stringify(server))
  });
 }

 function getDataFromServer(message)
 {
  console.log('check message', message)
  client.send(message, 0 , message.length, PORT, serverAddress, function(err, bytes) {
    if (err) throw err;
    console.log('send to receive to ' + serverAddress + ':' + PORT);
  });
 }

 function listenUdp(message) {
  
  var dgram = require('dgram');
  var udpServer = dgram.createSocket('udp4');
  udpServer.bind(bindPORT, bindHOST);

  udpServer.on('listening', function() {
    var address = udpServer.address();
   console.log('UDP Server listening on ' + address.address + ':' + address.port);
  });
  
  udpServer.on('message', function(message, remote) {
    console.log('Server: ' + remote.address + ':' + remote.port + ', message from the server: ' + message);
    let json = JSON.parse(message);
    mainWindow.webContents.on('did-finish-load', () => {
      actionToRender(json)
    })
    actionToRender(json)
  });
 }

function actionToRender(json) {
  console.log('here');
      switch (json.action) {
        case "getChannels":
          var categories = json.value.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
          mainWindow.webContents.send(json.action, categories)
          break
        case "getMessages":
          var prefix = json.value.replace(/\\/g, '').slice(1)
          var messages = prefix.slice(0, prefix.length - 1)
          console.log(messages)
          mainWindow.webContents.send(json.action, messages)
          break
      }
}

app.on('ready', createWindow) 


app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (mainWindow === null) createWindow()
})


module.exports.serverAddress = serverAddress;
