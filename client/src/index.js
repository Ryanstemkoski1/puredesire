import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import "./i18nextInit";
import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from "react-query"

// import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/*<Router>*/}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/*</Router>,*/}
  </React.StrictMode>,
);

// ReactDOM.createRoot(
//     <>
//         <App />
//     </>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
