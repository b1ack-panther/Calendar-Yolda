
import Calendar from "@/components/calendar/calendar";
import Schedule from "@/components/Schedule/Schedule";

export default function Home() {

	
	return (
		<div className="w-full py-6 relative z-10">
			<div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
				<div className="grid grid-cols-12 place-content-center gap-8 max-w-4xl mx-auto xl:max-w-full max-h-min">
					<Schedule />
					<Calendar />
				</div>
			</div>
		</div>
	);
}
