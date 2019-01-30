
socket = io.connect('ws://localhost:3000');

socket.on('history', (obj) => {
    //if (obj.length() > 0) {
       // console.log("length "+obj.length);
        appendData(obj);
    //}
});

socket.on('message', (obj) => {
   // console.log(obj);
    appendData([obj]);
});

document.querySelector('button').addEventListener('click', () => {
    Send();
});

function Send() {

    let name = document.querySelector('#name').value;
    let msg = document.querySelector('#msg').value;
    if (!msg && !name) {
        alert('請輸入大名和訊息');
        return;
    }
    let data = {
        name: name,
        msg: msg,
    };
    console.log("message "+data.name + data.msg);
    socket.emit('message', data);
    document.querySelector('#msg').value = '';
}

function appendData(obj) {

    let el = document.querySelector('.chats');
    let html = el.innerHTML;
    console.log("obj"+obj);
    if(obj!=undefined){
        // obj.forEach(function(element) {
        //     html +=
        //         `
        //         <div class="chat">
        //             <div class="group">
        //                 <div class="name">${element.name}：</div>
        //                 <div class="msg">${element.msg}</div>
        //             </div>
        //             <div class="time">${moment(element.time).fromNow()}</div>
        //         </div>
        //         `;
        // });
        for (let index = 0; index < obj.length; index++) {
            const element = obj[index];
                 html +=
                `
                <div class="chat">
                    <div class="group">
                        <div class="name">${element.name}：</div>
                        <div class="msg">${element.msg}</div>
                    </div>
                    <div class="time">${moment(element.time).fromNow()}</div>
                </div>
                `;
        }


        el.innerHTML = html.trim();
        scrollWindow();

    }
}

function scrollWindow() {
    let h = document.querySelector('.chats');
    h.scrollTo(0, h.scrollHeight);
}