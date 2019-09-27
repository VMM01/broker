// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  const ipcRenderer = require('electron').ipcRenderer; 
  const btnclick = document.getElementById('msg_send_btn');
  const searchClick = document.getElementById('searchButton');

  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  btnclick.addEventListener('click', function () {
    let text = document.getElementsByClassName("write_msg")[0]
    let activeCategory = document.getElementsByClassName("chat_list active_chat")[0]
    let arg = [text.value, activeCategory.innerText]
    ipcRenderer.send("btnclick", arg);
    text.value = ''
  });

  // searchClick.addEventListener('click', function () {
  //   var arg = "secondparam";

  //   ipcRenderer.send("searchclick", arg);
  // });
  ipcRenderer.on('btnclick-task-finished', function(event,param) {
    console.log('btn finished');
  });

  
  


})



