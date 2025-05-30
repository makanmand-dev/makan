export function extractInfoFromText(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const types = ['آپارتمان', 'زمین', 'خانه', 'ویلا', 'مغازه', 'دفتر', 'سوله'];
  for (const type of types) {
    if (text.includes(type)) {
      result['type'] = type;
      break;
    }
  }
  const areaMatch = text.match(/(\d{1,4})\s*متر/);
  if (areaMatch) result['area'] = areaMatch[1];
  const priceMatch = text.match(/(\d[\d\s٬,\.]*)\s*(میلیون|میلیارد)/);
  if (priceMatch) result['priceRange'] = `${priceMatch[1].trim()} ${priceMatch[2]}`;
  const phoneMatch = text.match(/(09\d{9})/);
  if (phoneMatch && phoneMatch[1]) result['contact'] = phoneMatch[1];
  const cities = ['تهران', 'اصفهان', 'مشهد', 'شیراز', 'کرج', 'رشت', 'تبریز', 'قزوین'];
  for (const city of cities) {
    if (text.includes(city)) {
      result['location'] = city;
      break;
    }
  }
  return result;
}