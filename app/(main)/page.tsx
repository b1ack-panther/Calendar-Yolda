"use client";

import DayBox from "@/components/calendar/day-box";
import Events from "@/components/calendar/Events";
import WeekHeader from "@/components/calendar/week-header";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getMonth,
	isSameMonth,
	isToday,
	parse,
	startOfMonth,
	startOfToday,
	startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const today = startOfToday();
	const [selectedDay, setSelectedDay] = useState(today);
	const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

	const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

	const newDays = eachDayOfInterval({
		start: startOfWeek(startOfMonth(firstDayOfCurrentMonth)),
		end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
	});

	const nextMonth = () => {
		const firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayOfNextMonth, "MMMM-yyyy"));
	};
	const prevMonth = () => {
		const firstDayOfPrevMonth = add(firstDayOfCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayOfPrevMonth, "MMMM-yyyy"));
	};

	return (
		<div className="w-full py-6 relative z-10">
			<div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
				<div className="grid grid-cols-12 place-content-center gap-8 max-w-4xl mx-auto xl:max-w-full max-h-min">
					<Events />

					<div className=" stick top-0  col-span-12 xl:col-span-7 px-2.5 py-2 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
						<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
							<div className="flex items-center gap-4">
								<h5 className="text-xl sm:text-3xl leading-8 tracking-wide font-bold text-gray-900">
									{currentMonth}
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
									<DayBox
										key={index}
										day={day}
										firstDayOfCurrentMonth={firstDayOfCurrentMonth}
										selectedDay={selectedDay}
										setSelectedDay={setSelectedDay}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
