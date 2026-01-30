import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const API = 'http://localhost:5000/api/users'

  // Fetch users 
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log('User Added:', data)
        setUsers(data)
      })
      .catch(err => {
        console.error('Error fetching users:', err)
        setError('Failed to Add user')
      })
  }, [])

  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    console.log('Submitting user:', { name, email })
    
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
      .then(res => {
        console.log('Response status:', res.status)
        return res.json()
      })
      .then(newUser => {
        console.log('User added:', newUser)
        setUsers([...users, newUser])
        setName('')
        setEmail('')
      })
      .catch(err => {
        console.error('Error adding user:', err)
        setError('Failed to add user')
      })
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Management</h1>

        {error && <div className='text-red-800'>{error}</div>}

        <div className="mb-8 p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600">
              Add User
            </button>
          </form>
        </div>

        <div className="p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          {users.length === 0 ? (
            <p>No users</p>
          ) : (
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user.id} className="p-3 bg-gray-100 rounded">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
