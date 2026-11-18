/**
 * Reproducer: on Android, one Back press with the keyboard open inside a
 * <Modal> closes the keyboard AND calls onRequestClose.
 *
 * 1. Tap "Open modal".
 * 2. Tap the text input so the keyboard opens.
 * 3. Press Back once.
 *
 * Expected: only the keyboard closes (as it does outside a Modal).
 * Actual: the keyboard closes and onRequestClose is called, so the Modal closes.
 *
 * @format
 */

import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

function App() {
  const [visible, setVisible] = useState(false);
  const [requestCloseCount, setRequestCloseCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Modal + TextInput + Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Outside the Modal (for comparison)"
        placeholderTextColor="#666"
        testID="outside-input"
      />
      <Button
        title="Open modal"
        onPress={() => setVisible(true)}
        testID="open-modal"
      />
      <Text style={styles.text} testID="request-close-count">
        onRequestClose calls: {requestCloseCount}
      </Text>

      <Modal
        visible={visible}
        animationType="none"
        onRequestClose={() => {
          console.log('Reproducer: onRequestClose');
          setRequestCloseCount(count => count + 1);
          setVisible(false);
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Inside the Modal</Text>
          <TextInput
            style={styles.input}
            placeholder="Tap here, then press Back once"
            placeholderTextColor="#666"
            testID="modal-input"
          />
          <Text style={styles.text}>
            Expected: the first Back closes only the keyboard. A second Back
            closes the Modal.
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Explicit colors, so the screens read the same with the light and the dark system theme.
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  text: { color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
});

export default App;
