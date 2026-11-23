import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { DistortionWave } from "distortion-waves";
import alfaBadge from "./assets/alfa-badge.svg";
import "./styles.css";
import "./figma-overrides.css";

// Timing is in seconds; the lens, displacement and blur are measured in pixels.
const transferWaveStyle = {
  anticipation: 0.9,
  pull: 17,
  gatherGlow: 0.33,
  travel: 1.55,
  amplitude: 28,
  lensWidth: 125,
  aberration: 0.68,
  blur: 13,
  blurAhead: 68,
  blurBehind: 135,
  lead: 90,
  tail: 165,
  rimWidth: 7,
  rimStrength: 0.76,
  linger: 0.03,
  rimFade: 1.65 / 0.85,
  hairlineLinger: 0.18,
  hairlineFade: 1.9 / 0.85,
  particleCount: 0,
};

const details = [
  ["Сумма", "67\u202f₽"],
  ["Комиссия", "0\u202f₽"],
  ["Получатель", "Илья Тарасович Бахмутов"],
  ["Номер", "79034114967"],
  ["Банк получателя", "Альфа-Банк"],
  ["Счёт списания", "Текущий счёт · 6787"],
];

function Review() {
  return <section className="phone review" aria-label="Подтверждение перевода">
    <h1>Подтверждение перевода</h1>
    <div className="details">
      {details.map(([label, value]) => (
        <div className="detail-row" key={label}>
          <dl className="detail-main">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </dl>
        </div>
      ))}
    </div>
  </section>;
}

function ActionFooter({ buttonRef, onClick, disabled, children }) {
  return <footer className="transfer-footer">
    <button ref={buttonRef} type="button" className="transfer" onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  </footer>;
}

function Receipt({ onDone, active }) {
  return <section className="phone receipt" aria-label="Перевод выполнен">
    <div className="receipt-stack">
      <img className="receipt-logo" src={alfaBadge} width="72" height="72" alt="Альфа-Банк" />
      <div className="receipt-panel">
        <div className="receipt-content">
          <header className="receipt-header">
            <h2 className="amount">−67&#8239;₽</h2>
            <div className="receipt-row-title"><span>Без комиссии</span></div>
          </header>
          <div className="receipt-cell">
            <div className="recipient">Илья Тарасович Б.</div>
            <div className="receipt-row-title"><span>В Альфа-Банк на свой счёт по СБП</span></div>
          </div>
        </div>
      </div>
    </div>
    <ActionFooter onClick={onDone} disabled={!active}>Готово</ActionFooter>
  </section>;
}

function TransferDemo() {
  const [sent, setSent] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Перевести");
  const button = useRef(null);
  const wave = useRef(null);
  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setButtonLabel("Готово"), transferWaveStyle.anticipation * 1000);
    return () => window.clearTimeout(timer);
  }, [sent]);
  function resetTransfer() {
    wave.current?.reset();
    setButtonLabel("Перевести");
    setSent(false);
  }
  return <main className="page">
    <DistortionWave
      ref={wave}
      revealed={sent}
      source={button}
      type="vertical"
      palette="colorful"
      waveStyle={transferWaveStyle}
      revealedContent={<Receipt active={sent} onDone={resetTransfer} />}
      overlay={
        <ActionFooter buttonRef={button} onClick={() => setSent(true)} disabled={sent}>{buttonLabel}</ActionFooter>
      }
      cornerRadius={24}
      style={{ width: "100%", maxWidth: 402, borderRadius: 24, overflow: "hidden" }}
    ><Review /></DistortionWave>
  </main>;
}

createRoot(document.getElementById("root")).render(<TransferDemo />);
