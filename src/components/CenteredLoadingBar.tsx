import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { LocaleContext, locales } from '../contexts';

/**
 * Shows a loading spinner, centered in the page. Mock for now.
 */
export default function CenteredLoadingBar(): JSX.Element {
    // TODO: Make this non-mock.
    return (
        <LocaleContext.Consumer>
            {
                locale => (
                    <Container>
                        <Row className='justify-content-center'>
                            <h3>{(locale === locales.sv ? 'Laddar...' : 'Loading...')}</h3>
                        </Row>
                    </Container>)
            }
        </LocaleContext.Consumer>
    );
}
