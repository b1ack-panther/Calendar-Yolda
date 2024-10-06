import React from "react";

const WeekHeader = () => {
	return (
		<div className="grid grid-cols-7 bg-muted rounded-t-xl border-b border-primary/50  text-sm sm:text-base font-medium text-primary">
			<span className="py-3.5 border-r rounded-tl-xl border-primary/50 bg-primary/20 flex items-center justify-center">
				Sun
			</span>
			<span className="py-3.5 border-r border-primary/50 bg-primary/20 flex items-center justify-center">
				Mon
			</span>
			<span className="py-3.5 border-r border-primary/50 bg-primary/20 flex items-center justify-center">
				Tue
			</span>
			<span className="py-3.5 border-r border-primary/50 bg-primary/20 flex items-center justify-center">
				Wed
			</span>
			<span className="py-3.5 border-r border-primary/50 bg-primary/20 flex items-center justify-center">
				Thu
			</span>
			<span className="py-3.5 border-r border-primary/50 bg-primary/20 flex items-center justify-center">
				Fri
			</span>
			<span className="py-3.5 rounded-tr-xl bg-primary/20 flex items-center justify-center">
				Sat
			</span>
		</div>
	);
};

export default WeekHeader;
