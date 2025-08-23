'use client'

import React from 'react';
import Popup from 'reactjs-popup';

const TeamRecordBtn = () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>
);

export default TeamRecordBtn 