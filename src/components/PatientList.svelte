<script>
    import db from '../lib/db.js';
    let patients = [];
  
    async function load() {
      const res = await db.prepare("SELECT * FROM patients").all();
      patients = res.rows;
    }
  
    // reload list if new patient is added
    window.addEventListener('patient-added', load);
  
    load();
  </script>
  
  <table>
    <thead>
      <tr><th>Name</th><th>Age</th><th>Gender</th></tr>
    </thead>
    <tbody>
      {#each patients as p}
        <tr><td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td></tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    table {
      border-collapse: collapse;
      margin-top: 1rem;
      width: 100%;
    }
  
    th, td {
      border: 1px solid #ccc;
      padding: 0.5rem;
    }
  
    th {
      background-color: #f5f5f5;
    }
  </style>
  