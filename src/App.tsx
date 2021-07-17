import React, { useState } from 'react';
import useSWR from 'swr';
import { Locale, LocaleContext, locales } from './contexts';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Site } from './types/api_object_types';
import Admin from './components/admin/Admin';
import PageTypeLoader from './components/PageTypeLoader';

import { CenteredError } from './components/Centered';

import './App.css';
import { get as callApi } from './api/main';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);

    const { data, error } = useSWR(['/site/'], (path) => callApi<Site>({ path: path, validator: 'Site' }), {});

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>
                <Switch>
                    <Route exact={true} path="/admin"><Redirect to={'/admin/pages/'} /></Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route>
                        {data &&
                        <Header content={
                            locale === locales.sv
                                ? data.data.bannerContentSv
                                : data.data.bannerContentEn
                        } setLocale={setLocale} />}
                        {!error &&
                        <div className="content">
                            <PageTypeLoader />
                        </div>}
                        {error &&
                        <div className="content">
                            <CenteredError message={error.message} descriptionSv= '...när site-objektet skulle laddas.' descriptionEn = "Could not load site."/>
                        </div>}
                        {data &&
                        <Footer content={
                            locale === locales.sv
                                ? data.data.footerContentSv
                                : data.data.footerContentEn
                        } />}
                    </Route>
                </Switch>
            </LocaleContext.Provider>
        </div>
    );
}

export default App;
