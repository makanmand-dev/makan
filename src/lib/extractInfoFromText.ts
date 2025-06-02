export function extractInfoFromText(text: string) {
  const info: Record<string, string> = {};

  // تبدیل اعداد فارسی به انگلیسی و نرمال‌سازی
  const normalized = text
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/،/g, ',')
    .replace(/,/g, '')
    .replace(/ +/g, ' ')
    .trim();

  // نسخه بدون فاصله برای بررسی شماره تماس
  const compact = normalized.replace(/\s+/g, '');

  // نوع ملک
  const typeMatch = normalized.match(/(آپارتمان|زمین|ویلا|خانه|مغازه|دفتر|سوله)/);
  if (typeMatch) {
    info.type = typeMatch[1];
  }

  // متراژ
  const areaMatch = normalized.match(/(\d{1,4})\s*(متر|مترمربع|متر مربع|م²)/);
  if (areaMatch) {
    info.area = areaMatch[1];
  }

  // قیمت: میلیون یا میلیارد
  const priceMatch = normalized.match(/(\d+(\.\d+)?)(\s*)?(میلیون|میلیارد)/i);
  if (priceMatch) {
    info.priceRange = `${priceMatch[1]} ${priceMatch[4]}`;
  }

  // شماره تماس
  const phoneMatch = compact.match(/(?:\+98|0098|0)?9\d{9}/);
  if (phoneMatch) {
    let number = phoneMatch[0];
    if (!number.startsWith('0')) number = '0' + number;
    info.contact = number;
  }

  // سال ساخت
  const yearMatch = normalized.match(/(13[0-9]{2}|14[0-4][0-9])/);
  if (yearMatch) {
    info.yearBuilt = yearMatch[1];
  }

  return info;
}
