import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircle2 } from "lucide-react";

type AuthMessageProps = SqlResponse | { message: undefined };

export const AuthMessage = ({ message }: AuthMessageProps) => {
	if (!message) return null;
	else if ("error" in message)
		return (
			<div
				className="bg-destructive/15 p-3 flex rounded-m
items-center gap-x-3 text-sm text-destructive w-full"
			>
				<ExclamationTriangleIcon className="h-4 w-4" />
				<p>{message.error}</p>
			</div>
		);
	else
		return (
			<div
				className="bg-green-400/15 p-3 flex rounded-m
items-center gap-x-3 text-sm text-green-700 w-full"
			>
				<CheckCircle2 className="h-4 w-4" />
				<p>{message.success}</p>
			</div>
		);
};
