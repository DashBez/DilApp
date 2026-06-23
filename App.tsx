import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getVocabulary } from './lib/db';
import type { Vocabulary } from './lib/types';

export default function App() {
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [status, setStatus] = useState('Загружаю слова...');

  useEffect(() => {
    getVocabulary()
      .then((data) => {
        setWords(data);
        setStatus(data.length ? '' : 'Слова не найдены');
      })
      .catch((e) => setStatus(`Ошибка: ${e.message}`));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DilApp — Урок 1: Сәламләшү</Text>
      {status ? <Text style={styles.status}>{status}</Text> : null}
      <FlatList
        style={styles.list}
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.word}>{item.word_original}</Text>
            <Text style={styles.phonetic}>{item.word_phonetic}</Text>
            <Text style={styles.translation}>{item.word_translation}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F0E8', paddingTop: 60, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#C0522A', marginBottom: 12, textAlign: 'center' },
  status: { textAlign: 'center', marginBottom: 8 },
  list: { flex: 1 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 },
  word: { fontSize: 18, fontWeight: '600', color: '#1a1a1a' },
  phonetic: { fontSize: 14, color: '#D4A017', marginTop: 2 },
  translation: { fontSize: 15, color: '#555', marginTop: 4 },
});