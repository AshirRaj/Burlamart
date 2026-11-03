import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerHeader } from '../components/customer/CustomerHeader';
import { PersistentCartBar } from '../components/customer/PersistentCartBar';
import { CustomerFooter } from '../components/customer/CustomerFooter';
import { ShopConflictModal } from '../components/common/ShopConflictModal';
import { BurlamartSupportChatbot } from '../components/chatbot/BurlamartSupportChatbot';
import { MobileBottomNav } from '../components/customer/MobileBottomNav';

export const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col w-full max-w-full overflow-x-hidden">
      <CustomerHeader />
      <main className="flex-1 pb-24 sm:pb-16 w-full max-w-full">
        <Outlet />
      </main>
      <PersistentCartBar />
      <CustomerFooter />
      <ShopConflictModal />
      <BurlamartSupportChatbot />
      <MobileBottomNav />
    </div>
  );
};

