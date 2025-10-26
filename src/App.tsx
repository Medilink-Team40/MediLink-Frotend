import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { SidebarProvider } from './contexts/SidebarContext';


function App() {
  return (
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
    
  );
}


export default App;