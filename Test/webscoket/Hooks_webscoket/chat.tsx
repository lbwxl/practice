import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import styles from './chat.less';
import md5 from 'md5';

interface IMessage{
    title?: string;
    message: string;
}
const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
let timeout = 0;
const TYPING_TIMER_LENGTH = 400; 
const Chat = () => {
    const [username, setUsername] = useState('');
    const [showDialog, setShowDialog] = useState(true);
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState<IMessage []>([]);
    const instance = useRef<Socket>();
    const container = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        if (container.current){
            container.current!.scrollTop = container.current?.scrollHeight!;
        }
    }, [messages])
    useEffect(() => {
        instance.current = io('ws://127.0.0.1:3000');
        {
            on:('method',callback){

            },
            
        }
        // Socket events
        // Whenever the server emits 'login', log the login message
        instance.current.on('login', (data) => {
            // Display the welcome message
            const message = 'Welcome to Socket.IO Chat – ';
            setMessages(messages=>[...messages, {
                message: `Welcome to Socket.IO Chat – `
            },{
                message: `there's ${data.numUsers} participant`
            }])
        });

        // Whenever the server emits 'new message', update the chat body
        instance.current.on('new message', (data) => {
            setMessages(messages=>[...messages, {
                title: data.username,
                message: data.message
            }])
        });
       
        // Whenever the server emits 'user joined', log it in the chat body
        instance.current.on('user joined', (data) => {
            setMessages(messages=>[...messages, {
                message: `${data.username} joined`
            }, { 
                message: `there's ${data.numUsers} participant`
            }])
        });
      
        // Whenever the server emits 'user left', log it in the chat body
        instance.current.on('user left', (data) => {
            setMessages(messages=>[...messages, {
                message: `${data.username} left`
            }])
        });
        
        // Whenever the server emits 'typing', show the typing message
        instance.current.on('typing', (data) => {
            setMessages(messages=>[...messages, {
                title: data.username,
                message: `is typing`
            }])
        });
        // Whenever the server emits 'stop typing', kill the typing message
        instance.current.on('stop typing', (data) => {
            setMessages(messages=>{
                let index= messages.findIndex(item=>{
                    return (item.title === data.username) && (item.message === 'is typing');
                })
                if (index > -1) {
                    messages.splice(index, 1);
                }
                return [...messages];
            });
        });
       
        instance.current.on('disconnect', () => {
            setMessages(messages=>[...messages, {
                message: 'you have been disconnected'
            }])
        });
        
        instance.current.on('reconnect', () => {
            setMessages(messages=>[...messages, {
                message: 'you have been reconnected'
            }])
            if (username) {
                instance.current!.emit('add user', username);
            }
        });

        instance.current.on('reconnect_error', () => {
            setMessages(messages=>[...messages, {
                message: 'attempt to reconnect has failed'
            }])
        });
    }, [])

    // 用户加入
    function addChatRoom(e: React.KeyboardEvent){
        if (username && e.keyCode === 13) {
            instance.current!.emit('add user', username);
            setShowDialog(false);
        }
    }

    // 用户发送消息
    function sendMessage(e: React.KeyboardEvent){
        if (content && e.keyCode === 13) {
            instance.current!.emit('new message', content);
            setMessages(messages=>[...messages, {
                title: username,
                message: content
            }])
            setContent('');
        }
    }

    // 获取用户颜色
    function getUserColor(username: string){
        let str = md5(username);
        return parseInt(str.slice(-1), 16)%12;
    }

    // 用户正在输入
    function userInput(e:React.FormEvent){
        if (!isTyping){
            instance.current!.emit('typing');
            timeout = setTimeout(() =>{
                instance.current!.emit('stop typing');
                setIsTyping(false);
            }, TYPING_TIMER_LENGTH) as unknown as number;
        }else{
            clearTimeout(timeout);
            timeout = setTimeout(() =>{
                instance.current!.emit('stop typing');
                setIsTyping(false);
            }, TYPING_TIMER_LENGTH) as unknown as number;
        }
    }
    
    return <div>{
        showDialog?<div className={styles.wrap}>
            <p>What`s your nickname?</p>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={addChatRoom}/>
        </div>: <div className={styles.room}>
            <div ref={container}>{
                messages.map((item, index)=>{
                    if (!item.title){
                        return <p key={index} className={styles.tip}>{item.message}</p>
                    }else{
                        return <p key={index} className={styles.message}>
                            <span style={{color: COLORS[getUserColor(item.title)]}}>{item.title}</span>
                            <span>{item.message}</span>
                        </p>
                    }
                })
            }</div>
            <input onInput={userInput} placeholder="typing here" type="text" value={content} onChange={e=>setContent(e.target.value)} onKeyDown={sendMessage}/>
        </div>    
    }</div>
}

export default Chat;