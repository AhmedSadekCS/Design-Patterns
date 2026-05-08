export const factoryPatternExampleModule = true;

type UserType = "admin" | "moderator" | "regular";

interface UserData {
    id: string;
    name: string;
}

interface User {
    getPermissions(): string[];
    summary(): string;
}

class AdminUser implements User {
    constructor (private readonly data: UserData) { }

    getPermissions(): string[] {
        return ["create", "read", "update", "delete"];
    }

    summary(): string {
        return `AdminUser(${this.data.id}, ${this.data.name})`;
    }
}

class ModeratorUser implements User {
    constructor (private readonly data: UserData) { }

    getPermissions(): string[] {
        return ["read", "update"];
    }

    summary(): string {
        return `ModeratorUser(${this.data.id}, ${this.data.name})`;
    }
}

class RegularUser implements User {
    constructor (private readonly data: UserData) { }

    getPermissions(): string[] {
        return ["read"];
    }

    summary(): string {
        return `RegularUser(${this.data.id}, ${this.data.name})`;
    }
}

// User Factory class
class UserFactory {
    static create(type: UserType, data: UserData): User {
        switch (type) {
            case "admin":
                return new AdminUser(data);
            case "moderator":
                return new ModeratorUser(data);
            case "regular":
                return new RegularUser(data);
            default:
                throw new Error(`Invalid user type: ${type}`);
        }
    }
}

const factoryFileBanner = "\x1b[45m\x1b[97m\x1b[1m";
const factorySectionBanner = "\x1b[105m\x1b[97m\x1b[1m";
const factoryReset = "\x1b[0m";

console.log(`\n${factoryFileBanner}=========== FILE: factory.ts ===========${factoryReset}`);

// Without Factory - messy branching and direct object creation.
console.log(`${factorySectionBanner}Example 1 (Bad): Branching + direct creation${factoryReset}`);
const type: UserType = "admin";
const payload: UserData = { id: "1", name: "John" };
let messyUser: User;
if (type === "admin") {
    messyUser = new AdminUser(payload);
} else if (type === "moderator") {
    messyUser = new ModeratorUser(payload);
} else {
    messyUser = new RegularUser(payload);
}
console.log("withoutFactory user:", messyUser.summary());
console.log("withoutFactory permissions:", messyUser.getPermissions());

console.log(`\n${factoryFileBanner}------ Next Block: UserFactory.create ------${factoryReset}\n`);

// Clean factory way
console.log(`${factorySectionBanner}Example 2 (Good): UserFactory.create${factoryReset}`);
const cleanUser = UserFactory.create("admin", { id: "1", name: "John" });
const modUser = UserFactory.create("moderator", { id: "2", name: "Mina" });
const regularUser = UserFactory.create("regular", { id: "3", name: "Sara" });

console.log("cleanUser:", cleanUser.summary());
console.log("cleanUser permissions:", cleanUser.getPermissions());
console.log("moderator user:", modUser.summary());
console.log("regular user:", regularUser.summary());

interface NotificationSender {
    send(message: string): void;
}

class EmailSender implements NotificationSender {
    send(message: string): void {
        console.log("Sending email:", message);
    }
}

class SmsSender implements NotificationSender {
    send(message: string): void {
        console.log("Sending SMS:", message);
    }
}

class PushSender implements NotificationSender {
    send(message: string): void {
        console.log("Sending push:", message);
    }
}

class NotificationFactory {
    static create(type: "email" | "sms" | "push"): NotificationSender {
        switch (type) {
            case "email":
                return new EmailSender();
            case "sms":
                return new SmsSender();
            case "push":
                return new PushSender();
        }
    }
}

console.log(`\n${factoryFileBanner}------ Next Block: NotificationFactory ------${factoryReset}\n`);

console.log(`${factorySectionBanner}Example 3 (Good): NotificationFactory.create${factoryReset}`);
const emailSender = NotificationFactory.create("email");
const smsSender = NotificationFactory.create("sms");
const pushSender = NotificationFactory.create("push");

emailSender.send("Welcome Ahmed");
smsSender.send("Your code is 1234");
pushSender.send("You have a new message");

console.log(`${factoryFileBanner}========= END FILE: factory.ts =========${factoryReset}\n`);
