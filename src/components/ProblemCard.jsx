import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function ProblemCard({ a, b, answer }) {
  const twoRows = answer.length > 3;

  const slot = (
    <View style={[s.slot, twoRows ? s.slotWide : s.slotInline]}>
      <Text style={s.slotText} numberOfLines={1} adjustsFontSizeToFit>{answer || '__'}</Text>
    </View>
  );

  return (
    <View style={s.card}>
      <View style={s.formula}>
        <Text style={s.num} numberOfLines={1} adjustsFontSizeToFit>{a}</Text>
        <Text style={s.op}>×</Text>
        <Text style={s.num} numberOfLines={1} adjustsFontSizeToFit>{b}</Text>
        {!twoRows && <Text style={s.op}>=</Text>}
        {!twoRows && slot}
      </View>
      {twoRows && slot}
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 24, padding: 10, borderWidth: 2, borderColor: C.highest, borderBottomWidth: 6, borderBottomColor: C.shadow },
  formula: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: C.low, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 12, borderWidth: 1, borderColor: C.highest },
  num: { fontWeight: '900', fontSize: 44, color: C.text, flexShrink: 1 },
  op: { fontWeight: '900', fontSize: 36, color: C.primary },
  slot: { height: 64, backgroundColor: '#fff', borderRadius: 16, borderWidth: 3, borderColor: C.cyan, borderBottomWidth: 6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  slotInline: { minWidth: 110 },
  slotWide: { width: '100%', marginTop: 12 },
  slotText: { fontWeight: '900', fontSize: 40, color: C.cyan, letterSpacing: 2 },
});