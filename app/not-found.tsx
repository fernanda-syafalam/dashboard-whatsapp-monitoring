import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-destructive">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Go Home
      </Link>
    </div>
  );
}
