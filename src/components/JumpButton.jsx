import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChunkyButton from './ChunkyButton';
import { C } from '../theme';

export default function JumpButton({ ready, onPress }) {
  return (
    <View style={s.wrap}>
      <ChunkyButton onPress={onPress} disabled={!ready} bg={C.ink} border={C.ink} depth={C.inkShadow} radius={999} style={s.btn}>
        <View style={s.inner}>
          <MaterialIcons name="rocket-launch" size={28} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={s.main}>{ready ? 'JUMP READY!' : 'SOLVE EQUATION'}</Text>
            <Text style={s.sub}>{ready ? 'TAP TO LEAP OVER CACTUS' : 'ENTER THE ANSWER TO UNLOCK'}</Text>
          </View>
          <MaterialIcons name="keyboard-double-arrow-up" size={24} color="#fff" />
        </View>
      </ChunkyButton>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { width: '100%', maxWidth: 384, alignSelf: 'center' },
  btn: { width: '100%' },
  inner: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 24 },
  main: { color: '#fff', fontWeight: '900', fontSize: 18, letterSpacing: 0.5 },
  sub: { color: '#d4d4d8', fontWeight: '800', fontSize: 10, letterSpacing: 1.5, marginTop: 2 },
});