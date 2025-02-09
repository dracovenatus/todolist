import { ResultCode } from "common/enums"

export type isInitializedDataResponse = {
  id: number
  email: string
  login: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
