import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

interface Note {
  id: string;
  content: string;
}

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Add or Update Note
  const handleNote = () => {
    if (note.trim().length === 0) {
      Alert.alert('Error', 'Catatan tidak boleh kosong!');
      return;
    }

    if (editingNoteId) {
      // Update existing note
      setNotes(notes.map((item) =>
        item.id === editingNoteId ? { ...item, content: note } : item
      ));
      setEditingNoteId(null); // Reset editing state
    } else {
      // Add new note
      setNotes([...notes, { id: Date.now().toString(), content: note }]);
    }

    setNote('');
  };

  // Delete Note
  const deleteNote = (id: string) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  // Start editing a note
  const startEditing = (id: string) => {
    const noteToEdit = notes.find((item) => item.id === id);
    if (noteToEdit) {
      setEditingNoteId(id);
      setNote(noteToEdit.content);
    }
  };

  return (
    <LinearGradient
      colors={['#004D7F', '#1E6BBF', '#56A3C1']} // Blue gradient background
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catatan Saya</Text>
      </View>

      {/* Input for Adding/Editing Note */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tulis catatan Anda..."
          placeholderTextColor="#999"
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleNote}>
          {/* Display checkmark icon when editing, otherwise display '+' */}
          <MaterialCommunityIcons
            name={editingNoteId ? 'check' : 'plus'}
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, item.id === editingNoteId && styles.editingNoteCard]}>
            <Text style={styles.noteText}>{item.content}</Text>
            <View style={styles.noteActions}>
              <TouchableOpacity onPress={() => startEditing(item.id)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={styles.deleteButton}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            Belum ada catatan. Tambahkan sekarang!
          </Text>
        }
        contentContainerStyle={notes.length === 0 ? styles.centerEmpty : null}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50, // Added padding-top to prevent overlap with status bar on Android
  },
  header: {
    backgroundColor: 'rgba(255, 204, 0, 0.8)',  // Slightly transparent yellow for header background
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Black-grey color for text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#3A7BD5',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editingNoteCard: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  noteText: {
    fontSize: 16,
    color: '#333333',
  },
  noteActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 8,
  },
  deleteButton: {
    color: '#FF5555',
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 32,
  },
  centerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
