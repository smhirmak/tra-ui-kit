# Test Setup ve Kullanım Kılavuzu

## Kurulum

Proje için test altyapısı aşağıdaki paketlerle kurulmuştur:

### Test Araçları

- **Vitest (v2.1.8)**: Modern, hızlı test framework
- **@testing-library/react (v16.3.0)**: React bileşenlerini test etmek için
- **@testing-library/jest-dom (v6.9.1)**: DOM assertions
- **@testing-library/user-event (v14.6.1)**: Kullanıcı etkileşimlerini simüle etmek için
- **@testing-library/dom**: DOM sorguları için
- **happy-dom (v20.0.11)**: Lightweight DOM implementation (jsdom yerine)
- **@vitest/ui (v2.1.8)**: Test UI arayüzü
- **@vitest/coverage-v8 (v2.1.8)**: Code coverage raporları

## Yapılandırma Dosyaları

### vitest.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/mockData', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### src/test/setup.ts

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

## Test Komutları

### Tüm testleri çalıştır (watch mode)

```bash
npm test
```

### Testleri bir kez çalıştır

```bash
npm run test:run
```

### UI ile testleri çalıştır

```bash
npm run test:ui
```

### Coverage raporu oluştur

```bash
npm run test:coverage
```

## Örnek Test: Accordion

`accordion.test.tsx` dosyası, kapsamlı bir test örneği sunmaktadır:

### Test Yapısı

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

describe('Accordion Component', () => {
  describe('Accordion', () => {
    it('should render accordion with children', () => {
      render(
        <Accordion>
          <AccordionItem title="Item 1">Content 1</AccordionItem>
          <AccordionItem title="Item 2">Content 2</AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
```

### Test Edilen Özellikler

#### Accordion

- ✅ Children rendering
- ✅ Custom className
- ✅ Farklı variant'lar (solid, outlined, splitted, underlined)
- ✅ Single expand mode
- ✅ Multiple expand mode
- ✅ Toggle functionality
- ✅ DefaultOpen prop

#### AccordionItem

- ✅ Title ve content rendering
- ✅ Subtitle rendering
- ✅ onClick event handling
- ✅ Disabled state
- ✅ StartContent rendering
- ✅ Custom icon
- ✅ Custom classNames

#### AccordionTrigger

- ✅ Title rendering
- ✅ Subtitle rendering
- ✅ onClick handling
- ✅ Disabled state
- ✅ Icon rotation (open/close)
- ✅ Custom icon
- ✅ StartContent

#### AccordionContent

- ✅ Content rendering
- ✅ data-open attribute (true/false)
- ✅ Custom className

## Test Coverage Sonuçları

Accordion bileşeni için elde edilen coverage:

- **Statements**: 98.54%
- **Branches**: 93.93%
- **Functions**: 87.5%
- **Lines**: 98.54%

## Best Practices

### 1. DOM Element Seçimi

```typescript
// ✅ Doğru - closest kullanarak data-open attribute'una sahip elementi bul
const content = screen.getByText('Content 1').closest('[data-open]');
expect(content).toHaveAttribute('data-open', 'true');

// ❌ Yanlış - parentElement her zaman doğru elementi bulmayabilir
const content = screen.getByText('Content 1').parentElement;
```

### 2. User Events

```typescript
import { fireEvent } from '@testing-library/react';

// Click eventi simüle et
fireEvent.click(screen.getByText('Button'));
```

### 3. Async Testing

```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### 4. Mock Functions

```typescript
import { vi } from 'vitest';

const handleClick = vi.fn();
// Test kodunda kullan
expect(handleClick).toHaveBeenCalledTimes(1);
```

## Yeni Test Ekleme

Yeni bir bileşen için test eklemek için:

1. `src/components/test/` klasörü altında `component-name.test.tsx` dosyası oluştur
2. Test setup'ını import et:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
```

3. Test suite'ini oluştur:

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

4. Testleri çalıştır:

```bash
npm test
```

## Troubleshooting

### JSDOM Hatası

Eğer `parse5` veya `jsdom` ile ilgili hata alırsanız, `happy-dom` kullanın:

```bash
npm uninstall jsdom
npm install -D happy-dom
```

### Coverage Version Mismatch

Vitest ve coverage versiyonları eşleşmiyorsa:

```bash
npm install -D @vitest/coverage-v8@2.1.8
```

### Missing Dependencies

Test sırasında eksik bağımlılık hatası alırsanız:

```bash
npm install -D @testing-library/dom
```

## Sonuç

Bu test altyapısı ile:

- ✅ Modern ve hızlı test framework (Vitest)
- ✅ Comprehensive test coverage
- ✅ UI test runner
- ✅ Code coverage raporları
- ✅ Best practices ile yazılmış test örnekleri

Projenize kolayca yeni testler ekleyebilir ve kod kalitenizi artırabilirsiniz.
