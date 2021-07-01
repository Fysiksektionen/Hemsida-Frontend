import React from 'react';
import { LocaleContext, locales } from '../contexts';

export function CenteredText(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'text-center ' + props.className}>{props.children}</div>
    );
}

export function CenteredAbsolute(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{props.children}</div>
    );
}

export function CenteredMargin(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'m-auto ' + props.className}>{props.children}</div>
    );
}

type CenteredErrorProps = {
    message: string,
    titleSv: string,
    titleEn: string,
    descriptionSv: string,
    descriptionEn: string,
}

export function CenteredError(props: CenteredErrorProps) {
    return (
        <LocaleContext.Consumer>
            { locale =>
                <CenteredText>
                    <CenteredAbsolute>
                        <h1>{locale === locales.sv ? props.titleSv : props.titleEn}</h1>
                        <p>
                            {locale === locales.sv ? props.descriptionSv : props.descriptionEn}
                            <br/>
                            {props.message}
                        </p>
                    </CenteredAbsolute>
                </CenteredText>
            }
        </LocaleContext.Consumer>);
}

CenteredError.defaultProps = {
    titleSv: 'Något gick snett...',
    titleEn: 'Error',
    descriptionSv: '',
    descriptionEn: ''
};
