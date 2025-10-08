export function formatDateTime(
  isoString: string,
  locale: string = "vi-VN",
  timeZone: string = "Asia/Ho_Chi_Minh"
): string {
  const date = new Date(isoString);

  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // dùng giờ 24h
    timeZone: timeZone,
  });
}

export function formatCurrency(amount: number, locale: string = "vi-VN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // không hiện số lẻ
    maximumFractionDigits: 0
  }).format(amount);
}

//Viết hoa chứ cái đầu
export function capitalizeFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Viết thường chữ cái đầu
export function uncapitalizeFirstLetter(str: string) {
  if (!str) return '';
  return str.charAt(0).toLowerCase() + str.slice(1);
}