<script>
    import db from '../lib/db.js';
  
    let name = '';
    let age = '';
    let gender = 'Male';
  
    async function register() {
      if (!name || !age) {
        alert('Please fill all fields');
        return;
      }
      await db.prepare("INSERT INTO patients (name, age, gender) VALUES (?, ?, ?)").run(name, age, gender);
      name = '';
      age = '';
      gender = 'Male';
      dispatchEvent(new Event('patient-added'));
    }
  </script>
  
  <form on:submit|preventDefault={register}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
    <label>
      Age:
      <input type="number" bind:value={age} />
    </label>
    <label>
      Gender:
      <select bind:value={gender}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </label>
    <button type="submit">Register</button>
  </form>
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 300px;
    }
  
    input, select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      padding: 0.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  