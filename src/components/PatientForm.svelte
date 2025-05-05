<script>
    import db, { initDB } from '../lib/db.js';
  
    let name = '';
    let age = '';
    let gender = 'Male';
    let ready = false;
  
    initDB().then(() => {
      ready = true;
    });
  
    async function register() {
      if (!ready) {
        alert('Database not ready. Please wait...');
        return;
      }
  
      if (!name || !age) {
        alert('Please fill all fields');
        return;
      }
  
      try {
        const insertSQL = `
          INSERT INTO patients (name, age, gender)
          VALUES ('${name}', ${parseInt(age)}, '${gender}')
        `;
        await db.exec(insertSQL);
  
        name = '';
        age = '';
        gender = 'Male';
        dispatchEvent(new Event('patient-added'));
      } catch (err) {
        console.error('Registration error:', err);
        alert('Error: ' + err.message);
      }
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
    <button type="submit" disabled={!ready}>Register</button>
  </form>
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 300px;
    }
  
    input,
    select {
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
  
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  </style>
  