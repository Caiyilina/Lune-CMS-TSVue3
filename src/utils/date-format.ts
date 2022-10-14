import dayjs from "dayjs"; // 使用dayjs库对时间进行转换
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); //对utc进行拓展

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// utc转化
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 东八区
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
