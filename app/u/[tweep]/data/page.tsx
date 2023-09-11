import { findTweets } from '@/lib/disk';
import { Tweet } from 'react-tweet';

export default async function TweetsPage({ params }: { params: { tweep: string }}) {
  const tweets = await findTweets(params.tweep);

  return (
    <div>
      {tweets?.filter(Boolean)?.map(({ id_str }) => <div dir="ltr"><Tweet id={id_str} /></div>)}
    </div>
  );
}