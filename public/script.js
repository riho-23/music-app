const context = new (window.AudioContext || window.webkitAudioContext)();

// 各コードとその音（周波数）を定義
const chords = {
    "C":   { "C": [261.63, 329.63, 392.00], "Cm": [261.63, 311.13, 392.00], "C7": [261.63, 329.63, 392.00, 466.16] },
    "C#":  { "C#": [277.18, 349.23, 415.30], "C#m": [277.18, 329.63, 415.30], "C#7": [277.18, 349.23, 415.30, 493.88] },
    "D":   { "D": [293.66, 369.99, 440.00], "Dm": [293.66, 349.23, 440.00], "D7": [293.66, 369.99, 440.00, 523.25] },
    "D#":  { "D#": [311.13, 392.00, 466.16], "D#m": [311.13, 369.99, 466.16], "D#7": [311.13, 392.00, 466.16, 554.37] },
    "E":   { "E": [329.63, 415.30, 493.88], "Em": [329.63, 392.00, 493.88], "E7": [329.63, 415.30, 493.88, 587.33] },
    "F":   { "F": [349.23, 440.00, 523.25], "Fm": [349.23, 415.30, 523.25], "F7": [349.23, 440.00, 523.25, 622.25] },
    "F#":  { "F#": [369.99, 466.16, 554.37], "F#m": [369.99, 440.00, 554.37], "F#7": [369.99, 466.16, 554.37, 659.26] },
    "G":   { "G": [392.00, 493.88, 587.33], "Gm": [392.00, 466.16, 587.33], "G7": [392.00, 493.88, 587.33, 698.46] },
    "G#":  { "G#": [415.30, 523.25, 622.25], "G#m": [415.30, 493.88, 622.25], "G#7": [415.30, 523.25, 622.25, 739.99] },
    "A":   { "A": [440.00, 554.37, 659.26], "Am": [440.00, 523.25, 659.26], "A7": [440.00, 554.37, 659.26, 783.99] },
    "A#":  { "A#": [466.16, 587.33, 698.46], "A#m": [466.16, 554.37, 698.46], "A#7": [466.16, 587.33, 698.46, 830.61] },
    "B":   { "B": [493.88, 622.25, 739.99], "Bm": [493.88, 587.33, 739.99], "B7": [493.88, 622.25, 739.99, 880.00] }
};


// コードを鳴らす関数
function playChord(frequencies) {
    const startTime = context.currentTime;
    frequencies.forEach(freq => {
        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.connect(context.destination);
        osc.start(startTime);
        osc.stop(startTime + 1);
    });
}

// キーが選ばれたらコード一覧を表示
document.querySelectorAll('.key-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const container = document.getElementById('chord-container');
        container.innerHTML = ''; // 一度消す
        const keyChords = chords[key];
        if (!keyChords) {
            container.innerHTML = '<p>このキーにはコードが登録されていません。</p>';
        return;
        }

        Object.keys(keyChords).forEach(chordName => {
            const chordBtn = document.createElement('button');
            chordBtn.textContent = chordName;
            chordBtn.className = 'chord-btn';
            chordBtn.onclick = () => playChord(keyChords[chordName]);
            container.appendChild(chordBtn);
        });
    });
});



