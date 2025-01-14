import { Href } from "expo-router"

export interface BaseModel {}

export interface BaseDTO {}

export type VerifyPath = {
  setPassword: Href,
  activeAccount: Href
}