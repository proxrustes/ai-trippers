import { DUMMY_EVENT_DATA } from "@/data/dummydata.events";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EventGrid from "./EventGrid/EventGrid";

export function ShowEvent() {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<center>
				<button className="button" onClick={openModal}>
					SHOW SUGGESTED EVENTS
				</button>
			</center>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => {}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-[2vh] text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="dialog-panel transform">
									<Dialog.Title className="text-[4vh] font-black">
										SUGGESTED EVENTS
									</Dialog.Title>
									<div>
										<EventGrid events={DUMMY_EVENT_DATA} />
										<button className="button" onClick={closeModal}>
											BROWSE FURTHER
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
