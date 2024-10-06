"use client";

import DayBox from "@/components/calendar/day-box";
import WeekHeader from "@/components/calendar/week-header";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/zustand";
import { getSchedules } from "@/db/dbQueries";
import { useEffect } from "react";

const Calendar = () => {
	const { setCurrentMonth, currentMonth, setSchedules } = useStore();

	const fetchSchedule = async (month: Date) => {
		const res: Schedule[] | null = (await getSchedules(month)) as any;
		setSchedules(res ?? []);
	};

	useEffect(() => {
		fetchSchedule(currentMonth);
	}, [currentMonth]);

	const newDays = eachDayOfInterval({
		start: startOfWeek(startOfMonth(currentMonth)),
		end: endOfWeek(endOfMonth(currentMonth)),
	});

	const nextMonth = () => {
		const firstDayOfNextMonth = add(currentMonth, { months: 1 });
		setCurrentMonth(firstDayOfNextMonth);
	};
	const prevMonth = () => {
		const firstDayOfPrevMonth = add(currentMonth, { months: -1 });
		setCurrentMonth(firstDayOfPrevMonth);
	};

	return (
		<div className=" stick top-0  col-span-12 xl:col-span-7 px-2.5 py-2 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
			<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
				<div className="flex items-center gap-4">
					<h5 className="text-xl sm:text-3xl leading-8 tracking-wide font-bold text-gray-900">
						{format(currentMonth, "MMMM-yyyy")}
					</h5>
					<div className="flex items-center gap-1">
						<button
							onClick={prevMonth}
							className="text-primary py-1 px-3 sm:py-2 rounded transition-all duration-300 hover:text-background hover:bg-primary"
						>
							<ChevronLeft />
						</button>
						<button
							onClick={nextMonth}
							className="text-primary py-1 px-3 sm:py-2 rounded transition-all duration-300 hover:text-background hover:bg-primary"
						>
							<ChevronRight />
						</button>
					</div>
				</div>
			</div>
			<div className="border border-primary/50 overflow-hidden rounded-xl">
				<WeekHeader />
				<div className="grid grid-cols-7 rounded-b-xl">
					{newDays.map((day, index) => (
						<DayBox key={index} day={day} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
