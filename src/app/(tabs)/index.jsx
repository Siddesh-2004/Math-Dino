import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProblemCard from '../../components/ProblemCard';
import Arena from '../../components/Arena';
import Keypad from '../../components/Keypad';
import JumpButton from '../../components/JumpButton';
import SettingsSheet, { PRESETS } from '../../components/SettingsSheet';
import { C } from '../../theme';
import { makeProblem } from '../../game/problem';
import { useGameLoop } from '../../game/useGameLoop';
import { hits } from '../../game/collision';
import { DINO_LEFT, CACTUS_W, JUMP_H, JUMP_DUR, JUMP_BOOST } from '../../game/constants';
import { timeFor } from '../../game/difficulty';

const clean = ([lo, hi]) => {
  const a = Math.min(999, Math.max(1, parseInt(lo, 10) || 1));
  const b = Math.min(999, Math.max(1, parseInt(hi, 10) || 1));
  return a <= b ? [a, b] : [b, a];
};

export default function GameScreen() {
  const [settings, setSettings] = useState({ n1: [1, 10], n2: [1, 10], difficulty: 'medium' });
  const [problem, setProblem] = useState(() => makeProblem(settings.n1, settings.n2));
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState('ready'); // 'ready' | 'playing' | 'over'
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [cactusPos, setCactusPos] = useState(1); // drawing only
  const [dinoY, setDinoY] = useState(0);         // drawing only
  const posRef = useRef(1);        // loop's source of truth
  const jumpT = useRef(null);      // seconds into the jump, null = on ground
  const passedRef = useRef(false); // current cactus already scored?
  const arenaW = useRef(0);

  const onKey = (k) => {
    if (k === 'CLR') setValue('');
    else if (k === 'DEL') setValue(v => v.slice(0, -1));
    else setValue(v => (v.length < 6 ? v + k : v));
  };

  const startGame = () => {
    const n1 = clean(settings.n1);
    const n2 = clean(settings.n2);
    setSettings(st => ({ ...st, n1, n2 }));
    setScore(0);
    setValue('');
    setProblem(makeProblem(n1, n2));
    posRef.current = 1;
    jumpT.current = null;
    passedRef.current = false;
    setCactusPos(1);
    setDinoY(0);
    setPhase('playing');
  };

  const endGame = () => {
    setBest(b => Math.max(b, score));
    setPhase('over');
  };

  const jump = () => {
    if (phase !== 'playing' || jumpT.current !== null) return;
    if (value !== problem.answer) return;
    jumpT.current = 0;
  };

  useGameLoop((dt) => {
    const upper = Math.min(parseInt(settings.n1[1], 10) || 1, parseInt(settings.n2[1], 10) || 1);
    const secs = timeFor(PRESETS[settings.difficulty], score, upper);

    // jump arc: parabola, 0 -> JUMP_H -> 0
    let y = 0;
    if (jumpT.current !== null) {
      jumpT.current += dt;
      if (jumpT.current >= JUMP_DUR) jumpT.current = null;
      else {
        const t = jumpT.current / JUMP_DUR;
        y = 4 * JUMP_H * t * (1 - t);
      }
    }
    setDinoY(y);

    // cactus (faster while the dino is in the air)
    const boost = jumpT.current !== null ? JUMP_BOOST : 1;
    posRef.current -= (dt * boost) / secs;
    if (hits(posRef.current, arenaW.current, y)) return endGame();

    // cactus fully past the dino -> score + next problem
    if (!passedRef.current && posRef.current * arenaW.current + CACTUS_W < DINO_LEFT) {
      passedRef.current = true;
      setScore(sc => sc + 1);
      setValue('');
      setProblem(makeProblem(settings.n1, settings.n2));
    }

    // off-screen -> respawn
    if (posRef.current < -0.15) {
      posRef.current = 1;
      passedRef.current = false;
    }
    setCactusPos(posRef.current);
  }, phase === 'playing');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.root}>
      <ProblemCard a={problem.a} b={problem.b} answer={value} />
      <View style={s.arenaWrap}>
        <Arena
          score={score}
          hiScore={best}
          cactusPos={cactusPos}
          dinoY={dinoY}
          onLayoutWidth={w => (arenaW.current = w)}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Keypad onKey={onKey} />
        <JumpButton ready={value === problem.answer && dinoY === 0} onPress={jump} />
      </View>
      <SettingsSheet
        visible={phase !== 'playing'}
        isOver={phase === 'over'}
        value={settings}
        onChange={setSettings}
        best={best}
        score={score}
        onStart={startGame}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.surface, paddingHorizontal: 12, paddingBottom: 8 },
  arenaWrap: { flex: 1, marginVertical: 12, justifyContent: 'flex-end' },
});