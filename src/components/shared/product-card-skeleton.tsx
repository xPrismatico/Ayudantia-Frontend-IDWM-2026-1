import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden border border-slate-200">
      <div className="h-48 w-full animate-pulse bg-slate-200" />
      <CardContent className="flex-1 space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-4 flex justify-between">
          <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
      </CardFooter>
    </Card>
  );
}
