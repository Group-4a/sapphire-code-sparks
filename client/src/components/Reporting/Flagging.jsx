import React from 'react';
import { useState } from 'react/cjs/react.production.min';

const [flags, setFlags] = useState(0);
function handleClick() {
    setFlags(flags++);
    if (flags == 5) { // arbitrary number that can be adjusted
        mute(user); // for unwritten mute function, should be adjusted as needed
    }
}

export default function flagButton({user, mute}) {
    return (
        <button type='button' onClick={() => handleClick}>
            Flag
        </button>
    );
  }