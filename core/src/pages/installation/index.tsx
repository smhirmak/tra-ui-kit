import Container from '@/components/ui/container';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import { AtomIcon, ArrowRightIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { useVersion } from '@/contexts/version';

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

const Installation = () => {
  const { currentVersion } = useVersion();

  return (
    <Container className="my-10">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold">Installation</h1>
          <p className="text-lg text-neutral-grey">
            Get MSI UI Kit integrated into your project and start building beautiful interfaces
            right away.
          </p>
        </div>

        {/* Framework indicator — React only */}
        <div className="mb-10 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <AtomIcon
              size={22}
              className="text-primary"
              weight="duotone"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">React</p>
            <p className="text-sm text-neutral-grey">Vite + TypeScript + Tailwind CSS v4</p>
          </div>
          <span className="ml-auto rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            Selected
          </span>
        </div>

        {/* Steps */}
        <div>
          {/* Step 1 */}
          <Step
            number={1}
            title="Create a New Vite Project"
          >
            <p className="mb-3 text-neutral-grey">
              Start by creating a new Vite project with the React TypeScript template:
            </p>
            <CustomSyntaxHighlighter content="npm create vite@latest my-app -- --template react-ts" />
            <p className="mt-3 text-sm text-neutral-grey">
              Then navigate into the project directory:
            </p>
            <CustomSyntaxHighlighter content={`cd my-app\nnpm install`} />
          </Step>

          {/* Step 2 */}
          <Step
            number={2}
            title="Install Tailwind CSS"
          >
            <p className="mb-3 text-neutral-grey">
              MSI UI Kit requires Tailwind CSS v4. Install the Tailwind Vite plugin:
            </p>
            <CustomSyntaxHighlighter content="npm install tailwindcss @tailwindcss/vite" />
          </Step>

          {/* Step 3 */}
          <Step
            number={3}
            title="Configure Tailwind CSS"
          >
            <p className="mb-3 text-neutral-grey">
              Add the Tailwind CSS import to your{' '}
              <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
                src/index.css
              </code>{' '}
              file:
            </p>
            <CustomSyntaxHighlighter
              title="src/index.css"
              addedHighlightLines={[1]}
              content={'@import "tailwindcss";'}
            />
          </Step>

          {/* Step 4 */}
          <Step
            number={4}
            title="Update tsconfig.json"
          >
            <p className="mb-3 text-neutral-grey">
              Add path aliases to your{' '}
              <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
                tsconfig.json
              </code>
              :
            </p>
            <CustomSyntaxHighlighter
              title="tsconfig.json"
              addedHighlightLines={[7, 8, 9, 10, 11, 12]}
              content={`{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
            />
          </Step>

          {/* Step 5 */}
          <Step
            number={5}
            title="Update tsconfig.app.json"
          >
            <p className="mb-3 text-neutral-grey">
              Add the same path aliases to{' '}
              <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
                tsconfig.app.json
              </code>
              :
            </p>
            <CustomSyntaxHighlighter
              title="tsconfig.app.json"
              addedHighlightLines={[4, 5, 6, 7]}
              content={`{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    ...
  }
}`}
            />
          </Step>

          {/* Step 6 */}
          <Step
            number={6}
            title="Update vite.config.ts"
          >
            <p className="mb-3 text-neutral-grey">
              Install the Node types and configure the Vite config with Tailwind and the path alias:
            </p>
            <CustomSyntaxHighlighter content="npm install -D @types/node" />
            <div className="mt-3">
              <CustomSyntaxHighlighter
                title="vite.config.ts"
                addedHighlightLines={[3, 4, 10, 12, 13, 14, 15, 16]}
                content={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`}
              />
            </div>
          </Step>

          {/* Step 7 */}
          <Step
            number={7}
            title="Initialize MSI UI Kit"
          >
            <p className="mb-3 text-neutral-grey">
              Run the MSI UI Kit CLI to install all required dependencies and configuration
              automatically:
            </p>
            <CustomSyntaxHighlighter content="npx msi-ui-cli init" />
          </Step>

          {/* Step 8 */}
          <Step
            number={8}
            title="Add Components"
            isLast
          >
            <p className="mb-3 text-neutral-grey">
              Now you're ready to add components to your project. Choose one of the following
              methods:
            </p>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  <span className="text-primary">•</span> Add a single component:
                </p>
                <CustomSyntaxHighlighter content="npx msi-ui-cli add button" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">
                  <span className="text-primary">•</span> Add multiple components at once:
                </p>
                <CustomSyntaxHighlighter content="npx msi-ui-cli add button input dialog" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">
                  <span className="text-primary">•</span> Interactive selection mode:
                </p>
                <CustomSyntaxHighlighter content="npx msi-ui-cli add" />
                <p className="mt-2 text-sm text-neutral-grey">
                  This lists all available components and lets you pick one or multiple
                  interactively.
                </p>
              </div>
            </div>

            <InformationStatus
              className="mt-6 w-full"
              type="success"
              title={
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <CheckCircleIcon
                      size={18}
                      weight="fill"
                      className="text-success"
                    />
                    <h3 className="font-semibold">You're all set!</h3>
                  </div>
                  <p className="text-sm text-neutral-grey">
                    MSI UI Kit is installed. You can now use modern, accessible React components in
                    your project.
                  </p>
                </div>
              }
            />

            <div className="mt-6 flex justify-end">
              <Link
                to={`/v${currentVersion}/components` as any}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Browse Components
                <ArrowRightIcon
                  size={16}
                  weight="bold"
                />
              </Link>
            </div>
          </Step>
        </div>
      </div>
    </Container>
  );
};

export default Installation;
