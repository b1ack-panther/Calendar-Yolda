import { create } from "zustand";
interface state {
	schedules: Schedule[];
	currentMonth: Date;
	selectedDate: Date;
	setSelectedDate: (day: Date) => void;
	setCurrentMonth: (month: Date) => void;
	setSchedules: (schedules: Schedule[]) => void;
	addSchedule: (schedule: Schedule) => void;
	deleteSchedule: (id: string) => void;
	updateSchedule: (schedule: Schedule) => void;
}

export const useStore = create<state>((set) => ({
	schedules: [],
	currentMonth: new Date(),
	selectedDate: new Date(),
	setSelectedDate: (day) => set((state) => ({ ...state, selectedDate: day })),
	setCurrentMonth: (month) =>
		set((state) => ({ ...state, currentMonth: month })),
	setSchedules: (schedules) =>
		set((state) => ({ ...state, schedules: schedules })),
	addSchedule: (schedule) =>
		set((state) => ({ ...state, schedules: [schedule, ...state.schedules] })),
	updateSchedule: (schedule) =>
		set((state) => {
			const filtered = state.schedules.filter((s) => s.id != schedule.id);
			console.log("🚀 ~ set ~ filtered:", filtered);
			return {
				...state,
				schedules: [schedule, ...filtered],
			};
		}),
	deleteSchedule: (scheduleId) =>
		set((state) => ({
			...state,
			schedules: state.schedules.filter(
				(schedule) => schedule.id !== scheduleId
			),
		})),
}));

interface modalState {
	isOpen: boolean;
	data: Partial<Schedule>;
	setModal: (data: Partial<Schedule>) => void;
	closeModal: () => void;
}

export const useModal = create<modalState>((set) => ({
	isOpen: false,
	data: {},
	setModal: (data) => set((state) => ({ ...state, isOpen: true, data })),
	closeModal: () => set((state) => ({ ...state, isOpen: false, data: {} })),
}));
