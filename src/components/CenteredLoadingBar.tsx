import React from 'react';
import { Container, Row, Image } from 'react-bootstrap';

/**
 * Shows a loading spinner, centered in the page. Mock for now.
 */
export default function CenteredLoadingBar(): JSX.Element {
    return (
        <Container className="my-6">
            <Row className='justify-content-center'>
                <Image src="/mediafiles/placeholder_images/Fysiksektionen_logo.a.svg" />
            </Row>
        </Container>

    );
}
