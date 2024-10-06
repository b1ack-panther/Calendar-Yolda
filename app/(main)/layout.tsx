import BackgroundDivs from "@/components/BackgroundDivs";
import { Navbar } from "@/components/Navbar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	
	return (
		<div className="h-screen overflow-auto bg-muted/50">

			<BackgroundDivs />
			
			<Navbar />
			{children}
		</div>
	);
}
