export const statePatternExampleModule = true;

interface PlayerState {
    play(player: MediaPlayer): void;
    pause(player: MediaPlayer): void;
    stop(player: MediaPlayer): void;
}

class PlayingState implements PlayerState {
    play(player: MediaPlayer): void {
        console.log("Already playing");
    }

    pause(player: MediaPlayer): void {
        console.log("Pausing...");
        player.setState(new PausedState());
    }

    stop(player: MediaPlayer): void {
        console.log("Stopping...");
        player.setState(new StoppedState());
    }
}

class PausedState implements PlayerState {
    play(player: MediaPlayer): void {
        console.log("Resuming...");
        player.setState(new PlayingState());
    }

    pause(player: MediaPlayer): void {
        console.log("Already paused");
    }

    stop(player: MediaPlayer): void {
        console.log("Stopping...");
        player.setState(new StoppedState());
    }
}

class StoppedState implements PlayerState {
    play(player: MediaPlayer): void {
        console.log("Starting playback...");
        player.setState(new PlayingState());
    }

    pause(player: MediaPlayer): void {
        console.log("Cannot pause (not playing)");
    }

    stop(player: MediaPlayer): void {
        console.log("Already stopped");
    }
}

class MediaPlayer {
    private state: PlayerState;

    constructor() {
        this.state = new StoppedState();
    }

    setState(state: PlayerState): void {
        this.state = state;
    }

    play(): void {
        this.state.play(this);
    }

    pause(): void {
        this.state.pause(this);
    }

    stop(): void {
        this.state.stop(this);
    }
}

const stateFileBanner = "\x1b[106m\x1b[97m\x1b[1m";
const stateSectionBanner = "\x1b[46m\x1b[97m\x1b[1m";
const stateReset = "\x1b[0m";

console.log(`\n${stateFileBanner}=========== FILE: state.ts ===========${stateReset}`);

console.log(`${stateSectionBanner}Example 1 (Bad): Giant if/switch for state handling${stateReset}`);

class MediaPlayerBad {
    private state = "STOPPED";

    play(): void {
        if (this.state === "STOPPED") {
            console.log("Starting playback...");
            this.state = "PLAYING";
        } else if (this.state === "PAUSED") {
            console.log("Resuming...");
            this.state = "PLAYING";
        } else {
            console.log("Already playing");
        }
    }
}

const badPlayer = new MediaPlayerBad();
badPlayer.play();
badPlayer.play();

console.log(`\n${stateFileBanner}------ Next Block: State objects handle behavior ------${stateReset}\n`);

console.log(`${stateSectionBanner}Example 2 (Good): Encapsulate state behavior in classes${stateReset}`);

const goodPlayer = new MediaPlayer();
goodPlayer.play();
goodPlayer.play();
goodPlayer.pause();
goodPlayer.play();
goodPlayer.stop();
goodPlayer.pause();

console.log(`\n${stateFileBanner}------ Next Block: Order State Machine ------${stateReset}\n`);

console.log(`${stateSectionBanner}Example 3 (Good): Order lifecycle driven by State objects${stateReset}`);

interface OrderState {
    order: Order;
    cancelOrder(): void;
    verifyPayment(): void;
    shipOrder(): void;
}

class Order {
    public cancelledOrderState: OrderState;
    public paymentPendingState: OrderState;
    public orderShippedState: OrderState;
    public orderBeingPreparedState: OrderState;

    public currentState!: OrderState;

    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);

        this.setState(this.paymentPendingState);
    }

    public setState(state: OrderState): void {
        this.currentState = state;
    }

    public getState(): OrderState {
        return this.currentState;
    }
}

class CancelledOrderState implements OrderState {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder(): void {
        console.log('Your order has already been cancelled');
    }

    public verifyPayment(): void {
        console.log('Order cancelled, you cannot verify payment.');
    }

    public shipOrder(): void {
        console.log('Order cannot ship, it was cancelled.');
    }
}

class PaymentPendingState implements OrderState {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder(): void {
        console.log('Cancelling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    }

    public verifyPayment(): void {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    }

    public shipOrder(): void {
        console.log('Cannot ship the order when payment is pending!');
    }
}

class OrderShippedState implements OrderState {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder(): void {
        console.log('You cannot cancel, already shipped...');
    }

    public verifyPayment(): void {
        console.log('You cannot verify payment, already shipped...');
    }

    public shipOrder(): void {
        console.log('You cannot ship it again, already shipped...');
    }
}

class OrderBeingPreparedState implements OrderState {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public cancelOrder(): void {
        console.log('Cancelling your order..');
        this.order.setState(this.order.cancelledOrderState);
    }

    public verifyPayment(): void {
        console.log('Already verified your payment');
    }

    public shipOrder(): void {
        console.log('Shipping your order now!');
        this.order.setState(this.order.orderShippedState);
    }
}



const myOrder = new Order();

console.log('\n--- State: PaymentPending ---');
myOrder.currentState.shipOrder();     // blocked: payment pending
myOrder.currentState.verifyPayment(); // → moves to OrderBeingPrepared

console.log('\n--- State: OrderBeingPrepared ---');
myOrder.currentState.cancelOrder();   // → moves to Cancelled

console.log('\n--- State: Cancelled ---');
myOrder.currentState.verifyPayment(); // blocked: already cancelled
myOrder.currentState.shipOrder();     // blocked: already cancelled

const myOrder2 = new Order();
console.log('\n--- New order: PaymentPending → Prepared → Shipped ---');
myOrder2.currentState.verifyPayment(); // → OrderBeingPrepared
myOrder2.currentState.shipOrder();     // → OrderShipped
myOrder2.currentState.cancelOrder();   // blocked: already shipped

console.log(`${stateFileBanner}========= END FILE: state.ts =========${stateReset}\n`);
