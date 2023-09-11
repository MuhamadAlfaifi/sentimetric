import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { FileText } from 'react-feather';

export default async function UserPage({ params }: { params: { tweep: string } }) {
  return (
    <div>
      <Link 
        href={`/u/${params.tweep}/tweets`}
        as={NextLink}
      >
        <span>عرض البيانات</span>
        <FileText className="mr-2" />
      </Link>
    </div>
  );
}