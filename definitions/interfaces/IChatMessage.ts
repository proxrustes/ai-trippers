export interface IChatMessage {
  message: string
  time: string
  user: "bot" | "user"
}
