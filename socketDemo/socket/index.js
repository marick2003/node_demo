const firebaseAdminDb=require('../connections/firebase_admin');
const messageRef=firebaseAdminDb.ref('/msg');
const Messages = require('../models/Messages');
const moment = require('moment');

class SocketHander {

    constructor() {
        this.db;
    }

    connect() {

        //this.db.Promise = global.Promise;
        this.db="connect";
    }

    getMessages() {
       
        return  this.db;
    }

    storeMessages(data) {

        
        var msgcontent={};
        const newMessages = {
            name: data.name,
            msg: data.msg,
            time: moment().valueOf(),
        };
        console.log(newMessages);
        const messagesRef = messageRef.push();
        const key= messagesRef.key;
        msgcontent.id=key;
        msgcontent=newMessages;
        console.log(key);
        firebaseAdminDb.ref('/msg/'+key).set(msgcontent).then(function(snapshot){


        });
       
    }
}

module.exports = SocketHander;