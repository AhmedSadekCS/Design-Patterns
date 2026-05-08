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

### Adapter

All Adapter details and examples are in [docs/patterns/structural/adapter.md](docs/patterns/structural/adapter.md).

### Facade

All Facade details and examples are in [docs/patterns/structural/facade.md](docs/patterns/structural/facade.md).

## Behavioral Patterns

Handle communication between objects - how they interact and distribute responsibility.

Pattern files:

- [Strategy](docs/patterns/behavioral/strategy.md)
- [Observer](docs/patterns/behavioral/observer.md)

### Strategy

All Strategy details and examples are in [docs/patterns/behavioral/strategy.md](docs/patterns/behavioral/strategy.md).

### Observer

All Observer details and examples are in [docs/patterns/behavioral/observer.md](docs/patterns/behavioral/observer.md).

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

## جدول الحفظ السريع

| Pattern | احفظها بصورة | معناها في كلمة |
| --- | --- | --- |
| Singleton | الملك الوحيد | نسخة واحدة |
| Builder | وصفة طبخ | بناء خطوة خطوة |
| Factory | مصنع | إنشاء حسب النوع |
| Facade | زرار واحد | إخفاء التعقيد |
| Adapter | مشترك كهرباء | تحويل وتوافق |
| Strategy | طرق للشغل | بدائل لنفس الهدف |
| Observer | جرس تنبيه | إشعار عند حدوث تغيير |

## أقوى طريقة تحفظهم

احفظ الجملة دي:

"واحد، ابني، اصنع، بسّط، حوّل، اختار، بلّغ"

ومعناها:
- Singleton = واحد
- Builder = ابني
- Factory = اصنع
- Facade = بسّط
- Adapter = حوّل
- Strategy = اختار
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

احفظهم بالشكل ده:

Singleton -> الملك
Builder -> الطباخ
Factory -> المصنع
Facade -> الريسبشن
Adapter -> المحوّل
Strategy -> الخطة
Observer -> الجرس

دي كده شبه خريطة ذهنية. لما تشوف الكود، الصورة هتطلع في دماغك بسرعة.
