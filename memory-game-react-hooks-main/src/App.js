import { useState } from "react";
import { StoreProvider } from './store/Store';
import { rootReducer, initialState } from './store/reducers';
import { AxiosInstance } from './shared/services/axios-instance';
import LoadingSpinner from './shared/components/loading-spinner';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  /**
   * Axios interceptors for loading symbol enable and disable
   */
  AxiosInstance.interceptors.request.use(request => {
    setLoading(true);
    return request;
  });

  AxiosInstance.interceptors.response.use(response => {
    setLoading(false);
    return response;
  }, error => {
    setLoading(false);
    throw error;
  })



  return (
    <StoreProvider initialState={initialState} reducer={rootReducer}>
      <>
        <LoadingSpinner loading={loading} />
        <MemoryGame />
      </>
    </StoreProvider>
  );
}

export default App;
