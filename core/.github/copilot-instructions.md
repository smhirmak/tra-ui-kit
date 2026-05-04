# GitHub Copilot Instructions – TRA UI Kit

## Proje Genel Bakış

TRA UI Kit, **shadcn/ui mimarisi** üzerine inşa edilmiş, React tabanlı bir bileşen kütüphanesi ve dokümantasyon sitesidir.

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS v4 (`@theme` direktifi ile CSS değişkenleri)
- **Routing**: React Router DOM v7 (`/:version/components/:slug` URL yapısı)
- **i18n**: i18next + react-i18next (varsayılan: Türkçe, fallback: İngilizce)
- **Animasyon**: Framer Motion
- **İkon**: `@phosphor-icons/react`
- **Test**: Vitest + @testing-library/react + happy-dom

---

## Dizin Yapısı ve Sorumluluklar

```
core/
├── registry/tra-kit/
│   ├── components/      ← ✅ GERÇEK bileşen implementasyonları burada
│   └── utils/
│       └── utils.ts     ← cn() ve preventScrollShift yardımcı fonksiyonları
│
├── src/
│   ├── components/      ← ⚠️ SADECE registry'den re-export dosyaları
│   │   ├── button.tsx   ← export * from '../../registry/tra-kit/components/button'
│   │   ├── formikInputs/  ← Formik entegrasyonlu sarmalayıcılar
│   │   └── test/        ← Her bileşen için test dosyaları (*.test.tsx)
│   │
│   ├── pages/
│   │   └── components/  ← Her bileşenin dokümantasyon sayfası (*Page.tsx)
│   │
│   ├── contexts/
│   │   ├── app/         ← AppProvider (bildirim ayarları)
│   │   ├── locale/      ← LocalizeProvider (i18n)
│   │   ├── notification/← NotificationProvider + NotificationContainer
│   │   ├── theme/       ← ThemeProvider (dark/light)
│   │   ├── toc/         ← TOCProvider (sayfa içi içindekiler tablosu)
│   │   └── version/     ← VersionProvider (bileşen sürümleme)
│   │
│   ├── layout/
│   │   ├── Layout.tsx         ← Ana layout (Header + Footer + Outlet)
│   │   ├── ComponentLayout.tsx← Bileşen sayfaları layout (sidebar nav + TOC + prev/next)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SideBar.tsx
│   │
│   ├── constants/
│   │   ├── Constants.ts   ← componentList (tüm bileşen metadata listesi)
│   │   └── languages/     ← en.ts ve tr.ts çeviri dosyaları
│   │
│   ├── utilities/
│   │   ├── getComponentSource.ts ← Vite ?raw import ile kaynak kodu okuma
│   │   ├── MethodHelper.ts
│   │   └── Object.ts
│   │
│   ├── versions/
│   │   ├── v0/            ← Eski sürüm bileşen override'ları
│   │   └── v1/
│   │
│   └── lib/
│       └── utils.ts       ← @/lib/utils alias için cn() re-export
│
├── public/
│   ├── versions.json      ← Sürüm listesi (version, label, releaseDate, isLatest)
│   └── r/                 ← Shadcn registry JSON dosyaları (her bileşen için)
│
├── registry.json          ← Ana shadcn registry tanımı
├── components.json        ← Shadcn CLI konfigürasyonu
└── vite.config.ts         ← @/ alias → ./src
```

---

## Bileşen Tanımlama Kuralları

### Kural 1: Tek Kayıt Noktası

**Gerçek implementasyon daima `registry/tra-kit/components/<bileşen-adı>.tsx` içinde olmalıdır.**

`src/components/<bileşen-adı>.tsx` dosyası yalnızca re-export içerir:

```tsx
// src/components/button.tsx — SADECE BU KADAR
export * from '../../registry/tra-kit/components/button';
export { default } from '../../registry/tra-kit/components/button';
```

### Kural 2: CVA (class-variance-authority) Kullanımı

Her bileşen `cva()` ile varyant sistemi kurar. Standart yapı:

```tsx
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'base-classes-buraya', // zorunlu base sınıflar
  {
    variants: {
      variant: {
        solid: '...',
        outlined: '...',
        ghost: '...',
      },
      size: {
        default: 'h-14 px-7',
        sm: 'h-13 px-6',
        lg: 'h-15 px-8',
        icon: 'size-10 rounded-full',
      },
      color: {
        primary: '...',
        secondary: '...',
        tertiary: '...', // ⚠️ "tertiary" DEĞİL, "tertiary" (proje genelinde bu yazım kullanılır)
        error: '...',
      },
    },
    compoundVariants: [
      // Birden fazla varyant bir arada olduğunda uygulanacak sınıflar
      { variant: 'outlined', color: 'primary', className: '...' },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'default',
      color: 'primary',
    },
  },
);
```

### Kural 3: TypeScript Interface Adlandırması

- Interface isimleri **`I` prefiksi** alır: `IButton`, `IInput`, `IAccordion`
- `VariantProps<typeof xyzVariants>` kullanılır
- `React.ButtonHTMLAttributes` gibi standart HTML attribute'ları `Omit` ile genişletilir:

```tsx
export interface IButton
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  // ...
}
```

### Kural 4: React.forwardRef Kullanımı

Form elemanları ve ref iletimi gereken bileşenler `React.forwardRef` kullanır:

```tsx
const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ variant, size, color, className, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export default Button;
```

### Kural 5: cn() Utility Kullanımı

Tüm className birleştirmeleri `cn()` ile yapılır:

```tsx
import { cn } from '@/lib/utils';

// Kullanım
<div className={cn(componentVariants({ variant, size }), className, 'ek-sınıf')} />;
```

### Kural 6: data-\* Attribute ile State Yönetimi

CSS state kontrolü `data-*` attribute'larla yapılır:

```tsx
<div data-open={isOpen} data-disabled={disabled}>
```

```css
/* TailwindCSS ile */
data-[open="true"]:max-h-full
data-[disabled="true"]:cursor-default
```

---

## Yeni Bileşen Ekleme Adımları

Yeni bir bileşen eklerken sırasıyla şu adımlar izlenir:

### Adım 1 — Registry bileşeni oluştur

```
registry/tra-kit/components/<bileşen-adı>.tsx
```

CVA pattern, `I` prefixli interface, `React.forwardRef`, `export default` kurallarına uy.

### Adım 2 — src/components re-export dosyasını oluştur

```tsx
// src/components/<bileşen-adı>.tsx
export * from '../../registry/tra-kit/components/<bileşen-adı>';
export { default } from '../../registry/tra-kit/components/<bileşen-adı>';
```

### Adım 3 — Constants.ts componentList'e ekle

```ts
// src/constants/Constants.ts
{
  name: 'Component Name',
  description: 'Kısa açıklama',
  Icon: SomePhosphorIcon,
  path: '/components/<slug>',
  category: 'Input' | 'Display' | 'Overlay' | 'Feedback' | 'Navigation' | 'Layout',
  isShowHome: true, // opsiyonel — ana sayfada gösterilsin mi?
}
```

### Adım 4 — Dokümantasyon sayfasını oluştur

```
src/pages/components/<BileşenAdı>Page.tsx
```

Standart sayfa yapısı (aşağıya bakınız).

### Adım 5 — App.tsx'e route ekle

```tsx
{ path: '<slug>', element: <BileşenAdıPage /> }
```

### Adım 6 — Test dosyasını oluştur

```
src/components/test/<bileşen-adı>.test.tsx
```

### Adım 7 — Registry'e JSON ekle

```
public/r/<bileşen-adı>.json
```

Ve `registry.json` içine item ekle.

---

## Dokümantasyon Sayfası Yapısı

Her `*Page.tsx` dosyası şu yapıyı izler:

```tsx
import { useEffect, Suspense, lazy } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { useVersion } from '@/contexts/version';
import { TOCItem } from '@/components/table-of-contents';
import VersionBanner from '@/components/version-banner';
import ApiTable from '@/components/api-table';
import ComponentSourceViewer from '@/components/component-source-viewer';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { Tab, Tabs } from '@/components/tabs';
import Button from '@/components/button';

// 1) TOC tanımı
const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

// 2) API tablosu
const apiTableData = [
  { prop: 'variant', type: '"solid" | "outlined"', default: '"solid"', description: '...' },
];

const ComponentPage = () => {
  const { setTocItems } = useTOC();
  const { currentVersion } = useVersion();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <VersionBanner />

      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Bileşen Adı</h1>
        <p className="text-lg text-neutral-grey">Açıklama</p>
      </section>

      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <CustomSyntaxHighlighter
          content={`npx shadcn@latest add https://ui.trabilisim.tech//r/<bileşen>.json`}
        />
      </section>

      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <Tabs>
          <Tab label="Preview">...</Tab>
          <Tab label="Code">
            <ComponentSourceViewer componentName="<bileşen-adı>" />
          </Tab>
        </Tabs>
      </section>

      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default ComponentPage;
```

---

## Context Kullanım Referansı

| Context / Hook | Import | Açıklama |
| --- | --- | --- |
| `useTheme()` | `@/contexts/theme/theme-provider` | `theme`, `setTheme` |
| `useVersion()` | `@/contexts/version` | `currentVersion`, `versions`, `isLatestVersion`, `setVersion` |
| `useTOC()` | `@/contexts/toc/TOCContext` | `tocItems`, `setTocItems` |
| `useNotification()` | `@/contexts/notification/NotificationProvider` | `invoke(type, message, options)` |
| `useLocalizeContext()` | `@/contexts/locale/LocalizeContext` | `t()`, `locale`, `setLocale` |
| `useAppContext()` | `@/contexts/app/AppProvider` | Bildirim tema/mod/pozisyon ayarları |

### Notification Kullanımı

```tsx
const { invoke } = useNotification();
invoke('success', 'İşlem başarılı', { autoClose: true, autoCloseTime: 3000 });
invoke('error', 'Hata oluştu', { autoClose: false });
invoke('warning', 'Uyarı', { icon: <CustomIcon /> });
```

### Theme Kullanımı

```tsx
const { theme, setTheme } = useTheme();
setTheme('dark'); // veya 'light'
```

---

## Stil Sistemi (TailwindCSS v4)

### Renk Tokenleri

Tüm renkler CSS custom property olarak tanımlanmıştır (`src/index.css` `@theme` bloğu):

```
primary, primary-5, primary-15, primary-30, primary-focused, primary-soft
secondary, secondary-light
tertiary (⚠️ tertiary değil!)
error, error-light
success, success-light
warning, warning-light
neutral-black, neutral-light-black, neutral-grey, neutral, neutral-light, neutral-white, neutral-dark-white
disabled, disabled-dark, disabled-light-dark, disabled-light
button-disabled, button-disabled-text, button-text
input, input-light, input-fill, input-focused
background, foreground, border, ring
```

### Gölge Tokenleri

```
shadow-input-hover    → hover state (form elemanları)
shadow-input-focus    → focus state
shadow-soft-grey      → yumuşak gri gölge
shadow-soft-primary   → yumuşak mavi gölge
shadow-hard-grey      → sert gri gölge
shadow-hard-primary   → sert mavi gölge
```

### Özel Animasyonlar

```
animate-accordion-down / animate-accordion-up
animate-linear-loader
animate-bounce-in-right / animate-bounce-out-right
animate-bounce-in-left / animate-bounce-out-left
animate-slide-in-right / animate-slide-out-right
animate-flip-in / animate-flip-out
```

### Dark Mode

Dark mode `.dark` class ile tetiklenir:

```tsx
// TailwindCSS'te
className = 'bg-white dark:bg-neutral-black';

// @custom-variant tanımı (index.css):
// @custom-variant dark (&:is(.dark *));
```

---

## Sürüm Yönetimi

### URL Yapısı

```
/           → VersionRedirect (varsayılan sürüme yönlendirir)
/v1         → Layout > Home
/v1/components        → ComponentsOverview
/v1/components/button → ComponentLayout > ButtonPage
```

### Sürüm Dosyaları

- `public/versions.json` — Sürüm metadata listesi
- `src/versions/v0/` — v0 bileşen override'ları
- `src/versions/v1/` — v1 bileşen override'ları

### Sürüme Göre Dinamik Import

Sayfa bileşenlerinde sürüme göre farklı bileşen yüklenir:

```tsx
const getButtonComponent = (version: string) => {
  const versionNum = parseInt(version);
  if (versionNum === 0) {
    return lazy(() =>
      import(`@/versions/v0/components/button.tsx`).catch(() => import('@/components/button')),
    );
  }
  return lazy(() => Promise.resolve({ default: Button }));
};
```

---

## Yardımcı Bileşenler (Dokümantasyon İçin)

| Bileşen | Açıklama |
| --- | --- |
| `<ApiTable tableData={...} />` | Prop tablosu (prop, type, default, description sütunları) |
| `<ComponentSourceViewer componentName="button" />` | Bileşen kaynak kodunu gösterir (`?raw` import) |
| `<CustomSyntaxHighlighter content={code} />` | Söz dizimi vurgulayıcı |
| `<VersionBanner />` | Güncel olmayan sürümlerde uyarı gösterir |
| `<Tabs> <Tab label="...">` | Preview/Code tabları |
| `<TableOfContents />` | Sayfa içi navigasyon |

---

## Test Yazma Kuralları

Test dosyaları `src/components/test/<bileşen-adı>.test.tsx` olarak oluşturulur.

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ComponentName from '../component-name'; // src/components'tan import

describe('ComponentName Component', () => {
  it('should render with default props', () => {
    render(<ComponentName />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

Test komutları:

```bash
npm run test           # watch mode
npm run test:run       # tek seferlik
npm run test:coverage  # coverage raporu
```

---

## Formik Entegrasyonu

Formik wrapper bileşenleri `src/components/formikInputs/` altındadır:

| Dosya                  | Açıklama                  |
| ---------------------- | ------------------------- |
| `FormikInput.tsx`      | `TextField` sarmalayıcı   |
| `FormikSelect.tsx`     | `Select` sarmalayıcı      |
| `FormikSwitch.tsx`     | `Switch` sarmalayıcı      |
| `FormikFileUpload.tsx` | Dosya yükleme sarmalayıcı |
| `FormikErrorText.tsx`  | Hata mesajı gösterici     |

```tsx
// Kullanım örneği
<FormikInput
  id="username"
  formik={formik}
  label="Kullanıcı Adı"
  placeholder="Girin"
  variant="filled"
/>
```

---

## Path Alias

```
@/  →  src/
```

Örnek importlar:

```tsx
import Button from '@/components/button';
import { cn } from '@/lib/utils';
import { useVersion } from '@/contexts/version';
import Constants from '@/constants/Constants';
```

---

## Sık Yapılan Hatalar ve Dikkat Edilecekler

1. **"tertiary" değil "tertiary"** — Proje genelinde bu yazım kullanılıyor, değiştirme.
2. **Gerçek implementasyon `registry/tra-kit/components/` içinde** — `src/components/` sadece re-export.
3. **Yeni bileşen eklenince `Constants.ts` componentList güncellenmelidir** — Aksi takdirde sidebar ve overview'da görünmez.
4. **Route eklemeyi unutma** — `src/App.tsx` içindeki ComponentLayout children'ına eklenmeli.
5. **`preventScrollShift.lock()/unlock()`** — Modal/Dialog/Drawer açılırken scrollbar shift'ini önlemek için kullanılır.
6. **Dark mode class'ı `.dark`** — `data-theme` değil, doğrudan `html` elementine `.dark` class eklenir.
7. **`@/lib/utils`** `cn()` için kullanılır; orijinal implementasyon `registry/tra-kit/utils/utils.ts` içindedir.
8. **Bileşen kaynak kodu Vite `?raw` import ile** yüklenir — `getComponentSource('button')` çağrısı `registry/tra-kit/components/button.tsx?raw` ile çalışır.
