//判断不是http || https开头的字符串
export const isNotHttp = (url: any) => {
  return !(url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
}
//判断是http || https开头的字符串
export const isHttp = (url: any) => {
  return !(url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)
}

//获取当前是早上||中文||下午||晚上的方法
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

//重置对象的所有属性值为空
export function resetObj(obj: any){
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      obj[key] = undefined
    }
  }
}
// utils.js
export function copyText(text:any) {
  return navigator.clipboard.writeText(text).then(() => {
    alert("已复制内容：" + text);
  }).catch((err) => {
    console.error("复制失败：", err);
  });
}
