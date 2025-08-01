import React, { useState, useEffect, useRef } from 'react';

// Mock Lucide React icons for this environment (replace with actual imports if using a build system)
const Upload = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const BarChart2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const Heart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const XCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
const Loader2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const Mic = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>;
const StopCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>;
const TrendingUp = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const TrendingDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>;
const Minus = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const AlertTriangle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>;
const Wifi = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 8.63a16 16 0 0 1 21.16 0"/><path d="M8.53 16.12a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>;
const Lock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;


// Global variable for the loaded TensorFlow.js model and recognizer
let recognizer;
// Updated model paths with fallback options
const MODEL_PATHS = [
  'https://storage.googleapis.com/tfjs-models/tfjs-speech-commands/v0.5/browser_fft/model.json',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.5.4/dist/browser_fft/model.json'
];
const METADATA_PATHS = [
  'https://storage.googleapis.com/tfjs-models/tfjs-speech-commands/v0.5/browser_fft/metadata.json',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.5.4/dist/browser_fft/metadata.json'
];

// Mapping from Speech Commands labels to our BAEHM categories
const LABEL_TO_BAEHM_CATEGORY = {
  '_background_noise_': 'Anthropogenic Noise',
  'yes': 'Bird Diversity',
  'no': 'Anthropogenic Noise',
  'up': 'Bird Diversity',
  'down': 'Anthropogenic Noise',
  'left': 'Insect Activity',
  'right': 'Mammal Presence',
  'on': 'Amphibian Presence',
  'off': 'Wind Noise',
  'stop': 'Anthropogenic Noise',
  'go': 'Water Flow Sounds',
};

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [pastAnalyses, setPastAnalyses] = useState([]);
  const [userNotes, setUserNotes] = useState('');
  const [spectrogramData, setSpectrogramData] = useState(null);
  const [detectedSound, setDetectedSound] = useState(null);
  const [modelLoadingStatus, setModelLoadingStatus] = useState('Loading AI Model...');
  const [dataStreamStatus, setDataStreamStatus] = useState('Idle'); // New state for data stream status
  const [xaiExplanation, setXaiExplanation] = useState(null); // New state for XAI explanation
  const [predictiveTrend, setPredictiveTrend] = useState(null); // New state for predictive trend

  // Refs to pass data to the Three.js animation loop and Spectrogram canvas
  const threeJsContainerRef = useRef(null);
  const spectrogramCanvasRef = useRef(null);
  const currentHealthScoreRef = useRef(0);
  const currentAnalysisResultRef = useRef({});
  const currentSpectrogramDataRef = useRef(null);
  const currentDetectedSoundRef = useRef(null);

  // --- THREE.js setup effect for background ---
  useEffect(() => {
    if (typeof window.THREE === 'undefined') {
      console.error("THREE.js not loaded. Please ensure it's included via a script tag (e.g., from CDN).");
      return;
    }

    let camera, scene, renderer, particles, centralSphere, nodes, nodeLines;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const init = () => {
      scene = new window.THREE.Scene();
      scene.fog = new window.THREE.FogExp2(0x0a0a1a, 0.0008);

      camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;

      const particleGeometry = new window.THREE.BufferGeometry();
      const particleVertices = [];
      const particleCount = 1500;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        particleVertices.push(x, y, z);
      }
      particleGeometry.setAttribute('position', new window.THREE.Float32BufferAttribute(particleVertices, 3));
      const particleMaterial = new window.THREE.PointsMaterial({
        color: 0x4a4a6a, size: 1.5, transparent: true, opacity: 0.5, blending: window.THREE.NormalBlending
      });
      particles = new window.THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const centralSphereGeometry = new window.THREE.SphereGeometry(120, 32, 32);
      const centralSphereMaterial = new window.THREE.MeshPhongMaterial({
        color: 0x2a3a8a, specular: 0x5c6bc0, shininess: 80, transparent: true, opacity: 0.7, flatShading: true
      });
      centralSphere = new window.THREE.Mesh(centralSphereGeometry, centralSphereMaterial);
      centralSphere.position.set(0, 0, -500);
      scene.add(centralSphere);

      nodes = [];
      nodeLines = new window.THREE.Group();
      const nodeCount = 40;
      const nodeRadius = 8;
      const orbitRadius = 350;
      const nodeMaterial = new window.THREE.MeshBasicMaterial({ color: 0x64b5f6 });
      const lineMaterial = new window.THREE.LineBasicMaterial({
        color: 0x64b5f6, transparent: true, opacity: 0.3, linewidth: 1
      });

      const categories = ['Bird Diversity', 'Insect Activity', 'Amphibian Presence', 'Mammal Presence', 'Water Flow Sounds', 'Wind Noise', 'Anthropogenic Noise'];
      for (let i = 0; i < nodeCount; i++) {
        const nodeGeometry = new window.THREE.SphereGeometry(nodeRadius, 16, 16);
        const node = new window.THREE.Mesh(nodeGeometry, nodeMaterial);
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        node.position.x = orbitRadius * Math.sin(theta) * Math.cos(phi);
        node.position.y = orbitRadius * Math.sin(theta) * Math.sin(phi);
        node.position.z = orbitRadius * Math.cos(theta);
        node.userData.originalPosition = node.position.clone();
        node.userData.pulseOffset = Math.random() * Math.PI * 2;
        node.userData.category = categories[i % categories.length];
        nodes.push(node);
        centralSphere.add(node);

        const pointsToCenter = [node.position.clone(), new window.THREE.Vector3(0, 0, 0)];
        const lineToCenterGeometry = new window.THREE.BufferGeometry().setFromPoints(pointsToCenter);
        const lineToCenter = new window.THREE.Line(lineToCenterGeometry, lineMaterial);
        nodeLines.add(lineToCenter);

        if (i > 0 && Math.random() < 0.4) {
          const targetNode = nodes[Math.floor(Math.random() * i)];
          const pointsBetweenNodes = [node.position.clone(), targetNode.position.clone()];
          const lineBetweenNodesGeometry = new window.THREE.BufferGeometry().setFromPoints(pointsBetweenNodes);
          const lineBetweenNodes = new window.THREE.Line(lineBetweenNodesGeometry, lineMaterial);
          nodeLines.add(lineBetweenNodes);
        }
      }
      centralSphere.add(nodeLines);

      const ambientLight = new window.THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      threeJsContainerRef.current.appendChild(renderer.domElement);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      if (camera) {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);
      }

      if (particles && particles.material) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        // Audio-Reactive Particles (based on health score)
        const health = currentHealthScoreRef.current;
        const normalizedHealth = health / 100;
        const particleColor = new window.THREE.Color();
        particleColor.setRGB(1 - normalizedHealth, normalizedHealth, 0.5);
        particles.material.color = particleColor;
        particles.material.size = 1.5 + 2.5 * normalizedHealth;
        particles.material.opacity = 0.3 + 0.5 * normalizedHealth;
      }

      // Animate the central sphere
      if (centralSphere && centralSphere.material) {
        centralSphere.rotation.x += 0.001;
        centralSphere.rotation.y += 0.002;
        const health = currentHealthScoreRef.current;
        const normalizedHealth = health / 100;
        const sphereColor = new window.THREE.Color();
        sphereColor.setRGB(1 - normalizedHealth, normalizedHealth, 0.5);
        centralSphere.material.color = sphereColor;
      }

      // Animate nodes and lines based on analysis results and detected sound
      if (nodes && nodes.length > 0 && nodeLines && nodeLines.children.length > 0) {
        const analysis = currentAnalysisResultRef.current;
        const detectedSoundCategory = currentDetectedSoundRef.current;

        nodes.forEach((node) => {
            const category = node.userData.category;
            let categoryValue = 0;
            if (analysis[category]) {
                categoryValue = parseFloat(analysis[category].replace('%', '')) / 100;
            }

            // Node pulsing based on its assigned category's value AND if it's the detected sound
            let pulseIntensity = 0.08 * categoryValue;
            if (detectedSoundCategory && category === detectedSoundCategory) {
                pulseIntensity += 0.15; // Extra pulse for the detected category
            }
            const scale = 1 + pulseIntensity * Math.sin(Date.now() * 0.003 + node.userData.pulseOffset);
            node.scale.set(scale, scale, scale);

            // Node color based on category value and detection
            const nodeColor = new window.THREE.Color();
            nodeColor.setHSL(categoryValue * 0.3 + 0.5, 1, 0.7);
            if (detectedSoundCategory && category === detectedSoundCategory) {
                nodeColor.set(0xffa500); // Orange highlight for detected category
            }
            node.material.color = nodeColor;
            node.material.opacity = 0.5 + 0.5 * categoryValue;
        });

        const totalActivity = Object.values(analysis).reduce((sum, val) => sum + parseFloat(val.replace('%', '')), 0) / (Object.keys(analysis).length * 100);
        nodeLines.children.forEach((line) => {
            line.material.opacity = 0.2 + 0.7 * totalActivity;
            const lineColor = new window.THREE.Color();
            lineColor.setHSL(totalActivity * 0.3 + 0.5, 1, 0.8);
            line.material.color = lineColor;
        });
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    if (threeJsContainerRef.current) {
      init();
      animate();
      // Add event listeners after init
      document.addEventListener('mousemove', onDocumentMouseMove);
      window.addEventListener('resize', onWindowResize);
    }

    return () => {
      const container = threeJsContainerRef.current;
      if (container && renderer && renderer.domElement) {
        scene.traverse((object) => { // Dispose of geometries and materials
            if (object.isMesh || object.isPoints || object.isLine) {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            }
        });
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  // --- TensorFlow.js Model Loading ---
  useEffect(() => {
    const loadScript = (src, id, globalVarName) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          // If script tag already exists, check if global var is ready
          if (window[globalVarName]) {
            resolve();
            return;
          }
          // If script exists but global var isn't ready, wait for it
          let checkInterval = setInterval(() => {
            if (window[globalVarName]) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100); // Check every 100ms
          setTimeout(() => { // Timeout for waiting
            if (!window[globalVarName]) {
              clearInterval(checkInterval);
              reject(new Error(`${globalVarName} not available after timeout.`));
            }
          }, 5000); // 5 second timeout
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = () => {
          let checkInterval = setInterval(() => {
            if (window[globalVarName]) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          setTimeout(() => {
            if (!window[globalVarName]) {
              clearInterval(checkInterval);
              reject(new Error(`${globalVarName} not available after script load and timeout.`));
            }
          }, 5000);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadModelsAndLibraries = async () => {
      try {
        setModelLoadingStatus('Loading TensorFlow.js libraries...');
        // Load TF.js first
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.13.0/dist/tf.min.js', 'tfjs-script', 'tf');
        // Then load Speech Commands
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.5.4/dist/speech-commands.min.js', 'speech-commands-script', 'speechCommands');
        
        // setAreExternalScriptsLoaded(true); // This line was causing the error, removed.
        setModelLoadingStatus('Initializing AI Model...');

        if (recognizer) {
          setModelLoadingStatus('AI Model Ready.');
          return;
        }
        
        let modelLoaded = false;
        for (let i = 0; i < MODEL_PATHS.length; i++) {
          try {
            console.log(`Trying model path ${i + 1}: ${MODEL_PATHS[i]}`);
            recognizer = window.speechCommands.create(
              'BROWSER_FFT',
              undefined,
              MODEL_PATHS[i],
              METADATA_PATHS[i]
            );
            await recognizer.ensureModelLoaded();
            modelLoaded = true;
            console.log(`TensorFlow.js Speech Commands model loaded successfully from path ${i + 1}!`);
            break;
          } catch (pathError) {
            console.warn(`Failed to load model from path ${i + 1}:`, pathError);
            if (recognizer) {
              recognizer = null;
            }
          }
        }
        
        if (!modelLoaded) {
          try {
            console.log('Trying default model...');
            recognizer = window.speechCommands.create('BROWSER_FFT');
            await recognizer.ensureModelLoaded();
            console.log('Default TensorFlow.js Speech Commands model loaded successfully!');
            modelLoaded = true;
          } catch (defaultError) {
            console.error('Failed to load default model:', defaultError);
            throw new Error('All model loading attempts failed');
          }
        }
        
        setModelLoadingStatus('AI Model Ready.');
      } catch (err) {
        console.error("Failed to load TensorFlow.js model:", err);
        setModelLoadingStatus(`Error loading AI Model: ${err.message}`);
        setError("AI model failed to load. The application will work with simulated analysis. You can still test all features.");
      }
    };

    loadModelsAndLibraries();

    return () => {
      if (recognizer) {
        try {
          if (recognizer.stopListening) {
            recognizer.stopListening();
          }
          recognizer = null;
        } catch (error) {
          console.warn('Error cleaning up recognizer:', error);
        }
      }
    };
  }, []); // This effect now handles dynamic script loading

  // Effect to update Three.js refs when React state changes
  useEffect(() => {
    currentHealthScoreRef.current = healthScore !== null ? healthScore : 0;
    currentAnalysisResultRef.current = analysisResult || {};
    currentDetectedSoundRef.current = detectedSound;
  }, [healthScore, analysisResult, detectedSound]);

  // Spectrogram drawing effect
  useEffect(() => {
    const canvas = spectrogramCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (currentSpectrogramDataRef.current) {
      const data = currentSpectrogramDataRef.current;
      const bandWidth = width / data.length;
      const maxIntensity = 100;

      data.forEach((bandIntensity, index) => {
        const normalizedIntensity = bandIntensity / maxIntensity;
        const barHeight = normalizedIntensity * height;
        const x = index * bandWidth;
        const y = height - barHeight;

        const hue = 240 - (normalizedIntensity * 120);
        ctx.fillStyle = `hsl(${hue}, 100%, ${30 + normalizedIntensity * 50}%)`;
        ctx.fillRect(x, y, bandWidth, barHeight);
      });
    }
  }, [spectrogramData]);

  // Effect to manage recording duration
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setRecordingDuration(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  /**
   * Simulates audio feature extraction and feeds it to the real TF.js model.
   * In a real app, this would involve processing the actual audio file.
   * For this demo, we simulate the input tensor.
   * @returns {string} The detected sound label.
   */
  const performTfjsInference = async () => {
    if (!recognizer || !recognizer.model) {
      console.error("TensorFlow.js recognizer or model not ready for inference.");
      return 'Unknown';
    }
    
    try {
      const inputShape = [...recognizer.modelInputShape()]; // Create a copy to modify
      // Ensure the batch dimension is 1, as it might be null/undefined from modelInputShape()
      if (inputShape[0] === null || inputShape[0] === undefined || inputShape[0] <= 0) {
          inputShape[0] = 1;
      }
      
      const dummyInput = window.tf.randomNormal(inputShape);

      const predictions = await recognizer.model.predict(dummyInput);
      const scores = predictions.dataSync();
      const labels = recognizer.wordLabels();

      let maxScore = -1;
      let detectedLabel = '';

      for (let i = 0; i < scores.length; i++) {
        if (scores[i] > maxScore) {
          maxScore = scores[i];
          detectedLabel = labels[i];
        }
      }

      dummyInput.dispose();
      predictions.dispose();

      return detectedLabel;
    } catch (error) {
      console.error("Error during inference:", error);
      return 'Unknown';
    }
  };

  /**
   * Handles the file upload event.
   * Sets the selected audio file and resets previous analysis results.
   * @param {Event} event - The file input change event.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setAnalysisResult(null);
      setHealthScore(null);
      setError(null);
      setUserNotes('');
      setSpectrogramData(null);
      setDetectedSound(null);
    } else {
      setAudioFile(null);
      setAnalysisResult(null);
      setHealthScore(null);
      setError("Please upload a valid audio file.");
      setUserNotes('');
      setSpectrogramData(null);
      setDetectedSound(null);
    }
  };

  /**
   * Simulates starting an audio recording.
   */
  const startRecording = () => {
    setIsRecording(true);
    setAudioFile(null); // Clear any previously uploaded file
    setAnalysisResult(null);
    setHealthScore(null);
    setError(null);
    setUserNotes('');
    setSpectrogramData(null);
    setDetectedSound(null);
    setDataStreamStatus('Streaming: Encrypted & Buffered'); // Set status when recording starts
  };

  /**
   * Simulates stopping an audio recording.
   * Creates a dummy audio file object.
   */
  const stopRecording = () => {
    setIsRecording(false);
    setAudioFile(new File([], `recording-${Date.now()}.wav`, { type: 'audio/wav' }));
    setDataStreamStatus('Idle'); // Set status when recording stops
  };

  /**
   * Generates a simulated XAI explanation based on detected sound and analysis.
   * @param {string} detectedCategory - The detected sound category.
   * @param {Object} results - The analysis results.
   * @returns {string} A simulated explanation.
   */
  const generateXAIExplanation = (detectedCategory, results) => {
    let explanation = `AI inference indicates a high probability of '${detectedCategory}' activity. `;
    
    switch (detectedCategory) {
      case 'Bird Diversity':
        explanation += `This is supported by strong signals in the avian frequency bands, indicating healthy bird vocalizations.`;
        break;
      case 'Insect Activity':
        explanation += `High-frequency acoustic patterns consistent with insect chirps and buzzes were dominant.`;
        break;
      case 'Anthropogenic Noise':
        explanation += `Significant energy detected in lower frequency ranges with irregular patterns, characteristic of human-generated disturbances.`;
        break;
      case 'Mammal Presence':
        explanation += `Low-frequency rumbles or distinct calls associated with mammal vocalizations were prominent.`;
        break;
      case 'Amphibian Presence':
        explanation += `Repetitive, rhythmic patterns in mid-frequency ranges suggest amphibian calls.`;
        break;
      case 'Water Flow Sounds':
        explanation += `Consistent broadband noise with specific spectral characteristics indicative of flowing water.`;
        break;
      case 'Wind Noise':
        explanation += `Broadband low-frequency energy with fluctuating intensity, typical of wind interference.`;
        break;
      default:
        explanation += `Further analysis needed to pinpoint specific acoustic features.`;
    }

    if (results['Anthropogenic Noise'] && parseFloat(results['Anthropogenic Noise']) > 30) {
      explanation += ` Elevated anthropogenic noise (${results['Anthropogenic Noise']}) is a significant factor.`;
    }
    
    return explanation;
  };

  /**
   * Simulates a predictive trend based on current health and past data.
   * @param {number} currentScore - The current health score.
   * @param {Array} pastData - Array of past analysis results.
   * @returns {string} A simulated predictive trend.
   */
  const getSimulatedPredictiveTrend = (currentScore, pastData) => {
    if (pastData.length < 2) {
      return "Insufficient data for robust prediction.";
    }

    const latestScores = pastData.slice(0, 3).map(a => a.healthScore); // Last 3 scores
    const avgLatest = latestScores.reduce((sum, score) => sum + score, 0) / latestScores.length;

    if (currentScore > avgLatest + 10) {
      return "Improving trend projected over next 24h. Continue monitoring.";
    } else if (currentScore < avgLatest - 10) {
      return "Declining trend projected over next 24h. Requires immediate attention.";
    } else {
      return "Stable trend projected over next 24h. Maintain current monitoring.";
    }
  };

  /**
   * Simulates the bio-acoustic analysis process.
   * Integrates real TF.js model inference.
   */
  const startAnalysis = async () => {
    if (!audioFile) {
      setError("Please upload an audio file or complete a recording first.");
      return;
    }
    if (modelLoadingStatus.includes('Loading')) {
        setError("AI Model is still loading. Please wait.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setHealthScore(null);
    setSpectrogramData(null);
    setDetectedSound(null);
    setXaiExplanation(null);
    setPredictiveTrend(null);
    setDataStreamStatus('Processing Data...'); // Set status during analysis

    // Simulate audio feature extraction for spectrogram
    const simulatedFrequencyBands = Array.from({ length: 64 }, () => Math.random() * 80 + 20);
    currentSpectrogramDataRef.current = simulatedFrequencyBands;
    setSpectrogramData(simulatedFrequencyBands);

    // Simulate environmental context data
    const ambientTemp = (Math.random() * 20 + 15).toFixed(1); // 15-35 C
    const humidity = (Math.random() * 40 + 50).toFixed(1); // 50-90%
    const lightLevel = (Math.random() * 800 + 200).toFixed(0); // 200-1000 Lux
    const gpsLocation = `Lat: ${(Math.random() * 180 - 90).toFixed(4)}, Lon: ${(Math.random() * 360 - 180).toFixed(4)}`;

    // Perform real TF.js model inference or simulated detection
    let detectedLabel = 'Unknown';
    let mappedCategory = 'Unknown Sound';
    
    if (recognizer && modelLoadingStatus === 'AI Model Ready.') {
      try {
        detectedLabel = await performTfjsInference();
        mappedCategory = LABEL_TO_BAEHM_CATEGORY[detectedLabel] || 'Unknown Sound';
      } catch (inferenceError) {
        console.warn('AI inference failed, using simulated detection:', inferenceError);
        const categories = Object.values(LABEL_TO_BAEHM_CATEGORY);
        mappedCategory = categories[Math.floor(Math.random() * categories.length)];
      }
    } else {
      const categories = Object.values(LABEL_TO_BAEHM_CATEGORY);
      mappedCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    
    setDetectedSound(mappedCategory);

    // Simulate API call delay for the rest of the analysis
    setTimeout(() => {
      let birdDiversity = (Math.random() * 40 + 30).toFixed(1);
      let insectActivity = (Math.random() * 30 + 20).toFixed(1);
      let amphibianPresence = (Math.random() * 20 + 10).toFixed(1);
      let mammalPresence = (Math.random() * 20 + 5).toFixed(1);
      let waterFlowSounds = (Math.random() * 15 + 10).toFixed(1);
      let windNoise = (Math.random() * 10 + 5).toFixed(1);
      let anthropogenicNoise = (Math.random() * 25 + 5).toFixed(1);

      // Boost or reduce scores based on TF.js detection
      if (mappedCategory === 'Bird Diversity') birdDiversity = (parseFloat(birdDiversity) + 20).toFixed(1);
      if (mappedCategory === 'Insect Activity') insectActivity = (parseFloat(insectActivity) + 20).toFixed(1);
      if (mappedCategory === 'Amphibian Presence') amphibianPresence = (parseFloat(amphibianPresence) + 20).toFixed(1);
      if (mappedCategory === 'Mammal Presence') mammalPresence = (parseFloat(mammalPresence) + 20).toFixed(1);
      if (mappedCategory === 'Water Flow Sounds') waterFlowSounds = (parseFloat(waterFlowSounds) + 20).toFixed(1);
      if (mappedCategory === 'Wind Noise') windNoise = (parseFloat(windNoise) + 20).toFixed(1);
      if (mappedCategory === 'Anthropogenic Noise') anthropogenicNoise = (parseFloat(anthropogenicNoise) + 20).toFixed(1);

      const finalBirdDiversity = Math.min(100, parseFloat(birdDiversity));
      const finalInsectActivity = Math.min(100, parseFloat(insectActivity));
      const finalAmphibianPresence = Math.min(100, parseFloat(amphibianPresence));
      const finalMammalPresence = Math.min(100, parseFloat(mammalPresence));
      const finalWaterFlowSounds = Math.min(100, parseFloat(waterFlowSounds));
      const finalWindNoise = Math.min(100, parseFloat(windNoise));
      const finalAnthropogenicNoise = Math.min(100, parseFloat(anthropogenicNoise));

      const simulatedResults = {
        'Bird Diversity': `${finalBirdDiversity}%`,
        'Insect Activity': `${finalInsectActivity}%`,
        'Amphibian Presence': `${finalAmphibianPresence}%`,
        'Mammal Presence': `${finalMammalPresence}%`,
        'Water Flow Sounds': `${finalWaterFlowSounds}%`,
        'Wind Noise': `${finalWindNoise}%`,
        'Anthropogenic Noise': `${finalAnthropogenicNoise}%`,
        'Ambient Temperature': `${ambientTemp}°C`, // New environmental factor
        'Humidity': `${humidity}%`, // New environmental factor
        'Light Level': `${lightLevel} Lux`, // New environmental factor
        'Location Data': gpsLocation, // New geospatial factor
      };

      // Calculate health score, now influenced by environmental factors
      const score = (
        (finalBirdDiversity * 0.2) +
        (finalInsectActivity * 0.15) +
        (finalAmphibianPresence * 0.15) +
        (finalMammalPresence * 0.1) +
        (finalWaterFlowSounds * 0.1) -
        (finalWindNoise * 0.05) -
        (finalAnthropogenicNoise * 0.25) -
        // Penalize for extreme temperatures (simulated)
        (Math.abs(parseFloat(ambientTemp) - 25) * 0.5) // Max penalty at 15 or 35 C
      ).toFixed(0);

      const finalScore = Math.max(0, Math.min(100, parseInt(score) + 50));

      setAnalysisResult(simulatedResults);
      setHealthScore(finalScore);
      setIsLoading(false);
      setDataStreamStatus('Analysis Complete'); // Set status after analysis

      // Generate XAI explanation
      setXaiExplanation(generateXAIExplanation(mappedCategory, simulatedResults));

      // Generate predictive trend
      const newPastAnalyses = [
        {
          timestamp: new Date().toLocaleString(),
          healthScore: finalScore,
          analysisResult: simulatedResults,
          notes: userNotes,
          fileName: audioFile.name,
          detectedSound: mappedCategory,
        },
        ...pastAnalyses,
      ].slice(0, 5);
      setPastAnalyses(newPastAnalyses);
      setPredictiveTrend(getSimulatedPredictiveTrend(finalScore, newPastAnalyses));

      setUserNotes('');
    }, 2000);
  };

  /**
   * Determines the health status message based on the health score.
   * @param {number} score - The calculated health score.
   * @returns {string} The health status message.
   */
  const getHealthStatus = (score) => {
    if (score === null) return "No data";
    if (score >= 80) return "Excellent Health";
    if (score >= 60) return "Good Health";
    if (score >= 40) return "Moderate Health";
    if (score >= 20) return "Fair Health";
    return "Poor Health";
  };

  /**
   * Determines the color for the health score based on its value.
   * @param {number} score - The calculated health score.
   * @returns {string} Tailwind CSS color class.
   */
  const getHealthColor = (score) => {
    if (score === null) return "text-gray-400";
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-lime-500";
    if (score >= 40) return "text-yellow-500";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };

  /**
   * Calculates a simple trend based on the last few health scores.
   * @returns {string} Trend status ("Improving", "Declining", "Stable", "No Data").
   */
  const getTrend = () => {
    if (pastAnalyses.length < 2) return "No data";

    const latestScore = pastAnalyses[0].healthScore;
    const previousScore = pastAnalyses[1].healthScore;

    if (latestScore > previousScore + 5) {
      return "Improving";
    } else if (latestScore < previousScore - 5) {
      return "Declining";
    } else {
      return "Stable";
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === "Improving") return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (trend === "Declining") return <TrendingDown className="w-5 h-5 text-red-500" />;
    if (trend === "Stable") return <Minus className="w-5 h-5 text-gray-500" />;
    return null;
  };

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-gray-200 overflow-auto flex flex-col items-center justify-start p-4 sm:p-8">
      {/* THREE.js Canvas Container for Background */}
      <div ref={threeJsContainerRef} className="fixed inset-0 z-0 opacity-50"></div>

      {/* Custom CSS for structured 3D effects */}
      <style>
        {`
        /* Enhanced Main container style */
        .structured-panel {
          background: linear-gradient(135deg, rgba(15, 25, 40, 0.98), rgba(25, 35, 60, 0.95));
          border: 2px solid rgba(100, 150, 255, 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.8), 
            inset 0 0 20px rgba(100, 150, 255, 0.1),
            0 0 30px rgba(100, 150, 255, 0.2);
          transform: perspective(1200px) rotateX(5deg) rotateY(-1deg); /* Slightly less aggressive initial tilt */
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .structured-panel:hover {
            transform: perspective(1200px) rotateX(3deg) rotateY(-0.5deg) scale(1.005);
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.9), 
              inset 0 0 25px rgba(100, 150, 255, 0.15),
              0 0 40px rgba(100, 150, 255, 0.3);
        }

        /* Enhanced Button styles */
        .structured-button {
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #8b5cf6);
          border: 2px solid rgba(139, 92, 246, 0.5);
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 8px 20px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateZ(5px);
          position: relative;
          overflow: hidden;
        }
        .structured-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }
        .structured-button:hover:not(:disabled)::before {
          left: 100%;
        }
        .structured-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
          box-shadow: 
            0 12px 25px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 20px rgba(139, 92, 246, 0.5);
          transform: translateY(-4px) translateZ(8px);
        }
        .structured-button:active:not(:disabled) {
          transform: translateY(-2px) translateZ(6px);
          box-shadow: 
            0 6px 15px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .structured-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
          box-shadow: none;
          transform: translateZ(0);
        }

        /* Enhanced Recording buttons */
        .record-button {
            background: linear-gradient(135deg, #dc2626, #ea580c, #f59e0b);
            border-color: rgba(220, 38, 38, 0.5);
        }
        .record-button:hover:not(:disabled) {
            background: linear-gradient(135deg, #ef4444, #f97316, #fbbf24);
            box-shadow: 
              0 12px 25px rgba(220, 38, 38, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 0 20px rgba(220, 38, 38, 0.5);
        }
        .stop-button {
            background: linear-gradient(135deg, #dc2626, #b91c1c, #991b1b);
            border-color: rgba(220, 38, 38, 0.5);
            animation: pulse 2s infinite;
        }
        .stop-button:hover:not(:disabled) {
            background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c);
        }

        /* Enhanced Input/Textarea styles */
        .structured-input {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9));
          border: 2px solid rgba(100, 150, 255, 0.2);
          color: #f1f5f9;
          font-weight: 500;
          box-shadow: 
            inset 0 4px 8px rgba(0, 0, 0, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.1);
          transform: translateZ(2px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .structured-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 
            inset 0 4px 8px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(99, 102, 241, 0.4),
            0 0 30px rgba(99, 102, 241, 0.2);
          transform: translateZ(4px);
        }
        .structured-input::placeholder {
          color: rgba(148, 163, 184, 0.7);
          font-style: italic;
        }

        /* Enhanced Result card style */
        .result-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9));
          border: 1px solid rgba(100, 150, 255, 0.2);
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateZ(8px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .result-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .result-card:hover::before {
          transform: scaleX(1);
        }
        .result-card:hover {
            transform: translateZ(15px) translateY(-3px);
            box-shadow: 
              0 12px 30px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              0 0 20px rgba(100, 150, 255, 0.2);
        }

        /* Enhanced Error message style */
        .error-message {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          border: 2px solid rgba(239, 68, 68, 0.5);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 
            0 8px 20px rgba(220, 38, 38, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          animation: shake 0.5s ease-in-out;
        }

        /* Enhanced Success message style */
        .success-message {
          background: linear-gradient(135deg, #059669, #047857);
          border: 2px solid rgba(5, 150, 105, 0.5);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 
            0 8px 20px rgba(5, 150, 105, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Enhanced Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(51, 65, 85, 0.8), rgba(30, 41, 59, 0.8));
          border-radius: 10px;
          border: 1px solid rgba(100, 150, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #8b5cf6, #a855f7);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        /* Enhanced Animations */
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(30px) scale(0.9); }
            10% { opacity: 1; transform: translateY(0) scale(1); }
            90% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-30px) scale(0.9); }
        }
        .detected-sound-animation {
            animation: fadeInOut 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(100, 150, 255, 0.3); }
            50% { box-shadow: 0 0 30px rgba(100, 150, 255, 0.6); }
        }

        /* Loading animation */
        .loading-dots {
          display: inline-block;
        }
        .loading-dots::after {
          content: '';
          animation: dots 1.5s steps(5, end) infinite;
        }
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }

        /* Glass morphism effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Status indicators */
        .status-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
        .status-ready { background: #10b981; }
        .status-loading { background: #f59e0b; }
        .status-error { background: #ef4444; }

        /* Enhanced health score display */
        .health-score-display {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9));
          border: 2px solid rgba(100, 150, 255, 0.3);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: glow 3s ease-in-out infinite;
        }

        /* Progress bar */
        .progress-bar {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          height: 4px;
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        `}
      </style>

      {/* Main Content Container */}
      <div className="relative z-10 structured-panel rounded-3xl p-6 sm:p-10 w-full max-w-4xl">
        {/* Logo Section */}
        <div className="text-center mb-8">
            <h1 className="text-5xl font-mono tracking-widest text-blue-400 uppercase drop-shadow-lg">
                BAEHM
            </h1>
            <p className="text-sm text-gray-400 mt-2">Bio-Acoustic Ecosystem Health Monitor</p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-300 mb-6">
          System Interface
        </h1>
        <p className="text-center text-gray-300 mb-8 max-w-prose mx-auto">
          Upload an audio recording or simulate a live recording to analyze ecosystem health based on bio-acoustic patterns.
          <br/>
          <span className="font-semibold text-red-400">Note: This is a simulated analysis for demonstration purposes.</span>
        </p>

        {/* Enhanced AI Model Loading Status */}
        <div className="text-center mb-6 p-4 glass-effect rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-center space-x-3">
                <span className={`status-indicator ${modelLoadingStatus.includes('Error') ? 'status-error' : modelLoadingStatus.includes('Ready') ? 'status-ready' : 'status-loading'}`}></span>
                <span className={`font-semibold text-lg ${modelLoadingStatus.includes('Error') ? 'text-red-400' : modelLoadingStatus.includes('Ready') ? 'text-green-400' : 'text-yellow-400'}`}>
                    {modelLoadingStatus}
                </span>
                {modelLoadingStatus.includes('Loading') && (
                    <div className="loading-dots text-blue-400 font-bold"></div>
                )}
            </div>
            {modelLoadingStatus.includes('Error') && (
                <p className="text-sm text-gray-400 mt-2">
                    The application will work with simulated analysis
                </p>
            )}
        </div>

        {/* Audio Input Section */}
        <div className="mb-8 p-6 bg-gray-900 rounded-2xl border border-gray-700 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {/* Upload File Button */}
            <label htmlFor="audio-upload" className={`structured-button font-bold py-3 px-6 rounded-full flex items-center space-x-2 ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Upload className="w-5 h-5" />
              <span>{audioFile && !isRecording ? "Change Audio File" : "Upload Audio File"}</span>
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isRecording}
            />

            {/* Recording Buttons */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`structured-button record-button font-bold py-3 px-6 rounded-full flex items-center space-x-2 ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Mic className="w-5 h-5" />
                <span>Start Recording Live Stream</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="structured-button stop-button font-bold py-3 px-6 rounded-full flex items-center space-x-2 animate-pulse"
              >
                <StopCircle className="w-5 h-5" />
                <span>Stop Recording ({recordingDuration}s)</span>
              </button>
            )}
          </div>

          {audioFile && !isRecording && (
            <p className="mt-4 text-sm text-gray-400">
              Selected file: <span className="font-medium text-blue-300">{audioFile.name}</span>
            </p>
          )}
          {error && (
            <div className="mt-4 flex items-center text-white text-sm error-message p-4 rounded-xl">
              <XCircle className="w-6 h-6 mr-3 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>

        {/* Data Stream Status */}
        <div className="mb-8 text-center p-4 glass-effect rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-center space-x-3">
                <Wifi className={`w-5 h-5 ${dataStreamStatus.includes('Streaming') ? 'text-green-400 animate-pulse' : 'text-gray-500'}`} />
                <Lock className={`w-5 h-5 ${dataStreamStatus.includes('Encrypted') ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className={`font-semibold ${dataStreamStatus.includes('Streaming') ? 'text-green-400' : dataStreamStatus.includes('Processing') ? 'text-yellow-400' : 'text-gray-400'}`}>
                    Data Stream Status: {dataStreamStatus}
                </span>
            </div>
        </div>

        {/* Spectrogram Visualization */}
        <div className="mb-8 p-6 bg-gray-900 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold text-blue-300 mb-3">Audio Visualization (Edge Processed Spectrogram)</h2>
            <canvas ref={spectrogramCanvasRef} width="600" height="150" className="w-full h-auto bg-gray-800 rounded-lg border border-gray-700"></canvas>
            <p className="text-sm text-gray-400 mt-2 text-center">
                This visualization dynamically represents frequency band intensity from edge-processed audio.
            </p>
        </div>

        {/* Detected Sound Feedback */}
        {detectedSound && (
            <div className="mb-8 text-center p-6 glass-effect rounded-2xl border border-green-500/30 detected-sound-animation">
                <div className="flex items-center justify-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-lg font-semibold text-gray-300">AI Detection</p>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {detectedSound}
                </p>
                <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1">
                    <div className="progress-bar rounded-full h-1" style={{width: '100%'}}></div>
                </div>
            </div>
        )}

        {/* AI Explanation (XAI) */}
        {xaiExplanation && (
            <div className="mb-8 p-6 glass-effect rounded-2xl border border-purple-500/30">
                <h2 className="text-xl font-bold text-purple-300 mb-3">AI Explanation (XAI)</h2>
                <p className="text-gray-300 text-sm italic">
                    "{xaiExplanation}"
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    (Simulated interpretation of model's decision-making process)
                </p>
            </div>
        )}

        {/* User Notes */}
        <div className="mb-8 p-6 bg-gray-900 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold text-blue-300 mb-3">Add Notes (Optional)</h2>
            <textarea
                className="w-full p-3 rounded-lg structured-input focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
                placeholder="E.g., 'Recorded near the river, sunny day, no wind.'"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                disabled={isLoading || isRecording}
            ></textarea>
        </div>

        {/* Analysis Button */}
        <div className="text-center mb-8">
          <button
            onClick={startAnalysis}
            disabled={!audioFile || isLoading || isRecording || modelLoadingStatus.includes('Loading')}
            className={`structured-button font-bold py-3 px-8 rounded-full flex items-center space-x-2
              ${(!audioFile || isLoading || isRecording || modelLoadingStatus.includes('Loading')) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <BarChart2 className="w-5 h-5" />
                <span>Start AI Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Analysis Results Display */}
        {analysisResult && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center justify-center space-x-2">
              <BarChart2 className="w-6 h-6" />
              <span>Latest Analysis Results</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(analysisResult).map(([key, value]) => (
                <div key={key} className="p-4 rounded-xl result-card flex justify-between items-center">
                  <span className="font-medium text-gray-300">{key}:</span>
                  <span className="font-semibold text-blue-300">{value}</span>
                </div>
              ))}
            </div>

            {/* Anomaly Detection */}
            {analysisResult['Anthropogenic Noise'] && parseFloat(analysisResult['Anthropogenic Noise']) > 35 && (
                <div className="mt-6 p-5 error-message rounded-2xl text-center flex items-center justify-center space-x-3 animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-yellow-300" />
                    <p className="text-xl font-bold text-white">
                        Potential Anomaly Detected! High Anthropogenic Noise.
                    </p>
                </div>
            )}

            {/* Enhanced Health Score */}
            <div className="mt-6 p-8 health-score-display rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-200 mb-4 flex items-center justify-center space-x-3">
                <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                <span>Ecosystem Health Score</span>
              </h3>
              <div className={`text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                {healthScore !== null ? `${healthScore}` : 'N/A'}
              </div>
              <div className="text-2xl text-gray-400 mb-4">/ 100</div>
              <div className={`text-xl font-bold px-6 py-3 rounded-full inline-block ${getHealthColor(healthScore)} bg-opacity-20`}>
                {getHealthStatus(healthScore)}
              </div>
              <div className="mt-4 w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  className="progress-bar rounded-full h-2" 
                  style={{width: `${healthScore || 0}%`}}
                ></div>
              </div>
            </div>

            {/* Predictive Trend */}
            {predictiveTrend && (
                <div className="mt-6 p-5 glass-effect rounded-2xl border border-green-500/30 text-center">
                    <h3 className="text-xl font-bold text-green-300 mb-3">Future Trend Projection</h3>
                    <p className="text-lg text-gray-300">
                        {predictiveTrend}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        (Simulated based on historical and current data)
                    </p>
                </div>
            )}
          </div>
        )}

        {/* Past Analyses / Trend Analysis Section */}
        {pastAnalyses.length > 0 && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-lime-400 mb-4 flex items-center justify-center space-x-2">
              <TrendingUp className="w-6 h-6 text-lime-400" />
              <span>Past Analyses & Trend</span>
            </h2>
            <div className="mb-4 text-center text-lg font-semibold text-gray-300 flex items-center justify-center space-x-2">
                <span>Overall Trend: <span className="text-blue-300">{getTrend()}</span></span>
                {getTrendIcon(getTrend())}
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {pastAnalyses.map((analysis, index) => (
                <div key={index} className="p-4 rounded-xl result-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-300 text-sm sm:text-base">{analysis.timestamp}</span>
                    <span className={`font-bold text-lg ${getHealthColor(analysis.healthScore)}`}>
                      {analysis.healthScore}/100
                    </span>
                  </div>
                  {analysis.fileName && (
                    <p className="text-xs text-gray-400 mb-1">File: <span className="text-blue-300">{analysis.fileName}</span></p>
                  )}
                  {analysis.detectedSound && (
                    <p className="text-xs text-gray-400 mb-1">Detected: <span className="font-medium text-green-400">{analysis.detectedSound}</span></p>
                  )}
                  {analysis.notes && (
                    <p className="text-sm text-gray-400 italic border-l-2 border-blue-500 pl-2">"{analysis.notes}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
