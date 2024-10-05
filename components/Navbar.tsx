"use client";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import LogoutBtn from "./LogoutBtn";

export function Navbar() {

	return (
		<nav className="sticky top-0 z-10 flex items-center justify-between p-4 bg-secondary border-b border-border">
			<Link href="/" className="flex items-center max-h-20">
				<div className="flex items-center gap-3">
					<CalendarDays className="w-6 h-6 text-primary" />
					<h1 className="text-2xl font-bold font-mono text-primary">
						Calendar
					</h1>
				</div>
			</Link>
			<LogoutBtn />
		</nav>
	);
}
