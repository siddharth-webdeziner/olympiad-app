import Link from "next/link";

const EXAMS = [
  { id: "math-g8", subject: "Math", title: "Mathematics Olympiad (Grade 8)", durationMin: 30, negative: -0.25 },
  { id: "sci-g8", subject: "Science", title: "Science Olympiad (Grade 8)", durationMin: 25, negative: 0 },
  ];

export default function Home() {
  return (
    <>
      <h1 className="title">Welcome 👋</h1>
      <p className="subtitle">Pick an olympiad and get started.</p>
      
      <div className="center">
        <Link href="/select-class" className="btn primary">
          Start Quiz
        </Link>
      </div>
    </>
  );
}
