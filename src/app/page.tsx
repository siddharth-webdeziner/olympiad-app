import Image from "next/image";
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
      
      {/* <div className="grid sm-2">
      {EXAMS.map((ex) => (
      <div key={ex.id} className="card">
      <div className="cardHeader">
      <span className="pill">{ex.subject}</span>
      <strong>{ex.title}</strong>
      </div>
      <p className="muted">{ex.durationMin} min • Neg: {ex.negative}</p>
      <div className="row">
      <Link href={`/start?id=${ex.id}`} className="btn primary">
      Start
      </Link>
      </div>
      </div>
      ))}
      </div> */}
    </>
  );
}
