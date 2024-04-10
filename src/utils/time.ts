export enum TimePeriodEnum {
  Morning = '早上',
  Midday = '中午',
  Afternoon = '下午',
  Evening = '晚上',
}

export const getTime = (): TimePeriodEnum => {
  const now = new Date()
  const currentHour = now.getHours()
  switch (true) {
    case currentHour >= 0 && currentHour < 9:
      return TimePeriodEnum.Morning
    case currentHour >= 9 && currentHour < 12:
      return TimePeriodEnum.Midday
    case currentHour >= 12 && currentHour < 18:
      return TimePeriodEnum.Afternoon
    default:
      return TimePeriodEnum.Evening
  }
}
