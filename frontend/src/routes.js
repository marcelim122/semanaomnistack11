import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; /*npm install react-route-dom, instala o pacote de rotas*/

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

/*switch permite qeu apenas uma rota seja chamada por momento*/
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}