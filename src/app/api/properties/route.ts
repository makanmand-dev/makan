import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 درخواست دریافتی:', body);

    const { type, area, location, priceRange, contact } = body;

    if (!type || !area || !location || !priceRange || !contact) {
      console.error('⚠️ فیلد ناقص:', { type, area, location, priceRange, contact });
      return NextResponse.json({ success: false, error: 'اطلاعات ناقص است.' });
    }

    const { data, error } = await supabase.from('properties').insert([
      {
        type,
        area: parseInt(area),
        location,
        price_range: priceRange,
        contact
      }
    ]);

    if (error) {
      console.error('❌ خطای Supabase:', error.message);
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true, message: 'ثبت شد ✅' });

  } catch (err: any) {
    console.error('❗ خطای کلی:', err.message || err);
    return NextResponse.json({ success: false, error: 'خطای داخلی سرور' });
  }
}
