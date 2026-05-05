import { useTheme } from '@/contexts/theme/theme-provider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from './ui/button';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { githubGist, hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

const CustomSyntaxHighlighter = ({
  className,
  content,
  hideCopyButton = false,
  copyButtonClassName,
  addedHighlightLines,
  removedHighlightLines,
  title = '',
}: {
  className?: string;
  content: string;
  hideCopyButton?: boolean;
  copyButtonClassName?: string;
  addedHighlightLines?: number[];
  removedHighlightLines?: number[];
  title?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const lineCount = content ? content.split(/\r\n|\r|\n/).length : 0;

  return (
    <div
      data-line-count={lineCount}
      className={cn(
        className,
        'relative [&_pre]:bg-neutral-light/75! [&_pre]:rounded-b-lg [&_pre]:p-4!',
      )}
    >
      <div
        className={cn(
          'flex items-center  bg-neutral-light/75 px-4 rounded-t-lg border-b-2 border-neutral-white',
          !!title ? 'justify-between' : 'justify-end',
        )}
      >
        <code>{title}</code>
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
              'group bg-transparent hover:bg-transparent brightness-80 hover:brightness-100 cursor-pointer w-14',
              // lineCount > 3 ? 'top-6' : 'top-1/2',
              copyButtonClassName,
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
            <div className="absolute flex items-center gap-2 w-fit text-xs group-data-[copied=true]:opacity-0 group-data-[copied=false]:delay-150 group-data-[copied=false]:opacity-100 transition-all duration-150 ease-out">
              <CopyIcon className={cn('size-4 ', '', '')} />
              Copy
            </div>
          </Button>
        )}
      </div>
      <SyntaxHighlighter
        wrapLongLines
        // wrapLines={true}
        language="tsx"
        style={theme === 'dark' ? hybrid : githubGist}
        showLineNumbers
        lineProps={(lineNumber) => {
          let style = { display: 'block', backgroundColor: 'transparent' };
          if (addedHighlightLines?.includes(lineNumber)) {
            style.backgroundColor = 'hsl(var(--primary-hard))';
          } else if (removedHighlightLines?.includes(lineNumber)) {
            style.backgroundColor = 'hsl(var(--error-light))';
          }
          return { style };
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

export default CustomSyntaxHighlighter;
