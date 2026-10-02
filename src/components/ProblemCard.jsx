import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { C } from '../theme';

export default function ProblemCard({ a, b, answer, timeLabel, timeFill, onOpenSettings }) {
  return (
    <View style={s.card}>
      <View style={s.header}>
        <View style={s.titleRow}>
          <MaterialIcons name="bolt" size={20} color={C.gold} />
          <Text style={s.title} numberOfLines={1}>QUICK! SOLVE TO UNLOCK JUMP!</Text>
        </View>
        {/* <View style={s.timerPill}>
          <MaterialIcons name="timer" size={15} color={C.primary} />
          <Text style={s.timerText}>{timeLabel}</Text>
        </View> */}
        <Pressable onPress={onOpenSettings} style={s.gear} accessibilityLabel="Open settings">
          <MaterialIcons name="settings" size={20} color={C.textVar} />
        </Pressable>
      </View>

      <View style={s.formula}>
        <Text style={s.num}>{a}</Text>
        <Text style={s.op}>×</Text>
        <Text style={s.num}>{b}</Text>
        <Text style={s.op}>=</Text>
        <View style={s.slot}><Text style={s.slotText}>{answer || '__'}</Text></View>4
      </View>

      <View style={s.barTrack}>
        <View style={[s.barFill, { width: `${timeFill * 100}%` }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 24, padding: 16, borderWidth: 2, borderColor: C.highest, borderBottomWidth: 6, borderBottomColor: C.shadow },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  titleRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 8 },
  title: { flexShrink: 1, fontWeight: '900', fontSize: 11, color: C.text, letterSpacing: 1 },
  timerPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: C.low, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: C.high, marginRight: 8 },
  timerText: { fontWeight: '900', fontSize: 13, color: C.primary },
  gear: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.high, borderWidth: 1, borderColor: C.highest, alignItems: 'center', justifyContent: 'center' },
  formula: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: C.low, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 12, borderWidth: 1, borderColor: C.highest },
  num: { fontWeight: '900', fontSize: 40, color: C.text },
  op: { fontWeight: '900', fontSize: 32, color: C.primary },
  slot: { minWidth: 110, height: 56, backgroundColor: '#fff', borderRadius: 16, borderWidth: 3, borderColor: C.cyan, borderBottomWidth: 6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  slotText: { fontWeight: '900', fontSize: 38, color: C.cyan, letterSpacing: 2 },
  barTrack: { height: 10, borderRadius: 999, backgroundColor: C.high, marginTop: 12, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 999, backgroundColor: C.cyan },
});