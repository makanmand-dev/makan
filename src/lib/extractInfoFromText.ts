export function extractInfoFromText(text: string) {
  const info: Record<string, string> = {};

  // نوع ملک
  if (text.includes('آپارتمان') || text.includes('زمین') || text.includes('ویل')) {
    info.type = text;
  }

  // متراژ
  const areaMatch = text.match(/(\d+)\s*متر/);
  if (areaMatch) {
    info.area = areaMatch[1];
  }

  // قیمت
  const priceMatch = text.match(/(\d+[\d٫,]*)\s*(میلیون|میلیارد)/);
  if (priceMatch) {
    info.priceRange = priceMatch[0];
  }

  // شماره تماس
  const phoneMatch = text.match(/(\d{9,11})/);
  if (phoneMatch) {
    info.contact = phoneMatch[0];
  }

  return info;
}
