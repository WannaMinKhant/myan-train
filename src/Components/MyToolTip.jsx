import React from 'react'

import {
    Tooltip,
} from "@material-tailwind/react";

const MyToolTip = ({ children, style, content },) => {
    return (

        <Tooltip
            content={`${content}`}
            className={`${style}`}
        >
            {children}
        </Tooltip>
    )
}

export default MyToolTip