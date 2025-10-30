import MobileMenu from '@/components/ui/MobileMenu';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { Outlet } from 'react-router-dom';
import ChatAssistant from '../chat/ChatAssistant';

const PublicLayout = () => {
  const { isOpen, closeMenu } = useMobileMenu();

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
      <ChatAssistant
        n8nWebhookUrl={import.meta.env.VITE_N8N_WEBHOOK_URL}
        position="bottom-right"
        primaryColor='#3B82F6'
      />
    </div>
  );
};

export default PublicLayout;