import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import Rogmor from './Rogmor';
import DebugElements from './DebugElements';
import LayoutTest from './LayoutTest';

// render(<DebugElements />, document.getElementById('root'));
render(<Rogmor />, document.getElementById('root'));
//render(<LayoutTest />, document.getElementById('root'));