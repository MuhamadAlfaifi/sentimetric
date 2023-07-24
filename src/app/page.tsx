import { SentimentChart } from '@/client-components/area-chart';
import { Card, CardAction, CardActions } from '@/client-components/card';
import Link from 'next/link';
import Numeral from 'numeral';
import { findTweeps } from '@/lib/disk';

export const dynamic = 'force-static';

export const metadata = {
  title: 'مقياس - الرئيسية',
  description: 'تحليل ميول الناشطين على وسائل التواصل الإجتماعي',
}

type Status = 'pending' | 'inprogress' | 'completed';

function ProgressBadge({ 
  status, 
  children 
}: { 
  status: Status, 
  children?: React.ReactNode 
}) {
  const color = {
    pending: 'bg-gray-200 text-gray-800',
    inprogress: 'bg-yellow-200 text-yellow-800',
    completed: 'bg-green-200 text-green-800',
  }[status];

  const name = {
    pending: 'قريبا',
    inprogress: 'قيد التنفيذ',
    completed: 'مكتمل',
  }[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {name}{children}
    </span>
  );
}
// "user": {
//   "id_str": "186101324",
//   "name": "د. جاسم المطوع",
//   "profile_image_url_https": "https://pbs.twimg.com/profile_images/1613095983977566209/9sVQ2OpV_normal.jpg",
//   "screen_name": "drjasem",
//   "verified": false,
//   "is_blue_verified": true,
//   "profile_image_shape": "Circle"
// }
export default async function Home() {
  const tweeps = await findTweeps();

  return (
    <main className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {tweeps?.filter?.(Boolean).map(({
        id_str,
        name,
        profile_image_url_https,
        screen_name,
        verified,
        is_blue_verified,
        profile_image_shape,
      }, i) =>
        <Card key={i} className="bg-white relative border border-gray-200">
          <CardAction as={Link} href={`/u/${screen_name}`} className="block hover:bg-gray-100">
            <div className="py-4 px-4 space-y-2">
              <div>
                <div className="flex items-center space-x-reverse space-x-3">
                  <div className="flex-shrink-0">
                    <img className={`h-12 w-12 rounded-full ${profile_image_shape === 'Circle' ? 'rounded-full' : 'rounded-md'}`} src={profile_image_url_https} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="block">
                        <div className="text-sm font-medium text-gray-900">
                          <span className="font-bold">{name}</span>
                          <span className="mx-1 text-gray-500" dir="ltr">@{screen_name}</span>
                          {(is_blue_verified || verified) && (
                            <svg width={22} height={22} viewBox="0 0 22 22" aria-label="Verified account" role="img" className="fill-[#1d9bf0]">
                              <g>
                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                              </g>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-36 flex flex-col">
                <div className="h-24">
                  <div className="flex space-x-reverse space-x-5">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">التغريدات</div>
                      <div className="text-sm text-gray-700 font-medium">
                        <div className="flex items-center space-x-reverse space-x-1">
                          <bdi>{Numeral(100).format('0a')}</bdi>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">قياس الرأي</div>
                      <ProgressBadge status="completed" />
                    </div>
                  </div>
                </div>
                <div className="h-20 w-full mt-2 pointer-events-none" dir="ltr">
                  <SentimentChart />
                </div>
              </div>
            </div>
          </CardAction>
          <CardActions className="border-t border-t-gray-200 py-2 px-2">
            <button className="inline-flex items-center rounded px-2.5 py-1.5 text-base font-medium text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              تفاصيل الملف
            </button>
          </CardActions>
        </Card>
      )}
    </main>
  )
}
