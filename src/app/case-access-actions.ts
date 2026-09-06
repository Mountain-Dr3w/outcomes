"use server";

import { grantCaseAccess } from "@/lib/case-access";

export async function unlockCaseStudy(_state: { error: string }, formData: FormData) {
  const value = formData.get("password");
  if (typeof value !== "string" || value.length > 256 || !(await grantCaseAccess(value))) {
    return { error: "That password didn’t match. Try again." };
  }
  return { error: "" };
}
