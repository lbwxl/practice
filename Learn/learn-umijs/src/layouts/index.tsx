// import React, {useState} from 'react'
// function Home() {
//     const [name, setName] = useState('wxl');
//     return (<div>{
//         name}</div>)
// }

// export default Home;

import { IRouteComponentProps } from 'umi';

export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
    console.log('children', children);
    
  return children
}