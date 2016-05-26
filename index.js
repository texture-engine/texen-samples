'use strict';

var fs = require('fs');
var path = require('path');

var di = fs.readdirSync(path.join(__dirname, 'data'));

di.sort(function (a, b) {
    return parseInt(a.split('.')[0]) - parseInt(b.split('.')[0]);
});

var data = [];

di.forEach(function (f) {
    data.push(require(path.join(__dirname, 'data', f)));
});

var demo = require('./demo.json');

demo.forEach(function (v, k) {
    demo[k]--;
});

module.exports = {
    data: data,
    demo: demo
};
