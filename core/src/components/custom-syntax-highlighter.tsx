import { useTheme } from '@/contexts/theme/theme-provider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from './button';
import { ClipboardIcon, CheckIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { githubGist, hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

const CustomSyntaxHighlighter = ({ className, content, hideCopyButton = false }: { className?: string; content: string; hideCopyButton?: boolean }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  console.log(copied)
  return (
    <div className={cn(className, 'relative [&_pre]:bg-neutral-light/75! [&_pre]:rounded-lg [&_pre]:p-4!')}>
      <SyntaxHighlighter wrapLongLines language="jsx" style={theme === 'dark' ? hybrid : githubGist}>
        {content}
      </SyntaxHighlighter>
      {!hideCopyButton && (
        <Button
          size="icon"
          data-copied={copied}
          title={copied ? 'Copied' : 'Copy to clipboard'}
          onClick={async () => {
            try {
              await window.navigator.clipboard.writeText(content);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            } catch (e) {
              // ignore failures silently
            }
          }}
          className={cn(
            'group absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent brightness-80 hover:brightness-100 cursor-pointer',
          )}
        >
          <CheckIcon
            className={cn(
              'size-5 text-green-500 absolute transition-all',
              'group-data-[copied=false]:scale-0 group-data-[copied=true]:scale-100',
              'opacity-100',
              'transition-all duration-150 ease-out delay-150',
            )}
          />
          <ClipboardIcon
            className={cn(
              'size-5 absolute transition-all',
              'group-data-[copied=true]:opacity-0 group-data-[copied=false]:delay-150 group-data-[copied=false]:opacity-100',
              'transition-all duration-150 ease-out',
            )}
          />
        </Button>
      )}
    </div>
  );
};

export default CustomSyntaxHighlighter