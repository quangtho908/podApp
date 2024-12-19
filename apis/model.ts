import { AxiosError } from "axios";

export type ResponseError = AxiosError<{message: string}>