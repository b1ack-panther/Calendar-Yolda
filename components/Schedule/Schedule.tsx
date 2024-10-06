"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import ScheduleModal from "./schedule-modal";
import ScheduleCard from "./ScheduleCard";
import { useModal, useStore } from "@/lib/zustand";
import { isSameDay } from "date-fns";

const Schedule = () => {
	const { schedules, selectedDate } = useStore();
	const { setModal } = useModal();

	if (!schedules) {
		return <p>Something went wrong!</p>;
	}

	const handleClick = () => {
		setModal({
			datetime: new Date(selectedDate),
		});
	};

	const filteredSchedule = schedules.filter((schedule) =>
		isSameDay(selectedDate, schedule.datetime)
	);

	return (
		<>
			<div className="col-span-12 xl:col-span-5">
				<div className="flex items-center justify-between my-5">
					<h1 className="font-manrope text-3xl pl-1 font-semibold leading-tight text-foreground">
						Schedule
					</h1>

					<Button onClick={handleClick} variant="default">
						<span className="cursor-pointer">New</span>
						<Plus className="h-5 w-5 ml-1" />
					</Button>
				</div>

				<div className="flex gap-5 flex-col xl:overflow-y-auto xl:pr-3 p-2 xl:max-h-[550px]">
					{filteredSchedule.length > 0 ? (
						filteredSchedule.map((schedule) => (
							<ScheduleCard key={schedule.id} schedule={schedule} />
						))
					) : (
						<p className="text-xl font-semibold">You are free for today!</p>
					)}
				</div>
			</div>
			<ScheduleModal />
		</>
	);
};

export default Schedule;
