import { StyleSheet, View, Text } from 'react-native';

export default function search() {
  return (
    <View style={styles.container}>
      <Text>Serch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
