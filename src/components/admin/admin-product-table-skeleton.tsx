export function AdminTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs text-slate-700 uppercase">
          <tr>
            <th className="px-6 py-4 font-semibold">Producto</th>
            <th className="px-6 py-4 font-semibold">Precio</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
            <th className="px-6 py-4 text-right font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-16 rounded bg-slate-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-10 rounded bg-slate-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 rounded bg-slate-200" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 rounded bg-slate-200" />
                  <div className="h-8 w-8 rounded bg-slate-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
