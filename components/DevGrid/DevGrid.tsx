import { Dev } from "@/definitions/types/dev";
import DevCard from "./DevCard";

interface Props {
	dev: Dev[];
}

export default function DevGrid({ dev }: Props) {
	return (
		<div className="flex justify-between px-[15vw]">
			{dev.map((dev) => (
				<DevCard key={dev.id} dev={dev} />
			))}
		</div>
	);
}
