import NotFoundBody from "@/components/NotFoundBody";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-32">
      <p className="label text-muted">404</p>
      <NotFoundBody />
    </div>
  );
}
