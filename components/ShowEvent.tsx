import { Event } from "@/definitions/types/event"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

interface Props{
    event: Event
}
export function ShowEvent({ event }: Props) {
    let [isOpen, setIsOpen] = useState(false)
  
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
    return (
      <>
        <center>
          <button
            type="button"
            onClick={openModal}>
            Create Event
          </button>
        </center>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={()=>{}}>
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
              <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    <Dialog.Title
                      className="text-lg font-medium leading-6"
                    >
                     SCHEDULE AN EVENT
                    </Dialog.Title>
                    <div className="mt-2">
                    <p>Title</p>
                    <p>Description</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }
  