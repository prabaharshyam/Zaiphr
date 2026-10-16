import { redirect } from "next/navigation";
import { adminEnabled, isAdmin } from "@/lib/server/admin-auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="container-x">
      <h1 className="font-display-wide text-center text-5xl">Admin</h1>
      {adminEnabled() ? (
        <LoginForm />
      ) : (
        <p className="mx-auto mt-8 max-w-md text-center text-muted">
          Admin is disabled. Set an <code className="text-text">ADMIN_PASSWORD</code> (8+ characters) environment variable to enable it.
        </p>
      )}
    </div>
  );
}
