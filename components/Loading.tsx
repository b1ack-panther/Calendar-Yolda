import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ className }: { className?: string }) => {
	return <Loader className={cn("w-4 h-4 animate-spin", className)} />;
};

export default Loading;
