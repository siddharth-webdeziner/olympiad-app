"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const EXAMS = [
  { id: "math-g8", subject: "Math", title: "Mathematics Olympiad (Grade 8)", durationMin: 30, negative: -0.25 },
  { id: "sci-g8", subject: "Science", title: "Science Olympiad (Grade 8)", durationMin: 25, negative: 0 },
];

export default function SelectOlympiad() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedClass = searchParams.get("class");

  return (
    <>
      <div className="header">
        <span className="timer">Timer: 00:00</span>
        <button className="btn exit" onClick={() => router.push("/")}>
          Exit
        </button>
      </div>
      <h1 className="title">Select an Olympiad</h1>
      <p className="subtitle">Class: {selectedClass}</p>
      <div className="grid sm-2">
        {EXAMS.map((ex) => (
          <div key={ex.id} className="card">
            <div className="cardHeader">
              <span className="pill">{ex.subject}</span>
              <strong>{ex.title}</strong>
            </div>
            <p className="muted">{ex.durationMin} min • Neg: {ex.negative}</p>
            <div className="row">
              <Link href={`/start?id=${ex.id}&class=${selectedClass}`} className="btn primary">
                Start
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
