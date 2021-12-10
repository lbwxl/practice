import React from 'react'

// function Child() {
//     parentCount={parentCount} computedFn={computedFn} />
//     return (
//         <div>
            
//         </div>
//     )
// }
function Child({parentCount, computedFn}) {
    console.log('------------子組件重新渲染');
    return (
      <div style={{ background: 'pink', margin: '50px 0' }}>
        <button onClick={computedFn} type="button">子組件</button>
        <p>{parentCount}</p>
      </div>
    );
  }
export default Child
