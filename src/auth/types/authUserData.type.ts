

import { rolData } from "./roleData.types"

export interface AuthUser {
    code: number
    id: number
    name: string
    email: string
    age: number
    message: string
    password: string
    role: rolData
    token: string
  }
  


  