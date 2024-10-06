import React from "react";

const BackgroundDivs = () => {
	return (
		<>
			<div className="blur-md bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
			<div className="blur-md bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
			<div className="blur-md bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
			<div className="blur-md bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute bottom-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
			<div className="blur-md bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
			<div className="blur-md bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
		</>
	);
};

export default BackgroundDivs;
