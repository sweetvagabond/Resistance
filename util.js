function Dictionary() {
    this.items = {};
};

Dictionary.prototype.containsKey = function(key) {
    return exports.hasOwn(this.items, key);
};

Dictionary.prototype.set = function(key, value) {
    this.items[key] = value;
};

Dictionary.prototype.get = function(key) {
    return this.items[key];
};

Dictionary.prototype.removeKey = function(key) {
    delete this.items[key];
};

Dictionary.prototype.keys = function() {
    return exports.propertyNames(this.items);
};

Dictionary.prototype.values = function() {
    return exports.propertyValues(this.items);
};

Dictionary.prototype.eachValue = function(callback) {
    exports.visitPropertyValues(this.items, callback);
};

exports.Dictionary = Dictionary;

exports.each = function(items, callback) {
    for (var i = 0; i < items.length; i += 1) {
        callback(items[i]);
    }
};

exports.hasOwn = function(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

exports.propertyNames = function(obj) {
    return exports.visitorBuffer(obj, exports.visitPropertyNames);
};

exports.propertyValues = function(obj) {
    return exports.visitorBuffer(obj, exports.visitPropertyValues);
};

exports.visitorBuffer = function(obj, visitor) {
    var ans = [];
    visitor(obj, function(value) {
        ans.push(value);
    });
    return ans;
};

exports.visitPropertyNames = function(obj, callback) {
    for (var property in obj) {
        if (exports.hasOwn(obj, property)) {
            callback(property);
        }
    }
};

exports.visitPropertyValues = function(obj, callback) {
    exports.visitPropertyNames(obj, function(property) {
        callback(obj[property]);
    });
};

exports.visitPropertyPairs = function(obj, callback) {
    exports.visitPropertyNames(obj, function(property) {
        callback(property, obj[property]);
    });
};
