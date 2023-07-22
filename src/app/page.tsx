import { SentimentChart } from '@/client-components/area-chart';
import { Card, CardAction, CardActions } from '@/client-components/card';
import { read } from '@/lib/s3';
import Link from 'next/link';
import Numeral from 'numeral';

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

export default async function Home() {
  const data: { name_ar: string, population: number }[] = await read();

  return (
    <main className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {Array(10).fill(0).map((_, i) => 
        <Card key={i} className="bg-white relative border border-gray-200">
          <CardAction as={Link} href={`/u/${367193752397598}`} className="block hover:bg-gray-100">
            <div className="py-4 px-4 space-y-2">
              <h2 className="text-lg font-medium">واس العام</h2>
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
                      <div className="text-sm text-gray-500">الحالة</div>
                      <ProgressBadge status="pending" />
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
