require('./script2');
//it is usually instructed to write top of the code.
// you can not use it after decalration or use of variable
//it will not work it gives error. 

// var d = require('./script2')
//it is not manadatory to store in variable.

var a = 12;

var b = 13;

var c = 14;

// module.exports = a;
module.exports = {first:a,second:b,third:c};

// console.log(d);