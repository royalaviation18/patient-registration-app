<script>
    import { onMount } from 'svelte';
    import db from '../lib/db.js';
  
    let patients = [];
    let whereClause = ''; // User-defined query
    let errorMessage = '';
  
    const load = async () => {
      try {
        errorMessage = '';
        const baseSQL = 'SELECT * FROM patients';
        const fullSQL = whereClause.trim() ? `${baseSQL} WHERE ${whereClause}` : baseSQL;
  
        const res = await db.query(fullSQL);
        patients = res.rows;
      } catch (error) {
        errorMessage = 'Invalid query. Please check your syntax.';
        console.error('Failed to load patients:', error);
      }
    };
  
    const handlePatientAdded = () => {
      load();
    };
  
    onMount(() => {
      load();
      window.addEventListener('patient-added', handlePatientAdded);
      return () => {
        window.removeEventListener('patient-added', handlePatientAdded);
      };
    });
  </script>
  
  <div class="filter-container">
    <label for="whereInput">Filter patients (SQL WHERE clause):</label>
    <input
      type="text"
      id="whereInput"
      bind:value={whereClause}
      placeholder="e.g. age > 30 AND gender = 'Female'"
      on:input={load}
    />
    {#if errorMessage}
      <div class="error">{errorMessage}</div>
    {/if}
  </div>
  
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>DOB</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Marital Status</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Emergency Name</th>
          <th>Emergency Phone</th>
          <th>Relation</th>
        </tr>
      </thead>
      <tbody>
        {#each patients as p}
          <tr>
            <td>{p.name}</td>
            <td>{p.dob}</td>
            <td>{p.age}</td>
            <td>{p.gender}</td>
            <td>{p.marital_status}</td>
            <td>{p.phone}</td>
            <td>{p.email}</td>
            <td>{p.emergency_name}</td>
            <td>{p.emergency_phone}</td>
            <td>{p.emergency_relation}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <style>
    .filter-container {
      max-width: 800px;
      margin: 1rem auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
    }
  
    input[type='text'] {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }
  
    .error {
      color: red;
      font-size: 0.9rem;
    }
  </style>
  