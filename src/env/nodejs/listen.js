dop.listen = function(options) {
    var args = Array.prototype.slice.call(arguments, 0)

    if (dop.util.typeof(args[0]) != 'object') options = args[0] = {}

    if (typeof options.transport != 'function')
        options.transport = require('dop-transports').listen.ws

    return new dop.core.listener(args)
}
