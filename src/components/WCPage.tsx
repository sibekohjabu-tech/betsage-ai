import { useState, useEffect } from "react";
const [fixtures, setFixtures] = useState([]);

useEffect(() => {
  fetch('/api/football/fixtures')
    .then((res) => res.json())
    .then((data) => {
      setFixtures(data.fixtures || []);
