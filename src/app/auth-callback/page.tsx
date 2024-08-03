"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  // React Query在v5中删除了useQuery上的回掉，使用其他方法来处理
  const { data, isLoading, isSuccess, isError, error } =
    trpc.authCallback.useQuery();

  // 使用useEffect来处理路由跳转
  useEffect(() => {
    if (isSuccess) {
      // user is authenticated
      router.push(origin ? `/${origin}` : "/dashboard");
    }

    if (isError) {
      // 确认错误的结构并检查错误代码
      const errorCode = error?.data?.code;

      if (errorCode === "UNAUTHORIZED") {
        // 处理未授权的错误情况
        router.push("/sign-in");
      }
    }
  }, [isSuccess, isError, error, router, origin]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
