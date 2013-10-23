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

Dictionary.prototype.size = function() {
    return exports.numberOfProperties(this.items);
};

function Set() {
    this.elements = {};
};

Set.prototype.add = function(value) {
    this.elements[value] = true;
};

Set.prototype.contains = function(value) {
    return exports.hasOwn(this.elements, value);
};

Set.prototype.size = function() {
    return exports.numberOfProperties(this.elements);
};

Set.prototype.values = function() {
    return exports.propertyNames(this.elements);
};

exports.Dictionary = Dictionary;
exports.Set = Set;

exports.each = function(items, callback) {
    for (var i = 0; i < items.length; i += 1) {
        callback(items[i]);
    }
};

exports.where = function(items, predicate) {
    var ans = [];
    exports.each(items, function(item) {
        if (predicate(item)) {
            ans.push(item);
        }
    });
    return ans;
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

exports.numberOfProperties = function(obj) {
    var ans = 0;
    exports.visitPropertyNames(obj, function() {
        ans += 1;
    });
    return ans;
};

exports.shuffle = function(v) {
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [rev. #1]
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
