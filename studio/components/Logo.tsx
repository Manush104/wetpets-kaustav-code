import React from 'react';

export const Logo = (props: any) => {
  const { renderDefault, title } = props;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{ 
          backgroundColor: '#4A9FD8', 
          color: 'white', 
          width: '28px', 
          height: '28px', 
          borderRadius: '6px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(74, 159, 216, 0.3)'
        }}
      >
        WP
      </div>
      <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
        Wet Pets <span style={{ color: '#4A9FD8', fontWeight: 400 }}>Admin</span>
      </span>
    </div>
  );
};
