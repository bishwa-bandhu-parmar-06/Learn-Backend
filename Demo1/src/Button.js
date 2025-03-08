import { useState } from 'react';

function ButtonComponent(props) {
    const [showMessage, setShowMessage] = useState(false);

    const handleClick = () => {
        setShowMessage(true);
    };

    return (
        <>
            <button id="sub-btn" onClick={handleClick}>{props.text}</button>
            {showMessage && <PrintHello />}
        </>
    );
}

function PrintHello() {
    return (
        <>
            <h3>
                Hello, You Clicked The Button.
            </h3>
        </>
    );
}

export default ButtonComponent;
