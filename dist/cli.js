#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const program = new Command();

program
    .command('greet <name>')
    .action((name) => console.log(`Hello ${name}`));

program
    .command('add <num1> <num2>')
    .action((num1, num2) => console.log(`Sum: ${parseInt(num1) + parseInt(num2)}`));

program
    .command('subtract <num1> <num2>')
    .action((num1, num2) => console.log(`Difference: ${parseInt(num1) - parseInt(num2)}`));

program
    .command('multiply <num1> <num2>')
    .action((num1, num2) => console.log(`Product: ${parseInt(num1) * parseInt(num2)}`));

program
    .command('divide <num1> <num2>')
    .action((num1, num2) => {
    if (parseInt(num2) === 0) {
        console.log('Error: Division by zero is not allowed.');
    }
    else {
        console.log(`Quotient: ${parseInt(num1) / parseInt(num2)}`);
    }
});

program
    .command("quote")
    .action(async () => {
    try {
        const res = await axios.get('https://zenquotes.io/api/random');
        console.log(res.data[0].q);
    }
    catch (error) {
        console.log("error");
    }
});

program
    .command('uppercase <text>')
    .action((text) => console.log(text.toUpperCase()));

program
    .command('lowercase <text>')
    .action((text) => console.log(text.toLowerCase()));

program
    .command('length <text>')
    .action((text) => console.log(`Length: ${text.length}`));

program
    .command('random <min> <max>')
    .action((min, max) => {
        const mn = parseInt(min);
        const mx = parseInt(max);
        if (mn >= mx) {
            console.log('Error: min must be less than max');
        } else {
            console.log(`Random number: ${Math.floor(Math.random() * (mx - mn + 1)) + mn}`);
        }
    });

program
    .command('reverse <text>')
    .action((text) => console.log(text.split('').reverse().join('')));

program
    .command('time')
    .action(() => console.log(`Current time: ${new Date().toLocaleTimeString()}`));

program.parse();
