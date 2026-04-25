let currentMode = ''; 
let shuffleCount = 0;
const lanes = ['탑', '정글', '미드', '원딜', '서폿'];

function startMode(mode) {
    currentMode = mode;
    shuffleCount = 0;
    updateShuffleDisplay();
    
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('builder-area').style.display = 'block';
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + mode).classList.add('active');
    
    document.getElementById('page-title').innerText = mode === 'ck' ? 'CK 팀 섞기' : '솔랭 내기';

    mode === 'ck' ? generateCkRows() : generateSoloRows();
}

function generateCkRows() {
    const cont = document.getElementById('lane-rows-ck');
    cont.innerHTML = lanes.map(lane => `
        <div class="lane-row">
            <div class="lane-tag">${lane}</div>
            <input type="text" class="player-input blue-in" placeholder="블루">
            <button class="lock-btn" onclick="this.classList.toggle('active')">🔓</button>
            <input type="text" class="player-input red-in" placeholder="레드">
        </div>
    `).join('');
}

function generateSoloRows() {
    const count = document.getElementById('solo-count').value;
    const cont = document.getElementById('lane-rows-solo');
    let html = '';
    for(let i=1; i<=count; i++) {
        html += `
            <div class="lane-row">
                <div class="lane-tag">${i}번</div>
                <input type="text" class="player-input blue-in" placeholder="A팀">
                <button class="lock-btn" onclick="this.classList.toggle('active')">🔓</button>
                <input type="text" class="player-input red-in" placeholder="B팀">
            </div>`;
    }
    cont.innerHTML = html;
}

function shuffleTeams() {
    const activeTab = document.querySelector('.tab-content.active');
    const rows = activeTab.querySelectorAll('.lane-row');
    
    if (currentMode === 'ck') {
        rows.forEach(row => {
            const lockBtn = row.querySelector('.lock-btn');
            if (!lockBtn.classList.contains('active')) {
                const inputs = row.querySelectorAll('.player-input');
                if (Math.random() > 0.5) {
                    [inputs[0].value, inputs[1].value] = [inputs[1].value, inputs[0].value];
                }
            }
        });
    } else {
        const blues = activeTab.querySelectorAll('.blue-in');
        const reds = activeTab.querySelectorAll('.red-in');
        const locks = activeTab.querySelectorAll('.lock-btn');
        let pool = [];

        locks.forEach((lock, i) => {
            if (!lock.classList.contains('active')) {
                if(blues[i].value) pool.push(blues[i].value);
                if(reds[i].value) pool.push(reds[i].value);
            }
        });

        pool.sort(() => Math.random() - 0.5);

        let idx = 0;
        locks.forEach((lock, i) => {
            if (!lock.classList.contains('active')) {
                blues[i].value = pool[idx++] || "";
                reds[i].value = pool[idx++] || "";
            }
        });
    }
    shuffleCount++;
    updateShuffleDisplay();
}

function updateShuffleDisplay() {
    const wrapper = document.querySelector('.shuffle-count-wrapper');
    const display = document.getElementById('shuffle-count-display');
    wrapper.style.display = shuffleCount > 0 ? 'block' : 'none';
    if (shuffleCount > 0) display.innerText = shuffleCount;
}

function resetInputs() {
    document.querySelectorAll('.player-input').forEach(input => input.value = '');
    document.querySelectorAll('.lock-btn').forEach(btn => btn.classList.remove('active'));
    shuffleCount = 0;
    updateShuffleDisplay();
}

function goBackToMenu() {
    if(document.getElementById('mode-selection').style.display === 'none') {
        document.getElementById('mode-selection').style.display = 'flex';
        document.getElementById('builder-area').style.display = 'none';
        document.getElementById('page-title').innerText = '모드를 선택해주세요';
        shuffleCount = 0;
        updateShuffleDisplay();
    } else {
        location.href = 'index.html';
    }
}

function copyResult() {
    const activeTab = document.querySelector('.tab-content.active');
    const rows = activeTab.querySelectorAll('.lane-row');
    let text = `💖 [ ANI WORLD ${currentMode === 'ck' ? 'CK' : '솔랭'} 결과 ] 💖\n(섞은 횟수: ${shuffleCount}회)\n\n`;
    
    rows.forEach(row => {
        const tag = row.querySelector('.lane-tag').innerText;
        const inputs = row.querySelectorAll('.player-input');
        text += `${tag}: ${inputs[0].value || '??'} vs ${inputs[1].value || '??'}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => alert("결과가 복사되었습니다! ✨"));
}