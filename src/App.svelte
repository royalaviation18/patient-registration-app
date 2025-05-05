<script>
  import PatientForm from "./components/PatientForm.svelte";
  import PatientList from "./components/PatientList.svelte";
</script>

<main>
  <h1>Patient Registration App</h1>
  <PatientForm />
  <PatientList />
</main>

<style>
  main {
    padding: 2rem;
    font-family: sans-serif;
    max-width: 800px;
    margin: auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .spacing {
    margin-top: 2rem;
  }
</style>
