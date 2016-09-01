// var yao = require('./yao');
// var observable = yao.observable;
// var computable = yao.computable;
// var observer = yao.observer;

// var o1 = observable(false);
// var o2 = observable(5);
// var o3 = observable(10);
// var c = computable(function(){ return o1.get() ? o2.get() : o3.get()})

// observer(function() {
//     console.log(o1.get(), c.get());
// })

// o1.set(true);
// o2.set(10);
// o3.set(15);
// o1.set(false);
// o2.set(20);
// o3.set(30);

var yao = require('./yao');
var observable = yao.observable;
var computable = yao.computable;
var observer = yao.observer;
var transaction = yao.transaction;

var health = observable('GOOD');
var name = observable('John');
var isDead = observable(false);

var lastDead = isDead.get();

observer(() => {
    if (isDead.get() !== lastDead) {
        lastDead = isDead.get();
        if (lastDead) {
            console.log('I SAY: dead...!');    
            return;
        } else {
            console.log('I SAY: RESURRECTED!!!');
        }
    }

    observer(() => {
        console.log('I SAY: My health is ' + health.get());
    });

    observer(() => {
        console.log('I SAY: My name is ' + name.get());
    });
});


transaction(() => {
    console.log("> health = 'OKAY';")
    health.set('OKAY');

    console.log("> name = 'Victor';")
    name.set('Victor');

    console.log("> health = 'BAD';")
    health.set('BAD');

    console.log("> name = 'Stephan';")
    name.set('Stephan');

    console.log("> isDead = true;")
    isDead.set(true);

    console.log("> name = 'St. Stephan';")
    name.set('St. Stephan');

    console.log("> health = 'GODLIKE';")
    health.set('GODLIKE');

    console.log("> isDead = false;")
    isDead.set(false);
})

