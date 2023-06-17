interface Props {
  message: string
}
export default function BotMessage({ message }: Props) {
  return (
    <div className="flex justify-start mb-4">
      <h1 className="block bg-[#D9D9D9]  text-[#283044] text-[3vh] w-max-content rounded-[3vh] px-[2vh]">{message}</h1>
    </div>
  )
}
