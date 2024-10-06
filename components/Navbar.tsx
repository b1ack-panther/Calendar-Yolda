import Link from "next/link";
import { CalendarDays } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import { ThemeToggle } from "./theme-toggle";
import { getInitialUser } from "@/lib/getInitialUser";

export async function Navbar() {
	
	const user = await getInitialUser();

	return (
		<nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 backdrop-blur-sm bg-secondary/60 drop-shadow-md">
			<Link href="/" className="flex items-center max-h-20">
				<div className="flex items-center gap-3">
					<CalendarDays className="w-6 h-6" />
					<h1 className="text-2xl font-bold font-mono">Calendar</h1>
				</div>
			</Link>
			<div className="flex gap-3 md:gap-5 items-center">
				<p className="italic text-primary dark:text-violet-400 cursor-default p-1.5 px-3 max-sm:hidden bg-secondary-foreground/5  rounded-sm">
					Hi!, {user.fullname}
				</p>
				<ThemeToggle />
				<LogoutBtn />
			</div>
		</nav>
	);
}
