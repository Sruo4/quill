import { useSearchParams, useRouter } from 'next/navigation';
import { trpc } from '../_trpc/client';

const Page = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    // React Query在v5中删除了useQuery上的回掉，使用其他方法来处理
    const {data, isLoading, isSuccess} = trpc.authCallback.useQuery();

    if (isSuccess) {
        // user is authenticated
        router.push(origin ? `/${origin}` : '/dashboard');
    }
};

export default Page;
