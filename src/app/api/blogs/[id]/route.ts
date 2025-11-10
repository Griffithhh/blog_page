import { NextResponse } from 'next/server';
import {createClient} from "../../../../../utils/supabase/client";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data, error } = await createClient()
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 404 });
  return NextResponse.json(data);
}
