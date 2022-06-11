import React, {useState} from 'react';
import generateName from '../rpg/generateName';

export default () => {
  const [name, setName] = useState('');
  const onGenerate = () => setName(generateName());
  return (
    <>
      <SimpleButton onClick={onGenerate}>Generate Name</SimpleButton>
      <h1>{name}</h1>
    </>    
  );
}
