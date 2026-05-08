export const strategyPatternExampleModule = true;

// ─── Shipping Strategy ───────────────────────────────────────────────────────

interface ShippingStrategy {
    calculate(weight: number): number;
}

class StandardShipping implements ShippingStrategy {
    calculate(weight: number): number {
        return weight * 5;
    }
}

class ExpressShipping implements ShippingStrategy {
    calculate(weight: number): number {
        return weight * 10;
    }
}

class OvernightShipping implements ShippingStrategy {
    calculate(weight: number): number {
        return weight * 20;
    }
}

class InternationalShipping implements ShippingStrategy {
    calculate(weight: number): number {
        return weight * 30;
    }
}

class ShippingService {
    constructor (private strategy: ShippingStrategy) { }

    calculate(weight: number): number {
        return this.strategy.calculate(weight);
    }

    setStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }
}

// ─── Notification Strategy ───────────────────────────────────────────────────

interface NotificationStrategy {
    send(message: string, recipient: string): void;
}

class EmailNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`[Email → ${recipient}]: ${message}`);
    }
}

class SmsNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`[SMS → ${recipient}]: ${message}`);
    }
}

class PushNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`[Push → ${recipient}]: ${message}`);
    }
}

class NotificationService {
    constructor (private strategy: NotificationStrategy) { }

    notify(message: string, recipient: string): void {
        this.strategy.send(message, recipient);
    }

    setStrategy(strategy: NotificationStrategy): void {
        this.strategy = strategy;
    }
}

// ─── Banners ─────────────────────────────────────────────────────────────────

const strategyFileBanner = "\x1b[41m\x1b[97m\x1b[1m";
const strategySectionBanner = "\x1b[101m\x1b[97m\x1b[1m";
const strategyReset = "\x1b[0m";

console.log(`\n${strategyFileBanner}=========== FILE: strategy.ts ===========${strategyReset}`);

// ─── Example 1 (Bad): Commuter with if/else ──────────────────────────────────

console.log(`${strategySectionBanner}Example 1 (Bad): Commuter - if/else nightmare${strategyReset}`);

class Commuter {
    goToWork(transportType: string): void {
        if (transportType === "car") {
            console.log("  Start car, Check gas, Navigate traffic, Park in garage");
        } else if (transportType === "bus") {
            console.log("  Check schedule, Wait at stop, Pay fare, Find seat");
        } else if (transportType === "bike") {
            console.log("  Check tires, Put on helmet, Lock at bike rack, Change clothes");
        }
        // This keeps growing with each transport type...
    }
}

const badCommuter = new Commuter();
badCommuter.goToWork("car");
badCommuter.goToWork("bus");
badCommuter.goToWork("bike");

console.log(`\n${strategyFileBanner}------ Next Block: BetterCommuter with Strategy ------${strategyReset}\n`);

// ─── Example 2 (Good): BetterCommuter with TransportStrategy ─────────────────

console.log(`${strategySectionBanner}Example 2 (Good): BetterCommuter - Strategy Pattern${strategyReset}`);

interface TransportStrategy {
    transport(): void;
}

class CarStrategy implements TransportStrategy {
    transport(): void {
        console.log("  Driving to work by car");
    }
}

class BusStrategy implements TransportStrategy {
    transport(): void {
        console.log("  Taking the bus to work");
    }
}

class BikeStrategy implements TransportStrategy {
    transport(): void {
        console.log("  Cycling to work");
    }
}

class BetterCommuter {
    private strategy!: TransportStrategy;

    setStrategy(strategy: TransportStrategy): void {
        this.strategy = strategy;
    }

    goToWork(): void {
        if (!this.strategy) {
            throw new Error("Transport strategy not set");
        }
        this.strategy.transport();
    }
}

const commuter = new BetterCommuter();
commuter.setStrategy(new CarStrategy());
commuter.goToWork();

// Easy to switch strategies
commuter.setStrategy(new BusStrategy());
commuter.goToWork();

commuter.setStrategy(new BikeStrategy());
commuter.goToWork();

console.log(`\n${strategyFileBanner}------ Next Block: Giant if/else for shipping ------${strategyReset}\n`);

// ─── Example 3 (Bad): Giant if/else ──────────────────────────────────────────

console.log(`${strategySectionBanner}Example 3 (Bad): Giant if/else for shipping${strategyReset}`);

function calculateShippingBad(type: string, weight: number): number {
    if (type === "standard") {
        return weight * 5;
    }
    if (type === "express") {
        return weight * 10;
    }
    if (type === "overnight") {
        return weight * 20;
    }
    return 0;
}

console.log("standard (3kg):", calculateShippingBad("standard", 3));
console.log("express  (3kg):", calculateShippingBad("express", 3));
console.log("overnight(3kg):", calculateShippingBad("overnight", 3));
console.log("unknown  (3kg):", calculateShippingBad("drone", 3), "← returns 0, silently fails");

console.log(`\n${strategyFileBanner}------ Next Block: ShippingService with Strategy ------${strategyReset}\n`);

// ─── Example 4 (Good): ShippingService with Strategy ────────────────────────

console.log(`${strategySectionBanner}Example 4 (Good): ShippingService with Strategy${strategyReset}`);

const service = new ShippingService(new StandardShipping());
console.log("standard (3kg):", service.calculate(3));

service.setStrategy(new ExpressShipping());
console.log("express  (3kg):", service.calculate(3));

service.setStrategy(new OvernightShipping());
console.log("overnight(3kg):", service.calculate(3));

// Adding a new strategy requires zero changes to ShippingService
service.setStrategy(new InternationalShipping());
console.log("international(3kg):", service.calculate(3));

console.log(`\n${strategyFileBanner}------ Next Block: Runtime strategy switching ------${strategyReset}\n`);

// ─── Example 5 (Good): Runtime switching based on user type ──────────────────

console.log(`${strategySectionBanner}Example 5 (Good): Runtime strategy switch by user type${strategyReset}`);

const users = [
    { name: "Ahmed", isPremium: true },
    { name: "Sara", isPremium: false },
    { name: "Mina", isPremium: true },
];

for (const user of users) {
    const strategy = user.isPremium ? new ExpressShipping() : new StandardShipping();
    const userService = new ShippingService(strategy);
    const cost = userService.calculate(5);
    console.log(`${user.name} (premium: ${user.isPremium}) → shipping cost: ${cost}`);
}

console.log(`\n${strategyFileBanner}------ Next Block: NotificationService with Strategy ------${strategyReset}\n`);

// ─── Example 6 (Good): NotificationService ───────────────────────────────────

console.log(`${strategySectionBanner}Example 6 (Good): NotificationService with Strategy${strategyReset}`);

const notifier = new NotificationService(new EmailNotification());
notifier.notify("Your order was placed", "ahmed@example.com");

notifier.setStrategy(new SmsNotification());
notifier.notify("Your OTP is 9876", "+201012345678");

notifier.setStrategy(new PushNotification());
notifier.notify("You have a new message", "device-token-abc");

console.log(`${strategyFileBanner}========= END FILE: strategy.ts =========${strategyReset}\n`);
