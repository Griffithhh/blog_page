import { NextResponse } from 'next/server';
import {createClient} from "../../../../utils/supabase/client";


export async function GET() {
  try {
    console.log('📡 GET /api/blogs — start');
    const { data, error } = await createClient()
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error(' Supabase error:', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error in GET /api/blogs:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await createClient()
      .from('blogs')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error(' Supabase insert error:', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    console.log(' POST /api/blogs — success:', data);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
