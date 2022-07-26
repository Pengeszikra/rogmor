import React from 'react';

export default function TailwindArea ({state, army}) {

  return (
    <section className="m-4 p-4 rounded-2xl absolute top-0 left-0 overflow-hidden -hidden h-64 bg-stone-900">
      <pre className="overflow-scroll h-64">{JSON.stringify(state, null, 2)}</pre>
    </section>

  );
}