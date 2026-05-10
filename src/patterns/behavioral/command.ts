export const commandPatternExampleModule = true;

interface Device {
    turnOn(): void;
    turnOff(): void;
    setVolume(level: number): void;
}

class Television implements Device {
    private isOn = false;
    private volume = 10;

    turnOn(): void {
        this.isOn = true;
        console.log("TV is ON");
    }

    turnOff(): void {
        this.isOn = false;
        console.log("TV is OFF");
    }

    setVolume(level: number): void {
        if (this.isOn) {
            this.volume = level;
            console.log(`TV volume set to ${level}`);
        }
    }
}

interface Command {
    execute(): void;
    undo(): void;
}

class TurnOnCommand implements Command {
    private readonly previousState = false;

    constructor (private readonly device: Device) { }

    execute(): void {
        this.device.turnOn();
    }

    undo(): void {
        this.device.turnOff();
    }
}

class TurnOffCommand implements Command {
    constructor (private readonly device: Device) { }

    execute(): void {
        this.device.turnOff();
    }

    undo(): void {
        this.device.turnOn();
    }
}

class SetVolumeCommand implements Command {
    private readonly previousVolume = 10;

    constructor (private readonly device: Device, private readonly volume: number) { }

    execute(): void {
        this.device.setVolume(this.volume);
    }

    undo(): void {
        this.device.setVolume(this.previousVolume);
    }
}

class RemoteControl {
    private readonly commands: Command[] = [];

    pressButton(command: Command): void {
        command.execute();
        this.commands.push(command);
    }

    undo(): void {
        const command = this.commands.pop();
        command?.undo();
    }
}

const commandFileBanner = "\x1b[102m\x1b[97m\x1b[1m";
const commandSectionBanner = "\x1b[42m\x1b[97m\x1b[1m";
const commandReset = "\x1b[0m";

console.log(`\n${commandFileBanner}=========== FILE: command.ts ===========${commandReset}`);

console.log(`${commandSectionBanner}Example 1 (Bad): Direct device method calls scattered${commandReset}`);

const tv = new Television();
tv.turnOn();
tv.setVolume(20);
tv.turnOff();
console.log("Problem: No undo, no history, hard to organize");

console.log(`\n${commandFileBanner}------ Next Block: RemoteControl with Commands ------${commandReset}\n`);

console.log(`${commandSectionBanner}Example 2 (Good): Commands encapsulate requests${commandReset}`);

const tv2 = new Television();
const remote = new RemoteControl();

remote.pressButton(new TurnOnCommand(tv2));
remote.pressButton(new SetVolumeCommand(tv2, 30));
remote.pressButton(new TurnOffCommand(tv2));

console.log("Executing undo...");
remote.undo();
console.log("After undo, TV is back ON");

console.log(`${commandFileBanner}========= END FILE: command.ts =========${commandReset}\n`);
