import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
  return loading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <PacmanLoader color={'#F28C28'} loading={loading} size={100} />
    </div>
  ) : null;
};

export default LoadingSpinner;
