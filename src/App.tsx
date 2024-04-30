import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import AdminDash from './pages/AdminDash'
import { User } from './data/dataSource'
import { useState } from 'react'
import UserDash from './pages/UserDash'
import WorkoutDetail from './pages/WorkoutDetail'

function App() {
  const navigate = useNavigate();
  const Users: User[] = [
    { userId: "1", name: 'User', email: 'user@gmail', password: '1234', role: 'user', workouts: [] },
    { userId: "2", name: 'Admin', email: 'admin@gmail', password: '1234', role: 'admin', workouts: [] },
  ]
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleSignIn = (email: string, password: string) => {
    const foundUser = Users.find(user => user.email === email && user.password === password)
    if (foundUser) {
      setCurrentUser(foundUser)
      console.log(foundUser.role)
      if (foundUser.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/panel');
      }
    } else {
      setCurrentUser(null)
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        
        <Route path="/dashboard" element={<AdminDash />} />
        <Route path="/panel" element={<UserDash />} />
        <Route path="/workout/:workoutId" element={<WorkoutDetail />} />
       
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
