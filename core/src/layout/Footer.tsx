import { Link } from '@tanstack/react-router';
import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react';
import { useVersion } from '@/contexts/version';

const Footer = () => {
  const { currentVersion } = useVersion();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">About</h3>
            <p className="text-sm text-neutral-grey">
              TRA UI Kit is a comprehensive React component library built with TypeScript and
              Tailwind CSS.
            </p>
          </div>

          {/* Resources */}
          <div className="md:justify-self-center">
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={`/v${currentVersion}/installation` as any}
                  className="text-neutral-grey transition-colors hover:text-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to={`/v${currentVersion}/components` as any}
                  className="text-neutral-grey transition-colors hover:text-primary"
                >
                  Components
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/smhirmak/tra-ui-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-grey transition-colors hover:text-primary"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="md:justify-self-center">
            <h3 className="mb-4 text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/smhirmak/tra-ui-kit/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-grey transition-colors hover:text-primary"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/smhirmak/tra-ui-kit/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-grey transition-colors hover:text-primary"
                >
                  Discussions
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:justify-self-center">
            <h3 className="mb-4 text-sm font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/smhirmak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-grey transition-colors hover:text-primary"
              >
                <GithubLogoIcon
                  size={24}
                  weight="fill"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-grey transition-colors hover:text-primary"
              >
                <XLogoIcon
                  size={24}
                  weight="fill"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-grey transition-colors hover:text-primary"
              >
                <LinkedinLogoIcon
                  size={24}
                  weight="fill"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-grey">
              Â© {new Date().getFullYear()} TRA UI Kit. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-neutral-grey transition-colors hover:text-primary"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-neutral-grey transition-colors hover:text-primary"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
