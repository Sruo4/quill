import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/auth-callback?origin=dashboard");

    

  return (
    <div>
      email:
      <p>{user && user.email}</p>
    </div>
  );
};

export default Page;
