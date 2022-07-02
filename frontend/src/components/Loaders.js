import React from 'react';
import Loader from "react-loader-spinner";

const Loaders = () => {
    return (
        <Loader
            type="Grid"
            color="#212121"
            height={100}
            width={100}
            timeout={2000} //3 secs
            style={{
                marginTop: '50px',
                textAlign: 'center',
                color: '#ff9900',
            }}
        />
    );
}

export default Loaders;