<script>
    import { onMount } from 'svelte';
    import db from '../lib/db.js';
    
    let patients = [];
    
    const load = async () => {
      try {
        const res = await db.query("SELECT * FROM patients");
        patients = res.rows;
      } catch (error) {
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
    .table-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      padding: 0 1rem;
    }
  
    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 1200px;
      font-size: 0.9rem;
      background-color: #fff;
      color: #333;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 12px 15px;
      text-align: left;
    }
  
    th {
      background-color: #646cff;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }
  
    td {
      vertical-align: top;
    }
  
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    tr:hover {
      background-color: #f1f7ff;
    }
  
    /* Optional: Responsive styling for smaller screens */
    @media (max-width: 768px) {
      table {
        font-size: 0.8rem;
      }
  
      th, td {
        padding: 8px 10px;
      }
    }
  </style>
  