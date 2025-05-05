<script>
    import db, { initDB } from "../lib/db.js";

    let name = "";
    let dob = "";
    let age = "";
    let gender = "";
    let maritalStatus = "";
    let phone = "";
    let email = "";
    let emergencyContactName = "";
    let emergencyContactPhone = "";
    let emergencyContactRelation = "";

    let ready = false;

    let nameError = "";
    let dobError = "";
    let ageError = "";
    let genderError = "";
    let maritalStatusError = "";
    let phoneError = "";
    let emailError = "";
    let emergencyContactNameError = "";
    let emergencyContactPhoneError = "";
    let emergencyContactRelationError = "";

    initDB().then(() => {
        ready = true;
    });

    function handleNameInput(event) {
        name = event.target.value.replace(/[^A-Za-z\s]/g, "");
    }

    function handlePhoneInput(event) {
        phone = event.target.value.replace(/\D/g, "");
    }

    function handleEmergencyPhoneInput(event) {
        emergencyContactPhone = event.target.value.replace(/\D/g, "");
    }

    function validateForm() {
        nameError = "";
        dobError = "";
        ageError = "";
        genderError = "";
        maritalStatusError = "";
        phoneError = "";
        emailError = "";
        emergencyContactNameError = "";
        emergencyContactPhoneError = "";
        emergencyContactRelationError = "";

        if (!name.trim()) {
            nameError = "Full Name is required";
        }

        if (!dob) {
            dobError = "Date of birth is required";
        }

        const ageValue = parseInt(age);
        if (!age || isNaN(ageValue)) {
            ageError = "Age is required";
        } else if (ageValue <= 0) {
            ageError = "Age must be greater than 0";
        }

        if (!gender) {
            genderError = "Please select a gender";
        }

        if (!maritalStatus) {
            maritalStatusError = "Please select marital status";
        }

        if (!phone || phone.length !== 10) {
            phoneError = "Phone number must be exactly 10 digits";
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email || !emailRegex.test(email)) {
            emailError = "Valid email is required";
        }

        if (!emergencyContactName.trim()) {
            emergencyContactNameError = "Emergency contact name is required";
        }

        if (!emergencyContactPhone || emergencyContactPhone.length !== 10) {
            emergencyContactPhoneError =
                "Emergency contact phone must be exactly 10 digits";
        }

        if (!emergencyContactRelation.trim()) {
            emergencyContactRelationError =
                "Emergency contact relation is required";
        }

        return !(
            nameError ||
            dobError ||
            ageError ||
            genderError ||
            maritalStatusError ||
            phoneError ||
            emailError ||
            emergencyContactNameError ||
            emergencyContactPhoneError ||
            emergencyContactRelationError
        );
    }

    async function register() {
        if (!ready) return;
        if (!validateForm()) return;

        try {
            const insertSQL = `
          INSERT INTO patients (
            name, dob, age, gender, marital_status, phone,
            email, emergency_name, emergency_phone, emergency_relation
          ) VALUES (
            '${name}', '${dob}', ${parseInt(age)}, '${gender}', '${maritalStatus}',
            '${phone}', '${email}', '${emergencyContactName}', '${emergencyContactPhone}', '${emergencyContactRelation}'
          )
        `;
            await db.exec(insertSQL);

            name = "";
            dob = "";
            age = "";
            gender = "";
            maritalStatus = "";
            phone = "";
            email = "";
            emergencyContactName = "";
            emergencyContactPhone = "";
            emergencyContactRelation = "";
            const channel = new BroadcastChannel("patient-sync");
            channel.postMessage({ type: "patient-added" });
            dispatchEvent(new Event("patient-added"));
            
        } catch (err) {
            console.error("Registration error:", err);
        }
    }
</script>

<form on:submit|preventDefault={register} class="form-container">
    <div class="form-field">
        <label for="name">Full Name:</label>
        <input
            type="text"
            id="name"
            bind:value={name}
            on:input={handleNameInput}
        />
        {#if nameError}<div class="error">{nameError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" bind:value={dob} />
        {#if dobError}<div class="error">{dobError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="age">Age:</label>
        <input type="number" id="age" bind:value={age} min="1" />
        {#if ageError}<div class="error">{ageError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="gender">Gender:</label>
        <select id="gender" bind:value={gender}>
            <option value="" disabled selected>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
        </select>
        {#if genderError}<div class="error">{genderError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="maritalStatus">Marital Status:</label>
        <select id="maritalStatus" bind:value={maritalStatus}>
            <option value="" disabled selected>Select Marital Status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
        </select>
        {#if maritalStatusError}<div class="error">
                {maritalStatusError}
            </div>{/if}
    </div>

    <div class="form-field">
        <label for="phone">Phone Number:</label>
        <input
            type="tel"
            id="phone"
            bind:value={phone}
            on:input={handlePhoneInput}
        />
        {#if phoneError}<div class="error">{phoneError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="email">Email Address:</label>
        <input type="email" id="email" bind:value={email} />
        {#if emailError}<div class="error">{emailError}</div>{/if}
    </div>

    <div class="form-field">
        <label for="emergencyContactName">Emergency Contact Name:</label>
        <input
            type="text"
            id="emergencyContactName"
            bind:value={emergencyContactName}
        />
        {#if emergencyContactNameError}<div class="error">
                {emergencyContactNameError}
            </div>{/if}
    </div>

    <div class="form-field">
        <label for="emergencyContactPhone">Emergency Contact Phone:</label>
        <input
            type="tel"
            id="emergencyContactPhone"
            bind:value={emergencyContactPhone}
            on:input={handleEmergencyPhoneInput}
        />
        {#if emergencyContactPhoneError}<div class="error">
                {emergencyContactPhoneError}
            </div>{/if}
    </div>

    <div class="form-field">
        <label for="emergencyContactRelation">Emergency Contact Relation:</label
        >
        <input
            type="text"
            id="emergencyContactRelation"
            bind:value={emergencyContactRelation}
        />
        {#if emergencyContactRelationError}<div class="error">
                {emergencyContactRelationError}
            </div>{/if}
    </div>

    <button type="submit" disabled={!ready}>Register</button>
</form>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 8px;
        box-sizing: border-box;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    label {
        font-size: 1.1rem;
        font-weight: bold;
        color: #333;
    }

    input,
    select {
        padding: 1rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        transition: all 0.3s ease;
        background-color: #fafafa;
        color: black;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(0.4); /* Darker calendar icon */
    }

    input:focus,
    select:focus {
        border-color: #646cff;
        background-color: #f1f7ff;
        outline: none;
    }

    button {
        padding: 1rem;
        background-color: #646cff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #535bf2;
    }

    .error {
        color: red;
        font-size: 0.9rem;
    }
</style>
