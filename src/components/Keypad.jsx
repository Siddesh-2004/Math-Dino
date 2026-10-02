import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChunkyButton from './ChunkyButton';
import { C } from '../theme';

const ROWS = [['1','2','3'],['4','5','6'],['7','8','9'],['DEL','0','CLR']];

export default function Keypad({ onKey }) {
  return (
    <View style={s.grid}>
      {ROWS.map((row, i) => (
        <View key={i} style={s.row}>
          {row.map(k => {
            const bg = k === 'CLR' ? C.primaryFixed : k === 'DEL' ? C.high : C.card;
            const border = k === 'CLR' ? C.outlineVar : C.highest;
            const depth = k === 'CLR' ? C.outlineVar : C.shadow;
            return (
              <ChunkyButton key={k} onPress={() => onKey(k)} bg={bg} border={border} depth={depth} style={s.key}>
                {k === 'DEL' ? <MaterialIcons name="backspace" size={26} color={C.textVar} />
                  : <Text style={[s.keyText, k === 'CLR' && s.clr]}>{k === 'CLR' ? 'CLEAR' : k}</Text>}
              </ChunkyButton>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  grid: { width: '100%', maxWidth: 384, alignSelf: 'center', gap: 6 },
  row: { flexDirection: 'row', gap: 8 },
  key: { flex: 1, height: 56 },
  keyText: { fontWeight: '900', fontSize: 26, color: C.text },
  clr: { fontSize: 13, color: C.primary, letterSpacing: 1 },
});