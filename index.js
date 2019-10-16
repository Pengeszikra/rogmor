import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import Rogmor from './Rogmor';
import DebugElements from './DebugElements';
import LayoutTest from './LayoutTest';
import Battle from './Battle'

// render(<DebugElements />, document.getElementById('root'));
render(<Battle />, document.getElementById('root'));
// render(<LayoutTest />, document.getElementById('root'));