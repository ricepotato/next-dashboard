import { getParam } from "@/app/lib/params";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getMyIp() {
  try {
    const apiUrl = "https://api.myip.com";
    const res = await fetch(apiUrl);
    return await res.json();
  } catch (e: any) {
    console.error(`[about] getMyIp error : ${e} ${e?.stack} ${e?.cause}`);
    return undefined;
  }
}

export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen p-6 bg-yellow-200 text-center">
      <h2 className="text-2xl text-brown-700">About Page</h2>
      <Suspense fallback={<>Loadding...</>}>
        <IPComponent />
      </Suspense>
      <Suspense fallback={<>Loadding...</>}>
        <ParamComponent />
      </Suspense>
    </main>
  );
}

async function IPComponent() {
  const data = await getMyIp();
  return (
    <section className="border-2 border-brown-500 p-4 rounded shadow-lg mt-2">
      {data ? (
        <>
          <p className="text-xl text-brown-500">Server IP : {data?.ip}</p>
          <p className="text-xl text-brown-500">
            Server country : {data?.country}
          </p>
        </>
      ) : (
        <p className="text-xl text-brown-500">Somethings Wrong!</p>
      )}
    </section>
  );
}

async function ParamComponent() {
  const paramName = "/lovely/sk";
  const param = await getParam(paramName);
  return (
    <section className="border-2 border-brown-500 p-4 rounded shadow-lg mt-5">
      <p className="text-xl text-brown-500">Name : {param?.Name}</p>
      <p className="text-xl text-brown-500">Value : {param?.Value}</p>
      <p className="text-xl text-brown-500">Version : {param?.Version}</p>
    </section>
  );
}
