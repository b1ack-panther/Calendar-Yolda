import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";

const Events = () => {
	return (
		<div className="col-span-12 max-md:px-5 xl:col-span-5">
			<h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
				Upcoming Events
			</h2>
			<p className="text-lg font-normal text-gray-600 mb-8">
				Don’t miss schedule
			</p>
			<div className="flex gap-5 flex-col xl:overflow-y-auto xl:max-h-[530px]">
				<div className="p-6 rounded-xl bg-white">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2.5">
							<span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
							<p className="text-base font-medium text-gray-900">
								Jan 10,2020 - 10:00 - 11:00
							</p>
						</div>
						<div className="dropdown relative inline-flex">
							<button
								type="button"
								data-target="dropdown-default"
								className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600  "
							>
								<DotsVerticalIcon />
							</button>
							<div
								id="dropdown-default"
								className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
								aria-labelledby="dropdown-default"
							>
								<ul className="py-2">
									<li>
										<a
											className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
											href="javascript:;"
										>
											Edit
										</a>
									</li>
									<li>
										<a
											className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
											href="javascript:;"
										>
											Remove
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<h3 className="text-xl leading-8 font-semibold text-black mb-1">
						Meeting with a friends
					</h3>
					<p className="text-base font-normal text-gray-600">
						Meet-Up for Travel Destination Discussion
					</p>
				</div>
				
			</div>
		</div>
	);
};

export default Events;
