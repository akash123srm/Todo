var EventEmitter = require('events');
var util = requitre('util');






function ModeCalculator(num) {
    EventEmitter.call(this);
    cont that = this;
    
    setTimeout(function () {
        
        for (var i = 1; i <= num; i++) {
            e.emit('BeforeProcess', i);
            
            console.log('Processing number:' + i);
            
            e.emit('AfterProcess', i);
        }
    }
    , 2000)
    
    return this;
}

util.inherits(ModeCalculator, EventEmitter);

var mode = new ModeCalculator();

mode.on('product', function (num1,num2) {
    console.log(' The product is: ' + (num1*num2));
});

mode.on('sum', function (num1,num2) {
    console.log(' The sum is: ' + (num1+num2));
});

mode.on('difference', function (num1,num2) {
    console.log(' The product is: ' + (abs(num1-num2));
});







