declare module 'react-typewriter-effect' {
  import React from 'react';

  interface TypewriterProps {
    text: string;
    typeSpeed?: number;
    eraseSpeed?: number;
    eraseDelay?: number;
    cursor?: string;
    cursorStyle?: string;
    textStyle?: React.CSSProperties;
  }

  const Typewriter: React.FC<TypewriterProps>;
  export default Typewriter;
} 