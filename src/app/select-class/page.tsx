import Link from "next/link";

const CLASSES = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"];

export default function SelectClass() {
  return (
    <>
      <h1 className="title">Select Your Class</h1>
      <div className="grid sm-2">
        {CLASSES.map((cls) => (
          <div key={cls} className="card">
            <strong>{cls}</strong>
            <div className="row">
              <Link href={`/select-olympiad?class=${cls}`} className="btn primary">
                Select
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
