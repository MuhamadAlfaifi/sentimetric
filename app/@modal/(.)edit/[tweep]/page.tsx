import Modal from '@/components/modal';
import { diskCache, sortByDate } from '@/lib/disk';
import { first, last } from 'lodash';

function CenteredBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default async function EditTweep({ params }: { params: { tweep: string } }) {
  const tweets = await diskCache.findTweets(params.tweep).then(sortByDate).then(tweets => tweets?.filter(Boolean));
  const {
    id_str,
    name,
    profile_image_url_https,
    screen_name,
    verified,
    is_blue_verified,
    profile_image_shape,
  } = tweets?.[0]?.user || {};
  
  const from = (new Date(first(tweets).created_at)).toLocaleDateString('ar');
  const to = (new Date(last(tweets).created_at)).toLocaleDateString('ar');

  return (
    <Modal>
      <CenteredBox>
        <div className="bg-gray-200 flex space-x-reverse space-x-2 py-2 px-4 mb-4">
          <svg width="18px" height="18px" viewBox="0 0 416.979 416.979" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="fill-gray-800">
            <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z" />
          </svg>
          <p className="text-sm dark:text-gray-900">عفواً، لا يمكن تعديل الطلب</p>
        </div>
        <div className="space-y-10">
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="flex-shrink-0">
              <img className={`h-14 w-14 rounded-full ${profile_image_shape === 'Circle' ? 'rounded-full' : 'rounded-md'}`} src={profile_image_url_https} alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="block text-right">
                  <div className="text-sm font-medium text-gray-900">
                    <span className="font-bold truncate">{name}</span>
                    <span className="mx-1 text-gray-500 truncate" dir="ltr">@{screen_name}</span>
                    {(is_blue_verified || verified) && (
                      <svg width={22} height={22} viewBox="0 0 22 22" aria-label="Verified account" role="img" className="fill-[#1d9bf0] inline-block">
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

          <div className="flex items-center space-x-reverse space-x-3">
            <div className="text-sm text-gray-500">من</div>
            <div className="text-sm text-gray-900">{from}</div>
            <div className="text-sm text-gray-500">إلى</div>
            <div className="text-sm text-gray-900">{to}</div>
          </div>
          
          <div className="flex items-center space-x-reverse space-x-3">
            <button className="text-sm text-red-500 hover:text-red-700 hover:underline">حذف</button>
          </div>
        </div>
      </CenteredBox>
    </Modal>
  );
}