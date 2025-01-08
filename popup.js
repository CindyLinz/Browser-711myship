// this is a popup script of a browser addon

let loadReceiverPage = () => {
  let receiver = localStorage.getItem('receiver');
  if( receiver===null )
    receiver = '';
  let receivers = localStorage.getItem('receivers');
  if( receivers===null )
    receivers = {};
  else
    receivers = JSON.parse(receivers);
  if( receivers[receiver]===undefined )
    receivers[receiver] = {};
  let select = document.getElementById('recipientSelect');
  select.innerHTML = '';
  for(let r in receivers){
    let opt = document.createElement('option');
    opt.value = r;
    opt.innerText = r;
    opt.selected = true;
    select.append(opt);
  }
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  switch(tabs[0].url) {
    case 'https://myship2.7-11.com.tw/EC2C/Page03':
      document.documentElement.style.setProperty('--Page03', 'block');
      document.documentElement.style.setProperty('--Page04', 'none');
      break;

    case 'https://myship2.7-11.com.tw/EC2C/Page04':
      loadReceiverPage();
      document.documentElement.style.setProperty('--Page03', 'none');
      document.documentElement.style.setProperty('--Page04', 'block');
      break;
      
    default:
      document.documentElement.style.setProperty('--Page03', 'none');
      document.documentElement.style.setProperty('--Page04', 'none');
  }
});

document.getElementById('btnSenderSave').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "save"
    });
  });
});

document.getElementById('recipientSelect').addEventListener('change', (ev) => {
  localStorage.setItem('receiver', ev.target.value);
});
document.getElementById('btnRecvAdd').addEventListener('click', () => {
  let receiver = prompt('收件人暱稱');
  localStorage.setItem('receiver', receiver);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "save"
    });
  });
  loadReceiverPage();
});
document.getElementById('btnRecvSave').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "save"
    });
  });
});
document.getElementById('btnRecvAssign').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "assign"
    });
  });
});
document.getElementById('btnRecvDelete').addEventListener('click', () => {
  let receiver = localStorage.getItem('receiver');
  if(receiver===null) receiver = '';
  let receivers = localStorage.getItem('receivers');
  recivers = receivers===null ? {} : JSON.parse(receivers);
  delete receivers[receiver];
  localStorage.setItem('receiver', '');
  localStorage.setItem('receivers', JSON.stringify(receivers));
  loadReceiverPage();
});

/*
document.getElementById('fill').addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "fillForm",
        data: document.getElementById('name').value
      });
    });
});

function updateSavedData() {
  browser.storage.local.get('formData')
    .then(result => {
      const savedData = document.getElementById('saved-data');
      savedData.textContent = JSON.stringify(result.formData, null, 2);
    });
}

updateSavedData();
*/

