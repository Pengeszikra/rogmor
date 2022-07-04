import { render } from 'react-dom';
import './gui/scss/style.scss';
import {SinglePlayer} from './gui/SinglePlayer';
import Head from "next/head";

render((
  <div>
    <Head>
      <link rel="manifest" href="manifest.json"></link>
    </Head>
    <SinglePlayer />
  </div>  
), document.getElementById('root'));