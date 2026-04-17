import { cn } from "@/lib/utils";

const renderDefaultValue = (value: string) => {
  if (!value || value === '-') {
    return <span className="text-neutral-grey/60 italic text-xs">—</span>;
  }
  if (value === 'true') {
    return (
      <span className="inline-flex items-center rounded-full bg-success-light px-2 py-0.5 text-xs font-medium text-success">
        true
      </span>
    );
  }
  if (value === 'false') {
    return (
      <span className="inline-flex items-center rounded-full bg-error-light px-2 py-0.5 text-xs font-medium text-error">
        false
      </span>
    );
  }
  return (
    <code className="rounded bg-neutral-light px-1.5 py-0.5 text-xs font-mono text-foreground">
      {value}
    </code>
  );
};

const ApiTable = ({ tableData, title, titleClassName }: { tableData: { prop: string; type: string; default: string; description: string }[]; title?: string; titleClassName?: string }) => {
  return (
    <section id="api">
      <h2 className={cn("mb-4 text-2xl font-bold", titleClassName)}>{title || 'API Reference'}</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
              <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Prop</th>
              <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Type</th>
              <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Default</th>
              <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Description</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, i) => (
              <tr
                key={item.prop}
                className={cn(
                  "border-b border-border transition-colors last:border-0",
                  i % 2 === 0 ? "bg-background" : "bg-neutral-light/20 dark:bg-neutral-light/5",
                  "hover:bg-primary/5"
                )}
              >
                <td className="p-3">
                  <code className="text-sm font-medium text-primary font-mono">{item.prop ?? '—'}</code>
                </td>
                <td className="p-3">
                  {item.type && item.type !== '-' ? (
                    <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-mono text-primary whitespace-nowrap">
                      {item.type}
                    </code>
                  ) : (
                    <span className="text-neutral-grey/60 italic text-xs">—</span>
                  )}
                </td>
                <td className="p-3">{renderDefaultValue(item.default)}</td>
                <td className="p-3 text-sm text-neutral-grey">{item.description ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApiTable;