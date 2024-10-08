"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ActionTooltip from "./ActionTooltip";
import { useClerk } from "@clerk/nextjs";

const LogoutBtn = () => {
	const { signOut } = useClerk();

	const handleLogout = () => {
		signOut({ redirectUrl: "/sign-in" });
	};

	return (
		<ActionTooltip label="Logout" className="text-xs font-medium">
			<Button
				variant="outline"
				size="icon"
				aria-label="Logout"
				onClick={handleLogout}
			>
				<LogOut className="h-4 w-4" />
			</Button>
		</ActionTooltip>
	);
};

export default LogoutBtn;
