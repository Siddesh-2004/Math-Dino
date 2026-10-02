import React from 'react';
import { Pressable } from 'react-native';

// Fake "3D" button: thick bottom border that shrinks when pressed.
export default function ChunkyButton({ onPress, bg, border, depth, style, disabled, children, radius = 16 }) {
  return (
    <Pressable onPress={onPress} disabled={disabled}
      style={({ pressed }) => [{
        backgroundColor: bg, borderColor: border, borderWidth: 2, borderRadius: radius,
        borderBottomColor: depth, borderBottomWidth: pressed ? 3 : 6,
        marginTop: pressed ? 3 : 0, alignItems: 'center', justifyContent: 'center',
        opacity: disabled ? 0.45 : 1,
      }, style]}>
      {children}
    </Pressable>
  );
}