export const observerPatternExampleModule = true;

interface Observer<T> {
    update(data: T): void;
}

interface Subject<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(data: T): void;
}

class YouTubeSubscriber implements Observer<string> {
    constructor (private readonly name: string) { }

    update(videoTitle: string): void {
        console.log(`${this.name} got notification: ${videoTitle}`);
    }
}

class YouTubeChannel implements Subject<string> {
    private subscribers: Observer<string>[] = [];

    constructor (private readonly channelName: string) { }

    subscribe(observer: Observer<string>): void {
        this.subscribers.push(observer);
    }

    unsubscribe(observer: Observer<string>): void {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== observer);
    }

    notify(videoTitle: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.update(videoTitle);
        }
    }

    uploadVideo(title: string): void {
        console.log(`[${this.channelName}] New video uploaded: ${title}`);
        this.notify(title);
    }
}

class ChannelPollingClient {
    check(channelName: string): void {
        console.log(`Polling ${channelName}: Any new videos yet?`);
    }
}

const observerFileBanner = "\x1b[100m\x1b[97m\x1b[1m";
const observerSectionBanner = "\x1b[47m\x1b[30m\x1b[1m";
const observerReset = "\x1b[0m";

console.log(`\n${observerFileBanner}=========== FILE: observer.ts ===========${observerReset}`);

console.log(`${observerSectionBanner}Example 1 (Bad): Manual polling / repeated checks${observerReset}`);

const pollingClient = new ChannelPollingClient();
pollingClient.check("Code With Ahmed");
pollingClient.check("Code With Ahmed");
pollingClient.check("Code With Ahmed");
console.log("No event-driven notification here, clients keep asking manually.");

console.log(`\n${observerFileBanner}------ Next Block: YouTubeChannel with Observer ------${observerReset}\n`);

console.log(`${observerSectionBanner}Example 2 (Good): Subscribe and auto-notify${observerReset}`);

const channel = new YouTubeChannel("Code With Ahmed");
const ahmed = new YouTubeSubscriber("Ahmed");
const sara = new YouTubeSubscriber("Sara");
const mina = new YouTubeSubscriber("Mina");

channel.subscribe(ahmed);
channel.subscribe(sara);
channel.uploadVideo("Observer Pattern Explained");

console.log("- Mina subscribes later");
channel.subscribe(mina);
channel.uploadVideo("TypeScript Tips #12");

console.log("- Sara unsubscribes");
channel.unsubscribe(sara);
channel.uploadVideo("Design Patterns Roadmap");

console.log(`\n${observerFileBanner}------ Next Block: Screenshot-style VideoChannel example ------${observerReset}\n`);

console.log(`${observerSectionBanner}Example 3 (Bad): Video uploaded but no notification system${observerReset}`);

class UserAccount {
    constructor (public readonly name: string) { }
}

class VideoChannelBad {
    private readonly subscribers: UserAccount[] = [];

    uploadVideo(video: string): void {
        console.log(`Video "${video}" uploaded, but no notification system...`);
        console.log(`Subscribers count exists (${this.subscribers.length}) but no update flow.`);
    }
}

const badChannel = new VideoChannelBad();
badChannel.uploadVideo("Observer Intro - Bad Design");

console.log(`\n${observerFileBanner}------ Next Block: BetterVideoChannel with Subscriber ------${observerReset}\n`);

console.log(`${observerSectionBanner}Example 4 (Good): BetterVideoChannel notifies subscribers${observerReset}`);

interface Subscriber {
    update(videoTitle: string): void;
}

class ConsoleSubscriber implements Subscriber {
    constructor (private readonly username: string) { }

    update(videoTitle: string): void {
        console.log(`${this.username} received: ${videoTitle}`);
    }
}

class BetterVideoChannel {
    private readonly subscribers: Subscriber[] = [];

    subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber: Subscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    }

    uploadVideo(title: string): void {
        console.log(`Uploading video: ${title}`);
        this.notify(title);
    }

    private notify(videoTitle: string): void {
        this.subscribers.forEach(sub => sub.update(videoTitle));
    }
}

const betterChannel = new BetterVideoChannel();
const subAhmed = new ConsoleSubscriber("Ahmed");
const subSara = new ConsoleSubscriber("Sara");

betterChannel.subscribe(subAhmed);
betterChannel.subscribe(subSara);
betterChannel.uploadVideo("Observer Pattern with BetterVideoChannel");

betterChannel.unsubscribe(subSara);
betterChannel.uploadVideo("Only Ahmed should receive this");

console.log(`${observerFileBanner}========= END FILE: observer.ts =========${observerReset}\n`);
