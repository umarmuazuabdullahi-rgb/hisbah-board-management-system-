const API_URL = window.API_URL || "http://localhost:8000";

document.getElementById('todayDate').textContent =
  new Date().toLocaleDateString('ha-NG', {year:'numeric', month:'long', day:'numeric', weekday:'long'});

document.getElementById('logoutBtn').onclick = () =>
  alert("An fita! (Demo-only, ba a da account management a wannan sample).");

document.getElementById('username').textContent = 'Admin';

// Fetch dashboard stats
fetch(`${API_URL}/dashboard-stats`)
  .then(r => r.json())
  .then(stats => {
    document.getElementById('totalCases').textContent = stats.total_cases;
    document.getElementById('openIncidents').textContent = stats.open_incidents;
    document.getElementById('todayPatrols').textContent = stats.today_patrols;
    document.getElementById('onDutyOfficers').textContent = stats.on_duty_officers;
  });

// Fetch recent cases
fetch(`${API_URL}/cases/recent`)
  .then(r => r.json())
  .then(cases => {
    document.getElementById('caseTable').innerHTML = cases.map(c =>
      `<tr>
         <td>${c.id}</td>
         <td>${c.title}</td>
         <td><span class="status status-${c.status.replace(/ /g,'-').toLowerCase()}">${c.status}</span></td>
         <td>${c.assignee}</td>
         <td>${c.date}</td>
      </tr>`
    ).join("");
  });

// Fetch activities
fetch(`${API_URL}/activities/recent`)
  .then(r => r.json())
  .then(activities => {
    document.getElementById('activityList').innerHTML =
      activities.map(a => `<li>${a}</li>`).join("");
  });
