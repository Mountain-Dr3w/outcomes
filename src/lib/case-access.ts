import "server-only";
import { createHmac, randomBytes, timingSafeEqual, scryptSync } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cookies } from "next/headers";

const passwordSalt = "5d92ba57e66998bcd9bbebd47149f454";
const passwordHash = "183d68e591581428ac34c2067f89d66519cbffd17bd5272831d5fc360f7fa531";
function sessionKey() {
  if (process.env.CASE_STUDY_COOKIE_SECRET) return process.env.CASE_STUDY_COOKIE_SECRET;
  // Share one runtime-only key across Next's page and action workers.
  const path = join(tmpdir(), "outcomes-case-session.key");
  try { writeFileSync(path, randomBytes(32).toString("hex"), { flag: "wx", mode: 0o600 }); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error; }
  return readFileSync(path, "utf8");
}
const cookieName = "portfolio-case-access";
function signature(value: string) {
  return createHmac("sha256", sessionKey()).update(value).digest("hex");
}
function equal(a: string, b: string) {
  const left = Buffer.from(a), right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
export async function hasCaseAccess() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const [expiry, nonce, signed, extra] = token.split(".");
  if (!expiry || !nonce || !signed || extra || Number(expiry) < Date.now() || !Number.isFinite(Number(expiry))) return false;
  return equal(signed, signature(`${expiry}.${nonce}`));
}
export async function grantCaseAccess(candidate: string) {
  const expected = process.env.CASE_STUDY_PASSWORD
    ? scryptSync(process.env.CASE_STUDY_PASSWORD, passwordSalt, 32).toString("hex")
    : passwordHash;
  if (!equal(scryptSync(candidate, passwordSalt, 32).toString("hex"), expected)) return false;
  const value = `${Date.now() + 24 * 60 * 60 * 1000}.${randomBytes(16).toString("hex")}`;
  (await cookies()).set(cookieName, `${value}.${signature(value)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
  });
  return true;
}
