import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
	const session = await currentUser()
	
	return <div>{JSON.stringify(session)}</div>;
}
