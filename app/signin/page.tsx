import React from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white/30 p-8 shadow-lg backdrop-blur-md">
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-4 h-20 w-20">
            <Image
              src="/aws.png"
              alt="App Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-xl font-bold">AWS PPE TRACKER</h1>
        </div>
        <p className="mb-6 text-center">
          Welcome to AWS Bahrain PPE Tracker Portal, where you can request
          personal protective equipment and Arc flash suits.
        </p>
        <form>
          <div className="mb-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4 text-left">
            <a href="#" className="text-sm text-orange-500">
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full rounded p-2">
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">Don&apos;t have an account?</p>
      </div>
    </div>
  );
}
