import logger from "../lib/logger";

export default function Page() {
  const e = new Error("Test Error Page");
  try {
    throw e;
  } catch (e) {
    logger.error(`test errror page`, e);
    throw e;
  }
  return <main className="flex min-h-screen flex-col p-6">Hello!</main>;
}
