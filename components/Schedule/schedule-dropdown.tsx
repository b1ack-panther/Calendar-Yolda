"use client";

import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit2, Trash2 } from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { deleteSchedule } from "@/db/dbQueries";
import { useModal, useStore } from "@/lib/zustand";

const ScheduleDropdown = ({ schedule }: { schedule: Schedule }) => {
	const { deleteSchedule: deleteZSchedule } = useStore();
	const { setModal } = useModal();

	const handleDelete = async () => {
		const res = await deleteSchedule(schedule.id);
		if (res?.error) {
			console.log(res);
		} else {
			deleteZSchedule(schedule.id);
		}
	};

	const handleEdit = async () => {
		setModal(schedule);
	};

	return (
		<DropdownMenu modal>
			<DropdownMenuTrigger
				asChild
				className="focus-visible:outline-none  outline-none ring-0 focus-visible:ring-0 focus-visible:border-none"
			>
				<button
					type="button"
					data-target="dropdown-default"
					className="dropdown-toggle inline-flex justify-center hover:bg-muted w-7 h-7 items-center text-foreground rounded-full transition-all"
				>
					<DotsVerticalIcon />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={handleEdit}>
					<Edit2 className="w-4 h-4 mr-3" />
					<span>Edit</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete} className="group ">
					<Trash2 className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-500" />
					<span className="group-hover:text-red-500 text-red-500">Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ScheduleDropdown;
