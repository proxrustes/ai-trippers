interface Props {
	message: string
}

export default function UserMessage({ message }: Props){
    return(<h1>{message}</h1>)
}