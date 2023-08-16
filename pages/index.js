import Head from "next/head";
import { Pacifico } from "next/font/google";
import YourComponent from "@/components/YourComponent";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Time to Spare - Tech Test</title>
        <meta name="description" content="A tech test for Time to Spare" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-gradient-to-r min-h-screen from-blue-500 to-blue-700 relative">
          <a
            href="https://timetospare.com"
            style={pacifico.style}
            className={`${pacifico.className} font-pacifico text-white text-lg mt-4 ml-4 absolute top-0 left-0`}
          >
            Time to Spare
          </a>
          <div className="max-w-6xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Help us understand this &ldquo;charity&rdquo;
                <br />
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-left text-lg text-blue-100">
                There&apos;s some data in the{" "}
                <code className="bg-gray-700 text-white px-2 py-1 rounded-lg shadow">
                  /data
                </code>{" "}
                folder. We need you to create a React component that displays
                this data in a meaningful way. You can use any libraries you
                like, but we want to see some of your own code. We&apos;re
                looking for a bit of creativity, and some clear understanding of
                how users might want to interact with and understand data.
              </p>
            </div>
            <div className="border-2 border-white rounded-lg overflow-hidden mt-16">
              <YourComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
