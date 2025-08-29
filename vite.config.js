import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
   base: '/PhoneBook/',
})

// {function (import { useState, useEffect } from 'react'
// import './App.css'
// import { nanoid } from 'nanoid'

// const initialState = {
//   id: "", name: "", contactNum: ""
// }

// function App() {
//   const [formInput, setForminput] = useState(initialState)
//   const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts"))||[])
//   const [editing, setEditing] = useState(false)
//   const [currentId, setCurrentId] = useState(null)

//   useEffect(() => {
//   localStorage.setItem("posts",JSON.stringify(posts))  
  
//   }, [posts])

//   useEffect(() => {
//     const savedPosts = JSON.parse(localStorage.getItem("posts"))
//     setPosts(savedPosts||[])

//   }, [])


//   const handleSubmit = (e) => {

//     e.preventDefault()
//     if (formInput.contactNum && formInput.name) {
//       if (posts.some(item => item.contactNum===formInput.contactNum)) {
//         return alert("This Contact number alredy exists. Enter another number or edit existing one")
//       } 

//       if (!editing) {

//         setPosts(prev => [...prev, { ...formInput, id: nanoid() }])
//         setForminput(initialState)

//       }
//       if (editing) {
//         const updatedData = posts.map(item => {
//           if (item.id === currentId) {
//             return { ...item, contactNum: formInput.contactNum, name: formInput.name.toLocaleUpperCase() }
//           } else {
//             return item
//           }
//         })
//         setPosts(updatedData)
//         setEditing(false)
//         setForminput(initialState)
//       }
//     }
//   }


//   const handleDelete = (obj) => {
//     const result = confirm("Are you sure?")

//     if (result) {
//       const newArray = posts.filter(item => {

//         return item.id !== obj.id
//       })

//       setPosts(newArray)
//     }

//   }

//   const handleEdit = (obj) => {
//     setEditing(true)
//     setCurrentId(obj.id)
//     setForminput(prev => { return { ...prev, name: obj.name.toUpperCase(), contactNum: obj.contactNum } })
//   }


//   const postElems = posts.map((item) => {
//     return <li className=" flex flex-col gap-0.5 " key={item.id}> <h4>{item.name}</h4>
//       <p>{item.contactNum}</p>
//       <span> <button disabled={editing} className="bg-red-200  border border-amber-800 border-solid p-[1px]  rounded-lg mr-2 hover:scale-110  text-sm cursor-pointer" onClick={() => handleDelete(item)}>❌</button>
//         <button disabled={editing} className="bg-amber-200 border border-amber-800 border-solid p-[1px] rounded-lg  ml-2 hover:scale-110 font-semibold text-sm cursor-pointer" onClick={() => handleEdit(item)}>✏️</button>
//       </span></li >
//   })


//   return (
//     <>
//       <header className='py-4 mb-8 text-5xl bg-purple-300 w-full'><span>Contact-Book</span>

//       </header>
//       <main className="flex flex-col items-center">
//         <form className='bg-[#fffae3] border rounded-2xl flex flex-col w-80 gap-2.5 p-5' onSubmit={handleSubmit}>
//           <label htmlFor="postContent">
//             <input type="text" className='border-1 border-black border-solid rounded-lg px-1 bg-[#fff] placeholder:opacity-90' pattern='[a-zA-Z0-9]+' name="postContent" id='postContent' value={formInput.name} onChange={(e) => setForminput(prev => { return { ...prev, name: e.target.value.toLocaleUpperCase() } })} placeholder='Name' />
//           </label>
//           <label htmlFor="postDetail">

//             <input type='text' className='border-1 border-black border-solid rounded-lg px-1 bg-[#fff] placeholder:opacity-90' pattern="[0-9]{10}" placeholder="10 Digit Number" inputMode='numeric' maxLength="10" name="postDetail" id="postDetail" value={formInput.contactNum} onChange={(e) => setForminput(prev => { return { ...prev, contactNum: e.target.value } })
//             }  ></input>
//           </label>
//           <div className='flex justify-center gap-6'>
//             <button className='bg-green-300 border-1 border-green-900 border-solid py-0.5 px-2 font-semibold text-md  rounded-md hover:scale-105 mt-4 cursor-pointer' type="submit">{editing ? "Update" : "Create"}</button>
//             {editing && <button className='bg-green-300 border-1 border-green-900  py-0.5 px-2 font-semibold text-md  rounded-md hover:scale-105 mt-4 cursor-pointer' onClick={() => { setForminput(initialState); setEditing(false) }}>Cancel</button>}
//           </div>
//         </form>
//         {posts.length === 0 && <span className='text-lg font-medium mt-4'>No Contacts To Show Yet.</span>}
//         <ul className={`${posts.length === 1 ? "flex flex-col" : "grid grid-cols-2"} w-full gap-x-40 gap-y-8 justify-center text-lg font-medium mt-5`}>{postElems}</ul>
//       </main>
//     </>
//   )

// }
// export default App

// )}