import React from 'react';
import { useState } from 'react/cjs/react.production.min';

const [flags, setFlags] = useState(0);

export default function RouteButton() {
    return (
        <button type='button' onClick={setFlags(flags++)}>
            Flag
        </button>
    );
  }