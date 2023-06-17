interface Props {
	message: string
}

export default function BotMessage({ message }: Props){
return(<h1>{message}</h1>)
}