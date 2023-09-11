import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { diskCache } from '@/lib/disk';
// import { Card, CardAction, CardActions } from '@/components/card';
import { SentimentChart } from '@/components/area-chart';
import Numeral from 'numeral';
import { User } from "@nextui-org/user";
import { Divider } from '@nextui-org/divider';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

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

export default async function Home() {
  const tweeps = await diskCache.findTweeps();

	return (
		<main>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {tweeps?.filter?.(Boolean).map(({
          id_str,
          name,
          profile_image_url_https,
          screen_name,
          verified,
          is_blue_verified,
          profile_image_shape,
        }, i) =>
          <Card key={i}>
            <CardHeader>
              <NextLink href="#" className="py-4 px-4 space-y-2 w-full">
                <User
                  name={name}
                  description={
                    <>
                      <bdi>{`@${screen_name}`}</bdi>
                      {(is_blue_verified || verified) && (
                        <svg width={22} height={22} viewBox="0 0 22 22" aria-label="Verified account" role="img" className="fill-[#1d9bf0]">
                          <g>
                            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                          </g>
                        </svg>
                      )}
                    </>
                  }
                  avatarProps={{
                    src: profile_image_url_https,
                    size: 'lg',
                  }}
                />
                <div className="h-36 flex flex-col">
                  <div className="h-24">
                    <div className="flex space-x-reverse space-x-5">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500 dark:text-gray-100">التغريدات</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          <div className="flex items-center space-x-reverse space-x-1">
                            <bdi>{Numeral(100).format('0a')}</bdi>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500 dark:text-gray-100">تحليل الرأي</div>
                        <ProgressBadge status="completed" />
                      </div>
                    </div>
                  </div>
                  <div className="h-20 w-full mt-2 pointer-events-none" dir="ltr">
                    <SentimentChart />
                  </div>
                </div>
              </NextLink>
            </CardHeader>
            <Divider />
            <CardFooter className="py-2 px-2 flex justify-between items-center">
              <div className="space-x-reverse space-x-4">
                <Button
                  href={`/u/${screen_name}`}
                  isDisabled
                  as={NextLink}
                  color="primary"
                >
                  <span>
                    دخول
                  </span>
                  <svg width="22" height="27.5" viewBox="0 0 100 125" className="fill-white rotate-180 -mt-1">
                    <g>
                      <polygon points="46.4 63.4 49.3 66.2 65.5 50 49.3 33.8 46.4 36.6 57.8 48 23 48 23 52 57.8 52 46.4 63.4"/>
                      <polygon points="77 18.3 36.7 18.3 36.7 32 40.7 32 40.7 22.3 73 22.3 73 77.7 40.7 77.7 40.7 67 36.7 67 36.7 81.7 77 81.7 77 18.3"/>
                    </g>
                  </svg>
                </Button>
                <Link
                  href={`/edit/${screen_name}`}
                  as={NextLink}
                >
                  تعديل
                </Link>
              </div>
              <Link
                href={`https://twitter.com/${screen_name}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <g>
                    <path d="M23.954 4.569c-.885.389-1.83.653-2.825.773 1.014-.611 1.794-1.574 2.162-2.723-.951.563-2.005.973-3.127 1.193-.896-.957-2.176-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.923 0 .387.044.762.127 1.122C7.62 8.1 4.04 6.1 1.64 3.14c-.427.73-.67 1.574-.67 2.48 0 1.71.87 3.213 2.19 4.096-.807-.026-1.566-.248-2.23-.616v.06c0 2.385 1.693 4.374 3.946 4.826-.413.113-.848.174-1.296.174-.316 0-.622-.03-.92-.088.624 1.95 2.43 3.377 4.574 3.416-1.674 1.315-3.786 2.1-6.08 2.1-.395 0-.784-.023-1.17-.068 2.17 1.387 4.74 2.198 7.517 2.198 9.02 0 13.96-7.48 13.96-13.96l-.016-.635c.96-.69 1.8-1.55 2.46-2.53l.02-.04z"></path>
                  </g>
                </svg>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
		</main>
	);
}
