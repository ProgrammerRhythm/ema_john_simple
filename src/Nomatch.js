import React from 'react';

const Nomatch = () => {
    const styles ={
        textAlign: 'center',
        color: 'red'
    }
    return (
        <div style={styles}> 
            <h1>404</h1>
            <h2>Page not found</h2>
        </div>
    );
};

export default Nomatch;