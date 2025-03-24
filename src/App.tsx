import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './router/appRouter';

function App() {
  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;
