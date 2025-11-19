import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist, hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ClipboardIcon } from '@phosphor-icons/react';
import Container from '@/components/container';
import { useTheme } from '@/contexts/theme/theme-provider';
import Button from '@/components/button';
import Notification from '@/components/notification';
import { cn } from '@/lib/utils';

const installVite = 'npm create vite@latest';
const installTailwind = 'npm install -D tailwindcss postcss autoprefixer';
const initTailwind = 'npx tailwindcss init -p';
const editTsconfig = `{
  "compilerOptions": {
      "baseUrl": ".",
      "paths": {
          "@/*": ["./src/*"]
      }
  }
}
`;
const editTsconfigApp = `{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
`;
const installTypes = 'npm install -D @types/node';
const editViteConfig = `{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
`;
const initlMSI = 'npx msi-ui-kit init';
const addMSIComponent = `npx msi-ui-kit add
or
npx msi-ui-kit add <component-name>
`;

export const CustomSyntaxHighlighter = ({ className, content, hideCopyButton = false }: { className?: string; content: string; hideCopyButton?: boolean }) => {
  const { success } = Notification();
  const { theme } = useTheme();
  return (
    <div className={cn(className, 'relative')}>
      <SyntaxHighlighter wrapLongLines language="jsx" style={theme === 'dark' ? hybrid : githubGist}>
        {content}
      </SyntaxHighlighter>
      {!hideCopyButton && (
        <Button
          size="icon"
          onClick={() => {
            window.navigator.clipboard.writeText(content);
            success('Copied to clipboard');
          }}
          className="absolute right-0 top-0 bg-transparent hover:bg-transparent hover:brightness-75"
        >
          <ClipboardIcon className="size-5" />
        </Button>
      )}
    </div>
  );
};

const Installation = () => (
  <Container>
    <p className="my-4 text-4xl font-bold">Vite:</p>
    <ol className="list-decimal [&>li]:mb-4" type="1">
      <li>
        <p className="text-lg font-semibold">Install Vite</p>
        <CustomSyntaxHighlighter content={installVite} />
      </li>
      <li>
        <p className="text-lg font-semibold">Install Tailwind</p>
        <CustomSyntaxHighlighter content={installTailwind} />
        <br />
        <CustomSyntaxHighlighter content={initTailwind} />
      </li>
      <li>
        <p className="text-lg font-semibold">Edit tsconfig.json file</p>
        <CustomSyntaxHighlighter content={editTsconfig} />
      </li>
      <li>
        <p className="text-lg font-semibold">Edit tsconfig.app.json file</p>
        <CustomSyntaxHighlighter content={editTsconfigApp} />
      </li>
      <li>
        <p className="text-lg font-semibold">Install types</p>
        <CustomSyntaxHighlighter content={installTypes} />
        <p className="text-lg font-semibold">Edit vite.config.ts file</p>
        <CustomSyntaxHighlighter content={editViteConfig} />
      </li>
      <li>
        <p className="text-lg font-semibold">Run MSI UI Kit CLI</p>
        <CustomSyntaxHighlighter content={initlMSI} />
      </li>
      <li>
        <p className="text-lg font-semibold">That's it</p>
        <CustomSyntaxHighlighter content={addMSIComponent} />
      </li>
    </ol>
  </Container>
);

export default Installation;
