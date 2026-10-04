import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProblemCard from '../../components/ProblemCard';
import Arena from '../../components/Arena';
import Keypad from '../../components/Keypad';
import JumpButton from '../../components/JumpButton';
import SettingsSheet from '../../components/SettingsSheet';
import { C } from '../../theme';
import { makeProblem } from '../../game/problem';
import { usePersisted } from '../../game/usePersisted';
export default function GameScreen() {



  const [score, setScore] = useState(0);
  const [settings, setSettings] = usePersisted('settings', { n1: [10, 100], n2: [10, 100], difficulty: 'easy' });
  const [best, setBest] = usePersisted('best', 0);
  const [problem, setProblem] = useState(() => makeProblem(settings.n1, settings.n2));
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState('ready'); // 'ready' | 'playing' | 'over'


  const onKey = (k) => {
    if (k === 'CLR') setValue('');
    else if (k === 'DEL') setValue(v => v.slice(0, -1));
    else setValue(v => (v.length < 6 ? v + k : v));
  };

  const startGame = () => {
    setScore(0);
    setValue('');
    setProblem(makeProblem(settings.n1, settings.n2));
    setPhase('playing');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.root}>
      <ProblemCard a={problem.a} b={problem.b} answer={value} />
      <View style={s.arenaWrap}>
        <Arena score={score} hiScore={best} />
      </View>
      <View style={{ gap: 10 }}>
        <Keypad onKey={onKey} />
        <JumpButton ready={value === problem.answer} onPress={() => { }} />
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
})