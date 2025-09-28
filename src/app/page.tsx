import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="p-5">
        <h1 className="title">Welcome to Thinkathon 👋</h1>
        <div className="flex align-center justify-center">
          <div className="icon">
            <Image src="/thinkathon_icons/thinkathon_icon_web.png" alt="Thinkathon Icon" width={180} height={180} />
          </div>
        </div>
        <p className="subtitle">Pick a Thinkathon olympiad and get started.</p>
        <div className="description">
          <p>
            Thinkathon offers a variety of olympiads to help you test and improve your skills.
            Choose a category, select your class, and begin your journey to excellence!
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/select-class" className="btn primary">
            Start Quiz
          </Link>
        </div>
      </div>
    </>
  );
}
