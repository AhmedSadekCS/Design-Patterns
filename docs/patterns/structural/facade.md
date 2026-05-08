# Facade Pattern

الـ Facade Pattern معناه ببساطة:

بدل ما تخلي الكود يتعامل مع تفاصيل كتير ومعقدة، تعمل له واجهة بسيطة تخفي كل التعقيد ده وراه.

يعني المستخدم أو الكود الخارجي ينادي method واحدة واضحة، والـ Facade جوه ينفذ كل الخطوات المعقدة.

## مثال من الحياة

تخيل زرار في موقع اسمه:

```ts
buyNow();
```

أنت كمستخدم ضغطت زرار واحد بس، لكن وراه حصل حاجات كتير:

- check stock
- validate payment
- detect fraud
- create order
- send email
- update inventory

بدل ما كل مكان في الكود يكتب الخطوات دي، نعمل Facade اسمه مثلًا `OrderFacade` وهو يتولى العملية كلها.

## مثال بدون Facade

```ts
const inventory = new InventoryService();
const payment = new PaymentService();
const fraud = new FraudDetectionService();
const email = new EmailService();

if (inventory.isAvailable(productId)) {
  if (!fraud.isSuspicious(userId)) {
    payment.charge(userId, amount);
    inventory.reduce(productId);
    email.sendConfirmation(userId);
  }
}
```

الكود هنا عارف تفاصيل كتير جدًا.

لو نفس العملية اتكررت في كذا مكان، هتلاقي logic متكرر وصعب الصيانة.

## نفس المثال باستخدام Facade

```ts
class OrderFacade {
  constructor(
    private inventory: InventoryService,
    private payment: PaymentService,
    private fraud: FraudDetectionService,
    private email: EmailService
  ) {}

  buyNow(userId: string, productId: string, amount: number): void {
    if (!this.inventory.isAvailable(productId)) {
      throw new Error("Product is not available");
    }

    if (this.fraud.isSuspicious(userId)) {
      throw new Error("Suspicious transaction");
    }

    this.payment.charge(userId, amount);
    this.inventory.reduce(productId);
    this.email.sendConfirmation(userId);
  }
}
```

الاستخدام بقى بسيط:

```ts
orderFacade.buyNow(userId, productId, amount);
```

الكود الخارجي مش محتاج يعرف تفاصيل الدفع، المخزون، كشف الاحتيال، أو الإيميل.

هو بيقول بس: "اشتري الآن".

## الفكرة الأساسية

الـ Facade لا يلغي الأنظمة الداخلية.

هو فقط يعمل طبقة سهلة فوقها.

يعني بدل ما تتعامل مع 5 services مباشرة، تتعامل مع service واحدة واضحة.

## مثال قريب من Angular

بدون Facade، الـ component ممكن يبقى مليان calls:

```ts
ngOnInit(): void {
  this.userService.getProfile().subscribe();
  this.notificationService.getNotifications().subscribe();
  this.permissionService.getPermissions().subscribe();
  this.statsService.getStats().subscribe();
  this.activityService.getRecentActivity().subscribe();
}
```

الأفضل تعمل Facade:

```ts
@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private permissionService: PermissionService,
    private statsService: StatsService,
    private activityService: ActivityService
  ) {}

  loadDashboard() {
    return {
      profile$: this.userService.getProfile(),
      notifications$: this.notificationService.getNotifications(),
      permissions$: this.permissionService.getPermissions(),
      stats$: this.statsService.getStats(),
      activity$: this.activityService.getRecentActivity()
    };
  }
}
```

والـ component يستخدمه كده:

```ts
export class DashboardComponent {
  dashboard = this.dashboardFacade.loadDashboard();

  constructor(private dashboardFacade: DashboardFacade) {}
}
```

## المميزات

- تبسيط الكود.
- إخفاء التعقيد.
- الصيانة أسهل (أي تغيير في الخطوات الداخلية يتعمل في مكان واحد).

## العيب الرئيسي

الخطر إن الـ Facade يكبر زيادة ويتحول إلى God Object.

مثال سيئ:

```ts
class AppFacade {
  login() {}
  logout() {}
  buyProduct() {}
  loadDashboard() {}
  uploadFile() {}
  sendEmail() {}
  generateReport() {}
  updateSettings() {}
}
```

الأفضل تقسمه حسب المجال:

- AuthFacade
- OrderFacade
- DashboardFacade
- FileUploadFacade
- ReportFacade

## إمتى تستخدم Facade؟

استخدمه لما يكون عندك عملية تحتاج التعامل مع كذا service أو subsystem.

مثلاً:

- OrderFacade
- CheckoutFacade
- DashboardFacade
- AuthFacade
- UploadFacade

خصوصًا لما الـ component أو الكود الخارجي يبقى مليان تفاصيل مش من مسؤوليته.

## إمتى متستخدموش؟

متستخدموش لو العملية بسيطة.

مثال:

```ts
this.userService.getUser();
```

لو دي call واحدة واضحة، مش محتاج تعمل Facade فوقها.

لكن لو العملية بقت:

- get user
- get permissions
- get settings
- get notifications
- merge result
- handle loading
- handle errors

هنا Facade مفيد.

## الفرق بين Facade و Factory

- Factory مسؤول عن إنشاء objects.

```ts
const sender = NotificationFactory.create("email");
```

- Facade مسؤول عن تبسيط التعامل مع نظام معقد.

```ts
checkoutFacade.buyNow(order);
```

Factory يجاوب: "أنشئ أي object؟"

Facade يجاوب: "نفذ العملية المعقدة دي من غير ما توريني تفاصيلها."

## الفرق بين Facade و Singleton

- Singleton يضمن إن فيه instance واحدة فقط.
- Facade يبسّط التعامل مع مجموعة services أو أنظمة.

ممكن Facade يكون Singleton في Angular لو معمول كـ service:

```ts
@Injectable({ providedIn: 'root' })
export class CheckoutFacade {}
```

لكن دي مش نفس الفكرة. Singleton عن عدد النسخ، Facade عن تبسيط الواجهة.

## الخلاصة

الـ Facade Pattern هو واجهة بسيطة فوق نظام معقد.

مفيد لما عندك كذا service أو خطوات كتير، وعايز تخلي الكود الخارجي نظيف وسهل القراءة.

بس خليك حذر. لو خليته يعمل كل حاجة، هيتحول لـ God object.

القاعدة البسيطة:

- لو الـ component أو الكود الخارجي بقى عارف تفاصيل كتير، اعمل Facade.
- لو العملية بسيطة، متزودش طبقة زيادة.
