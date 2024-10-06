import React from "react";
import ScheduleDropdown from "./schedule-dropdown";
import { format } from "date-fns";

const ScheduleCard = ({ schedule }: { schedule: Schedule }) => {
	return (
		<div className="p-6 rounded-xl bg-gray-300/20 backdrop-blur-sm dark:bg-secondary/40 shadow-md">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2.5">
					<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
					<p className="text-base font-medium text-muted-foreground/70">
						{format(schedule.datetime, "h:mm a")}
					</p>
				</div>
				<div className="dropdown grid place-content-center hover:bg-background/10 transition h-7 w-7 rounded-full">
					<ScheduleDropdown schedule={schedule} />
				</div>
			</div>
			<h3 className="text-xl leading-8 font-semibold text-foreground mb-1">
				{schedule.title}
			</h3>
			<p className="text-base font-normal text-muted-foreground/90">
				{schedule.description}
			</p>
		</div>
	);
};

export default ScheduleCard;
