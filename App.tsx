import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './lib/supabase';

export default function App() {
  const [status, setStatus] = useState('Проверяю подключение к Supabase...');

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => {
        setStatus(error ? `Ошибка: ${error.message}` : 'Supabase подключён ✅');
      })
      .catch((e) => setStatus(`Ошибка сети: ${String(e)}`));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DilApp</Text>
      <Text>{status}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#C0522A',
  },
});
