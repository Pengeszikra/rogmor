import { useState, useEffect, FC } from 'react';
import { FaceSprite } from '../gui/setOfGuiElements';

interface InputEvent {
  target: {
    value: string;
  }
}

interface Message { 
  id:string; 
  msg: string; 
  name?: string;
  avatar?: string;
}

export interface IBlogWriter {
  name: string;
  avatar: string;
}

export const Blog:FC<IBlogWriter> = ({name, avatar}) => {

  const [message, setMessage] = useState("");
  const [list, setList] = useState<Message[]>([]);
  const handleChangeMessage = (event:InputEvent) => setMessage(event?.target?.value)

  useEffect(() => {
    fetch(`/api/blog`)
      .then(r => r.json())
      .then(setList)
  }, []);
  
  const sendMessageToSocket = () => {
    if (message && avatar && name) {
      setMessage("");
      fetch(`/api/blog?name=${name}&avatar=${avatar}&msg=${message}`)
        .then(r => r.json())
        .then((result) => {
          setList(result);
        });
    };
  }

  return name ? (
    <section>
        <div className="p-4 rounded-lg border-2 m-2 flex gap-2 w-8/12">
          <input onChange={handleChangeMessage} className="p-2 border-2 bg-slate-100" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="p-2 border-2 hover:bg-slate-100">send</button>
        </div>

        <div style={{width:'100%'}}>{list.map(
          ({msg, id, name, avatar}) => (
            <div key={id} className='p-4 rounded-lg border-2 m-2 hover:bg-slate-100 flex'>
              {avatar && name && (
                <section>
                  <span>{name}</span>
                  <FaceSprite data-face={avatar} style={{position: 'relative'}}/>
                </section>
              )}
              <p className='p-2 whitespace-normal'>{msg}</p>
            </div>
          )
        )}</div>

    </section>
  ) : <></>;
}