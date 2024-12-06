"use client";

import { signout } from "@/app/actions/auth/auth";
import { Button } from "@/app/components/ui/button";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function SignInWithGoogleButton() {
    return (
        <Button
            variant="default"
            onClick={() => console.log("Signin with google clicked!")}
        >
            <FiLogIn /> Signin with Google
        </Button>
    );
}