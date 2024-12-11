export interface Extra{
    dictTypeExtraId: number
    value: string
}
export interface DictData {
    dictTypeId: number
    value: string
    sort: number
    description: string
    extras?: Extra[]
}
  