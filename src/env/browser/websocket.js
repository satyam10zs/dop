
var connectWebsocket = function(dop, node, options) {

    var url = 'ws://localhost:4444/';

    if (typeof options.url == 'string')
        url = options.url.replace('http','ws');
    else if (typeof window!='undefined' && /http/.test(window.location.href)) {
        var domain_prefix = /(ss|ps)?:\/\/([^\/]+)\/?(.+)?/.exec(window.location.href),
            protocol = domain_prefix[1] ? 'wss' : 'ws';
        url = protocol+'://'+domain_prefix[2].toLocaleLowerCase()+'/';
    }

    var socket = new options.transport.api(url),
        send = socket.send,
        send_queue = [];

    socket.send = function(message) {
        (socket.readyState !== 1) ?
            send_queue.push(message)
        :
            send.call(socket, message);
    };

    socket.addEventListener('open', function() {
        dop.core.onopen(node, socket);
        while (send_queue.length>0)
            send.call(socket, send_queue.shift());
    });

    socket.addEventListener('message', function(message) {
        dop.core.onmessage(node, socket, message.data, message);
    });

    socket.addEventListener('close', function() {
        dop.core.onclose(node, socket);
    });

    // socket.addEventListener('error', function(error) {
    //     dop.on.error(node, error);
    // });

    return socket;
};

// //nodejs
// window=undefined
// module.exports = true
// dop=undefined

// //es6
// window={}
// module.exports = {}
// dop=undefined

// //cdn
// window={}
// module.exports = undefined
// dop={}


if (typeof dop=='undefined' && typeof module == 'object' && module.exports) {
    connectWebsocket.api = require('ws');
    module.exports = connectWebsocket;
}
else if (typeof window != 'undefined')
    connectWebsocket.api = window.WebSocket;