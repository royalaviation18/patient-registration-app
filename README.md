
# 🏥 Patient Registration App

A **frontend-only patient registration system** built with **Svelte**, **Vite**, and **PGlite** (SQLite over IndexedDB) — deployed on **Vercel**.

> 🔗 **Live Demo:** [https://patient-registration-app-two.vercel.app/](https://patient-registration-app-two.vercel.app/)


## 📦 Features

- Register new patients with essential personal and emergency details.
- Query patient records using **raw SQL**.
- Data is persisted across **page refreshes**.
- Supports use across **multiple browser tabs** simultaneously using `@electric-sql/pglite`.
- Fully client-side — no backend needed.

---

## 🚀 Setup Instructions

To run the app locally:

```bash
git clone https://github.com/royalaviation18/patient-registration-app.git
cd patient-registration-app
npm install
npm run dev
```

## 🔍 Search Functionality (SQL-based)
You can search patients using SQL WHERE-style expressions in the app's search input.

### Examples:

| Field            | Sample SQL Input                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Full Name  |  name LIKE '%john%' |
| Date of Birth  | dob = '1990-05-01' |
| Age | age = 30 |
| Gender | gender = 'Female' |
| Martial Status | marital_status = 'Married' |
| Phone Number | gphone = '6355380271' |
| Email | email LIKE '%gmail.com' |
| Emergency Contact Name | emergency_name LIKE '%susan%' |
| Emergency Contact Phone | emergency_phone = '9876543210' |
| Emergency Contact Relation | emergency_relation = 'Brother' |


## 🛠️ Tech Stack

* Svelte — reactive frontend framework

* Vite — blazing-fast build tool

* PGlite — SQLite in the browser via IndexedDB

* Vercel — deployment platform
