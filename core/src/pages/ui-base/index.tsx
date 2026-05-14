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
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Trans } from 'react-i18next';

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
  const { t } = useLocalizeContext();
  const v = `/v${currentVersion}`;

  return (
    <Container className="my-10 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold">{t('Getting Started')}</h1>
        <p className="text-lg text-neutral-grey">
          {t(
            'Start a React application meeting corporate standards in seconds with the TRA UI Base template. All basic setups are ready; just focus on development.',
          )}
        </p>
      </div>

      {/* What's included banner */}
      <div className="mb-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <p className="mb-4 font-semibold text-foreground">{t("What's in the template?")}</p>
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
        <h2 className="mb-8 text-2xl font-bold">{t('Quick Start')}</h2>

        <Step
          number={1}
          title={t('Download the Template')}
        >
          <p className="mb-3 text-neutral-grey">
            {t('Pull the TRA UI Base template to your local machine with CLI:')}
          </p>
          <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui create my-app" />
          <p className="mt-3 text-sm text-neutral-grey">
            {t('You can also run without a project name — the CLI will ask:')}
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
                  {t(
                    'Dependencies are automatically installed when the command runs. If it fails, navigate to the project folder and run npm install.',
                  )}
                </p>
              </div>
            }
          />
        </Step>

        <Step
          number={2}
          title={t('Start the Development Server')}
        >
          <CustomSyntaxHighlighter
            content={`cd my-app
npm run dev`}
          />
          <p className="mt-3 text-sm text-neutral-grey">
            {t('The application runs at http://localhost:3000 by default.')}
          </p>
        </Step>

        <Step
          number={3}
          title={t('Expand Your Project')}
          isLast
        >
          <p className="mb-4 text-neutral-grey">
            {t('Template is ready! You can now proceed in two directions:')}
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
                <p className="font-semibold text-foreground">{t('TRA UI Kit Integration')}</p>
                <p className="mt-0.5 text-sm text-neutral-grey">
                  {t('Add ready-made UI components to the project')}
                </p>
                <span className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  {t('Go to installation page')}{' '}
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
                <p className="font-semibold text-foreground">{t('Add Plugin')}</p>
                <p className="mt-0.5 text-sm text-neutral-grey">
                  {t('Axios, i18n, SignalR and other infrastructures')}
                </p>
                <span className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  {t('Go to plugins page')}{' '}
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
          <h2 className="text-2xl font-bold">{t('Project Structure')}</h2>
        </div>
        <p className="mb-4 text-neutral-grey">
          {t('The template comes with the following file structure:')}
        </p>
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
          <h2 className="text-2xl font-bold">{t('Corporate Standards')}</h2>
        </div>
        <p className="mb-6 text-neutral-grey">
          {t(
            'TRA UI Base is designed to ensure all in-house UI projects are set up with the same structure. The following rules are expected to be followed.',
          )}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: t('1. Every project starts from the TRA UI Base template'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard1"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
                </p>
              ),
            },
            {
              title: t('2. Style system: Tailwind CSS v4 + TRA Theme'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard2"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
                </p>
              ),
            },
            {
              title: t('3. Routing: TanStack Router (file-based)'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard3"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
                </p>
              ),
            },
            {
              title: t('4. HTTP requests: Axios Plugin'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard4"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
                </p>
              ),
            },
            {
              title: t('5. Multiple Languages: i18n Plugin'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard5"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
                </p>
              ),
            },
            {
              title: t('6. UI Components: TRA UI Kit'),
              body: (
                <p className="text-sm text-neutral-grey">
                  <Trans
                    i18nKey="CorporateStandardsCard6"
                    components={{
                      code: (
                        <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono" />
                      ),
                    }}
                  />
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
          <h2 className="text-2xl font-bold">{t('Next Steps')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card
            icon={PuzzlePieceIcon}
            title={t('Components')}
            description={t('Explore ready-made UI components')}
            href={`${v}/components` as any}
            label={t('Go to Components')}
          />
          <Card
            icon={PlugIcon}
            title={t('Plugins')}
            description={t('Axios, i18n, SignalR and other plugins')}
            href={`${v}/plugins` as any}
            label={t('Go to Plugins')}
          />
          <Card
            icon={RocketLaunchIcon}
            title={t('Installation')}
            description={t('Adding TRA UI Kit to an existing project')}
            href={`${v}/installation` as any}
            label={t('Go to Setup')}
          />
        </div>
      </section>
    </Container>
  );
};

export default GettingStarted;
