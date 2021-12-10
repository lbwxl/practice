import React, { forwardRef, useImperativeHandle, useEffect, useRef } from 'react'

const TestRef = forwardRef((props, ref) => {
    console.log(props,'props');
    useImperativeHandle(ref, () => ([
        {
            open(){
                console.log('open');
            },
        },
        {
            show(){
                console.log('返回多个function?');
            }
        }
    ]))
    return <div>hello forwardRef</div>
})

function App () {
    const ref = useRef()
    useEffect(() => {
        console.log('ref',ref);
        // ref.current.open();
    },[])

    return (
        <div>
            <div>石小阳</div>
            <TestRef data="my is props" ref={ref}></TestRef>
        </div>
    )
}
export default App;
// import React, { useState, useCallback, useEffect } from 'react';
// import Child from './components/Child';

// let a = 0;
// function Parent() {
//   const [parentCount, setParentCount] = useState(0);
//   const [otherCount, setOtherCount] = useState(0);
//   console.log('父組件重新渲染--------------');

//   const computedFn = useCallback(() => {
//     // 依赖项为空，这里的打印值始终不变；
//     // 因为组件state变化时会重新渲染整个组件,而这里parentCount取的始终是第一次渲染版本的值
//     console.log(parentCount); 
//     // 这里的打印值会实时更新，因为变量直接定义在组件外部，不受组件重新渲染影响
//     console.log(a);
//     return parentCount + 1;
//   }, []) ;
//   useEffect(() => {
//       console.log('par',parentCount);
//   },[parentCount])
//   return (
//     <div style={{ background: 'lightseagreen' }}>
//       <Child parentCount={parentCount} computedFn={computedFn} />
//       <button type="button" onClick={() => { setParentCount(parentCount + 1); a += 1; }}>父组件 +1</button>
//       <button type="button" onClick={() => { setOtherCount(otherCount + 1); }}>父组件 otherCount+1</button>
//     </div>
//   );
// }

// export default Parent;




// import {useRef, useState, useEffect} from 'react';

// import React from 'react'

// function App() {
//     const ele = useRef(null);
//     const [num, setNum] = useState(1);
//     console.log(ele);
//     const add = () => {
//         setNum(num+1);
//     }
//     const focu = () => {
//         console.log('执行了?');
//         ele.current.focus();
//     }
//     useEffect(() => {
//         console.log('ele',ele.current);
//     },[])
//     return (
//         <div>
//             <p>
//                 <span>账号：</span>
//                 <button onClick={add}>{num}</button>
//                 <input ref={ele} type="text" />
//                 <li onClick={focu}>点我ref获取焦点</li>
//             </p>
//         </div>
//     )
// }

// export default App


// import React, { useCallback, useState, useEffect } from 'react'

// function Child({data, onButtonClick}) {
//   console.log('child render',data);
//   return <button onClick={onButtonClick}>{data}</button>
// }

// function App() {
//   const [num, setNum] = useState(0);
//   const [userName, setName] = useState("Fang");
//   const add = () => setNum(num+1)
//   useEffect( () => {
//     console.log('执行了');
//   },[])
//   return (
//     <div>
//       <input value={userName} onChange={e => setName(e.target.value)}></input>
//       <Child data={num} onButtonClick={add} />
//     </div>
//   )
// }

// export default App


// import React, { useCallback, useState, useEffect, useMemo } from 'react'

// function Child({data, onButtonClick}) {
//   console.log('child render',data);
//   return <button onClick={onButtonClick}>{data}</button>
// }

// Child = React.memo(Child);

// function App() {
//   const [num, setNum] = useState(0);
//   const [userName, setName] = useState("Fang");
//   // 当num 发生改变，才会执行这个函数
//   let add = () => {
//     setNum(num+1)
//   }
//   const data = useMemo(() => setNum(num+1), [num]);
//   add = useCallback(add,[num])
//   useEffect( () => {
//     console.log('执行了');
//   },[])
//   return (
//     <div>
//       <input value={userName} onChange={e => setName(e.target.value)}></input>
//       <Child data={data} onButtonClick={add} />
//     </div>
//   )
// }

// export default App
