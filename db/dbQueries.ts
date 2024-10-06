"use server";

import { sql } from "@vercel/postgres";
import { scheduleFormData, scheduleFormSchema } from "../lib/zodSchema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { endOfMonth, startOfMonth } from "date-fns";

export const getUserByEmail = async (email: string) => {
	try {
		const res = await sql`SELECT * FROM users WHERE email = ${email}`;
		if (res?.rows?.length < 0) return 0;
		return res.rows[0];
	} catch {
		return null;
	}
};

export const getUserByClerkId = async (clerkId: string) => {
	try {
		const res = await sql`SELECT * FROM users WHERE clerkId = ${clerkId}`;
		if (res?.rows?.length < 0) return null;
		return res.rows[0];
	} catch {
		return null;
	}
};

export const createSchedule = async (formdata: scheduleFormData) => {
	const validatedData = scheduleFormSchema.safeParse(formdata);
	if (!validatedData.success) {
		return { error: validatedData.error.message };
	}

	try {
		const user: User | null = (await getUserByClerkId(auth().userId)) as any;
		if (!user.id) {
			return { error: "Not logged in!" };
		}
		const { title, description, dateTime } = validatedData.data;

		const res =
			await sql`INSERT INTO schedules (userid, title, description, datetime) VALUES (${
				user.id
			}, ${title}, ${description}, ${dateTime.toISOString()}) RETURNING *`;

		return { success: res.rows[0] };
	} catch (error) {
		console.error("Error creating schedule:", error);
		return { error: "Failed to create schedule" };
	}
};

export const updateSchedule = async (formdata: Schedule) => {
	const validatedData = scheduleFormSchema.passthrough().safeParse(formdata);
	if (!validatedData.success) {
		return { error: JSON.stringify(validatedData.error.message) };
	}

	try {
		const user: User | null = (await getUserByClerkId(auth().userId)) as any;
		if (!user.id) {
			return { error: "Not logged in!" };
		}
		const { title, description, dateTime } = validatedData.data;

		const res =
			await sql`UPDATE schedules SET title = ${title}, description = ${description}, datetime = ${dateTime.toISOString()} WHERE id = ${
				formdata.id
			} RETURNING *`;

		console.log("🚀 ~ updateSchedule ~ res:", res);
		if (res.rowCount == 0) throw Error;
		return { success: res.rows[0] };
	} catch (error) {
		console.error("Error creating schedule:", error);
		return { error: "Failed to create schedule" };
	}
};

export const getSchedules = async (currentMonth: Date) => {
	const startOfCurrentMonth = startOfMonth(currentMonth).toISOString();
	const endOfCurrentMonth = endOfMonth(currentMonth).toISOString();

	const user: User | null = (await getUserByClerkId(auth().userId)) as any;

	if (!user) return { error: "Not Logged in!" };
	try {
		const res =
			await sql`SELECT a.* FROM  schedules as a JOIN users AS b ON a.userid = b.id WHERE b.id = ${user.id} AND a.datetime BETWEEN ${startOfCurrentMonth} AND ${endOfCurrentMonth}`;
		return res.rows;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteSchedule = async (id: string) => {
	try {
		await sql`DELETE FROM schedules WHERE id = ${id}`;
		revalidatePath("/");
	} catch (error) {
		console.log(error);
		return { error: "Failed to delete schedule" };
	}
};
