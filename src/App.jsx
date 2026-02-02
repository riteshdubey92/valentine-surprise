import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import "./App.css";

const GIRLFRIEND_NAME = "Pooja ❤️";

function FloatingHearts() {
  const [hearts] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: 18 + Math.random() * 12,
    }))
  );

  return (
    <div className="hearts">
      {hearts.map((heart, i) => (
        <span
          key={i}
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("question"); // question | error | surprise
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [burst, setBurst] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
  const audio = audioRef.current;
  if (!audio) return;
  audio.muted = false;
  audio.volume = 0.8;
  audio.play().catch(console.error);
};

  // User clicks NO on first screen
  const handleNoClick = () => {
    setStage("error");
  };

  // User confirms YES on error screen
  const handleErrorYes = () => {
    setTimeout(() => {
      setStage("surprise");
      audioRef.current?.play();
    }, 1200); // ⏳ suspense delay
  };

  const handleYesFinal = () => {
    setBurst(true);
    setShowConfetti(true);
    setShowLetter(true);
    setTimeout(() => setBurst(false), 800);
    playMusic();
  };

  return (
    <>
      {/* 🎵 BACKGROUND MUSIC */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* 🎉 CONFETTI */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {/* 💗 HEART BURST */}
      {burst && <HeartBurst />}

      <AnimatePresence mode="wait">
        {/* 🌸 LANDING */}
        {stage === "question" && (
          <motion.div
            key="question"
            className="container landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <FloatingHearts />

            <motion.h1
              initial={{ y: -10 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Will you be my Valentine, {GIRLFRIEND_NAME}? 💘
            </motion.h1>

            <div className="buttons">
              <button className="yes" onClick={handleYesFinal}>
                YES
              </button>
              <button className="no" onClick={handleNoClick}>
                NO
              </button>
            </div>
          </motion.div>
        )}

        {/* ❌ ERROR → DOUBT */}
        {stage === "error" && (
          <motion.div
            key="error"
            className="container error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>❌ ERROR 404</h1>
            <p>Wrong Answer</p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: "20px" }}
            >
              Are you really sure about it? 🤍
            </motion.p>

            <motion.button
              className="yes"
              onClick={handleErrorYes}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              style={{ marginTop: "30px" }}
            >
              YES
            </motion.button>
          </motion.div>
        )}

        {/* 💖 FINAL SURPRISE */}
        {stage === "surprise" && (
          <motion.div
            key="surprise"
            className="container surprise"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FloatingHearts />

            <h1>Hahaha, You can't run away from my love 😄</h1>
            <h2>Will you be my Valentine, {GIRLFRIEND_NAME}? Please 🥲</h2>

            <button className="yes big" onClick={handleYesFinal}>
              YES 💖
            </button>
            <button className="yes big" onClick={handleYesFinal}>
              Definitely, YES 💖
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ LOVE LETTER MODAL */}
      {showLetter && (
        <div className="modal">
          <motion.div
            className="modal-content glass"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>My Love 💌</h2>
            <p>
              From the moment you came into my life, everything felt warmer,
              happier, and more meaningful.  
              Thank you for being my safe place and my biggest smile.  
              I can’t wait to make a lifetime of memories with you ❤️
            </p>
            <button onClick={() => setShowLetter(false)}>Close</button>
          </motion.div>
        </div>
      )}
    </>
  );
}

function HeartBurst() {
  return (
    <div className="burst">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i}>💗</span>
      ))}
    </div>
  );
}



