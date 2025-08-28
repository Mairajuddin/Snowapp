import { useEffect, useState } from "react";


const TimeDisplay = ({ seconds, label }) => {
  if (!seconds) return null;

  const convertSeconds = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const remainingSeconds = totalSeconds % 60;
    
    return { days, hours, minutes, seconds: remainingSeconds };
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const time = convertSeconds(seconds);

  return (
    <div style={{ marginBottom: '12px' }}>
      {/* Optional Label */}
      {label && (
        <div style={{ 
          fontSize: '12px', 
          color: 'rgba(255,255,255,0.8)', 
          marginBottom: '4px',
          fontWeight: '500'
        }}>
          {label}
        </div>
      )}
      
      {/* Time Display */}
      <div style={{ textAlign: 'left' }}>
        <div style={{ 
          fontSize: '20px', 
          fontFamily: 'monospace', 
          fontWeight: 'bold', 
          letterSpacing: '2px',
          color: 'white'
        }}>
          {formatTime(time.days)} : {formatTime(time.hours)} : {formatTime(time.minutes)} : {formatTime(time.seconds)}
        </div>
        <div style={{ 
          fontSize: '10px', 
          color: 'rgba(255,255,255,0.7)', 
          letterSpacing: '3px',
          marginTop: '2px',
          fontWeight: '500'
        }}>
          DD&nbsp;&nbsp;&nbsp;&nbsp;HH&nbsp;&nbsp;&nbsp;&nbsp;MM&nbsp;&nbsp;&nbsp;&nbsp;SS
        </div>
      </div>
    </div>
  );
};







export default TimeDisplay



