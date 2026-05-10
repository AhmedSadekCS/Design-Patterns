export const decoratorPatternExampleModule = true;

interface CoffeeComponent {
    getPrice(): number;
    getDescription(): string;
}

class SimpleCoffee implements CoffeeComponent {
    public getPrice(): number {
        return 2;
    }

    public getDescription(): string {
        return "Simple Coffee";
    }
}

abstract class CoffeeDecorator implements CoffeeComponent {
    constructor(protected coffee: CoffeeComponent) { }

    public abstract getPrice(): number;
    public abstract getDescription(): string;
}

class MilkDecorator extends CoffeeDecorator {
    public getPrice(): number {
        return this.coffee.getPrice() + 0.5;
    }

    public getDescription(): string {
        return this.coffee.getDescription() + ", Milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    public getPrice(): number {
        return this.coffee.getPrice() + 0.3;
    }

    public getDescription(): string {
        return this.coffee.getDescription() + ", Sugar";
    }
}

class ChocolateDecorator extends CoffeeDecorator {
    public getPrice(): number {
        return this.coffee.getPrice() + 0.7;
    }

    public getDescription(): string {
        return this.coffee.getDescription() + ", Chocolate";
    }
}

// Additional detailed example from real products (cars)
abstract class Car {
    protected description: string = '';

    // public getDescription(): string {
    //     return this.description;
    // }

    public getDescription = (): string => this.description;
    public abstract cost(): number;
}

class ModelS extends Car {
    protected description = "Model S";

    public cost(): number {
        return 73000;
    }
}

class ModelX extends Car {
    protected description = "Model X";

    public cost(): number {
        return 77000;
    }
}

abstract class CarOptions extends Car {
    protected abstract decoratedCar: Car | undefined;
    //public abstract getDescription(): string;
    public abstract getDescription: () => string;
    public abstract cost(): number;
}

class EnhancedAutoPilot extends CarOptions {
    protected decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    // public getDescription(): string {
    //     return this.decoratedCar?.getDescription() + ", Enhanced AutoPilot";
    // }

    public getDescription = (): string => this.decoratedCar?.getDescription() + ", Enhanced AutoPilot";
    public cost(): number {
        return this.decoratedCar?.cost() + 5000;
    }
}

class RearFacingSeats extends CarOptions {
    protected decoratedCar: Car;

    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }

    // public getDescription(): string {
    //     return this.decoratedCar.getDescription() + ", Rear facing seats";
    // }

    public getDescription = (): string => this.decoratedCar.getDescription() + ", Rear facing seats";
    public cost(): number {
        return this.decoratedCar.cost() + 4000;
    }
}



const decoratorFileBanner = "\x1b[104m\x1b[97m\x1b[1m";
const decoratorSectionBanner = "\x1b[44m\x1b[97m\x1b[1m";
const decoratorReset = "\x1b[0m";

console.log(`\n${decoratorFileBanner}=========== FILE: decorator.ts ===========${decoratorReset}`);

console.log(`${decoratorSectionBanner}Example 1 (Bad): Hard-coded subclasses for each combination${decoratorReset}`);

class SimpleCoffeeBad {
    public getPrice(): number { return 2; }
}

class CoffeeWithMilkBad {
    public getPrice(): number { return 2.5; }
}

class CoffeeWithMilkAndSugarBad {
    public getPrice(): number { return 2.8; }
}

console.log("Simple:", new SimpleCoffeeBad().getPrice());
console.log("With Milk:", new CoffeeWithMilkBad().getPrice());
console.log("With Milk + Sugar:", new CoffeeWithMilkAndSugarBad().getPrice());
console.log("Problem: Exponential subclass explosion if adding more options");

console.log(`\n${decoratorFileBanner}------ Next Block: Decorator with composition ------${decoratorReset}\n`);

console.log(`${decoratorSectionBanner}Example 2 (Good): Decorators dynamically add features${decoratorReset}`);

let coffee: CoffeeComponent = new SimpleCoffee();
console.log(`${coffee.getDescription()} - $${coffee.getPrice()}`);

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getPrice()}`);

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getPrice()}`);

coffee = new ChocolateDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getPrice()}`);

console.log("Any combination possible without new subclasses!");

console.log(`\n${decoratorFileBanner}------ Next Block: Detailed Car Decorator example ------${decoratorReset}\n`);

console.log(`${decoratorSectionBanner}Example 3 (Good): Tesla with layered options${decoratorReset}`);

let myTesla: Car = new ModelS();
console.log("Base car:");
console.log("  Description:", myTesla.getDescription());
console.log("  Cost:", myTesla.cost());

myTesla = new RearFacingSeats(myTesla);
console.log("After adding RearFacingSeats (+4000):");
console.log("  Description:", myTesla.getDescription());
console.log("  Cost:", myTesla.cost());

myTesla = new EnhancedAutoPilot(myTesla);
console.log("After adding EnhancedAutoPilot (+5000):");
console.log("  Description:", myTesla.getDescription());
console.log("  Cost:", myTesla.cost());


let myModelX: Car = new ModelX();
myModelX = new EnhancedAutoPilot(myModelX);
console.log("\nAnother combination (Model X + AutoPilot):");
console.log("  Description:", myModelX.getDescription());
console.log("  Cost:", myModelX.cost());

console.log(`${decoratorFileBanner}========= END FILE: decorator.ts =========${decoratorReset}\n`);
