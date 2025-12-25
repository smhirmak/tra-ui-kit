# Versiyonlama Stratejisi - Best Practice

## 🎯 Prensip: Single Source of Truth

### ❌ YANLIŞ Yaklaşım (Şu anki)
```
src/components/button.tsx          (güncelle)
src/versions/v1/components/button.tsx  (güncelle)
registry/msi-kit/components/button.tsx (güncelle)
```
→ 3 farklı yerde aynı değişiklik = KÖTÜ

### ✅ DOĞRU Yaklaşım (Önerilen)

## Seçenek 1: Registry-First (ÖNERİLEN)

```
registry/msi-kit/components/
  └── button.tsx          ← TEK KAYNAK (CLI + Latest)

src/components/
  └── button.tsx          ← Re-export from registry

src/versions/
  └── v0/components/
      └── button.tsx      ← Sadece breaking change olduğunda
```

### Nasıl Çalışır?

#### 1. Normal Güncelleme (Breaking change YOK)
```bash
# Sadece registry'yi güncelle
edit registry/msi-kit/components/button.tsx

# Otomatik:
# - src/components/button.tsx registry'den import ediyor
# - CLI tool registry'den alıyor
# - v1 docs registry'yi kullanıyor
```

#### 2. Breaking Change (Yeni major versiyon)
```bash
# Adım 1: Eski versiyonu sakla
cp registry/msi-kit/components/button.tsx src/versions/v0/components/button.tsx

# Adım 2: Registry'de yeni versiyonu yaz
edit registry/msi-kit/components/button.tsx

# Adım 3: versions.json güncelle
{
  "versions": [
    { "version": "1", "isLatest": true },
    { "version": "0" }
  ]
}
```

## 📁 Yeni Klasör Yapısı

```
core/
├── registry/msi-kit/
│   ├── components/
│   │   ├── button.tsx        ← SOURCE OF TRUTH
│   │   ├── input.tsx
│   │   └── ...
│   └── utils/
├── src/
│   ├── components/
│   │   ├── button.tsx        ← export { default } from '@/registry/...'
│   │   ├── input.tsx
│   │   └── ...
│   ├── versions/
│   │   ├── v0/              ← Sadece eski/deprecated
│   │   │   └── components/
│   │   │       └── button.tsx (old implementation)
│   │   └── v1/              ← BOŞ (latest registry'den geliyor)
│   └── pages/
└── public/
    └── r/                    ← Build time'da registry'den oluşur
```

## 🔄 Workflow Örnekleri

### Örnek 1: Bug Fix / Minor Update
```bash
# 1. Sadece registry'yi düzenle
vim registry/msi-kit/components/button.tsx

# 2. Hepsi otomatik güncellenir:
# - Docs site (src/components re-export)
# - CLI tool (registry'den)
# - Latest version (v1 registry kullanıyor)
```

### Örnek 2: Breaking Change (API değişikliği)
```bash
# Scenario: color prop kaldırıyorsun, variant kullanıyorsun

# 1. Eski versiyonu kaydet
cp registry/msi-kit/components/button.tsx \
   src/versions/v0/components/button.tsx

# 2. Registry'de breaking change yap
vim registry/msi-kit/components/button.tsx
# color prop'u kaldır, variant ekle

# 3. versions.json güncelle
# v0 -> deprecated, v1 -> latest

# 4. v0 dökümantasyonu güncelle (isteğe bağlı)
cp src/pages/components/ButtonPage.tsx \
   src/versions/v0/pages/ButtonPage.tsx
```

### Örnek 3: Yeni Component Eklemek
```bash
# 1. Sadece registry'ye ekle
touch registry/msi-kit/components/tooltip.tsx

# 2. Re-export oluştur
echo "export { default } from '@/registry/msi-kit/components/tooltip';" \
  > src/components/tooltip.tsx

# 3. Component sayfası oluştur
touch src/pages/components/TooltipPage.tsx
```

## 🛠️ Implementation

### 1. src/components/button.tsx (Re-export)
```tsx
// Simple re-export from registry
export { default } from '@/registry/msi-kit/components/button';
export * from '@/registry/msi-kit/components/button';
export type { IButton } from '@/registry/msi-kit/components/button';
```

### 2. src/lib/version-loader.ts (Updated)
```tsx
export const getVersionedComponent = (version: string, componentName: string) => {
  // v0 gibi eski versiyonlar için versions klasörüne bak
  if (version === '0') {
    return lazy(() => 
      import(`@/versions/v${version}/components/${componentName.toLowerCase()}.tsx`)
    );
  }
  
  // Latest (v1+) için registry'den al
  return lazy(() => 
    import(`@/registry/msi-kit/components/${componentName.toLowerCase()}.tsx`)
  );
};
```

### 3. ButtonPage.tsx (Updated)
```tsx
import { lazy, Suspense } from 'react';
import { useVersion } from '@/contexts/version';

const getButtonComponent = (version: string) => {
  if (version === '0') {
    // Old version from versions folder
    return lazy(() => import('@/versions/v0/components/button'));
  }
  // Latest from registry
  return lazy(() => import('@/registry/msi-kit/components/button'));
};
```

## 📊 Karşılaştırma

| Durum | Eski Yöntem | Yeni Yöntem |
|-------|-------------|-------------|
| Bug fix | 3 dosya değiştir | 1 dosya değiştir (registry) |
| Minor update | 3 dosya değiştir | 1 dosya değiştir (registry) |
| Breaking change | 3 dosya değiştir + versions | 1 dosya değiştir + 1 kopyala |
| Yeni component | 3 dosya oluştur | 1 dosya + 1 re-export |

## 🎓 Best Practices

### ✅ DO
- Registry'yi source of truth olarak kullan
- Breaking change'de eski versiyonu versions/'a kopyala
- Re-export dosyalarını basit tut
- Latest version her zaman registry'den gelsin

### ❌ DON'T
- Aynı kodu 3 yere kopyalama
- src/components/'e direkt kod yazma (re-export kullan)
- versions/v1 oluşturma (latest zaten registry)
- Registry ve components'i senkronize tutmaya çalışma

## 🚀 Migration Plan

### 1. Mevcut Button'u Migrate Et
```bash
# Backup
cp src/components/button.tsx src/components/button.tsx.backup

# Re-export yap
echo "export { default } from '@/registry/msi-kit/components/button';" > src/components/button.tsx
echo "export * from '@/registry/msi-kit/components/button';" >> src/components/button.tsx
```

### 2. Registry'nin Güncel Olduğunu Doğrula
```bash
# Registry ve src/components'in aynı olduğunu kontrol et
diff src/components/button.tsx.backup registry/msi-kit/components/button.tsx
```

### 3. Versions Klasörünü Temizle
```bash
# v1'i sil (latest zaten registry'de)
rm -rf src/versions/v1
```

### 4. Version Loader'ı Güncelle
```tsx
// src/lib/version-loader.ts
export const getVersionedComponent = (version: string, componentName: string) => {
  const isOldVersion = parseInt(version) < 1;
  
  if (isOldVersion) {
    return lazy(() => import(`@/versions/v${version}/components/${componentName}`));
  }
  
  // Latest always from registry
  return lazy(() => import(`@/registry/msi-kit/components/${componentName}`));
};
```
