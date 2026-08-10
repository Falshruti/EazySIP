import WatchClient from '@/components/client/WatchClient';
import { getDictionary } from '@/lib/dictionary';

export default async function WatchPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <WatchClient dict={dict.watch} />;
}
