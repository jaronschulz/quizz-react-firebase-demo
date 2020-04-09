import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase/FirebaseContext";

export default function HighScores() {
  const firebase = useFirebase();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("retrieving data");
    firebase.scores().once("value", (snapshot) => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  }, [firebase]);

  const formatScoreData = (firebaseScores) => {
    const scores = [];

    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;
      scores.push(val);
    }
    return scores.sort((a, b) => b.score - a.score).slice(0, 10);
  };

  return (
    <>
      {loading && <div id="loader"></div>}
      {!loading && (
        <>
          <h1>HighScores</h1>
          <div id="highScoresList">
            {scores.map((record) => (
              <li key={record.key} className="high-score">
                {record.name} : {record.score}
              </li>
            ))}
          </div>
          <Link to="/" className="btn">
            Go Home
          </Link>
        </>
      )}
    </>
  );
}
