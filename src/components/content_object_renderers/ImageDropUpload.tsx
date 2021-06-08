import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageDropUpload.scss';

type ImageDropUploadProps = {
    onUpload: (images: File[]) => void,
    dropZoneProps: object
}

/**
 * Dropzone that accepts images and returns the uploaded files as an array of File objects to the provided callback function (hook): onUpload.
 * @param onUpload Callback function.
 * @constructor
 */
export default function ImageDropUpload({ onUpload, dropZoneProps }:ImageDropUploadProps) {
    // TODO make dropZoneProps non-required, with a default value of {accept: 'image/jpeg, image/png, image/gif'}
    const onDrop = useCallback(onUpload, [onUpload]);

    const {
        getRootProps, getInputProps,
        isDragAccept, isDragReject
    } = useDropzone({ onDrop, ...dropZoneProps });

    const classes = useMemo(
        () => (`${isDragReject ? ' reject' : ''} ${isDragAccept ? ' accept' : ''}`),
        [isDragReject, isDragAccept]);

    // TODO: the cleanup should be handled by the parent component, since this component returns the PreviewableFile. This is yet to be done.
    // clean up
    /* useEffect(() => () => {
    /    files.forEach((file: PreviewableFile) => URL.revokeObjectURL(file.preview));
    }, [files]); */

    return (
        <div {...getRootProps()} className={'h-100 imagedrop' + classes}>
            <input {...getInputProps()} />
            <div className="text-center my-auto">Släpp din bild här!</div>
        </div>
    );
}

ImageDropUpload.defaultProps = {
    onUpload: () => {},
    // TODO: Check potential SVG XSS problems
    dropZoneProps: { accept: 'image/jpeg, image/png, image/gif, image/svg+xml' }
} as ImageDropUploadProps;
