export interface role {
  roleId?: number
  name?: string
  code?: string
  nickname?: string
  status?: number
}

//role-list-rep
export interface roleListRep {
  total?: string
  rows?: role[]
  code: number
  msg: string
}

//user-info-rep
export interface roleResponseData {
  code: number
  data?: role
  msg: string
}
