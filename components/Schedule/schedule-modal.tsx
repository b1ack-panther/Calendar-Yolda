"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { scheduleFormData, scheduleFormSchema } from "@/lib/zodSchema";
import Loading from "../Loading";
import { AuthMessage } from "../auth-message";
import { createSchedule, updateSchedule } from "@/db/dbQueries";
import { useModal, useStore } from "@/lib/zustand";

const ScheduleModal = () => {
	const [message, setMessage] = useState<SqlResponse | undefined>();
	const { addSchedule, updateSchedule: updateZSchedule } = useStore();
	const { isOpen, closeModal, data } = useModal();

	const form = useForm<scheduleFormData>({
		resolver: zodResolver(scheduleFormSchema),
		defaultValues: {
			title: "",
			description: "",
			dateTime: new Date(),
		},
	});

	useEffect(() => {
		if (data.title) form.setValue("title", data.title);
		if (data.description) form.setValue("description", data.description);
		if (data.datetime) form.setValue("dateTime", data.datetime);
	}, [data]);

	const handleModalClose = () => {
		form.reset();
		closeModal();
	};

	async function handleUpdate(values: scheduleFormData) {
		const res = await updateSchedule({ ...values, id: data.id } as Schedule);
		if (res?.success) {
			handleModalClose();
			updateZSchedule(res.success as Schedule);
		} else {
			setMessage({ error: res.error });
		}
	}
	async function handleCreate(values: scheduleFormData) {
		const res = await createSchedule({ ...values } as Schedule);
		if (res?.success) {
			handleModalClose();
			addSchedule(res.success as Schedule);
		} else {
			setMessage({ error: res.error });
		}
	}

	async function onSubmit(values: scheduleFormData) {
		setMessage(undefined);
		if (data?.id) handleUpdate(values);
		else handleCreate(values);
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleModalClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center tracking-wide font-semibold text-2xl">
						{data?.id ? "Edit" : "Create"} Schedule
					</DialogTitle>
					<DialogDescription className="text-center">
						Enter details {data?.id ? "to edit " : "for the new"} schedule
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						autoComplete="off"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter schedule title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter schedule description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dateTime"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date and time</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP HH:mm:ss")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
											<div className="p-3 border-t border-border">
												<Input
													type="time"
													value={format(field.value, "HH:mm")}
													onChange={(e) => {
														const [hours, minutes] = e.target.value.split(":");
														const newDate = new Date(field.value);
														newDate.setHours(parseInt(hours));
														newDate.setMinutes(parseInt(minutes));
														field.onChange(newDate);
													}}
												/>
											</div>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="flex flex-col gap-3 h-9">
							<AuthMessage message={message} />
							<Button type="submit">
								<span className="cursor-pointer mr-1">
									{data?.id ? "Edit" : "Create"} Schedule
								</span>{" "}
								{form.formState.isSubmitting && <Loading />}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ScheduleModal;
