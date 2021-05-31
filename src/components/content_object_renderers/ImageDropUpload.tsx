import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

// Based on:
// https://www.digitalocean.com/community/tutorials/react-react-dropzone

// TODO there may be a built-in type for this.
type CSSDict = { [key: string]: (string | number)};

// TODO move these to some scss file.
const baseStyle:CSSDict = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
};

const activeStyle:CSSDict = { borderColor: '#2196f3' };
const acceptStyle:CSSDict = { borderColor: '#00e676' };
const rejectStyle:CSSDict = { borderColor: '#ff1744' };

type SIDUProps = {
    onUpload: (images: File[]) => void,
    dropZoneProps: object
}

/**
 * Dropzone that accepts images and returns the uploaded files as an array of File objects to the provided callback function (hook): onUpload.
 * @param onUpload Callback function.
 * @constructor
 */
export default function ImageDropUpload({ onUpload, dropZoneProps }:SIDUProps) {
    // TODO make dropZoneProps non-required, with a default value of {accept: 'image/jpeg, image/png, image/gif'}
    const onDrop = useCallback(onUpload, [onUpload]);

    const {
        getRootProps, getInputProps,
        isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        onDrop,
        ...dropZoneProps,
        // TODO: svg should be checked for XSS and other JS injections.
        accept: 'image/jpeg, image/png, image/gif, image/svg+xml'
    });

    const style:CSSDict = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);

    // TODO: the cleanup should be handled by the parent component, since this component returns the PreviewableFile. This is yet to be done.
    // clean up
    /* useEffect(() => () => {
    /    files.forEach((file: PreviewableFile) => URL.revokeObjectURL(file.preview));
    }, [files]); */

    return (
        <div {...getRootProps({ style })} className="h-100">
            <input {...getInputProps()} />
            <div className="text-center my-auto">Släpp din bild här!</div>
        </div>
    );
}
