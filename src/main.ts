import { createDatabase, getUsers } from './db';

async function main() {
  const db = await createDatabase();
  const users = getUsers(db);

  const output = document.getElementById('output');
  if (output) {
    if (Array.isArray(users) && users.length > 0) {
      const table = document.createElement('table');
      table.style.border = '1px solid black';
      table.style.borderCollapse = 'collapse';

      const thead = document.createElement('thead');
      thead.style.backgroundColor = '#f2f2f2';
      thead.style.borderBottom = '1px solid black';
      thead.style.textAlign = 'left';
      thead.style.padding = '8px';
      thead.style.fontWeight = 'bold';
      const tbody = document.createElement('tbody');

      // Create table headers
      const headers = Object.keys(users[0]);
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Create table rows
      users.forEach(user => {
        const row = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = String(user[header]);
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      // Clear previous content and append table
      output.innerHTML = '';
      output.appendChild(table);
    } else {
      output.textContent = 'No users found.';
    }
  }
}

main();
