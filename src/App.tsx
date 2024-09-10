import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PocketBase, { AdminAuthResponse } from 'pocketbase';

import './App.css'

const BASE_URL = "http://127.0.0.1:8090";

function App() {

  const pb = useMemo(() => new PocketBase(BASE_URL), []);
  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  console.log(token)
  console.log(user)

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const login = useCallback(async (email, password) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const doLogin = async _ => login("gcgbarbosa@gmail.com", "ladygaga")

  doLogin().then(e => console.log(e))

  if (!user) {
    throw new Error('Not logged in');
  };



  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
