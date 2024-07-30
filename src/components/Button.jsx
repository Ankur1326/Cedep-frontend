import React from "react";
import PropTypes from "prop-types";

const Button = ({
    children,
    onClick = () => { },
    color = "white",
    bgColor = "[#3699FF]",
    hoverColor = "[#2f89e3]",
    ringColor = "[#2f89e3]",
    additionalClasses = "",
}) => {
    const baseClasses = "px-4 py-2 rounded-md focus:outline-none transition duration-150 ease-in-out focus:ring-1 focus:ring-offset-2";

    return (
        <button
            className={`${baseClasses} ${additionalClasses} bg-${bgColor} text-${color} hover:bg-${hoverColor} focus:ring-${ringColor}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    // text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    hoverColor: PropTypes.string,
    additionalClasses: PropTypes.string,
};

export default Button;
