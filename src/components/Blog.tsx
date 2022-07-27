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

type TBlogMap = (content:Message, index:number, list:Message[]) => Message;
export const blogSameUserHeaderMap:TBlogMap 
= (content, index, postList) => postList?.[index - 1]?.name === content?.name
  ? ({msg:content.msg, id: content.id})
  : content
;

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
        <div className="m-2 flex gap-2 text-lg font-mono">
          <input onChange={handleChangeMessage} className="p-2 w-64 bg-black text-white focus:outline-0 text-2xl font-sans" type="text" value={message} /> 
          <button onClick={sendMessageToSocket} className="p-2">send</button>
        </div>

        <div style={{width:'100%'}}>{list
          .map(blogSameUserHeaderMap)
          .map(
            post => (
              <div key={post.id} className=''>
                {post?.avatar && post?.name && (
                  <section className="blog-header">
                    <FaceSprite data-face={post.avatar} style={{position: 'relative'}}/>
                    <span className='text-xl text-sky-500'>{post.name}</span>
                  </section>
                )}
                <p className='p-2 whitespace-normal text-base'>{post.msg}</p>
              </div>
            )
          )
        }</div>

    </section>
  ) : <></>;
}