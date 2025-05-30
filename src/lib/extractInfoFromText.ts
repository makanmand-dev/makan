export function extractInfoFromText(text: string): Record<string, string> {
  const result: Record<string, string> = {};

  // تشخیص نوع ملک
  const types = ['آپارتمان', 'زمین', 'خانه', 'ویلا', 'مغازه', 'دفتر', 'سوله'];
  for (const type of types) {
    if (text.includes(type)) {
      result['type'] = type;
      break;
    }
  }

  // تشخیص متراژ
  const areaMatch = text.match(/(\d{1,4})\s*متر/);
  if (areaMatch) result['area'] = areaMatch[1];

  // تشخیص قیمت
  const priceMatch = text.match(/([\d\s٬,\.]+)\s*(میلیون|میلیارد)/);
  if (priceMatch) result['priceRange'] = `${priceMatch[1].trim()} ${priceMatch[2]}`;

  // ✅ تشخیص شماره تماس
  const phoneMatch = text.match(/(09\d{9})/);
  if (phoneMatch) result['contact'] = phoneMatch[1];

  // تشخیص موقعیت مکانی (شهر)
  const cities = ['تهران', 'اصفهان', 'مشهد', 'شیراز', 'کرج', 'رشت', 'تبریز', 'قزوین'];
  for (const city of cities) {
    if (text.includes(city)) {
      result['location'] = city;
      break;
    }
  }

  return result;
}
