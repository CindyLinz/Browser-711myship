// this is a content script of a browser addon
switch(window.location.href){
  case 'https://myship2.7-11.com.tw/EC2C/Page01':
    document.getElementById('checkB').checked = true;
    break;

  case 'https://myship2.7-11.com.tw/EC2C/Page02':
    // 設定 select 下拉選單為 1-1000 區間的選項
    document.getElementById('shippingValue').value = '7S4_888';

    // 設定實際包裹價值為 1000
    document.getElementById('orderAmount').value = '1000';

    // 觸發 change 事件以更新相關欄位
    const event = new Event('change');
    document.getElementById('shippingValue').dispatchEvent(event);
    break;

  case 'https://myship2.7-11.com.tw/EC2C/Page03':
    chrome.runtime.sendMessage(
      { type: 'getStorage', key: 'sender' },
      response => {
        let sender = response.value;
        if (sender.name) document.getElementById('senderName').value = sender.name;
        if (sender.phone) document.getElementById('senderPhone').value = sender.phone;
        if (sender.email) document.getElementById('senderEmail').value = sender.email;
        if (sender.shopid) {
          document.getElementById('returnStore').value = sender.shopname;
          document.getElementById('returnStoreId').value = sender.shopid;
          document.getElementById('returnStoreAddress').value = sender.shopaddr;
        }
      }
    );

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "save") {
        chrome.runtime.sendMessage(
          { type: 'setStorage', key: 'sender', value: {
            name: document.getElementById('senderName').value,
            phone: document.getElementById('senderPhone').value,
            email: document.getElementById('senderEmail').value,
            shopname: document.getElementById('returnStore').value,
            shopid: document.getElementById('returnStoreId').value,
            shopaddr: document.getElementById('returnStoreAddress').value
          } },
          response => {
          }
        );
      }
    });
    break;

  case 'https://myship2.7-11.com.tw/EC2C/Page04':
    let loadReceiver = () => {
      chrome.runtime.sendMessage(
        { type: 'getStorage', key: 'receiver' },
        response => {
          let receiver = response.value;
          document.getElementById('receiverName').value = receiver.name;
          document.getElementById('receiverPhone').value = receiver.phone;
          document.getElementById('receiverEmail').value = receiver.email;
          document.getElementById('sendStore').value = receiver.shopname;
          document.getElementById('sendStoreId').value = receiver.shopid;
          document.getElementById('sendStoreAddress').value = receiver.shopaddr;
        }
      );
    };
    loadReceiver();

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "save") {
        chrome.runtime.sendMessage(
          { type: 'setStorage', key: 'receiver', value: {
            name: document.getElementById('receiverName').value,
            phone: document.getElementById('receiverPhone').value,
            email: document.getElementById('receiverEmail').value,
            shopname: document.getElementById('sendStore').value,
            shopid: document.getElementById('sendStoreId').value,
            shopaddr: document.getElementById('sendStoreAddress').value
          } }
        );
      }
    });

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "assign")
        loadReceiver();
    });
    break;
}
