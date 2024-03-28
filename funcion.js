function addPlayer() {
    const name = document.getElementById("playerName").value.trim();
    const roundNumber = document.getElementById("roundNumber").value || '1';
    if (!name) return;

    const table = document.getElementById("tournamentTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cellPlayer = newRow.insertCell(0);
    const cellRound = newRow.insertCell(1);
    const cellPJ = newRow.insertCell(2);
    const cellPG = newRow.insertCell(3);
    const cellPP = newRow.insertCell(4);
    const cellPoints = newRow.insertCell(5);

    cellPlayer.textContent = name;
    cellRound.textContent = roundNumber;
    [cellPJ, cellPG, cellPP].forEach(cell => {
        cell.setAttribute('contenteditable', true);
        cell.textContent = '0';
    });
    cellPoints.textContent = '0';

    document.getElementById("playerName").value = '';
    document.getElementById("roundNumber").value = '';
}

function updatePoints() {
    const table = document.getElementById("tournamentTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const PG = parseInt(row.cells[3].textContent) || 0;
        const PP = parseInt(row.cells[4].textContent) || 0;
        const points = (PG * 1) + (PP * 0);
        row.cells[5].textContent = points;
    }
}

function calculateTotals() {
    const mainTable = document.getElementById("tournamentTable").getElementsByTagName('tbody')[0].rows;
    const totals = {};

    for (let i = 0; i < mainTable.length; i++) {
        const row = mainTable[i];
        const playerName = row.cells[0].textContent;
        const points = parseInt(row.cells[5].textContent) || 0;
        
        if (!totals[playerName]) {
            totals[playerName] = 0;
        }
        
        totals[playerName] += points;
    }

    const sortedTotals = Object.entries(totals).sort((a, b) => b[1] - a[1]);

    const totalsTable = document.getElementById("totalPointsTable").getElementsByTagName('tbody')[0];
    totalsTable.innerHTML = '';

    sortedTotals.forEach(([playerName, totalPoints]) => {
        const newRow = totalsTable.insertRow();
        newRow.insertCell(0).textContent = playerName;
        newRow.insertCell(1).textContent = totalPoints;
    });
}
