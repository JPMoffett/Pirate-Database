document.getElementById("search").addEventListener("input", () => {
  const query = document.getElementById("search").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  // Try parsing as number first
  const year = Number(query);
  if (!isNaN(year)) {
    const active = pirates.filter(p => year >= Number(p.active_start) && year <= Number(p.active_end));
    if (!active.length) {
      resultsDiv.innerHTML = `<div class='result'>No known pirate activity in ${year}.</div>`;
      return;
    }
    resultsDiv.innerHTML = `
      <div class='result'>
        <h3>Pirates active in ${year}</h3>
        <ul>
          ${active.map(p => `<li><b>${p.name}</b> — ${p.location}</li>`).join("")}
        </ul>
      </div>
    `;
    return;
  }

  // Name search (case-insensitive)
  const pirate = pirates.find(p => p.name.toLowerCase().includes(query.toLowerCase()));
  if (!pirate) {
    resultsDiv.innerHTML = `<div class='result'>No pirate found by that name.</div>`;
    return;
  }

  const overlap = pirates.filter(p =>
    p !== pirate &&
    !(p.active_end < pirate.active_start || p.active_start > pirate.active_end)
  );

  resultsDiv.innerHTML = `
    <div class='result'>
      <h3>${pirate.name}</h3>
      <p>Active years: ${pirate.active_start}–${pirate.active_end}</p>
      <p>Region: ${pirate.location}</p>

      <h4>Also active during this time:</h4>
      <ul>
        ${overlap.length ? overlap.map(p => `<li>${p.name}</li>`).join("") : "<li>No known overlap</li>"}
      </ul>
    </div>
  `;
});
