#!/usr/bin/env node
const {Command} = require('commander'); 
const axios = require('axios'); 

const program = new Command(); 

program 
    .command('farewell <name>')
    .action((name) => console.log(`Goodbye ${name}`))

program
.command('power <base> <exp>')
.action((base, exp) => console.log(`Result: ${Math.pow(parseInt(base), parseInt(exp))}`))

program
.command('modulo <num1> <num2>')
.action((num1, num2) => console.log(`Remainder: ${parseInt(num1) % parseInt(num2)}`))   

program
.command('square <num>')
.action((num) => console.log(`Square: ${parseInt(num) * parseInt(num)}`))

program
.command('sqrt <num>')
.action((num) => {
    if (parseInt(num) < 0) {
        console.log('Error: Cannot calculate square root of negative number.');
    } else {
        console.log(`Square root: ${Math.sqrt(parseInt(num))}`);
    }
});

program 
.command("fact") 
.action(async () => {
    try{
        const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        console.log(res.data.text);   
    } catch (error) {
        console.log("error")
    }
})

program
    .command('capitalize <text>')
    .action((text) => console.log(text.charAt(0).toUpperCase() + text.slice(1)));

program
    .command('repeat <text> <times>')
    .action((text, times) => console.log(text.repeat(parseInt(times))));

program
    .command('words <text>')
    .action((text) => console.log(`Word count: ${text.split(' ').length}`));

program
    .command('coin')
    .action(() => console.log(`Coin flip: ${Math.random() < 0.5 ? 'Heads' : 'Tails'}`));

program
    .command('palindrome <text>')
    .action((text) => {
        const reversed = text.split('').reverse().join('');
        console.log(text === reversed ? 'Yes, it is a palindrome' : 'No, not a palindrome');
    });

program
    .command('date')
    .action(() => console.log(`Current date: ${new Date().toLocaleDateString()}`));

program.parse();