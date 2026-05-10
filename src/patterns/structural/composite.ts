export const compositePatternExampleModule = true;

interface FileSystemComponent {
    getName(): string;
    getSize(): number;
    display(indent?: string): void;
}

class File implements FileSystemComponent {
    constructor (private name: string, private size: number) { }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.size;
    }

    display(indent: string = ""): void {
        console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
    }
}

class Folder implements FileSystemComponent {
    private readonly items: FileSystemComponent[] = [];

    constructor (private name: string) { }

    add(item: FileSystemComponent): void {
        this.items.push(item);
    }

    remove(item: FileSystemComponent): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.items.reduce((sum, item) => sum + item.getSize(), 0);
    }

    display(indent: string = ""): void {
        console.log(`${indent}📁 ${this.name}/ (${this.getSize()} KB)`);
        for (const item of this.items) {
            item.display(indent + "  ");
        }
    }
}

const compositeFileBanner = "\x1b[105m\x1b[97m\x1b[1m";
const compositeSectionBanner = "\x1b[45m\x1b[97m\x1b[1m";
const compositeReset = "\x1b[0m";

console.log(`\n${compositeFileBanner}=========== FILE: composite.ts ===========${compositeReset}`);

console.log(`${compositeSectionBanner}Example 1 (Bad): Separate handling for file vs folder${compositeReset}`);

function calculateSizeBad(item: unknown): number {
    if (item instanceof File) {
        return (item as File).getSize();
    } else if (item instanceof Folder) {
        let total = 0;
        for (const child of (item as Folder)["items"]) {
            total += calculateSizeBad(child);
        }
        return total;
    }
    return 0;
}

console.log("Problem: Different logic for files vs folders, code duplication");

console.log(`\n${compositeFileBanner}------ Next Block: Uniform interface for all ------${compositeReset}\n`);

console.log(`${compositeSectionBanner}Example 2 (Good): Treat files and folders uniformly${compositeReset}`);

const root = new Folder("Documents");
root.add(new File("resume.pdf", 100));
root.add(new File("cover-letter.txt", 25));

const projects = new Folder("Projects");
projects.add(new File("project1.ts", 150));
projects.add(new File("project2.ts", 200));

const archive = new Folder("Archive");
archive.add(new File("old-data.zip", 500));
projects.add(archive);

root.add(projects);

root.display();
console.log(`Total size: ${root.getSize()} KB`);

console.log(`${compositeFileBanner}========= END FILE: composite.ts =========${compositeReset}\n`);
