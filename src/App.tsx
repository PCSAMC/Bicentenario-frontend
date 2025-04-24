import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './router/appRouter';
import "./index.css";
function App() {
  const clientId="151774253766-3ae00o0so1ihjhun8fauie3hpi30f8mu";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;
