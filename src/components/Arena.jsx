import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Rect, G } from 'react-native-svg';
import { C } from '../theme';
import { DINO_LEFT } from '../game/constants';

const GROUND = 24;

function Dino() {
  return (
    <Svg width={48} height={56} viewBox="0 0 44 47" fill={C.pixel}>
      <Path d="M22 0h19v2H22zM21 2h21v2H21zM21 4h22v2H21zM21 6h23v4H21zM21 10h12v2H21zM21 12h14v2H21zM21 14h20v2H21z" />
      <Rect x={25} y={4} width={2} height={2} fill={C.arena} />
      <Path d="M20 16h11v2H20zM19 18h11v2H19zM18 20h11v2H18zM17 22h11v2H17zM16 24h12v2H16zM15 26h13v2H15zM14 28h14v2H14zM13 30h14v2H13zM12 32h14v2H12zM11 34h15v2H11z" />
      <Path d="M10 20h7v2H10zM8 22h8v2H8zM6 24h9v2H6zM4 26h10v2H4zM2 28h11v2H2zM0 30h12v2H0zM0 32h11v2H0z" />
      <Path d="M31 18h4v2h-4zM34 20h2v2h-2z" />
      <G>
        <Rect x={14} y={36} width={3} height={7} /><Rect x={14} y={43} width={5} height={2} />
        <Rect x={21} y={36} width={3} height={4} /><Rect x={23} y={40} width={3} height={2} />
      </G>
    </Svg>
  );
}

function Cactus() {
  return (
    <Svg width={32} height={48} viewBox="0 0 25 35" fill={C.pixel}>
      <Rect x={10} y={0} width={5} height={35} /><Rect x={2} y={8} width={4} height={14} />
      <Rect x={6} y={18} width={4} height={4} /><Rect x={19} y={12} width={4} height={12} />
      <Rect x={15} y={20} width={4} height={4} />
    </Svg>
  );
}

function Cloud({ top, left, opacity }) {
  return (
    <Svg style={{ position: 'absolute', top, left, opacity }} width={56} height={20} viewBox="0 0 46 14" fill="#757575">
      <Path d="M18 0h14v2H18zM14 2h22v2H14zM8 4h32v2H8zM4 6h38v2H4zM2 8h42v4H2zM0 10h46v2H0zM4 12h38v2H4z" />
    </Svg>
  );
}

export default function Arena({ score, hiScore, cactusPos = 1, dinoY = 0, onLayoutWidth }) {
  const pad = (n) => String(n).padStart(5, '0');
  return (
    <View style={s.arena} onLayout={e => onLayoutWidth?.(e.nativeEvent.layout.width)}>
      <Text style={s.score}>
        <Text style={{ opacity: 0.55 }}>HI {pad(hiScore)}  </Text>{pad(score)}
      </Text>
      <Cloud top={16} left={40} opacity={0.5} />
      <Cloud top={48} left={190} opacity={0.4} />
     <View style={[s.abs, { left: DINO_LEFT, bottom: GROUND - 3 + dinoY }]}><Dino /></View>
      <View style={[s.abs, { left: `${cactusPos * 100}%`, bottom: GROUND - 3 }]}><Cactus /></View>
      <View style={s.ground} />
    </View>
  );
}

const s = StyleSheet.create({
  arena: { flex: 1, minHeight: 190, maxHeight: 280, backgroundColor: C.arena, borderRadius: 24, borderWidth: 2, borderColor: C.shadow, borderBottomWidth: 4, overflow: 'hidden', justifyContent: 'flex-end' },
  abs: { position: 'absolute' },
  score: { position: 'absolute', top: 12, right: 16, fontSize: 12, letterSpacing: 1, color: C.pixel, fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }), fontWeight: '700' },
  ground: { height: GROUND, borderTopWidth: 2, borderTopColor: C.pixel },
});