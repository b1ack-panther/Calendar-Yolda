import { cookies } from "next/headers";
import { decrypt } from "./jose";

export const getSession = async () => {
	const session = cookies().get("session")?.value;
	if (!session) return null;

	const { user } = await decrypt(session);
	return user as Omit<User, "schedules">;
};
