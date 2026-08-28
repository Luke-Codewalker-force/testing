import { z } from "zod";

export const AuthCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
});

export const PartialAuthCredentialsSchema = AuthCredentialsSchema.partial();

export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type PartialAuthCredentials = z.infer<
  typeof PartialAuthCredentialsSchema
>;
