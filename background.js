chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getStorage') {
    switch(request.key){
      case 'sender':
        let sender = localStorage.getItem('sender');
        sendResponse({ value:  sender ? JSON.parse(sender) : {}});
        break;
      case 'receiver':
        let receiver = localStorage.getItem('receiver');
        if( receiver===null ) receiver = '';
        let receivers = localStorage.getItem('receivers');
        receivers = receivers===null ? {} : JSON.parse(receivers);
        if( receivers[receiver]===undefined )
          receivers[receiver] = {};
        sendResponse({value:  receivers[receiver]});
        break;
    }
  }
  if (request.type === 'setStorage') {
    switch(request.key){
      case 'sender':
        localStorage.setItem('sender', JSON.stringfy(request.value));
        break;
      case 'receiver':
        let receiver = localStorage.getItem('receiver');
        if( receiver===null ) receiver = '';
        let receivers = localStorage.getItem('receivers');
        receivers = receivers===null ? {} : JSON.parse(receivers);
        receivers[receiver] = request.value;
        localStorage.setItem('receivers', JSON.stringify(receivers));
        break;
    }
    sendResponse({ success: true });
  }
});
