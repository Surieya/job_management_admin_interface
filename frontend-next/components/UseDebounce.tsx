import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useDebouncedEffect(callback: () => void, deps: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler); // cancel on dependency change
    };
  }, [...deps, delay]);
}