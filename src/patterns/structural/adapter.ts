export const adapterPatternExampleModule = true;

// Third-party weather API interface
interface WeatherAPI {
    getTempC(): number;
    getHumidity(): number;
    getWindSpeedKPH(): number;
}

// Our app's expected interface
interface WeatherApp {
    getTempF(): number;
    getHumidity(): number;
    getWindSpeedMPH(): number;
}

// Concrete implementation of third-party API
class ThirdPartyWeatherAPI implements WeatherAPI {
    getTempC(): number {
        return 22; // Example: 22C
    }

    getHumidity(): number {
        return 65; // Example: 65%
    }

    getWindSpeedKPH(): number {
        return 15; // Example: 15 kph
    }
}

const adapterFileBanner = "\x1b[46m\x1b[30m\x1b[1m";
const adapterSectionBanner = "\x1b[106m\x1b[30m\x1b[1m";
const adapterReset = "\x1b[0m";

console.log(`\n${adapterFileBanner}=========== FILE: adapter.ts ===========${adapterReset}`);

// Without adapter - scattered conversions everywhere
console.log(`${adapterSectionBanner}Example 1 (Bad): Scattered conversions${adapterReset}`);
const weatherAPI = new ThirdPartyWeatherAPI();

const tempFManual = weatherAPI.getTempC() * 9 / 5 + 32;
const windMphManual = weatherAPI.getWindSpeedKPH() * 0.621371;

console.log("[Bad] Raw temp (C):", weatherAPI.getTempC());
console.log("[Bad] Raw humidity (%):", weatherAPI.getHumidity());
console.log("[Bad] Raw wind (KPH):", weatherAPI.getWindSpeedKPH());
console.log("[Bad] Manual temp conversion to F:", tempFManual);
console.log("[Bad] Manual wind conversion to MPH:", windMphManual);

if (tempFManual > 75) {
    console.log("It's hot!");
}

if (windMphManual > 10) {
    console.log("It's windy!");
}

console.log(`\n${adapterFileBanner}------ Next Block: WeatherAdapter ------${adapterReset}\n`);

// With adapter - clean and consistent
console.log(`${adapterSectionBanner}Example 2 (Good): Adapter-based access${adapterReset}`);
class WeatherAdapter implements WeatherApp {
    constructor(private readonly weatherAPI: WeatherAPI) { }

    getTempF(): number {
        return this.weatherAPI.getTempC() * 9 / 5 + 32;
    }

    getHumidity(): number {
        return this.weatherAPI.getHumidity(); // No conversion needed
    }

    getWindSpeedMPH(): number {
        return this.weatherAPI.getWindSpeedKPH() * 0.621371;
    }
}

const appWeather: WeatherApp = new WeatherAdapter(weatherAPI);

console.log("Temperature (F):", appWeather.getTempF());
console.log("Humidity (%):", appWeather.getHumidity());
console.log("Wind Speed (MPH):", appWeather.getWindSpeedMPH());

if (appWeather.getTempF() > 75) {
    console.log("[Adapter] It's hot!");
}

if (appWeather.getWindSpeedMPH() > 10) {
    console.log("[Adapter] It's windy!");
}

console.log(`\n${adapterFileBanner}------ Next Block: Phone Charger Adapter ------${adapterReset}\n`);

console.log(`${adapterSectionBanner}Example 3 (Good): Lightning → MicroUSB Adapter${adapterReset}`);

interface IPhone {
    useLightning(): void;
}

interface IAndroid {
    useMicroUSB(): void;
}

class IPhone7 implements IPhone {
    public useLightning(): void {
        console.log('Using lightning port..');
    }
}

class GooglePixel implements IAndroid {
    public useMicroUSB(): void {
        console.log('Using micro USB...');
    }
}

class LightningToMicroUSBAdapter implements IAndroid {
    private readonly iphoneDevice: IPhone;

    constructor(iphone: IPhone) {
        this.iphoneDevice = iphone;
    }

    public useMicroUSB(): void {
        console.log('Want to use micro USB, converting to Lightning....');
        this.iphoneDevice.useLightning();
    }
}

const nativeAndroid: IAndroid = new GooglePixel();
console.log('Native Android device:');
nativeAndroid.useMicroUSB();

const iphone = new IPhone7();
const chargeAdapter = new LightningToMicroUSBAdapter(iphone);
console.log('iPhone with adapter:');
chargeAdapter.useMicroUSB();

console.log(`${adapterFileBanner}========= END FILE: adapter.ts =========${adapterReset}\n`);
