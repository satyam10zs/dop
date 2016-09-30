
dop.set = function(object, property, value) {
    dop.util.invariant(dop.isRegistered(object), 'Object passed to dop.set must be a registered object');
    var mutation = dop.core.mutate(object, property, value);
    if (mutation !== false) {
        var object_id = dop.getObjectId(object);
        dop.core.storeMutation(mutation);
        dop.core.emitMutations();
    }
    return true;
};