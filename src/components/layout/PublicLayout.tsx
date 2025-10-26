import MobileMenu from '@/components/ui/MobileMenu';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { Outlet } from 'react-router-dom';

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
    </div>
  );
};

export default PublicLayout;