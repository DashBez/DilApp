import { supabase } from './supabase';
import type { Vocabulary } from './types';

// Получить все слова Урока 1
export async function getVocabulary(): Promise<Vocabulary[]> {
  const { data, error } = await supabase
      .from('vocabulary')
          .select('id, word_original, word_phonetic, word_translation')
              .order('created_at', { ascending: true });

                if (error) throw error;
                  return data ?? [];
                  }
                  