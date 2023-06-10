'use server';

import { read, update } from '@/lib/s3';
import { revalidatePath } from 'next/cache.js';

export async function removeOne(): Promise<void> {
  const data = await read();
  await update({
    body: JSON.stringify(data.splice(1))
  });
  revalidatePath('/');
}