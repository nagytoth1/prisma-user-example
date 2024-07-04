import UserManagerComponent from "./components/UserManagerComponent.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "localhost:3000";
function App() {
  return <UserManagerComponent backend={BACKEND_URL} />;
}

export default App;
