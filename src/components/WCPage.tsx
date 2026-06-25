import { useState, useEffect } from "react";
import { G } from "@/lib/theme"; // Assuming G is imported for styling
import { WC_FIXTURES, WC_DAYS, WC_GROUPS, WC_OUTRIGHTS } from "@/lib/data";
import { Dot, Chip, Card, Card2, SBtn, PBar } from "@/components/ui-primitives";

interface WCPageProps { onUpgrade: () => void; }

export function WCPage({ onUpgrade }: WCPageProps) {
  const [tab, setTab] = useState("fixtures");
  const [gf, setGf] = useState("ALL");
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetch('/api/football/fixtures')
      .then((res) => res.json())
      .then((data) => {
        setFixtures(data.fixtures || []);
      })
      .catch((error) => {
        console.error('Error fetching fixtures:', error);
        setFixtures([]); // fallback to empty on error
      });
  }, []);

  const filtered = gf === "ALL" ? fixtures : fixtures.filter((f) => f.group === gf);

  return (
    <div style={{ padding: "28px 24px", maxWidth: 1060 }}>
      <div style={{
        background: "linear-
