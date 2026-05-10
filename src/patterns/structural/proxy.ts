export const proxyPatternExampleModule = true;

interface ImageService {
    display(): void;
    getSize(): number;
}

class HeavyImage implements ImageService {
    private readonly filename: string;
    private readonly size: number;

    constructor (filename: string) {
        this.filename = filename;
        this.size = Math.random() * 1000;
        console.log(`Loading heavy image: ${filename} (${this.size.toFixed(1)} KB)... [SLOW OPERATION]`);
    }

    display(): void {
        console.log(`Displaying ${this.filename}`);
    }

    getSize(): number {
        return this.size;
    }
}

class ImageProxy implements ImageService {
    private realImage: HeavyImage | null = null;
    private readonly filename: string;

    constructor (filename: string) {
        this.filename = filename;
    }

    display(): void {
        if (!this.realImage) {
            this.realImage = new HeavyImage(this.filename);
        }
        this.realImage.display();
    }

    getSize(): number {
        if (!this.realImage) {
            this.realImage = new HeavyImage(this.filename);
        }
        return this.realImage.getSize();
    }
}

const proxyFileBanner = "\x1b[101m\x1b[97m\x1b[1m";
const proxySectionBanner = "\x1b[41m\x1b[97m\x1b[1m";
const proxyReset = "\x1b[0m";

console.log(`\n${proxyFileBanner}=========== FILE: proxy.ts ===========${proxyReset}`);

console.log(`${proxySectionBanner}Example 1 (Bad): Load everything immediately${proxyReset}`);

const images: HeavyImage[] = [];
console.log("Creating 3 images (loading all immediately):");
images.push(new HeavyImage("photo1.jpg"));
images.push(new HeavyImage("photo2.jpg"));
images.push(new HeavyImage("photo3.jpg"));
console.log("All loaded even if we don't display them yet - wasteful!");

console.log(`\n${proxyFileBanner}------ Next Block: Proxy with lazy loading ------${proxyReset}\n`);

console.log(`${proxySectionBanner}Example 2 (Good): Proxy loads only when needed${proxyReset}`);

const proxyImages: ImageProxy[] = [];
console.log("Creating 3 proxies (no loading yet):");
proxyImages.push(new ImageProxy("photo1.jpg"));
proxyImages.push(new ImageProxy("photo2.jpg"));
proxyImages.push(new ImageProxy("photo3.jpg"));
console.log("Proxies created instantly!");

console.log("\nNow display only the second one:");
proxyImages[1].display();

console.log("\nDisplay it again (already loaded, no reload):");
proxyImages[1].display();

console.log(`${proxyFileBanner}========= END FILE: proxy.ts =========${proxyReset}\n`);
