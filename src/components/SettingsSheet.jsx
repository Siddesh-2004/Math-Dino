import React from 'react';
import {
  Modal, View, Text, TextInput, Pressable, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChunkyButton from './ChunkyButton';
import { C } from '../theme';

export const PRESETS = {
  easy:   { range: [1, 5],  secs: 5.0, desc: 'Easy: single digits (1–5) with relaxed 5.0s timer.', color: C.gold },
  medium: { range: [1, 10], secs: 3.0, desc: 'Medium: standard 1–10 times tables with 3.0s countdown.', color: C.cyan },
  hard:   { range: [6, 15], secs: 1.8, desc: 'Hard: large factors up to 15 with rapid 1.8s timer!', color: C.primary },
};

function RangeBox({ title, range, onChange }) {
  return (
    <View style={s.box}>
      <Text style={s.boxTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {['Start (Min)', 'End (Max)'].map((label, i) => (
          <View key={label} style={{ flex: 1 }}>
            <Text style={s.label}>{label}</Text>
            <TextInput
              style={s.input}
              keyboardType="number-pad"
              maxLength={3}
              value={String(range[i])}
              onChangeText={t => {
                const r = [...range];
                r[i] = t.replace(/\D/g, '');
                onChange(r);
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function SettingsSheet({ visible, value, onChange, best, score, isOver, onStart }) {
  const pick = (d) => onChange({ n1: PRESETS[d].range, n2: PRESETS[d].range, difficulty: d });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
      <KeyboardAvoidingView
        style={s.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={s.panel}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={s.header}>
              <Text style={s.h1}>{isOver ? 'Game Over' : 'Game Settings'}</Text>
              <Text style={s.h2}>{isOver ? 'Tweak your settings and go again' : 'Customize your math run'}</Text>
            </View>

            <View style={s.stats}>
              {isOver && (
                <View style={s.stat}>
                  <Text style={s.statLabel}>SCORE</Text>
                  <Text style={s.statValue}>{score}</Text>
                </View>
              )}
              <View style={s.stat}>
                <Text style={s.statLabel}>BEST</Text>
                <Text style={s.statValue}>{best}</Text>
              </View>
            </View>

            <View style={{ padding: 20, gap: 16 }}>
              <RangeBox title="NUMBER ONE RANGE" range={value.n1} onChange={n1 => onChange({ ...value, n1 })} />
              <RangeBox title="NUMBER TWO RANGE" range={value.n2} onChange={n2 => onChange({ ...value, n2 })} />

              <Text style={s.boxTitle}>GAME MODE / DIFFICULTY</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {Object.keys(PRESETS).map(d => {
                  const active = value.difficulty === d;
                  return (
                    <Pressable
                      key={d}
                      onPress={() => pick(d)}
                      style={[s.pill, active && { borderColor: PRESETS[d].color, backgroundColor: PRESETS[d].color + '1A' }]}
                    >
                      <Text style={[s.pillMain, active && { color: PRESETS[d].color }]}>
                        {d[0].toUpperCase() + d.slice(1)}
                      </Text>
                      <Text style={s.pillSub}>{PRESETS[d].secs.toFixed(1)}s</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={s.desc}>{PRESETS[value.difficulty].desc}</Text>
            </View>

            <View style={{ padding: 20 }}>
              <ChunkyButton onPress={onStart} bg={C.ink} border={C.ink} depth={C.inkShadow} style={{ paddingVertical: 14 }}>
                <Text style={s.apply}>{isOver ? 'PLAY AGAIN' : 'START GAME'}</Text>
              </ChunkyButton>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(50,46,62,0.4)', justifyContent: 'flex-end' },
  panel: { backgroundColor: C.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '90%' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: C.highest },
  h1: { fontWeight: '900', fontSize: 20, color: C.text },
  h2: { fontWeight: '600', fontSize: 11, color: C.textVar },
  stats: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingTop: 16 },
  stat: { flex: 1, backgroundColor: C.low, borderRadius: 16, borderWidth: 1, borderColor: C.highest, paddingVertical: 10, alignItems: 'center' },
  statLabel: { fontWeight: '700', fontSize: 10, color: C.textVar, letterSpacing: 1 },
  statValue: { fontWeight: '900', fontSize: 28, color: C.text },
  box: { backgroundColor: C.low, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.highest },
  boxTitle: { fontWeight: '700', fontSize: 12, color: C.text, letterSpacing: 1, marginBottom: 8 },
  label: { fontWeight: '700', fontSize: 10, color: C.textVar, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderWidth: 2, borderColor: C.highest, borderRadius: 12, paddingVertical: 8, textAlign: 'center', fontSize: 16, fontWeight: '900', color: C.text },
  pill: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 16, borderWidth: 2, borderColor: C.highest, backgroundColor: '#fff' },
  pillMain: { fontWeight: '900', fontSize: 14, color: C.text },
  pillSub: { fontSize: 9, color: C.textVar, fontWeight: '500', marginTop: 2 },
  desc: { fontSize: 10, color: C.textVar, fontWeight: '500' },
  apply: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
});