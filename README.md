# 📊 FINTORY

**FINTORY** is a sleek and intuitive **personal finance tracker** built using **React 19**, **Vite**, **Firebase**, and **Ant Design**. It helps users manage expenses, track incomes, and maintain control over their financial life effortlessly.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Sign up / Log in using Email or Google
  - Firebase Authentication integration

- 📈 **Dashboard**
  - Visual overview of financial health
  - Real-time updates

- 💸 **Expense & Income Tracking**
  - Add, edit, and delete transactions
  - Filter and categorize entries

- 💾 **Cloud Data Storage**
  - All data securely stored with Firebase Firestore

- 🎨 **Clean UI**
  - Built with Ant Design & custom CSS for a smooth experience

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **UI**: [Ant Design](https://ant.design/), Custom SCSS/CSS
- **Authentication & Database**: [Firebase](https://firebase.google.com/)
- **State Management**: React Hooks
- **Routing**: React Router

---

## ⚙️ Installation

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/prachit082/Fintory.git
cd Fintory
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

Replace the placeholder values with your actual Firebase credentials. You can obtain these credentials by signing up on the [Firebase website](https://firebase.google.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
