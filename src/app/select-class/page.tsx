"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

let CLASSES: { label: string, id: number, value: string }[] = [];

export default function SelectClass() {
  const [classes, setClasses] = useState<{ label: string }[]>([]);

  const fetchQuestion = async () => {
    try {
      const response = await fetch("json/classes.json"); // Fetch from the public directory
      if (!response.ok) {
        throw new Error("Failed to fetch UK_Question.json");
      }
      CLASSES = await response.json();
      console.log(CLASSES);
      setClasses(CLASSES);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      <h1 className="title">Select Your Class</h1>
      <div className="grid sm-2">
        {classes.map((cls, index) => (
          <div className="card" key={index}>
            <strong>{cls.label}</strong>
            <div className="row">
              <Link href={`/select-olympiad?class=${cls.label}`} className="btn primary">
                Select
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
