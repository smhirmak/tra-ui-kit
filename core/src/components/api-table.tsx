import { cn } from "@/lib/utils";

const ApiTable = ({ tableData, title, titleClassName }: { tableData: { prop: string; type: string; default: string; description: string }[]; title?: string; titleClassName?: string }) => {
  return (
    <section id="api">
      <h2 className={cn("mb-4 text-2xl font-bold", titleClassName)}>{title || 'API Reference'}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse [&_th]:p-3 [&_td]:p-3">
          <thead>
            <tr className="border-b border-border [&_th]:text-left">
              {tableData?.length > 0 && Object.keys(tableData[0]).map((key) => (
                <th key={key} className="text-neutral-grey">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item) => {
              return (
                <tr key={item.prop} className="border-b border-border [&_td]:odd:text-primary [&_td]:odd:font-medium [&_td]:text-sm [&_td]:font-mono [&_td]:last:font-sans">
                  <td>{item.prop ?? '-'}</td>
                  <td>{item.type ?? '-'}</td>
                  <td>{item.default ?? '-'}</td>
                  <td>{item.description ?? '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ApiTable