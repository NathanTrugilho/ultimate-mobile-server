const btnFetch = document.getElementById('btnFetch');
const resultsContainer = document.getElementById('results');
const historyList = document.getElementById('historyList');

async function loadHistory() {
    try {
        const response = await fetch('/api/finance/history');
        const logs = await response.json();
        historyList.innerHTML = logs.map(item => `
            <li>[${item.created_at}] SELIC: ${item.selic}% | Dollar: R$ ${item.dollar.toFixed(2)} | Euro: R$ ${item.euro.toFixed(2)}</li>
        `).join('');
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

btnFetch.addEventListener('click', async () => {
    btnFetch.disabled = true;
    btnFetch.innerText = 'Fetching...';
    try {
        const response = await fetch('/api/finance/fetch', { method: 'POST' });
        const result = await response.json();
        
        if (result.data) {
            const data = result.data;
            resultsContainer.innerHTML = `
            <div class="card"><strong>SELIC:</strong> ${data.selic}%</div>
                <div class="card"><strong>Dollar:</strong> R$ ${data.dollar.toFixed(2)}</div>
                <div class="card"><strong>Euro:</strong> R$ ${data.euro.toFixed(2)}</div>
            `;
            await loadHistory();
        }
    } catch (error) {
        alert('Failed to update financial indicators.');
    } finally {
        btnFetch.disabled = false;
        btnFetch.innerText = 'Fetch & Save Rates';
    }
});

loadHistory();