import { cn } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { format, isEqual, isSameDay, isSameMonth, isToday } from "date-fns";
import React from "react";

interface DayBoxProps {
	day: Date;
}

const DayBox = ({ day }: DayBoxProps) => {
	const { setSelectedDate, selectedDate, currentMonth, schedules } = useStore();

	return (
		<button
			onClick={() => setSelectedDate(day)}
			className={cn(
				"flex xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-primary/50 transition-all duration-300",
				isSameDay(selectedDate, day)
					? "bg-primary hover:bg-primary"
					: " bg-muted hover:bg-violet-800/70"
			)}
		>
			<time
				dateTime={format(day, "yyyy-MM-dd")}
				className={`text-sm sm:text-lg text-center flex flex-col gap-1 items-center w-full font-semibold max-sm:font-medium ${
					!isSameMonth(day, currentMonth)
						? "text-foreground/40"
						: isToday(day)
						? "text-red-500"
						: isEqual(selectedDate, day)
						? "text-background"
						: "text-foreground"
				} `}
			>
				<span
					className={cn(
						schedules.some((s) => isSameDay(s.datetime, day)) &&
							(isSameDay(selectedDate, day)
								? "border border-background"
								: "border-red-500 border"),
						"rounded-full grid place-content-center w-8 h-8 cursor-pointer"
					)}
				>
					{format(day, "d")}
				</span>
			</time>
		</button>
	);
};

export default DayBox;
