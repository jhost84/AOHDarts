// ===== CONFIG =====
const API_KEY = "YOUR_API_KEY";  // 🔑 replace with your API key
const SHEET_ID = "YOUR_SHEET_ID"; // 📄 replace with your Google Sheet ID
const RANGE = "Standings!A2:D";   // adjust depending on sheet tab & range

const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// ===== FETCH DATA =====
async function loadStandings() {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    const rows = data.values;
    const tbody = document.getElementById("standingsBody");
    tbody.innerHTML = "";

    if (!rows || rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="p-3 text-center">No data available</td></tr>`;
      return;
    }

    rows.forEach(row => {
      const tr = document.createElement("tr");
      tr.classList.add("border-b", "border-green-500", "hover:bg-green-600");

      tr.innerHTML = `
        <td class="p-3">${row[0] || ""}</td>
        <td class="p-3">${row[1] || "0"}</td>
        <td class="p-3">${row[2] || "0"}</td>
        <td class="p-3">${row[3] || "0"}</td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading standings:", error);
    document.getElementById("standingsBody").innerHTML =
      `<tr><td colspan="4" class="p-3 text-center text-red-400">Error loading data</td></tr>`;
  }
}

// Load on page start
loadStandings();
