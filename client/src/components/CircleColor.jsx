import React from 'react'

export default function CircleColor({rgb}) {
  return (
    <div style={{
        backgroundColor: rgb,
        borderRadius: '50%',
        width: '20px',
        height: '20px'
    }}></div>
  )
}
