import React from 'react'

export const InputFiled = ({ type, name, value, placeholder, onChange }) => {
    // const InputFiled = ({ type, name, value, placeholder, onchange, label }) => {
      return<>
      <input
           type={type}
           name={name}
           value={value}
           placeholder={placeholder}
           onChange={onChange} />
      
      </> 
    }
