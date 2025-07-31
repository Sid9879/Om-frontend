import React from 'react';
import Fertilizer from './Fertilizer';
import Pesticide from './Pesticide';
import Seed from './Seed';

export default function Allpost() {
  return (
    <div>
      <Seed />
      <Fertilizer />
      <Pesticide />
    </div>
  );
}