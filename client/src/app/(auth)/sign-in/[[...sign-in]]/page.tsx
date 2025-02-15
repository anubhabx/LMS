"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="auth__container">
      <SignIn.Root>
        <SignIn.Step name="start" className="auth__step">
          <h1 className="auth__title">Sign in to your account</h1>

          <div className="auth__form">
            <Clerk.Field name="email" className="auth__field">
              <Clerk.Input className="auth__field-input" placeholder="Email" />
              <Mail className="auth__field-icon" />
              <Clerk.FieldError className="auth__field-error" />
            </Clerk.Field>
          </div>

          <SignIn.Action submit className="auth__button-submit">
            Continue
          </SignIn.Action>

          <Clerk.Connection name="google" className="auth__button-google">
            <Image
              src="/icons/google.svg"
              width={20}
              height={20}
              alt="Google"
            />
            <span>Sign in with Google</span>
          </Clerk.Connection>

          <p className="text-sm mt-4">
            New to EDROH?{" "}
            <span className="text-primary-700">
              <Link href="/sign-up">Create an account</Link>
            </span>
          </p>
        </SignIn.Step>

        <SignIn.Step name="verifications" className="auth__step">
          <SignIn.Strategy name="email_code">
            <h1 className="auth__title">Check your email</h1>
            <p className="text-sm">
              We sent a code to{" "}
              <span className="text-gray-500">
                <SignIn.SafeIdentifier />.
              </span>
            </p>

            <div className="auth__form">
              <Clerk.Field name="code" className="auth__field">
                <Clerk.Input className="auth__field-input" />
                <Clerk.FieldError className="auth__field-error" />
              </Clerk.Field>
            </div>

            <SignIn.Action submit className="auth__button-submit">
              Continue
            </SignIn.Action>
          </SignIn.Strategy>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
