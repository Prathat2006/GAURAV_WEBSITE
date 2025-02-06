import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';

const getRandomRotation = () => Math.random() * 10 - 5;
const getRandomColor = () => {
  const colors = ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FFF0F5', '#FFB6C1'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const NoteCard = ({ note }) => (
  <div 
    className="w-64 h-64 p-6 m-4 shadow-lg transform transition-all duration-300 hover:scale-105"
    style={{
      backgroundColor: note.color,
      transform: `rotate(${note.rotation}deg)`,
    }}
  >
    <div className="h-full flex flex-col items-center justify-between">
      <div className="text-center">
        <p className="font-bold text-lg mb-2">{note.fromName}</p>
        {note.toName && (
          <p className="text-sm mb-2">To: {note.toName}</p>
        )}
        <p className="italic text-sm">{note.message}</p>
      </div>
      <Heart className="text-red-500" size={24} />
    </div>
  </div>
);

const AddNoteForm = ({ onAdd, onClose }) => {
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      fromName,
      toName,
      message,
      color: getRandomColor(),
      rotation: getRandomRotation(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Add Your Love Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To (Optional)</label>
            <input
              type="text"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded h-24"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoveNotesWall = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([
    {
      fromName: "Alex",
      toName: "Sarah",
      message: "Every day with you is Valentine's Day ❤️",
      color: getRandomColor(),
      rotation: getRandomRotation(),
    },
    {
      fromName: "Jamie",
      message: "Spreading love to everyone!",
      color: getRandomColor(),
      rotation: getRandomRotation(),
    },
    {
      fromName: "Chris",
      toName: "Pat",
      message: "You make my heart skip a beat 💕",
      color: getRandomColor(),
      rotation: getRandomRotation(),
    }
  ]);

  const addNote = (newNote) => {
    setNotes(prevNotes => {
      // Try to place the note near other notes from the same person
      const relatedNoteIndex = prevNotes.findIndex(note => 
        note.fromName === newNote.fromName || note.toName === newNote.toName
      );
      
      if (relatedNoteIndex !== -1) {
        const newNotes = [...prevNotes];
        newNotes.splice(relatedNoteIndex + 1, 0, newNote);
        return newNotes;
      }
      
      return [...prevNotes, newNote];
    });
  };

  return (
    <div className="min-h-screen bg-red-50">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
          Wall of Love 💕
        </h1>
        
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 bg-pink-600 text-white rounded-full p-4 shadow-lg hover:bg-pink-700 transition-colors"
        >
          <Plus size={24} />
        </button>

        <div className="overflow-x-auto">
          <div className="flex flex-wrap justify-center min-w-max p-4">
            {notes.map((note, index) => (
              <NoteCard key={index} note={note} />
            ))}
          </div>
        </div>

        {showForm && (
          <AddNoteForm 
            onAdd={addNote} 
            onClose={() => setShowForm(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default LoveNotesWall;