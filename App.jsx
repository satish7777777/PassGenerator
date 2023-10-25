import { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passGenerate =useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if(char) str+="~!@#$%^*+=_-"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)

      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length,number,char,setPassword])

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passGenerate()
  },[length, number,char,passGenerate])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-500 text-red-600'>
    <h1 className='text-xl text-center text-white'>Password Generator</h1>
    <div className="flex rounded-xl shadow-lg overflow-hidden mb-4">
      <input className='outline-none w-full py-1 px-3'
       type='text' 
       value={password} 
       placeholder='Password'
       readOnly
       ref={passwordRef}
      />

      <button onClick={copyPasswordToClip} 
      className='outline-none bg-blue-500 text-white px-3 py-1 shrink-0 hover:bg-yellow-400'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input className='cursor-pointer'
        type="range" min={6} max={99} value={length} onChange={(e) => {setLength(e.target.value)}}/>
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox'
        defaultChecked={number}
        id="numberInput"
        onChange={() => { setNumber((prev) => !prev);
        }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox'
        defaultChecked={char}
        id="characterInput"
        onChange={() => { setChar((prev) => !prev);
        }}
        />
        <label htmlFor='characterInput'>Charecters</label>
      </div>
    </div>
    </div>
  )
}

export default App
