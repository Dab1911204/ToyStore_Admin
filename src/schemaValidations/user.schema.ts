import z from "zod";

export const UserSchema = z.object(
    {
        id: z.string(),
        fullName: z.string(),
        email: z.string().email(),
        phoneNumber: z.string().nullable(),
        gender: z.number(), // 0: male, 1: female (ví dụ)
        address: z.string().nullable(),
        avatarUrl: z.string().nullable(),
        roles: z.array(z.string()),
        accessToken: z.string(),
        refreshToken: z.string(),
        expireAt: z.string(),
    }
)
export type UserType = z.infer<typeof UserSchema>