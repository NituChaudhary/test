import { useState } from 'react';

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C', '⌫'
];

export default function App() {
  const [display, setDisplay] = useState('0');

  const evaluateExpression = () => {
    try {
      const sanitized = display.replace(/[^-+*/.\d() ]/g, '');
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (Number.isFinite(result)) {
        setDisplay(String(result));
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleClick = (value) => {
    if (value === 'C') {
      setDisplay('0');
      return;
    }

    if (value === '⌫') {
      setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
      return;
    }

    if (value === '=') {
      evaluateExpression();
      return;
    }

    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') {
        return value;
      }
      return prev + value;
    });
  };

  return (
    <main className="page">
      <section className="calculator" aria-label="Simple calculator">
        <h1>Calculator</h1>
        <output className="display">{display}</output>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => handleClick(btn)}
              className={btn === '=' ? 'equals' : ''}
            >
              {btn}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
