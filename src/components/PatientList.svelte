<script>
    import { onMount } from 'svelte';
    import db from '../lib/db.js';
  
    let patients = [];
  
    // Load patients from the database
    const load = async () => {
      try {
        const res = await db.query("SELECT * FROM patients");
        patients = res.rows; // update the patients list
      } catch (error) {
        console.error('Failed to load patients:', error);
        alert('Error loading patient data');
      }
    };
  
    // Listen for new patient registration and reload the list
    const handlePatientAdded = () => {
      load();
    };
  
    // Run load initially and when patient-added event is triggered
    onMount(() => {
      load();
      window.addEventListener('patient-added', handlePatientAdded);
      
      // Cleanup the event listener when the component is destroyed
      return () => {
        window.removeEventListener('patient-added', handlePatientAdded);
      };
    });
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
  