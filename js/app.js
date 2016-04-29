/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */


import React from 'react';
import ReactDOM from 'react-dom';
import NWGrid from './components/NWGrid.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'font-awesome/css/font-awesome.css';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(<NWGrid />, document.body);
