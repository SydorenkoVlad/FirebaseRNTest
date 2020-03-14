import React from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'

export default function App() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const sendInvitation = (email) => {
    const url = 'https://us-central1-fir-test-286d1.cloudfunctions.net/sendInvite';

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name: 'Vladyslav'
      })
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button title="Send" color="blue" onPress={() => sendInvitation(value)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});