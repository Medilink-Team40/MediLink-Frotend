import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/config/AuthProvider';
import { router } from '@/routes/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;