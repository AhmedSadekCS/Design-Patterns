# JavaScript Data Structures

This project is set up for implementing and testing data structures in plain JavaScript.

## Available scripts

- `npm start`: run the entry file once.
- `npm run dev`: run the entry file in watch mode.
- `npm test`: run the test suite with Node's built-in test runner.
- `npm run test:watch`: rerun tests in watch mode.

## Creational Patterns

Instead of creating objects directly, these patterns give you more flexibility in how objects come into existence.

Pattern files:

- [Singleton](docs/patterns/creational/singleton.md)
- [Builder](docs/patterns/creational/builder.md)
- [Factory](docs/patterns/creational/factory.md)

### Singleton

All Singleton details, examples, and diagrams are in [docs/patterns/creational/singleton.md](docs/patterns/creational/singleton.md).

### Builder

All Builder details and examples are in [docs/patterns/creational/builder.md](docs/patterns/creational/builder.md).

### Factory

All Factory details and examples are in [docs/patterns/creational/factory.md](docs/patterns/creational/factory.md).

## Structural Patterns

Deal with how objects relate to each other.

Think of them as blueprints for building larger structures from individual pieces.

Pattern files:

- [Adapter](docs/patterns/structural/adapter.md)
- [Facade](docs/patterns/structural/facade.md)
- [Decorator](docs/patterns/structural/decorator.md)
- [Composite](docs/patterns/structural/composite.md)
- [Proxy](docs/patterns/structural/proxy.md)

### Adapter

All Adapter details and examples are in [docs/patterns/structural/adapter.md](docs/patterns/structural/adapter.md).

### Facade

All Facade details and examples are in [docs/patterns/structural/facade.md](docs/patterns/structural/facade.md).

### Decorator

All Decorator details and examples are in [docs/patterns/structural/decorator.md](docs/patterns/structural/decorator.md).

### Composite

All Composite details and examples are in [docs/patterns/structural/composite.md](docs/patterns/structural/composite.md).

### Proxy

All Proxy details and examples are in [docs/patterns/structural/proxy.md](docs/patterns/structural/proxy.md).

## Behavioral Patterns

Handle communication between objects - how they interact and distribute responsibility.

Pattern files:

- [Strategy](docs/patterns/behavioral/strategy.md)
- [Observer](docs/patterns/behavioral/observer.md)
- [Command](docs/patterns/behavioral/command.md)
- [State](docs/patterns/behavioral/state.md)

### Strategy

All Strategy details and examples are in [docs/patterns/behavioral/strategy.md](docs/patterns/behavioral/strategy.md).

### Observer

All Observer details and examples are in [docs/patterns/behavioral/observer.md](docs/patterns/behavioral/observer.md).

### Command

All Command details and examples are in [docs/patterns/behavioral/command.md](docs/patterns/behavioral/command.md).

### State

All State details and examples are in [docs/patterns/behavioral/state.md](docs/patterns/behavioral/state.md).

## Mental Model (Arabic Quick Guide)

شكل ثابت في دماغك لكل Pattern يعني صورة ذهنية بسيطة تحفظها، ولما تشوف مشكلة في الكود تقول: "آه ده محتاج كذا".

### 1) Singleton

**الصورة في دماغك:** الملك الوحيد

تخيل مملكة فيها ملك واحد بس، وكل الناس بترجع له.

Application -> One shared instance

**احفظها كده:**
Singleton = واحد فقط + وصول من أي مكان

**مثال تحفظه:**
- Logger واحد للتطبيق كله
- Config واحد للتطبيق كله

**الجملة الذهبية:**
"أنا عايز نسخة واحدة بس من الحاجة دي."

### 2) Builder

**الصورة في دماغك:** طبق بيتعمل بوصفة

تخيل إنك بتعمل بيتزا أو سندوتش.
تضيف جبنة، بعدين صوص، بعدين فراخ، بعدين تعمل build.

Start -> add option -> add option -> add option -> build final object

**احفظها كده:**
Builder = بناء object خطوة بخطوة

**مثال تحفظه:**

```js
new RequestBuilder()
	.setUrl()
	.setMethod()
	.setHeaders()
	.setBody()
	.build();
```

**الجملة الذهبية:**
"الـ constructor بقى طويل ومقرف، خليني أبنيه خطوة خطوة."

### 3) Factory

**الصورة في دماغك:** مصنع بيطلع المنتج المناسب

تخيل مصنع. أنت تقول له: "عايز عربية SUV"، هو يطلعلك SUV.
تقول له: "عايز Truck"، يطلعلك Truck.

type -> Factory -> correct object

**احفظها كده:**
Factory = يختار وينشئ object المناسب

**مثال تحفظه:**

```js
UserFactory.create("admin");
UserFactory.create("moderator");
UserFactory.create("regular");
```

**الجملة الذهبية:**
"أنا مش عايز أعمل new في كل حتة، المصنع يقرر."

### 4) Facade

**الصورة في دماغك:** زرار واحد وراه شغل كتير

تخيل زرار اسمه Buy Now.
أنت ضغطت زرار واحد، بس وراه حصل:

- check stock
- payment
- fraud check
- create order
- send email

**احفظها كده:**
Facade = واجهة بسيطة فوق نظام معقد

**مثال تحفظه:**

```js
checkoutFacade.buyNow(order);
```

**الجملة الذهبية:**
"أنا عايز أخبي التعقيد ورا method بسيطة."

### 5) Adapter

**الصورة في دماغك:** محوّل USB to HDMI

عندك حاجتين مش راكبين على بعض، فتحط بينهم Adapter.

Old/External API -> Adapter -> Your App Interface

**احفظها كده:**
Adapter = يخلي حاجتين مش متوافقين يشتغلوا مع بعض

**مثال تحفظه:**

```js
UserAdapter.fromApi(apiUser);
// or
StripeAdapter.pay();
```

**الجملة الذهبية:**
"البيانات أو الـ interface جاية بشكل مختلف، أعمل محوّل."

### 6) Strategy

**الصورة في دماغك:** طرق مختلفة لنفس الهدف

تخيل أنت عايز تروح الشغل، ممكن:
- Car
- Train
- Bike
- Walk

كلهم هدفهم واحد، بس الطريقة مختلفة.

Goal -> choose strategy -> execute

**احفظها كده:**
Strategy = طرق مختلفة لتنفيذ نفس الحاجة

**مثال تحفظه:**

```js
paymentStrategy.pay();
shippingStrategy.calculate();
filterStrategy.filter();
```

**الجملة الذهبية:**
"عندي if/else كتير حسب النوع، يبقى غالبًا Strategy."

### 7) Observer

**الصورة في دماغك:** جرس أو Notification

تخيل قناة YouTube.
القناة تنزل فيديو، كل المشتركين يوصلهم notification.

Subject changes -> notify subscribers

**احفظها كده:**
Observer = لما يحصل حدث، بلّغ المهتمين

**مثال تحفظه:**

```js
user$.subscribe(user => {});
cart$.subscribe(items => {});
form.valueChanges.subscribe(value => {});
```

**الجملة الذهبية:**
"لما يحصل كذا، عايز ناس تانية تعرف."

### 8) Decorator

**الصورة في دماغك:** طبقات إضافية على الكائن

تخيل قهوة:
- قهوة عادية
- قهوة + حليب
- قهوة + حليب + كاراميل
- قهوة + حليب + كاراميل + شوكولاتة

كل واحد بيلف حول اللي قبله.

Base object -> add feature -> add feature -> final wrapped object

**احفظها كده:**
Decorator = إضافة ميزات ديناميكية بدون تعديل الكود الأساسي

**مثال تحفظه:**

```js
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
```

**الجملة الذهبية:**
"عايز أضيف ميزات اختيارية بدون أعمل subclass لكل combination."

### 9) Composite

**الصورة في دماغك:** شجرة فايل

تخيل folder يحتوي على files وfolders تانية.
بتعاملهم بنفس الطريقة.

File: leaf node
Folder: composite node
Both implement same interface

**احفظها كده:**
Composite = معاملة موحدة للفروع والأوراق

**مثال تحفظه:**

```js
root.add(new File("file.txt"));
root.add(new Folder("subfolder"));
root.display(); // يعرض الكل recursively
```

**الجملة الذهبية:**
"عندي شجرة وبدي أتعامل مع كل العقد بنفس الطريقة."

### 10) Proxy

**الصورة في دماغك:** حارس الموارد الغالية

تخيل door keeper.
بدل ما تدخل مباشرة (غالي)، الحارس يتحكم.

Client -> Proxy -> Real Object (lazy load / access control)

**احفظها كده:**
Proxy = وكيل يتحكم في الوصول للموارد

**مثال تحفظه:**

```js
const image = new ImageProxy("photo.jpg"); // ما حمّش
image.display(); // الآن يحمّل لما تحتاج
```

**الجملة الذهبية:**
"الموارد غالية جدًا، حط وكيل يتحكم في الوصول."

### 11) Command

**الصورة في دماغك:** جزّ التنفيذ عن الطلب

تخيل remote control.
كل button بيمثل command.
ممكن تأجل التنفيذ أو تلغيه أو تكرره.

Request -> Command Object -> Execute -> Undo

**احفظها كده:**
Command = حوّل الطلبات لـ objects قابلة للتحكم

**مثال تحفظه:**

```js
remote.pressButton(new PlayCommand(tv));
remote.undo(); // اللي بدلتش
```

**الجملة الذهبية:**
"عايز undo/redo أو queueing، حوّل الطلب لـ object."

### 12) State

**الصورة في دماغك:** سلوك يتغير حسب الحالة

تخيل traffic light.
لما يكون RED، بتوقف.
لما يكون GREEN، بتمشي.

State determines behavior

**احفظها كده:**
State = سلوك مختلف حسب حالة الكائن

**مثال تحفظه:**

```js
player.setState(new PlayingState());
player.setState(new PausedState());
```

**الجملة الذهبية:**
"الكائن بيتصرف مختلف حسب الحالة، فصل الحالات لـ classes."

## جدول الحفظ السريع

| Pattern | احفظها بصورة | معناها في كلمة |
| --- | --- | --- |
| Singleton | الملك الوحيد | نسخة واحدة |
| Builder | وصفة طبخ | بناء خطوة خطوة |
| Factory | مصنع | إنشاء حسب النوع |
| Facade | زرار واحد | إخفاء التعقيد |
| Adapter | مشترك كهرباء | تحويل وتوافق |
| Decorator | طبقات قهوة | إضافة ميزات ديناميكية |
| Composite | شجرة فايلات | معاملة موحدة للفروع والأوراق |
| Proxy | حارس الموارد | وكيل للوصول |
| Strategy | طرق للشغل | بدائل لنفس الهدف |
| Observer | جرس تنبيه | إشعار عند حدوث تغيير |
| Command | جهاز تحكم | طلبات كـ objects |
| State | إشارة مرور | سلوك حسب الحالة |
لف، مثقب، وكيل، اختار، بلّغ، طلب، غيّر"

ومعناها:
- Singleton = واحد
- Builder = ابني
- Factory = اصنع
- Facade = بسّط
- Adapter = حوّل
- Decorator = لف (طبقات)
- Composite = مثقب (tree)
- Proxy = وكيل
- Strategy = اختار
- Observer = بلّغ
- Command = طلب
- State = غيّر

أو إختصار سريع:

"واحد، ابني، اصنع، بسّط، حوّل" (الـ 5 الأساسيين)
+ "لف، مثقب، وكيل" (الـ Structural الإضافيين)
+ "اختار، بلّغ، طلب، غيّر" (الـ Behavioral)
- Observer = بلّغ

دي أهم mnemonic:

"واحد، ابني، اصنع، بسّط، حوّل، اختار، بلّغ"

## مثال واحد يجمعهم كلهم

تخيل عندك e-commerce app.

**Singleton**
- Logger واحد للتطبيق كله

**Builder**
- تبني order كبير خطوة خطوة

```js
new OrderBuilder()
	.setUser()
	.addItems()
	.setAddress()
	.setCoupon()
	.build();
```

**Factory**
- تنشئ نوع user حسب role

```js
UserFactory.create("admin");
```

**Facade**
- زرار checkout يخفي كل الخطوات

```js
checkoutFacade.buyNow(order);
```

**Adapter**
- Stripe API شكلها مختلف، نعمل لها adapter

```js
paymentAdapter.pay(order);
```

**Strategy**
- الدفع له طرق مختلفة

```js
cardPayment.pay();
paypalPayment.pay();
bankTransferPayment.pay();
```

**Observer**
- لما الطلب ينجح، ابعت email وحدث UI وسجل analytics

```js
orderCompleted$.subscribe(...);
```

**Decorator**
- شحنة + تأمين + gift wrap

```js
let order = new SimpleOrder();
order = new InsuranceDecorator(order);
order = new GiftWrapDecorator(order);
```

**Composite**
- طلب يحتوي على items و sub-orders

```js
mainOrder.add(item);
mainOrder.add(subOrder);
mainOrder.display();
```

**Proxy**
- lazy load الصور الكبيرة

```js
const image = new ImageProxy("product.jpg");
```

**Command**
- كل عملية checkout بـ command قابلة للـ undo

```js
checkout.execute(new ProcessPaymentCommand());
checkout.undo();
```

**State**
- الطلب له states: pending -> processing -> shipped

```js
order.setState(new ProcessingState());
```

## لو عايز تختار بينهم بسرعة

اسأل نفسك السؤال ده:

1. هل عايز نسخة واحدة فقط؟
Singleton
2. هل الـ object بيتبني بخطوات أو parameters كتير؟
Builder
3. هل عايز تنشئ نوع مختلف حسب input؟
Factory
4. هل عايز تخفي نظام معقد ورا method بسيطة؟
Facade
5. هل عندك API أو مكتبة شكلها مختلف عن كودك؟
Adapter
6. هل عندك طرق مختلفة لنفس العملية؟
Strategy
7. هل عندك حدث وعايز تبلغ المهتمين؟
Observer
8. هل عايز تضيف ميزات اختيارية بدون تعديل الكود الأساسي؟
Decorator
9. هل عندك شجرة (tree) بدك معاملة موحدة للفروع والأوراق؟
Composite
10. هل عندك موارد غالية وتريد lazy loading أو access control؟
Proxy
11. هل عايز undo/redo أو تأجيل التنفيذ؟
Command
12. هل الكائن بيتصرف مختلف حسب حالته الداخلية؟
State

احفظهم بالشكل ده:

Singleton -> الملك
Builder -> الطباخ
Factory -> المصنع
Facade -> الريسبشن
Adapter -> المحوّل
Decorator -> صباغ الطبقات
Composite -> بناء الشجرة
Proxy -> الحارس
Strategy -> الخطة
Observer -> الجرس
Command -> الجهاز الكهربائي
State -> حالتك النفسية

دي كده شبه خريطة ذهنية. لما تشوف الكود، الصورة هتطلع في دماغك بسرعة.
