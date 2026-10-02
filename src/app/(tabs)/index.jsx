import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProblemCard from '../../components/ProblemCard';
import Arena from '../../components/Arena';
import Keypad from '../../components/Keypad';
import JumpButton from '../../components/JumpButton';
import SettingsSheet, { PRESETS } from '../../components/SettingsSheet';
import {C} from "../../theme.js"
// UI-only: the problem is hardcoded. Game logic comes in the next step.
const A = 7, B = 8, ANSWER = '56';

export default function GameScreen() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({ n1: [1, 10], n2: [1, 10], difficulty: 'medium' });

  const onKey = (k) => {
    if (k === 'CLR') setValue('');
    else if (k === 'DEL') setValue(v => v.slice(0, -1));
    else setValue(v => (v.length < 3 ? v + k : v));
  };

  return (
    <SafeAreaView edges={['top','bottom']} style={s.root}>
      <ProblemCard a={A} b={B} answer={value} timeFill={0.72}
        timeLabel={`${PRESETS[settings.difficulty].secs.toFixed(1)}s`} onOpenSettings={() => setOpen(true)} />
      <View style={s.arenaWrap}><Arena score={1295} hiScore={420} /></View>
      <View style={{ gap: 10 }}>
        <Keypad onKey={onKey} />
        <JumpButton ready={value === ANSWER} onPress={() => {}} />
      </View>
      <SettingsSheet visible={open} value={settings} onChange={setSettings} onClose={() => setOpen(false)} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.surface, paddingHorizontal: 12, paddingBottom: 8 },
  arenaWrap: { flex: 1, marginVertical: 12, justifyContent: 'flex-end' },
});