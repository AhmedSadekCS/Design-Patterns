export class User {
    constructor (
        public name: string,
        public email: string,
        public age?: number,
        public address?: string,
        public phone?: string,
    ) { }
}

export class UserBuilder {
    private name = "";
    private email = "";
    private age?: number;
    private address?: string;
    private phone?: string;

    setName(name: string): this {
        this.name = name;
        return this;
    }

    setEmail(email: string): this {
        this.email = email;
        return this;
    }

    setAge(age: number): this {
        this.age = age;
        return this;
    }

    setAddress(address: string): this {
        this.address = address;
        return this;
    }

    setPhone(phone: string): this {
        this.phone = phone;
        return this;
    }

    build(): User {
        return new User(this.name, this.email, this.age, this.address, this.phone);
    }
}

const builderFileBanner = "\x1b[44m\x1b[97m\x1b[1m";
const builderSectionBanner = "\x1b[104m\x1b[97m\x1b[1m";
const builderReset = "\x1b[0m";

console.log(`\n${builderFileBanner}=========== FILE: builder.ts ===========${builderReset}`);

// Bad: Constructor with many values can be hard to read
console.log(`${builderSectionBanner}Example 1 (Bad): Long constructor call${builderReset}`);
const userFromConstructor = new User("Ahmed", "a@test.com", undefined, undefined, "123456");
console.log("userFromConstructor:", userFromConstructor);

// Good: Builder is clearer and easier with optional values
console.log(`${builderSectionBanner}Example 2 (Good): UserBuilder fluent API${builderReset}`);
const userFromBuilder = new UserBuilder()
    .setName("Ahmed")
    .setEmail("ahmed@test.com")
    .setPhone("123456")
    .build();

console.log("userFromBuilder:", userFromBuilder);

console.log(`\n${builderFileBanner}------ Next Block: HTTP Request Builder ------${builderReset}\n`);

export class HTTPRequest {
    constructor (
        public url: string,
        public method: string,
        public headers: Record<string, string>,
        public queryParams: Record<string, unknown>,
        public body: unknown,
        public timeout: number,
        public retries: number,
        public validateStatus: boolean,
        public cache: boolean | undefined,
        public followRedirect: boolean,
    ) { }
}

export class RequestBuilder {
    private url = "";
    private method = "GET";
    private headers: Record<string, string> = {};
    private queryParams: Record<string, unknown> = {};
    private body: unknown = null;
    private timeout = 5000;
    private retries = 0;
    private validateStatus = true;
    private cache: boolean | undefined = undefined;
    private followRedirect = false;

    setURL(url: string): this {
        this.url = url;
        return this;
    }

    setMethod(method: string): this {
        this.method = method;
        return this;
    }

    addHeader(key: string, value: string): this {
        this.headers[key] = value;
        return this;
    }

    setQueryParams(queryParams: Record<string, unknown>): this {
        this.queryParams = queryParams;
        return this;
    }

    setBody(body: unknown): this {
        this.body = body;
        return this;
    }

    setTimeout(timeout: number): this {
        this.timeout = timeout;
        return this;
    }

    setRetries(retries: number): this {
        this.retries = retries;
        return this;
    }

    setValidateStatus(validateStatus: boolean): this {
        this.validateStatus = validateStatus;
        return this;
    }

    setCache(cache: boolean | undefined): this {
        this.cache = cache;
        return this;
    }

    setFollowRedirect(followRedirect: boolean): this {
        this.followRedirect = followRedirect;
        return this;
    }

    build(): HTTPRequest {
        return new HTTPRequest(
            this.url,
            this.method,
            this.headers,
            this.queryParams,
            this.body,
            this.timeout,
            this.retries,
            this.validateStatus,
            this.cache,
            this.followRedirect,
        );
    }
}

// Bad: Large constructor with many positional arguments.
console.log(`${builderSectionBanner}Example 3 (Bad): HTTPRequest positional args${builderReset}`);
const messyRequest = new HTTPRequest(
    "https://api.example.com",
    "POST",
    { authorization: "Bearer token" },
    { userId: 123 },
    { name: "John" },
    30000,
    3,
    true,
    undefined,
    false,
);

console.log("messyRequest:", messyRequest);

// Good: Fluent Builder API is easier to read and maintain.
console.log(`${builderSectionBanner}Example 4 (Good): RequestBuilder fluent API${builderReset}`);
const betterRequest = new RequestBuilder()
    .setURL("https://api.example.com")
    .setMethod("POST")
    .addHeader("Authorization", "Bearer token")
    .setQueryParams({ userId: 123 })
    .setTimeout(30000)
    .setRetries(3)
    .setBody({ name: "John" })
    .setValidateStatus(true)
    .setFollowRedirect(false)
    .build();

console.log("betterRequest:", betterRequest);

console.log(`${builderFileBanner}========= END FILE: builder.ts =========${builderReset}\n`);
