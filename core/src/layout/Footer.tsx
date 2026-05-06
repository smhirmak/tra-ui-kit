import { Link } from '@tanstack/react-router';
import {
  GithubLogoIcon,
  BugIcon,
  BookOpenIcon,
  SquaresFourIcon,
  ChatCircleDotsIcon,
} from '@phosphor-icons/react';
import { useVersion } from '@/contexts/version';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const Footer = () => {
  const { currentVersion } = useVersion();
  const { t } = useLocalizeContext();
  return (
    <footer className="border-t border-border/60 bg-neutral-dark-white/40 dark:bg-neutral-light/3">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <img
                src="/assets/logos/tra-ui-kit.png"
                alt="TRA UI Kit"
                className="h-8 w-auto"
              />
              <span className="text-base font-semibold tracking-tight text-foreground">
                TRA UI Kit
              </span>
            </div>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-neutral-grey">
              {t(
                'A TypeScript-first React component library for modern web applications. Open source, MIT licensed, and free to use.',
              )}
            </p>
            <a
              href="https://github.com/smhirmak/tra-ui-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3.5 py-2 text-xs font-medium text-neutral-grey transition-all hover:border-primary/30 hover:text-primary hover:shadow-soft-primary"
            >
              <GithubLogoIcon
                size={15}
                weight="fill"
              />
              github.com/smhirmak/tra-ui-kit
            </a>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              {t('Resources')}
            </h3>
            <ul className="space-y-3">
              {[
                {
                  href: `/v${currentVersion}/installation`,
                  label: 'Documentation',
                  Icon: BookOpenIcon,
                  internal: true,
                },
                {
                  href: `/v${currentVersion}/components`,
                  label: 'Components',
                  Icon: SquaresFourIcon,
                  internal: true,
                },
                {
                  href: 'https://github.com/smhirmak/tra-ui-kit',
                  label: 'GitHub',
                  Icon: GithubLogoIcon,
                  internal: false,
                },
              ].map(({ href, label, Icon, internal }) => (
                <li key={label}>
                  {internal ? (
                    <Link
                      to={href as any}
                      className="flex items-center gap-2 text-sm text-neutral-grey transition-colors hover:text-primary"
                    >
                      <Icon
                        size={14}
                        weight="duotone"
                        className="shrink-0 opacity-60"
                      />
                      {t(label)}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-neutral-grey transition-colors hover:text-primary"
                    >
                      <Icon
                        size={14}
                        weight="duotone"
                        className="shrink-0 opacity-60"
                      />
                      {t(label)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              {t('Community')}
            </h3>
            <ul className="space-y-3">
              {[
                {
                  href: 'https://github.com/smhirmak/tra-ui-kit/issues/new',
                  label: 'Report an Issue',
                  Icon: BugIcon,
                },
                {
                  href: 'https://github.com/smhirmak/tra-ui-kit/issues',
                  label: 'Browse Issues',
                  Icon: BugIcon,
                },
                {
                  href: 'https://github.com/smhirmak/tra-ui-kit/discussions',
                  label: 'Discussions',
                  Icon: ChatCircleDotsIcon,
                },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-grey transition-colors hover:text-primary"
                  >
                    <Icon
                      size={14}
                      weight="duotone"
                      className="shrink-0 opacity-60"
                    />
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Report Issue CTA */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              {t('Contribute')}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-grey">
              {t("Found a bug or have a feature request? We'd love to hear from you.")}
            </p>
            <a
              href="https://github.com/smhirmak/tra-ui-kit/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-error/25 bg-error/6 px-3.5 py-2 text-xs font-medium text-error transition-all hover:border-error/40 hover:bg-error/10"
            >
              <BugIcon
                size={14}
                weight="duotone"
              />
              {t('Report an Issue')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/logos/tra-ui-kit.png"
              alt="TRA UI Kit"
              className="h-6 w-auto opacity-70"
            />
            <p className="text-xs text-neutral-grey/60">
              © {new Date().getFullYear()} TRA UI Kit · MIT License
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { label: 'Open Source', color: 'bg-success/8 text-success border-success/20' },
              { label: 'TypeScript', color: 'bg-primary/8 text-primary border-primary/20' },
              { label: 'Tailwind v4', color: 'bg-secondary/8 text-secondary border-secondary/20' },
            ].map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badge.color}`}
              >
                {t(badge.label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
