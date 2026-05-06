import { useEffect } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import { InfoIcon } from '@phosphor-icons/react';
import { useVersion } from '@/contexts/version';
import { Link } from '@tanstack/react-router';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'what-it-includes', title: 'What It Includes', level: 1 },
  { id: 'configuration', title: 'Configuration', level: 1 },
  { id: 'vite-plugin', title: 'Vite Plugin', level: 2 },
  { id: 'locale-provider', title: 'LocaleProvider', level: 2 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'translating', title: 'Ceviri Kullanimi', level: 2 },
  { id: 'use-m', title: 'useM Hook', level: 2 },
  { id: 'locale-context', title: 'Locale Context', level: 2 },
  { id: 'adding-language', title: 'Yeni Dil Ekleme', level: 2 },
];

const I18nPluginPage = () => {
  const { setTocItems } = useTOC();
  const { currentVersion } = useVersion();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">i18n</h1>
        <p className="text-lg text-neutral-grey">
          inlang Paraglide tabanlı derleme zamanı çeviri sistemi. TR/EN mesaj katalogları ve dil
          değiştirici hook ile birlikte gelir. Tip güvenli, sıfır maliyetli runtime ve tree-shaking
          ile üretim build'inde kullanılmayan çeviri kodları paketten çıkarılır.
        </p>
        <InformationStatus
          className="mt-6 w-full"
          type="info"
          title={
            <div className="flex items-start gap-2">
              <InfoIcon
                size={18}
                weight="fill"
                className="text-info mt-0.5 shrink-0"
              />
              <p className="text-sm text-neutral-grey">
                Plugin, TRA UI Kit'in{' '}
                <Link
                  to={`/v${currentVersion}/components/language-select` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  language-select
                </Link>{' '}
                ve{' '}
                <Link
                  to={`/v${currentVersion}/components/language-toggle` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  language-toggle
                </Link>{' '}
                bileşenleri ile entegre çalışır; bu bileşenler otomatik eklenir.
              </p>
            </div>
          }
        />
      </section>

      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <p className="mb-3 text-neutral-grey">CLI ile projenize ekleyin:</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add i18n" />
        <p className="mt-3 text-sm text-neutral-grey">CLI şunları otomatik kurar:</p>
        <CustomSyntaxHighlighter content="@inlang/paraglide-js  @inlang/paraglide-vite" />
      </section>

      <section id="what-it-includes">
        <h2 className="mb-4 text-2xl font-bold">What It Includes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Dosya</th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['lib/locale.tsx', "LocaleProvider, useLocale ve useM hook'ları"],
                ['lib/locales.ts', 'Desteklenen dil listesi ve Locale tip tanımı'],
                ['messages/tr.json', 'Türkçe mesaj kataloğu'],
                ['messages/en.json', 'İngilizce mesaj kataloğu'],
                ['project.inlang/settings.json', 'inlang proje yapılandırması'],
              ].map(([file, desc]) => (
                <tr
                  key={file}
                  className="border-b border-border last:border-b-0 transition-colors hover:bg-neutral-light/30"
                >
                  <td className="p-3">
                    <code className="rounded bg-neutral-light px-1.5 py-0.5 text-xs font-mono text-foreground">
                      {file}
                    </code>
                  </td>
                  <td className="p-3 text-sm text-neutral-grey">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="configuration">
        <h2 className="mb-4 text-2xl font-bold">Configuration</h2>

        <div
          id="vite-plugin"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Vite Plugin</h3>
          <p className="text-neutral-grey">
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              vite.config.ts
            </code>{' '}
            dosyanıza Paraglide eklentisini ekleyin:
          </p>
          <CustomSyntaxHighlighter
            title="vite.config.ts"
            addedHighlightLines={[3, 8, 9, 10, 11]}
            content={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
  plugins: [
    react(),
    paraglideVitePlugin({
      project: './src/project.inlang',
      outdir: './src/paraglide',
    }),
  ],
});`}
          />
          <InformationStatus
            className="mt-2 w-full"
            type="info"
            title={
              <div className="flex items-start gap-2">
                <InfoIcon
                  size={18}
                  weight="fill"
                  className="text-info mt-0.5 shrink-0"
                />
                <p className="text-sm text-neutral-grey">
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    npm run dev
                  </code>{' '}
                  komutunu çalıştırdığınızda{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    src/paraglide/
                  </code>{' '}
                  klasörü otomatik oluşturulur. Bu klasörü{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    .gitignore
                  </code>
                  'a eklemeniz önerilir.
                </p>
              </div>
            }
          />
        </div>
      </section>

      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>

        <div
          id="translating"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Çeviri Kullanımı</h3>
          <p className="text-neutral-grey">Mesaj dosyalarınıza çeviri anahtarlarını ekleyin:</p>
          <CustomSyntaxHighlighter
            title="src/messages/tr.json"
            content={`{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "welcome": "Hoş geldiniz, {name}!",
  "logout":  "Çıkış Yap",
  "save":    "Kaydet"
}`}
          />
        </div>

        <div
          id="use-m"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">useM Hook</h3>
          <p className="text-neutral-grey">
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">useM()</code>{' '}
            hook'u aktif locale'e göre çeviri fonksiyonlarını döndürür:
          </p>
          <CustomSyntaxHighlighter
            addedHighlightLines={[1, 4, 5]}
            content={`import { useM } from '@/lib/locale';

const Greeting = ({ name }: { name: string }) => {
  const m = useM();
  return <h1>{m.welcome({ name })}</h1>;
};`}
          />
        </div>

        <div
          id="locale-context"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Locale Context</h3>
          <p className="text-neutral-grey">
            Aktif dili değiştirmek ve okumak için{' '}
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              useLocale
            </code>{' '}
            kullanın:
          </p>
          <CustomSyntaxHighlighter
            content={`import { useLocale } from '@/lib/locale';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();
  return (
    <button onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}>
      {locale === 'tr' ? 'EN' : 'TR'}
    </button>
  );
};`}
          />
        </div>

        <div
          id="adding-language"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Yeni Dil Ekleme</h3>
          <ol className="list-decimal space-y-2 pl-5 text-neutral-grey text-sm">
            <li>
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                src/messages/
              </code>{' '}
              klasörüne yeni JSON dosyası ekleyin (örn.{' '}
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                de.json
              </code>
              )
            </li>
            <li>
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                src/lib/locales.ts
              </code>{' '}
              dosyasındaki{' '}
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">Locale</code>{' '}
              tipine ve{' '}
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                locales
              </code>{' '}
              dizisine yeni dili ekleyin
            </li>
            <li>
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                src/project.inlang/settings.json
              </code>{' '}
              dosyasına dil kodunu ekleyin
            </li>
            <li>
              Projeyi yeniden çalıştırın:{' '}
              <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                npm run dev
              </code>{' '}
              – paraglide klasörü güncellenir
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default I18nPluginPage;
