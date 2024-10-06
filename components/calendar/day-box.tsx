import { cn } from "@/lib/utils";
import { format, isEqual, isSameMonth, isToday } from "date-fns";
import React, { Dispatch, SetStateAction } from "react";

interface DayBoxProps {
	day: Date;
	selectedDay: Date;
	firstDayOfCurrentMonth: Date;
	setSelectedDay: Dispatch<SetStateAction<Date>>;
}

const DayBox = ({
	day,
	selectedDay,
	setSelectedDay,
	firstDayOfCurrentMonth,
}: DayBoxProps) => {
	return (
		<button
			onClick={() => setSelectedDay(day)}
			className={cn(
				"flex xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-primary/50 transition-all duration-300",
				isEqual(selectedDay, day)
					? "bg-primary hover:bg-primary"
					: " bg-muted hover:bg-violet-800/70"
			)}
		>
			<time
				dateTime={format(day, "yyyy-MM-dd")}
				className={`text-xs sm:text-base text-center w-full font-semibold ${
					!isSameMonth(day, firstDayOfCurrentMonth)
						? "text-foreground/40"
						: isToday(day)
						? "text-red-500"
						: isEqual(selectedDay, day)
						? "text-background"
						: "text-foreground"
				} `}
			>
				{format(day, "d")}
			</time>
		</button>
	);
};

export default DayBox;
