# Versiyonlama Sistem Dokümantasyonu

## 📁 Klasör Yapısı

```
src/
├── versions/
│   ├── v0/
│   │   ├── components/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── pages/
│   │       ├── ButtonPage.tsx
│   │       ├── InputPage.tsx
│   │       └── ...
│   ├── v1/
│   │   ├── components/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── pages/
│   │       ├── ButtonPage.tsx
│   │       ├── InputPage.tsx
│   │       └── ...
│   └── v2/ (gelecek)
│       └── ...
├── components/ (default/fallback)
├── pages/
└── lib/
    └── version-loader.ts
```

## 🎯 Nasıl Çalışır?

### 1. Version Metadata (versions.json)
```json
{
  "versions": [
    {
      "version": "1",
      "label": "v1 (Latest)",
      "isLatest": true
    },
    {
      "version": "0",
      "label": "v0"
    }
  ]
}
```

### 2. URL Yapısı
- `/v1/components/button` → v1 versiyonu
- `/v0/components/button` → v0 versiyonu

### 3. Component Sayfasında Kullanım

```tsx
import { lazy, Suspense } from 'react';
import { useVersion } from '@/contexts/version';

// Dynamic import
const getButtonComponent = (version: string) => {
  return lazy(() =>
    import(\`@/versions/v\${version}/components/button.tsx\`)
      .catch(() => import('@/components/button')) // Fallback
  );
};

function ButtonPage() {
  const { currentVersion } = useVersion();
  const Button = getButtonComponent(currentVersion);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button>Click me</Button>
    </Suspense>
  );
}
```

## 🔄 Yeni Versiyon Ekleme Workflow

### Adım 1: Klasör Oluştur
```bash
mkdir -p src/versions/v2/components
mkdir -p src/versions/v2/pages
```

### Adım 2: Component'i Kopyala ve Değiştir
```bash
# Önceki versiyondan kopyala
cp src/versions/v1/components/button.tsx src/versions/v2/components/button.tsx

# Değişiklikleri yap
# v2/components/button.tsx içinde istediğin değişiklikleri yap
```

### Adım 3: Page'i Kopyala (Gerekirse)
```bash
# Eğer dokümantasyon sayfası değişiyorsa
cp src/pages/components/ButtonPage.tsx src/versions/v2/pages/ButtonPage.tsx
```

### Adım 4: versions.json Güncelle
```json
{
  "versions": [
    {
      "version": "2",
      "label": "v2 (Latest)",
      "isLatest": true
    },
    {
      "version": "1",
      "label": "v1"
    },
    {
      "version": "0",
      "label": "v0"
    }
  ],
  "defaultVersion": "2"
}
```

### Adım 5: Test Et
- `/v2/components/button` URL'ini ziyaret et
- v2 component'inin yüklendiğini doğrula
- v1 ve v0'ın hala çalıştığını kontrol et

## 📋 Hangi Dosyalar Versiyonlanmalı?

### ✅ Versiyonlanması Gerekenler:
- **Components**: `button.tsx`, `input.tsx`, vb.
- **Component Pages**: `ButtonPage.tsx`, `InputPage.tsx` (eğer içerik değişiyorsa)
- **Component Utilities**: Sadece o component'e özel utilities

### ❌ Versiyonlanmaması Gerekenler:
- **Global Utilities**: `lib/utils.ts`, `lib/cn.ts`
- **Contexts**: `contexts/theme`, `contexts/version`
- **Layout Components**: `Header.tsx`, `Footer.tsx`
- **Global Styles**: `index.css`, `App.css`

## 💡 Best Practices

### 1. Breaking Changes için Yeni Versiyon
```tsx
// v0: Old API
<Button type="primary">Click</Button>

// v1: New API (breaking change)
<Button variant="solid" color="primary">Click</Button>
```

### 2. Fallback Mekanizması
Her zaman default component'e fallback yap:
```tsx
import(\`@/versions/v\${version}/components/button.tsx\`)
  .catch(() => import('@/components/button'))
```

### 3. Shared Code için Re-export
Eğer kodun çoğu aynı:
```tsx
// v1/components/button.tsx
export { default } from '@/components/button';
export * from '@/components/button';
```

### 4. Version-Specific Docs
Eğer component'in kullanımı değiştiyse, sayfa da versiyonla:
```tsx
// v0/pages/ButtonPage.tsx - Old examples
// v1/pages/ButtonPage.tsx - New examples with new props
```

## 🚀 Gelişmiş Kullanım

### Utility Helper ile
```tsx
import { loadVersionedComponent } from '@/lib/version-loader';

const Button = loadVersionedComponent(currentVersion, 'Button');
```

### Conditional Rendering
```tsx
const { currentVersion } = useVersion();

return (
  <>
    {currentVersion === '0' && <OldFeature />}
    {currentVersion === '1' && <NewFeature />}
  </>
);
```

## 🔍 Debugging

### Component Yükleme Problemleri
Tarayıcı console'da:
```
Versioned component v1/Button not found, using default
```

### Build Problemleri
Vite dynamic import'ları destekler ama glob pattern kontrol et:
```ts
// ✅ İyi
import(\`@/versions/v\${version}/components/button.tsx\`)

// ❌ Kötü
import(someDynamicPath)
```
