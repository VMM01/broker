// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const net = require('net');
const name = "vadim";
const {ipcMain}	= require('electron');
var bindPORT = 0;
var bindHOST = '127.0.0.1';
var fp = require('find-free-port');

const serverAddress = '192.168.1.196';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  var client = new net.Socket();
  client.connect(13000, serverAddress, function() {
    console.log(`[HELLO-${name}]`);
    client.write(`[HELLO-${name}]`);
    fp(3000).then(([freep]) => {
      console.log('found ' + freep);
      bindPORT = freep;
      getDataFromServer();
    }).catch((err) => {
       console.error(err);
    });
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')  
  getButtonAction();
  mainWindow.on('closed', function () {
    var client = new net.Socket();
    client.connect(8000, serverAddress, function() {
      console.log(`[CLOSED]-${guid}`);
      client.write(`[CLOSED]-${guid}`);
    });
    mainWindow = null
  })
}

function getButtonAction() {
  ipcMain.on("btnclick",function (event, arg) {
    var message = {action: "send", message: "Hello world!", chanel: "Casino", name: name};
    sendData(JSON.stringify(message));
   event.sender.send("btnclick-task-finished", "yes"); 
  });
}

function sendData(message) {
  console.log('haha');
  var PORT = 616;
  var HOST = serverAddress;//'127.0.0.1';
  var dgram = require('dgram');
  var client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to server ' + HOST +':'+ PORT);
    client.close();
  });
 }

 function getDataFromServer() {
  
  var dgram = require('dgram');
  var udpServer = dgram.createSocket('udp4');
  
  udpServer.on('listening', function() {
    var address = udpServer.address();
   console.log('UDP Server listening on ' + address.address + ':' + address.port);
  });
  
  udpServer.on('message', function(message, remote) {
   console.log('Server: ' + remote.address + ':' + remote.port + ', message from the server: ' + message);
  });
  
  udpServer.bind(bindPORT, bindHOST);
 }

app.on('ready', createWindow) 


app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

  if (mainWindow === null) createWindow()
})


module.exports.serverAddress = serverAddress;
