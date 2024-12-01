"use client";

import { signout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

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