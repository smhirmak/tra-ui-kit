import Container from '@/components/ui/container';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import {
  RocketLaunchIcon,
  FolderOpenIcon,
  PlugIcon,
  ArrowRightIcon,
  InfoIcon,
  CheckCircleIcon,
  PuzzlePieceIcon,
  BuildingsIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useVersion } from '@/contexts/version';
import { cn } from '@/lib/utils';

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

const Step = ({ number, title, children, isLast = false }: StepProps) => (
  <div className="flex gap-5">
    <div className="flex flex-col items-center">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
        {number}
      </div>
      {!isLast && <div className="mt-2 w-0.5 flex-1 bg-border" />}
    </div>
    <div className={cn('flex-1 pb-10', isLast && 'pb-0')}>
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  </div>
);

const Card = ({
  icon: Icon,
  title,
  description,
  href,
  label,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  label: string;
}) => (
  <Link
    to={href as any}
    className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/40 hover:shadow-soft-primary"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
      <Icon
        size={22}
        weight="duotone"
      />
    </div>
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-sm text-neutral-grey">{description}</p>
    </div>
    <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
      {label}{' '}
      <ArrowRightIcon
        size={14}
        className="transition-transform group-hover:translate-x-1"
      />
    </span>
  </Link>
);

const GettingStarted = () => {
  const { currentVersion } = useVersion();
  const v = `/v${currentVersion}`;

  return (
    <Container className="my-10 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold">Getting Started</h1>
        <p className="text-lg text-neutral-grey">
          TRA UI Base template ile saniyeler içinde kurumsal standartlara uygun bir React uygulaması
          başlatın. Tüm temel kurulumlar hazır; sadece geliştirmeye odaklanın.
        </p>
      </div>

      {/* What's included banner */}
      <div className="mb-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="mb-4 font-semibold text-foreground">Template içinde neler var?</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            'React 19 + TypeScript',
            'Vite 6 + Tailwind CSS v4',
            'TanStack Router v1',
            'TanStack Query v5',
            'Theme (light/dark)',
            'ESLint + Prettier',
            'TanStack Devtools',
            'Header & Footer layout',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-neutral-grey"
            >
              <CheckCircleIcon
                size={15}
                weight="fill"
                className="shrink-0 text-success"
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Hızlı Başlangıç</h2>

        <Step
          number={1}
          title="Template'i İndir"
        >
          <p className="mb-3 text-neutral-grey">
            CLI ile TRA UI Base template'ini yerel makinenize çekin:
          </p>
          <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui create my-app" />
          <p className="mt-3 text-sm text-neutral-grey">
            Proje adı vermeden de çalıştırabilirsiniz, CLI size sorar:
          </p>
          <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui create" />
          <InformationStatus
            className="mt-4 w-full"
            type="info"
            title={
              <div className="flex items-start gap-2">
                <InfoIcon
                  size={16}
                  weight="fill"
                  className="text-info mt-0.5 shrink-0"
                />
                <p className="text-sm text-neutral-grey">
                  Komut çalıştığında bağımlılıklar otomatik kurulur. Başarısız olursa proje
                  klasörüne girip{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    npm install
                  </code>{' '}
                  çalıştırın.
                </p>
              </div>
            }
          />
        </Step>

        <Step
          number={2}
          title="Geliştirme Sunucusunu Başlat"
        >
          <CustomSyntaxHighlighter
            content={`cd my-app
npm run dev`}
          />
          <p className="mt-3 text-sm text-neutral-grey">
            Uygulama varsayılan olarak{' '}
            <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
              http://localhost:3000
            </code>{' '}
            adresinde çalışır.
          </p>
        </Step>

        <Step
          number={3}
          title="Projenizi Genişletin"
          isLast
        >
          <p className="mb-4 text-neutral-grey">
            Template hazır! Bundan sonra iki yönde ilerleyebilirsiniz:
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to={`${v}/installation` as any}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-soft-primary"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <PuzzlePieceIcon
                  size={20}
                  weight="duotone"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">TRA UI Kit Entegrasyonu</p>
                <p className="mt-0.5 text-sm text-neutral-grey">
                  Hazır UI bileşenlerini projeye ekleyin
                </p>
                <span className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  Kurulum sayfasına git{' '}
                  <ArrowRightIcon
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
            <Link
              to={`${v}/plugins` as any}
              className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-soft-primary"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <PlugIcon
                  size={20}
                  weight="duotone"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">Plugin Ekle</p>
                <p className="mt-0.5 text-sm text-neutral-grey">
                  Axios, i18n, SignalR ve diğer altyapılar
                </p>
                <span className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  Plugin sayfasına git{' '}
                  <ArrowRightIcon
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </div>
        </Step>
      </div>

      {/* Project structure */}
      <section className="mb-16">
        <div className="mb-4 flex items-center gap-2">
          <FolderOpenIcon
            size={22}
            weight="duotone"
            className="text-primary"
          />
          <h2 className="text-2xl font-bold">Proje Yapısı</h2>
        </div>
        <p className="mb-4 text-neutral-grey">Template aşağıdaki dosya yapısıyla gelir:</p>
        <CustomSyntaxHighlighter
          content={`my-app/
├── src/
│   ├── components/       # Uygulama bileşenleri
│   ├── contexts/
│   │   └── theme/        # ThemeProvider
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── layout/
│   │   ├── header.tsx    # Uygulama header'ı
│   │   └── footer.tsx    # Uygulama footer'ı
│   ├── lib/
│   │   └── utils.ts      # cn() utility fonksiyonu
│   ├── routes/
│   │   ├── __root.tsx    # Root layout (Header + Outlet + Footer)
│   │   └── index.tsx     # Ana sayfa (/)
│   ├── main.tsx          # Uygulama giriş noktası
│   ├── routeTree.gen.ts  # TanStack Router otomatik üretir
│   └── styles.css        # Tailwind CSS v4 giriş noktası
├── public/
│   └── assets/
├── vite.config.ts
├── tsconfig.json
├── eslint.config.ts
└── package.json`}
        />
      </section>

      {/* Plugin section */}
      {/* <section className="mb-16">
        <div className="mb-4 flex items-center gap-2">
          <PlugIcon
            size={22}
            weight="duotone"
            className="text-primary"
          />
          <h2 className="text-2xl font-bold">Plugin Ekle</h2>
        </div>
        <p className="mb-4 text-neutral-grey">
          Temel template kurulduktan sonra ihtiyaç duyduğunuz pluginleri tek komutla projeye
          ekleyebilirsiniz:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Plugin</th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Komut</th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">
                  Ne sağlar?
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'axios',
                  'npx @tra-bilisim/tra-ui add axios',
                  'HTTP client, AuthProvider, createService factory',
                ],
                ['i18n', 'npx @tra-bilisim/tra-ui add i18n', 'Paraglide tabanlı çoklu dil desteği'],
                [
                  'signalr',
                  'npx @tra-bilisim/tra-ui add signalr',
                  'Real-time bağlantı, MessageHubProvider',
                ],
                [
                  'table',
                  'npx @tra-bilisim/tra-ui add table',
                  'TanStack Table v8, CustomTable bileşeni',
                ],
                [
                  'forms',
                  'npx @tra-bilisim/tra-ui add forms',
                  'Formik + Yup, hazır form bileşenleri',
                ],
              ].map(([plugin, cmd, desc]) => (
                <tr
                  key={plugin}
                  className="border-b border-border last:border-b-0 hover:bg-neutral-light/30 transition-colors"
                >
                  <td className="p-3">
                    <code className="rounded bg-neutral-light px-1.5 py-0.5 text-xs font-mono font-semibold text-primary">
                      {plugin}
                    </code>
                  </td>
                  <td className="p-3">
                    <code className="rounded bg-neutral-light px-1.5 py-0.5 text-xs font-mono text-foreground">
                      {cmd}
                    </code>
                  </td>
                  <td className="p-3 text-sm text-neutral-grey">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InformationStatus
          className="mt-4 w-full"
          type="warning"
          title={
            <div className="flex items-start gap-2">
              <WarningIcon
                size={16}
                weight="fill"
                className="text-warning mt-0.5 shrink-0"
              />
              <p className="text-sm text-neutral-grey">
                Plugin eklemeden önce{' '}
                <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                  npx @tra-bilisim/tra-ui init
                </code>{' '}
                ile TRA UI Kit'in başlatılmış olması gerekir.
              </p>
            </div>
          }
        />
      </section> */}

      {/* Corporate guidelines */}
      <section className="mb-16">
        <div className="mb-4 flex items-center gap-2">
          <BuildingsIcon
            size={22}
            weight="duotone"
            className="text-primary"
          />
          <h2 className="text-2xl font-bold">Kurumsal Standartlar</h2>
        </div>
        <p className="mb-6 text-neutral-grey">
          TRA UI Base, şirket içi tüm UI projelerinin aynı yapıda kurulmasını sağlamak için
          tasarlanmıştır. Aşağıdaki kurallara uyulması beklenmektedir.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: '1. Her proje TRA UI Base template üzerinden başlar',
              body: (
                <p className="text-sm text-neutral-grey">
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    npx @tra-bilisim/tra-ui create
                  </code>{' '}
                  ile oluşturulan template temel başlangıç noktasıdır. Boş Vite projesi açılmaz. Bu
                  sayede tüm projelerde aynı klasör yapısı, aynı tooling ve aynı provider
                  hiyerarşisi korunur.
                </p>
              ),
            },
            {
              title: '2. Stil sistemi: Tailwind CSS v4 + TRA Tema',
              body: (
                <p className="text-sm text-neutral-grey">
                  Bileşen stillemesi için yalnızca Tailwind CSS v4 utility sınıfları kullanılır.
                  Tema renkleri ve tasarım token'ları{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    npx @tra-bilisim/tra-ui init
                  </code>{' '}
                  ile kurulan TRA tema konfigürasyonundan alınır; hardcoded renk değerleri
                  kullanılmaz.
                </p>
              ),
            },
            {
              title: '3. Routing: TanStack Router (file-based)',
              body: (
                <p className="text-sm text-neutral-grey">
                  Tüm sayfalar{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    src/routes/
                  </code>{' '}
                  klasörü altında dosya tabanlı route olarak tanımlanır.{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    routeTree.gen.ts
                  </code>{' '}
                  otomatik üretilir, elle düzenlenmez. Loader ve context için TanStack Query ile
                  birlikte kullanılır.
                </p>
              ),
            },
            {
              title: '4. HTTP istekleri: Axios Plugin',
              body: (
                <p className="text-sm text-neutral-grey">
                  Tüm API çağrıları{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    createService
                  </code>{' '}
                  factory'si üzerinden yapılır. Doğrudan{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    fetch
                  </code>{' '}
                  veya ham{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    axios
                  </code>{' '}
                  çağrısı yapılmaz; interceptor ve token yönetimi merkezi konfigürasyondan
                  yönetilir.
                </p>
              ),
            },
            {
              title: '5. Çoklu Dil: i18n Plugin',
              body: (
                <p className="text-sm text-neutral-grey">
                  Uygulamalar Türkçe / İngilizce desteğiyle başlar.{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    useM()
                  </code>{' '}
                  hook'u ile tip güvenli mesaj katalogları kullanılır. Hardcoded Türkçe/İngilizce
                  metin bırakılmaz; tüm UI metinleri mesaj katalogunda tanımlanır.
                </p>
              ),
            },
            {
              title: '6. UI Bileşenleri: TRA UI Kit',
              body: (
                <p className="text-sm text-neutral-grey">
                  Yeni bileşen yazmadan önce TRA UI Kit'te aynı amaca hizmet eden bir bileşen olup
                  olmadığı kontrol edilir. Var olan bileşenler{' '}
                  <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                    npx @tra-bilisim/tra-ui add
                  </code>{' '}
                  ile projeye eklenerek kullanılır, kopyala-yapıştır yapılmaz.
                </p>
              ),
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border p-5"
            >
              <p className="mb-2 font-semibold text-foreground">{title}</p>
              {body}
            </div>
          ))}
        </div>
      </section>

      {/* Next steps cards */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <PuzzlePieceIcon
            size={22}
            weight="duotone"
            className="text-primary"
          />
          <h2 className="text-2xl font-bold">Sonraki Adımlar</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card
            icon={PuzzlePieceIcon}
            title="Bileşenler"
            description="Kullanıma hazır UI bileşenlerini keşfedin"
            href={`${v}/components` as any}
            label="Bileşenlere Git"
          />
          <Card
            icon={PlugIcon}
            title="Pluginler"
            description="Axios, i18n, SignalR ve diğer pluginler"
            href={`${v}/plugins` as any}
            label="Pluginlere Git"
          />
          <Card
            icon={RocketLaunchIcon}
            title="Kurulum"
            description="Mevcut projeye TRA UI Kit ekleme"
            href={`${v}/installation` as any}
            label="Kuruluma Git"
          />
        </div>
      </section>
    </Container>
  );
};

export default GettingStarted;
