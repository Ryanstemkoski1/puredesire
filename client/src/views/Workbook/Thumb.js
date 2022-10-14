import React, { useEffect, useState } from "react";

export default function Thumb({ file }) {
    const [loading, setLoading] = useState(false)
    const [thumb, setThumb] = useState('')

    useEffect(() => {
        if (file) {
            setLoading(true)
            let reader = new FileReader();
            reader.onloadend = () => {
                setLoading(false)
                setThumb(reader.result)
            };

            reader.readAsDataURL(file);

        }
    }, [file])

    if (!file) return null

    if (loading) { return <p>loading...</p>; }

    return (
        <>
            <img src={thumb}
                alt={file.name}
                className="img-thumbnail mt-2"
                height={100}
                width={100} />
        </>
    )
}