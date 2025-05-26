// import React from 'react'

import { useMemo } from "react";
import { PageHeading } from "../../components/Headings"

const Project = () => {
    const heading = useMemo(() => <PageHeading text="" />, []);

    return (
        <div>
            {heading}
        </div>
    )
}

export default Project