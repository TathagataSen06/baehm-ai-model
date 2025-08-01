# BAEHM - Bio-Acoustic Ecosystem Health Monitor

A React-based web application that simulates bio-acoustic ecosystem health monitoring using TensorFlow.js and THREE.js for visualization.

## Features

- **Audio Analysis**: Upload audio files or simulate recordings for ecosystem health analysis
- **AI Integration**: Uses TensorFlow.js Speech Commands model for sound classification
- **3D Visualization**: Interactive THREE.js background with audio-reactive elements
- **Health Scoring**: Calculates ecosystem health scores based on bio-acoustic indicators
- **Trend Analysis**: Tracks historical data and shows health trends
- **Spectrogram Visualization**: Real-time frequency band visualization

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## Usage

1. **Upload Audio**: Click "Upload Audio File" to select an audio file
2. **Simulate Recording**: Click "Start Recording" to simulate a live recording
3. **Add Notes**: Optionally add environmental notes
4. **Analyze**: Click "Start Analysis" to process the audio
5. **View Results**: See the ecosystem health score and detailed breakdown

## Technical Details

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom 3D effects
- **3D Graphics**: THREE.js for interactive background
- **AI**: TensorFlow.js Speech Commands model
- **Audio Processing**: Simulated spectrogram generation

## Note

This is a demonstration application. The audio analysis is simulated for educational purposes. In a real implementation, you would:

- Process actual audio files
- Use trained models for bio-acoustic classification
- Implement real-time audio capture
- Connect to environmental databases

## Dependencies

- React 18
- TensorFlow.js
- THREE.js
- Tailwind CSS
- Speech Commands model (loaded via CDN) 