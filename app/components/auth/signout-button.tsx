"use client";

import { signout } from "@/app/actions/auth/auth";
import { Button } from "@/app/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function SignOutButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            onClick={async () => {
              await signout();
            }}
          >
            <FiLogOut />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}