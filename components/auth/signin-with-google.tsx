"use client";

import { Button } from "@/components/ui/button";
import { FiLogIn } from "react-icons/fi";

export default function SignInWithGoogleButton() {
    return (
        <Button
            variant="default"
        >
            <FiLogIn /> Signin with Google
        </Button>
    );
}