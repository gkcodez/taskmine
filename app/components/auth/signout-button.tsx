"use client";

import { signout } from "@/app/actions/auth/auth";
import { Button } from "@/app/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await signout();
      }}
    >
      Sign Out
    </Button>
  );
}