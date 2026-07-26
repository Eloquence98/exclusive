import { auth } from "@/domains/auth/auth";
import Image from "next/image";

export const metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const session = await auth();
  const { name, email, image } = session?.user ?? {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account information, synced from Google.
        </p>
      </div>

      {/* Avatar + Name Card */}
      <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-6">
        {image ? (
          <Image
            src={image}
            alt={name ?? "Profile picture"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground">
            {name?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}

        <div>
          <p className="text-lg font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="rounded-lg border border-border p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Account Details
        </h2>
        <dl className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <dt className="text-sm text-muted-foreground">Name</dt>
            <dd className="text-sm font-medium text-foreground">{name}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd className="text-sm font-medium text-foreground">{email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
