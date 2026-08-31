const btnSystem = document.getElementById('btnSystem');
const systemResults = document.getElementById('systemResults');

const btnFetch = document.getElementById('btnFetch');
const results = document.getElementById('results');

btnFetch.addEventListener('click', async () => {
    btnFetch.disabled = true;
    btnFetch.innerText = 'Fetching...';
    
    try {
        const response = await fetch('/api/finance/fetch', { method: 'POST' });
        const result = await response.json();
        
        if (result.data) {
            const d = result.data;
            
            results.innerHTML = `
                <div class="card"><strong>Dollar:</strong> R$ ${d.dollar.toFixed(2)}</div>
                <div class="card"><strong>Euro:</strong> R$ ${d.euro.toFixed(2)}</div>
                <div class="card"><strong>Selic:</strong> ${d.selic}%</div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch rates:', error);
        alert('Failed to get financial rates.');
    } finally {
        btnFetch.disabled = false;
        btnFetch.innerText = 'Fetch Rates';
    }
});

btnSystem.addEventListener('click', async () => {
    btnSystem.disabled = true;
    btnSystem.innerText = 'Checking...';
    
    try {
        const response = await fetch('/api/system/info');
        const result = await response.json();
        
        if (result.data) {
            const d = result.data;
            
            // Convert seconds to hours and minutes
            const hours = Math.floor(d.uptime / 3600);
            const minutes = Math.floor((d.uptime % 3600) / 60);
            
            // Notice there are only 3 cards now, maintaining the clean dashboard look
            systemResults.innerHTML = `
                <div class="card"><strong>Uptime:</strong> ${hours}h ${minutes}m</div>
                <div class="card"><strong>Battery:</strong> ${d.battery}</div>
                <div class="card"><strong>RAM (Used/Available):</strong> ${d.ramUsage}</div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch status:', error);
        alert('Failed to get system status.');
    } finally {
        btnSystem.disabled = false;
        btnSystem.innerText = 'Check Status';
    }
});