export class Logger {
    private static instance: Logger | null = null;

    static getInstance(): Logger {
        if (!Logger.instance) {
            console.log("Creating new Logger instance...");
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    error(message: string): void {
        console.error(`[Logger] ${message}`);
    }
}

const singletonFileBanner = "\x1b[42m\x1b[30m\x1b[1m";
const singletonSectionBanner = "\x1b[102m\x1b[30m\x1b[1m";
const singletonReset = "\x1b[0m";

console.log(`\n${singletonFileBanner}========== FILE: singleton.ts ==========${singletonReset}`);

// Bad: Multiple loggers creating chaos
console.log(`${singletonSectionBanner}Example 1 (Bad): Multiple direct instances${singletonReset}`);
const logger1 = new Logger();
const logger2 = new Logger(); // Another logger writing to same file!?
console.log("logger1 === logger2:", logger1 === logger2);

// Good: Single logger everyone uses
console.log(`${singletonSectionBanner}Example 2 (Good): Shared singleton instance${singletonReset}`);
const logger11 = Logger.getInstance();
const logger22 = Logger.getInstance();
console.log("logger11 === logger22:", logger11 === logger22);

console.log(`${singletonFileBanner}======== END FILE: singleton.ts ========${singletonReset}\n`);

