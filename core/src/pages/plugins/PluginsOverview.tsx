import { Link } from '@tanstack/react-router';
import { useVersion } from '@/contexts/version';
import Constants from '@/constants/Constants';
import Container from '@/components/ui/container';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const PluginsOverview = () => {
  const { currentVersion } = useVersion();
  const { t } = useLocalizeContext();

  return (
    <Container className="my-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold">{t('Plugins')}</h1>
        <p className="text-lg text-neutral-grey">
          {t(
            'TRA UI Base plugins provide ready-made infrastructure setups for Axios, i18n, SignalR and more. Each plugin can be independently added to your project.',
          )}
        </p>
      </div>

      {/* Install info */}
      <div className="mb-10 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <span className="text-xl">🔌</span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{t('Quick installation with tra-ui-cli')}</p>
          <p className="mt-0.5 text-sm text-neutral-grey">
            {t('You can add any plugin to your project with a single command:')}
          </p>
          <code className="mt-2 inline-block rounded bg-neutral-light px-3 py-1.5 text-sm font-mono text-foreground">
            npx tra-ui-cli add plugin-axios
          </code>
        </div>
      </div>

      {/* Plugin cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Constants.pluginList.map((plugin) => (
          <Link
            key={plugin.path}
            to={`/v${currentVersion}${plugin.path}` as any}
            className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/40 hover:shadow-soft-primary"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <plugin.Icon
                size={22}
                weight="duotone"
              />
            </div>
            <h3 className="mb-1.5 text-base font-semibold">{plugin.name}</h3>
            <p className="flex-1 text-sm text-neutral-grey">{plugin.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {t('Go to documentation')} <ArrowRightIcon size={14} />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default PluginsOverview;
