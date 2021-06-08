import React, { useContext, useState, useRef } from 'react';
import { Col, Modal, Image, Row, Button, Form } from 'react-bootstrap';
import { ContentTreeContext } from '../../contexts';
import { ContentImage } from '../../types/api_object_types';
import ImageDropUpload from './ImageDropUpload';
import Editor from '@monaco-editor/react';
import monaco, { languages } from 'monaco-editor';
// Mock stuff
import defaultLogo from '../../mediafiles/placeholder_images/Fysiksektionen_logo.svg';
import img1 from '../../mediafiles/placeholder_images/news_placeholder.jpg';
import img2 from '../../mediafiles/placeholder_images/news_placeholder1.jpg';
import img3 from '../../mediafiles/placeholder_images/news_placeholder2.jpg';
import img4 from '../../mediafiles/placeholder_images/ERI_vertical_RGB.png';

import { language as inlinecsslangdef } from './InlineCSS.syntaxdef';

const postcss = require('postcss');
const postcssJs = require('postcss-js'); ;

/**
 * Checks whether a css-string is parseable by postcss.
 * @param css The css-string
 * @returns a boolean indicating if the string was parseable
 */
function checkCSSValidity(css: string | undefined):boolean {
    if (css === undefined) { return false; };
    try {
        postcssJs.objectify(postcss.parse(css));
    } catch { return false; }
    return true;
}

type ImageCOEProps = {
    show: boolean,
    setShow: (image: boolean) => void,
    content: ContentImage
}

function defineInlineCSS() {
    languages.register({
        id: 'icss',
        extensions: ['.css'],
        aliases: ['CSS', 'css'],
        mimetypes: ['text/css']
    });
    languages.setMonarchTokensProvider('icss', inlinecsslangdef);
}

/**
 * Popup image-picker for a ContentImage.
 * @param show Weather to show the popup or not
 * @param setShow Hook to alter show/hide
 * @param content The ContentImage to edit
 * @constructor
 */
export default function ImageCOE({ show, setShow, content }: ImageCOEProps) {
    defineInlineCSS();
    // States, contexts, and referencces
    const [images, setImages] = useState([defaultLogo, img1, img2, img3, img4]);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1);
    const CTDispatcher = useContext(ContentTreeContext);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

    //
    // Helper functions
    //

    /**
     * Returns the current css-text from the css-editor, or "" if the editor is not available.
     */
    function getCSSFromMonaco():string {
        if (editorRef !== undefined && editorRef.current !== undefined) { return editorRef.current.getValue(); }
        return '';
    }

    /**
     * Updates the current image on the page, using CTDispatcher.
     * @param imgHref url to the image.
     * @returns a boolean inidcating the success of the update.
     */
    function updateImage(imgHref: string):boolean {
        // TODO use JSS type-def.
        let jss:object = {};

        try {
            jss = postcssJs.objectify(postcss.parse(getCSSFromMonaco()));
        } catch {
            alert('Invalid CSS.');
            return false;
        }
        const newImage = { ...content, image: { ...content.image, href: imgHref }, attributes: { ...content.attributes, style: jss } };
        CTDispatcher({ id: content.id, value: newImage });
        return true;
    }

    // Attempt to load the style into the CSS-editor (I know, "as any" is kinda sketch, but this will do for now...)
    let cssStyle = '';
    try { cssStyle = postcssJs.parse((content.attributes as any).style); } finally { /* eslint-disable-next-line */ }
    const [cssValidity, setCssValidity] = useState(checkCSSValidity(cssStyle));

    return (
        <Modal
            show={show}
            onHide={() => { setShow(false); }}
            size="xl"
            aria-labelledby="image-picker"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="image-picker">Välj en bild</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="h-100 mt-4">
                    {/* Image list */}
                    <Col>
                        <Row>
                            <Col xs={8} lg={3} className="py-2">
                                <ImageDropUpload onUpload={(imgs: File[]) => { setImages([...images, ...imgs.map((img) => URL.createObjectURL(img))]); }} dropZoneProps={{}}></ImageDropUpload>
                            </Col>

                            {images.map((imgSrc, index) => (
                                <Col key={index} xs={4} lg={3} className={'my-auto' + (index === selectedImageIdx ? ' border' : '')}>
                                    <Image className="m-2" fluid={true} src={imgSrc} onClick={() => { setSelectedImageIdx(index); }} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Properties */}
                    <Col xs={3} className="border-left">
                        {selectedImageIdx === -1 && (<p>Klicka på en fil för att välja den.</p>)}

                        <Form>
                            {selectedImageIdx > -1 && (<>
                                <h5>Filegenskaper:</h5>
                                <Form.Group as={Row} controlId="imagePickerUrlShow">
                                    <Form.Label column sm="2">URL:</Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext value={images[selectedImageIdx]} onChange={() => ''} />
                                    </Col>
                                </Form.Group>
                            </>
                            )}

                            <h5>Visning:</h5>
                            <Form.Group as={Row} controlId="imagePickerCSSEdit">
                                <Col>
                                    <Editor
                                        height="15vh"
                                        className="border"

                                        language = "icss"
                                        defaultValue = {'/* CSS: */\n' + cssStyle}
                                        loading = {('Läser in CSS-redigerare...')}

                                        options = {{
                                            lineNumbers: 'off',
                                            glyphMargin: false,
                                            folding: false,
                                            lineDecorationsWidth: 0,
                                            lineNumbersMinChars: 0,
                                            codeLens: false,
                                            minimap: { enabled: false }
                                        }}

                                        onMount={(editor: monaco.editor.IStandaloneCodeEditor) => { editorRef.current = editor; }}
                                        onChange = {(value) => {
                                            setCssValidity(checkCSSValidity(value));
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { setShow(false); }}>Avbryt</Button>
                <Button disabled={selectedImageIdx === -1 || !cssValidity} onClick={() => { updateImage(images[selectedImageIdx]) && setShow(false); }}>Välj denna bild</Button>
            </Modal.Footer>
        </Modal>
    );
}
