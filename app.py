# app.py
from flask import Flask, jsonify, request, send_from_directory
import json
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Store notes in a JSON file
NOTES_FILE = 'notes.json'

def load_notes():
    try:
        with open(NOTES_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_notes(notes):
    with open(NOTES_FILE, 'w') as f:
        json.dump(notes, f)
        

# Initial notes
initial_notes = [
    {
        "fromName": "Alex",
        "toName": "Sarah",
        "message": "Every day with you is Valentine's Day ❤️",
        "color": "#FFB6C1",
        "rotation": -2.5
    },
    {
        "fromName": "Jamie",
        "message": "Spreading love to everyone!",
        "color": "#FFC0CB",
        "rotation": 3.2
    },
    {
        "fromName": "Chris",
        "toName": "Pat",
        "message": "You make my heart skip a beat 💕",
        "color": "#FFE4E1",
        "rotation": 1.8
    }
]

# Initialize notes if file doesn't exist or is empty
try:
    notes = load_notes()
    if not notes:
        save_notes(initial_notes)
except Exception as e:
    print(f"Error initializing notes: {e}")
    save_notes(initial_notes)

@app.route('/')
def serve_static():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def serve_css():
    return send_from_directory('.', 'style.css')
@app.route('/hi.png')
def serve_image():
    return send_from_directory('.', 'hi.png')

@app.route('/notes.json')
def serve_notes():
    return send_from_directory('.', 'notes.json')

@app.route('/api/notes', methods=['GET'])
def get_notes():
    notes = load_notes()
    print(f"Loaded {len(notes)} notes")  # Debug print
    return jsonify(notes)

@app.route('/api/notes', methods=['POST'])
def add_note():
    note = request.json
    notes = load_notes()
    notes.append(note)
    save_notes(notes)
    print(f"Added note. Total notes: {len(notes)}")  # Debug print
    return jsonify(note), 201

if __name__ == '__main__':
    app.run(debug=True)
