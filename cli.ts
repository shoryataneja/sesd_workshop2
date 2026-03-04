#!/usr/bin/env node
import {Command} from 'commander';
import axios from 'axios'; 

class MathOperations {
    power(base: number, exp: number): number {
        return Math.pow(base, exp);
    }

    modulo(num1: number, num2: number): number {
        return num1 % num2;
    }

    square(num: number): number {
        return num * num;
    }

    sqrt(num: number): number | string {
        if (num < 0) {
            return 'Error: Cannot calculate square root of negative number.';
        }
        return Math.sqrt(num);
    }
}

class StringOperations {
    capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    repeat(text: string, times: number): string {
        return text.repeat(times);
    }

    wordCount(text: string): number {
        return text.split(' ').length;
    }

    isPalindrome(text: string): boolean {
        const reversed = text.split('').reverse().join('');
        return text === reversed;
    }
}

class RandomOperations {
    coinFlip(): string {
        return Math.random() < 0.5 ? 'Heads' : 'Tails';
    }
}

class APIService {
    async fetchRandomFact(): Promise<string> {
        try {
            const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            return res.data.text;
        } catch (error) {
            return 'error';
        }
    }
}

class DateTimeService {
    getCurrentDate(): string {
        return new Date().toLocaleDateString();
    }
}

class GreetingService {
    farewell(name: string): string {
        return `Goodbye ${name}`;
    }
}

class CLI {
    private program: any;
    private mathOps: MathOperations;
    private stringOps: StringOperations;
    private randomOps: RandomOperations;
    private apiService: APIService;
    private dateTimeService: DateTimeService;
    private greetingService: GreetingService;

    constructor() {
        this.program = new Command();
        this.mathOps = new MathOperations();
        this.stringOps = new StringOperations();
        this.randomOps = new RandomOperations();
        this.apiService = new APIService();
        this.dateTimeService = new DateTimeService();
        this.greetingService = new GreetingService();
        this.setupCommands();
    }

    private setupCommands(): void {
        this.program
            .command('farewell <name>')
            .action((name: string) => console.log(this.greetingService.farewell(name)));

        this.program
            .command('power <base> <exp>')
            .action((base: string, exp: string) => 
                console.log(`Result: ${this.mathOps.power(parseInt(base), parseInt(exp))}`));

        this.program
            .command('modulo <num1> <num2>')
            .action((num1: string, num2: string) => 
                console.log(`Remainder: ${this.mathOps.modulo(parseInt(num1), parseInt(num2))}`));

        this.program
            .command('square <num>')
            .action((num: string) => 
                console.log(`Square: ${this.mathOps.square(parseInt(num))}`));

        this.program
            .command('sqrt <num>')
            .action((num: string) => 
                console.log(`Square root: ${this.mathOps.sqrt(parseInt(num))}`));

        this.program
            .command('fact')
            .action(async () => console.log(await this.apiService.fetchRandomFact()));

        this.program
            .command('capitalize <text>')
            .action((text: string) => console.log(this.stringOps.capitalize(text)));

        this.program
            .command('repeat <text> <times>')
            .action((text: string, times: string) => 
                console.log(this.stringOps.repeat(text, parseInt(times))));

        this.program
            .command('words <text>')
            .action((text: string) => 
                console.log(`Word count: ${this.stringOps.wordCount(text)}`));

        this.program
            .command('coin')
            .action(() => console.log(`Coin flip: ${this.randomOps.coinFlip()}`));

        this.program
            .command('palindrome <text>')
            .action((text: string) => 
                console.log(this.stringOps.isPalindrome(text) ? 'Yes, it is a palindrome' : 'No, not a palindrome'));

        this.program
            .command('date')
            .action(() => console.log(`Current date: ${this.dateTimeService.getCurrentDate()}`));
    }

    run(): void {
        this.program.parse();
    }
}

const cli = new CLI();
cli.run();