import { useState, useEffect } from 'react';

interface InputEvent {
  target: {
    value: string;
  }
}

interface Message { 
  id:string; 
  sendBy: string; 
  msg: string; 
}

export const Blog = () => {

  const [senderName, setSenderName] = useState("guest");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<Message[]>([]);
  const handleChangeMessage = (event:InputEvent) => setMessage(event?.target?.value)
  const handleChangeSender = (event:InputEvent) => setSenderName(event?.target?.value)

  useEffect(() => {
    fetch(`/api/blog`)
      .then(r => r.json())
      .then(setList)
  }, []);
  
  const sendMessageToSocket = () => {
    if (message) {
      fetch(`/api/blog?msg=${message}`)
        .then(r => r.json())
        .then((result) => {
          setList(result);
          setMessage("");
        });
    };
  }

  return (
    <section>
        <div className="p-4 rounded-lg border-2 m-2 flex gap-2 w-8/12">
          <input onChange={handleChangeMessage} className="p-2 border-2 bg-slate-100" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="p-2 border-2 hover:bg-slate-100">send</button>
        </div>

        <div style={{width:'100%'}}>{list.map(
          ({msg, id}) => (
            <div key={id} className='p-4 rounded-lg border-2 m-2 hover:bg-slate-100 flex'>
              <p className='p-2 whitespace-normal'>{msg}</p>
            </div>
          )
        )}</div>

    </section>
  )
}