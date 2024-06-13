import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ visible, message, isSuccess }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const backgroundColor = isSuccess ? '#2ecc71' : '#e74c3c';
  const iconColor = isSuccess ? '#fff' : '#000';
  const icon = isSuccess ? '✅' : '❌';

  return (
    <Animated.View style={[styles.container, { opacity: animation, backgroundColor }]}>
      <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Toast;
