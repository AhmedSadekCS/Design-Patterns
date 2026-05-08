# Builder Pattern

الـ Builder Pattern معناه ببساطة:

بدل ما تعمل object كبير ومعقد عن طريق constructor طويل جدًا، بتبنيه خطوة خطوة باستخدام methods واضحة.

يعني بدل ما تكتب كده:

```ts
const request = new ApiRequest(
  "https://api.example.com/users",
  "POST",
  { Authorization: "Bearer token" },
  { name: "Ahmed" },
  5000,
  true
);
```

الكود ده صعب يتقرأ، ولازم تفتكر كل parameter مكانه إيه.

باستخدام Builder، تكتبها كده:

```ts
const request = new ApiRequestBuilder()
  .setUrl("https://api.example.com/users")
  .setMethod("POST")
  .setHeaders({ Authorization: "Bearer token" })
  .setBody({ name: "Ahmed" })
  .setTimeout(5000)
  .enableRetry()
  .build();
```

هنا الكود أوضح جدًا، وبتقرأه كأنه جملة.

## الفكرة الأساسية

الـ Builder بيفصل بين حاجتين:

- إنشاء الـ object
- تفاصيل بناء الـ object

يعني بدل ما الـ constructor يشيل كل حاجة، بنخلي class تاني مسؤول عن تجميع القيم، وفي الآخر يعمل `build()` ويرجع الـ object النهائي.

## مثال بسيط بـ TypeScript

```ts
class User {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public address?: string,
    public phone?: string
  ) {}
}

class UserBuilder {
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
    return new User(
      this.name,
      this.email,
      this.age,
      this.address,
      this.phone
    );
  }
}
```

الاستخدام:

```ts
const user = new UserBuilder()
  .setName("Ahmed")
  .setEmail("ahmed@test.com")
  .setAge(35)
  .build();
```

مش لازم تبعت `address` أو `phone` لو مش محتاجهم.

## ليه Builder مفيد؟

### 1) بيحل مشكلة الـ constructor الطويل

لما constructor يبقى فيه parameters كتير، الكود بيبقى صعب جدًا:

```ts
new User("Ahmed", "a@test.com", undefined, undefined, "123456");
```

هنا مش واضح `undefined` دي بتاعة إيه.

لكن مع Builder:

```ts
new UserBuilder()
  .setName("Ahmed")
  .setEmail("a@test.com")
  .setPhone("123456")
  .build();
```

أوضح بكتير.

### 2) بيساعد مع الـ optional parameters

مش مضطر تبعت `null` أو `undefined` لمجرد إن فيه values مش عندك.

### 3) أسهل في الصيانة

لو بعد شهر حبيت تضيف `setRole()`، هتضيف method جديدة في الـ Builder بدل ما تغير constructor وتكسر أماكن كتير في الكود.

## العيب الرئيسي

الـ Builder محتاج كود زيادة.

يعني بدل class واحد، ممكن تعمل class تاني مخصوص للبناء. ده اسمه boilerplate code.

فلو الـ object بسيط، مثلًا:

```ts
const point = new Point(10, 20);
```

مش محتاج Builder. استخدامه هنا هيبقى مبالغة.

## إمتى تستخدم Builder؟

استخدمه لما:

- عندك object فيه parameters كتير.
- عندك optional values كتير.
- ترتيب القيم في constructor بقى مربك.
- عايز تبني object خطوة بخطوة.
- عايز الكود يبقى مقروء وواضح.

مثال مناسب جدًا:

```ts
const report = new ReportBuilder()
  .setTitle("Monthly Sales")
  .setDateRange("2026-01-01", "2026-01-31")
  .includeCharts()
  .includeSummary()
  .setFormat("PDF")
  .build();
```

## إمتى متستخدموش؟

متستخدموش لو الـ object بسيط.

مثال:

```ts
new Product("Laptop", 1200);
```

هنا Builder هيزود تعقيد من غير فايدة.

## الفرق بين Builder و Constructor عادي

- Constructor مناسب لما القيم قليلة وواضحة.
- Builder مناسب لما القيم كثيرة، أو اختيارية، أو الـ object بيتبني على مراحل.

## مثال قريب من شغل الفرونت إند

تخيل عندك إعدادات table component:

```ts
const tableConfig = new TableConfigBuilder()
  .setColumns(columns)
  .setData(users)
  .enablePagination()
  .enableSorting()
  .setPageSize(20)
  .enableRowSelection()
  .build();
```

ده أوضح من:

```ts
new TableConfig(columns, users, true, true, 20, true, false, undefined);
```

## الخلاصة

الـ Builder Pattern مفيد لما بناء الـ object يبقى معقد.

بيخلي الكود أوضح، أسهل في القراءة، وأسهل في التعديل بعدين.

بس لو الـ object بسيط، بلاش تستخدمه، لأنه هيزود كود زيادة من غير داعي.
