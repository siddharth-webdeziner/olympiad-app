import Link from "next/link";
// import { useRouter } from "next/router";

export default function Start() {
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="card">
      <div className="cardHeader">
        <span className="pill">Exam</span>
        <strong>Olympiad {2}</strong>
      </div>
      <p className="subtitle">Read the instructions carefully.</p>
      <ul>
        <li>Don’t refresh during the exam.</li>
        <li>You can mark questions and return later.</li>
      </ul>
      <div className="row">
        <Link href="/" className="btn ghost">Back</Link>
        <Link href={`/exam?id=${2}`} className="btn primary">Start Exam</Link>
      </div>
    </div>
  );
}
