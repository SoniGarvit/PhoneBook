
import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from 'nanoid'

const initialState = {
  id: "", name: "", contactNum: ""
}

function App() {
  const [formInput, setForminput] = useState(initialState)
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || [])
  const [editing, setEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"))
    setPosts(savedPosts || [])
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formInput.contactNum && formInput.name) {
      if (posts.some(item => item.contactNum === formInput.contactNum)) {
        return alert("This Contact number already exists. Enter another number or edit existing one")
      }
      if (!editing) {
        setPosts(prev => [...prev, { ...formInput, id: nanoid() }])
        setForminput(initialState)
      }
      if (editing) {
        const updatedData = posts.map(item => {
          if (item.id === currentId) {
            return { ...item, contactNum: formInput.contactNum, name: formInput.name.toLocaleUpperCase() }
          } else {
            return item
          }
        })
        setPosts(updatedData)
        setEditing(false)
        setForminput(initialState)
      }
    }
  }

  const handleDelete = (obj) => {
    const result = confirm("Are you sure?")
    if (result) {
      const newArray = posts.filter(item => item.id !== obj.id)
      setPosts(newArray)
    }
  }

  const handleEdit = (obj) => {
    setEditing(true)
    setCurrentId(obj.id)
    setForminput(prev => ({ ...prev, name: obj.name.toUpperCase(), contactNum: obj.contactNum }))
  }

  const postElems = posts.map((item) => {
    return (
      <li
        className="flex flex-col gap-3 p-6 border rounded-2xl shadow-md bg-white hover:shadow-2xl transition transform hover:-translate-y-1 w-full max-w-xs sm:max-w-sm md:max-w-md"
        key={item.id}
      >
        <h4 className="text-xl font-bold text-gray-800 break-words">{item.name}</h4>
        <p className="text-gray-500 text-lg">{item.contactNum}</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button
            disabled={editing}
            className="flex-1 min-w-[110px] bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-xl shadow hover:opacity-90 hover:scale-105 transition text-sm cursor-pointer disabled:opacity-50"
            onClick={() => handleDelete(item)}
          >
            ❌ Delete
          </button>
          <button
            disabled={editing}
            className="flex-1 min-w-[110px] bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl shadow hover:opacity-90 hover:scale-105 transition text-sm cursor-pointer disabled:opacity-50"
            onClick={() => handleEdit(item)}
          >
            ✏️ Edit
          </button>
        </div>
      </li>
    )
  })

  return (
    <div className="min-h-screen px-8 bg-gradient-to-br from-purple-200 via-pink-100 to-white flex flex-col rounded-xl">
      <header className="py-6 mb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-lg">
          📒 Contact Book
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Manage your contacts effortlessly
        </p>
      </header>

      <main className="flex flex-col items-center px-4 flex-grow w-full">
        <form
          className="bg-white shadow-xl border border-gray-200 rounded-2xl flex flex-col w-full max-w-sm sm:max-w-md md:max-w-lg gap-5 p-6 transition hover:shadow-2xl"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 placeholder:opacity-70 shadow-sm"
            pattern='[a-zA-Z0-9]+'
            name="postContent"
            id='postContent'
            value={formInput.name}
            onChange={(e) => setForminput(prev => ({ ...prev, name: e.target.value.toLocaleUpperCase() }))}
            placeholder='Full Name'
          />
          <input
            type='text'
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 placeholder:opacity-70 shadow-sm"
            pattern="[0-9]{10}"
            placeholder="10 Digit Number"
            inputMode='numeric'
            maxLength="10"
            name="postDetail"
            id="postDetail"
            value={formInput.contactNum}
            onChange={(e) => setForminput(prev => ({ ...prev, contactNum: e.target.value }))}
          />
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105 mt-2 sm:mt-4 cursor-pointer disabled:opacity-50"
              type="submit"
            >
              {editing ? "Update Contact" : "Add Contact"}
            </button>
            {editing && (
              <button
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105 mt-2 sm:mt-4 cursor-pointer"
                onClick={() => { setForminput(initialState); setEditing(false) }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {posts.length === 0 && (
          <span className='text-lg font-medium mt-10 text-gray-600 italic animate-pulse'>
            No contacts yet. Add your first one ✨
          </span>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 justify-items-center w-full max-w-6xl px-2">
          {postElems}
        </ul>
      </main>
    </div>
  )
}

export default App


