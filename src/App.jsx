import { useState } from 'react'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from "./routes/index.jsx"
import store from './store/store.js';
import { Provider } from 'react-redux';
import MessageToast from './components/MessageToast.jsx';

const router = createHashRouter(routes);

function App() {

  return (
    <>
    <Provider store={store}>
      <MessageToast />
      <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
