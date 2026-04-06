import { AppRouter } from "@/components/AppRouter";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ path: [] }];
}

export default async function CatchAll({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  return <AppRouter segments={path ?? []} />;
}
