export const facadePatternExampleModule = true;

interface User {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

interface Address {
    city: string;
    country: string;
}

class PaymentProcessor {
    charge(user: User, amount: number): boolean {
        console.log(`Charging ${user.name}: ${amount}`);
        return amount > 0;
    }
}

class InventorySystem {
    private readonly stock = new Map<string, number>([["p-100", 4]]);

    checkStock(product: Product): boolean {
        return (this.stock.get(product.id) ?? 0) > 0;
    }

    reserve(product: Product): void {
        const current = this.stock.get(product.id) ?? 0;
        this.stock.set(product.id, Math.max(0, current - 1));
        console.log(`Reserved ${product.name}. Remaining: ${this.stock.get(product.id)}`);
    }
}

class ShippingCalculator {
    compute(address: Address): number {
        return address.country === "EG" ? 25 : 80;
    }
}

class FraudDetector {
    verify(user: User): boolean {
        return !user.id.startsWith("blocked-");
    }
}

// The Facade
class OrderFacade {
    private readonly paymentProcessor: PaymentProcessor;
    private readonly inventorySystem: InventorySystem;
    private readonly shippingCalculator: ShippingCalculator;
    private readonly fraudChecker: FraudDetector;

    constructor () {
        this.paymentProcessor = new PaymentProcessor();
        this.inventorySystem = new InventorySystem();
        this.shippingCalculator = new ShippingCalculator();
        this.fraudChecker = new FraudDetector();
    }

    placeOrder(user: User, product: Product, address: Address): boolean {
        try {
            // Check for fraud
            if (!this.fraudChecker.verify(user)) {
                throw new Error("Fraud check failed");
            }

            // Check inventory
            if (!this.inventorySystem.checkStock(product)) {
                throw new Error("Product out of stock");
            }

            // Calculate shipping
            const shipping = this.shippingCalculator.compute(address);

            // Process payment
            const total = product.price + shipping;
            if (!this.paymentProcessor.charge(user, total)) {
                throw new Error("Payment failed");
            }

            this.inventorySystem.reserve(product);
            console.log(`Order placed successfully for ${user.name}`);
            return true;
        } catch (error) {
            console.error("Order failed:", error instanceof Error ? error.message : error);
            return false;
        }
    }
}

const facadeFileBanner = "\x1b[43m\x1b[30m\x1b[1m";
const facadeSectionBanner = "\x1b[103m\x1b[30m\x1b[1m";
const facadeReset = "\x1b[0m";

console.log(`\n${facadeFileBanner}=========== FILE: facade.ts ============${facadeReset}`);

const user: User = { id: "u-1", name: "John" };
const product: Product = { id: "p-100", name: "Laptop", price: 1200 };
const address: Address = { city: "Cairo", country: "EG" };

// Without facade - caller must orchestrate all subsystems manually.
console.log(`${facadeSectionBanner}Example 1 (Bad): Manual subsystem orchestration${facadeReset}`);
const paymentProcessor = new PaymentProcessor();
const inventorySystem = new InventorySystem();
const shippingCalculator = new ShippingCalculator();
const fraudChecker = new FraudDetector();

if (fraudChecker.verify(user)) {
    if (inventorySystem.checkStock(product)) {
        const shipping = shippingCalculator.compute(address);
        if (paymentProcessor.charge(user, product.price + shipping)) {
            inventorySystem.reserve(product);
            console.log("withoutFacade order flow completed");
        }
    }
}

console.log(`\n${facadeFileBanner}------ Next Block: OrderFacade.placeOrder ------${facadeReset}\n`);

// With facade
console.log(`${facadeSectionBanner}Example 2 (Good): Facade single entry point${facadeReset}`);
const orderSystem = new OrderFacade();
orderSystem.placeOrder(user, product, address);

console.log(`${facadeFileBanner}========= END FILE: facade.ts =========${facadeReset}\n`);
