
// import React, { useState } from 'react';

// // Reusable TimeDisplay Component
// const TimeDisplay = ({ seconds }) => {
//   const convertSeconds = (totalSeconds) => {
//     const days = Math.floor(totalSeconds / (24 * 60 * 60));
//     const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
//     const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
//     const remainingSeconds = totalSeconds % 60;
    
//     return { days, hours, minutes, seconds: remainingSeconds };
//   };

//   const formatTime = (value) => {
//     return value.toString().padStart(2, '0');
//   };

//   const time = convertSeconds(seconds);

//   return (
//     <div className="bg-slate-800 text-white rounded-lg p-6 w-full">
//       <div className="text-center">
//         <div className="text-4xl md:text-6xl font-mono font-bold tracking-wider">
//           {formatTime(time.days)} : {formatTime(time.hours)} : {formatTime(time.minutes)} : {formatTime(time.seconds)}
//         </div>
//         <div className="text-sm mt-3 text-gray-300 tracking-widest uppercase">
//           DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SS
//         </div>
//       </div>
//     </div>
//   );
// };


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

// Demo Component showing how to use with MUI Card structure
const ClaimEndCard = ({ info }) => {
  return (
    <div style={{
    //   background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      color: 'white',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '350px',
      margin: '20px auto'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '16px' 
      }}>
        <div style={{ 
          marginRight: '8px', 
          fontSize: '20px' 
        }}>
          🔄
        </div>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: '600' 
        }}>
          Claim End
        </div>
      </div>

      {/* Time Displays */}
      <div>
        <TimeDisplay 
          seconds={1756215846} 
          label="Start Timestamp" 
        />
        <TimeDisplay 
          seconds={1756315846} 
          label="Staking End" 
        />
        <TimeDisplay 
          seconds={1756415846} 
          label="Claim End" 
        />
      </div>
    </div>
  );
};

export default TimeDisplay


