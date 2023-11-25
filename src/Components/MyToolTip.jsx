import React from 'react'

import {
    Tooltip,
} from "@material-tailwind/react";

const MyToolTip = ({ children, styles, content },) => {
    return (

        <Tooltip
            content={`${content}`}
            className={`${styles}`}
        >
            {children}
        </Tooltip>
    )
}

export default MyToolTip