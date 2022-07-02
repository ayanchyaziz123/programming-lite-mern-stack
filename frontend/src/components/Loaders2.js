import React from 'react';
import Loader from "react-loader-spinner";

const Loaders2 = () => {
    return (
        <Loader
            type="Grid"
            color="#212121"
            height={50}
            width={50}
            timeout={2000} //3 secs
            style={{
                marginTop: '20px',
                textAlign: 'center',
            }}
        />
    );
}

export default Loaders2;