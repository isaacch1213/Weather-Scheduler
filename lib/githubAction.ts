"use server";

import { signIn } from "@/auth";

export default async function githubLoginAction() {
  await signIn("github", { redirectTo: "/profile" });
}
