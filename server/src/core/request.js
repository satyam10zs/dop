
// Create a new request
synko.request = function ( request_data ) {

    var request_id = this.requests_inc++;
    request_data.unshift( request_id );
    return this.requests[ request_id ] = {
        id: request_id, 
        data: request_data, 
        promise: new synko.util.promise(),
        users: 1
    };

};