import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  typeSpeed?: number;
  eraseSpeed?: number;
  eraseDelay?: number;
  cursor?: string;
  cursorStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typeSpeed = 50,
  eraseSpeed = 30,
  eraseDelay = 2000,
  cursor = '|',
  cursorStyle = {},
  textStyle = {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, eraseDelay);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, eraseSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text, typeSpeed, eraseSpeed, eraseDelay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span style={textStyle}>
      {displayText}
      {showCursor && (
        <span style={cursorStyle}>
          {cursor}
        </span>
      )}
    </span>
  );
};

export default TypewriterEffect; 