import React, { useCallback, useMemo } from 'react';
// import { Col, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

// Based on:
// https://www.digitalocean.com/community/tutorials/react-react-dropzone

// TODO check if there are built-in types for these.
type CSSDict = { [key: string]: (string | number)};
// type PreviewableFile = File & {preview: string};

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

const activeStyle:CSSDict = {
    borderColor: '#2196f3'
};

const acceptStyle:CSSDict = {
    borderColor: '#00e676'
};

const rejectStyle:CSSDict = {
    borderColor: '#ff1744'
};

function ImageDropUpload({ onUpload }:any) {
    // const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        // setFiles(acceptedFiles.map((file: File) => Object.assign(file, {preview: URL.createObjectURL(file)})));
        onUpload(URL.createObjectURL(acceptedFiles[0]));
    }, [onUpload]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });

    const style:CSSDict = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    /* const thumbs = files.map((file: PreviewableFile) => (
        <Col key={file.name} xs={2} className="my-auto">
            <Image fluid={true} src={file.preview} alt={file.name} onClick={() => { onUpload(file.preview); }} />
        </Col>
    )); */

    // clean up
    /* useEffect(() => () => {
    /    files.forEach((file: PreviewableFile) => URL.revokeObjectURL(file.preview));
    }, [files]); */

    return (
        <section className="mt-3">
            <div {...getRootProps({ style })} className="mb-2">
                <input {...getInputProps()} />
                {/* files.length === 0 && */(<div>Släpp din bild här</div>)}
                {/* files && (<>{ thumbs }</>) */}
            </div>
        </section>
    );
}

export default ImageDropUpload;
