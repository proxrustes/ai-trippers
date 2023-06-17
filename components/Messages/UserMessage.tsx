interface Props {
	message: string
}

export default function UserMessage({ message }: Props){
    return(<div className="flex justify-end mb-4 ">
        <h1 className="block bg-[#78A1BB] w-max-content rounded-[3vh] px-[2vh]">{message}</h1>
        </div>)
}
