import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_PROFILES = {
  customer: {
    id: 'user-cust-1',
    role: 'customer',
    name: 'Aarav Patel',
    phone: '9876543210',
    email: 'aarav.patel@burlamart.in',
    address: 'Hall-4, VSSUT Campus, Burla, Sambalpur (Pin 768018)',
    roleTitle: 'Customer / Consumer',
    isMembershipActive: true,
  },
  vendor: {
    id: 'user-vend-1',
    role: 'vendor',
    name: 'Ramesh Sharma',
    phone: '9822233445',
    email: 'ramesh@burlamartburla.com',
    address: 'VSSUT Road, Main Market, Burla, Sambalpur (Pin 768018)',
    activeVendorId: 'shop-1',
    shopName: 'Burlamart Fresh Supermart',
    roleTitle: 'Vendor (Merchant Partner)',
  },
  rider: {
    id: 'user-rider-1',
    role: 'rider',
    name: 'Deepak Kumar',
    phone: '9811122334',
    email: 'deepak.rider@burlamart.com',
    vehicle: 'Hero Splendor Plus (OD 15 AB 4321)',
    activeRiderId: 'rider-1',
    roleTitle: 'Delivery Partner (Rider)',
  },
  admin: {
    id: 'user-admin-1',
    role: 'admin',
    name: 'Vikramaditya Rao',
    phone: '9900011223',
    email: 'admin.ops@burlamart.com',
    roleTitle: 'Platform Operations Admin',
  }
};

export const AuthProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('burlamart_role') || 'customer';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('burlamart_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    const role = localStorage.getItem('burlamart_role') || 'customer';
    return DEMO_PROFILES[role] || DEMO_PROFILES.customer;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('burlamart_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('burlamart_role', currentRole);
    localStorage.setItem('burlamart_user', JSON.stringify(currentUser));
    localStorage.setItem('burlamart_auth', isAuthenticated ? 'true' : 'false');
  }, [currentRole, currentUser, isAuthenticated]);

  const switchRole = (role) => {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES.customer;
    setCurrentRole(role);
    setCurrentUser(profile);
    setIsAuthenticated(true);
  };

  const switchVendorShop = (shopObj) => {
    if (!shopObj) return;
    setCurrentUser(prev => ({
      ...prev,
      activeVendorId: shopObj.id,
      shopName: shopObj.name,
      activeVendorCategory: shopObj.category
    }));
  };

  const requestOtp = async (phone) => {
    // Simulate network delay for OTP dispatch
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      otp: '1234',
      message: 'OTP 1234 sent successfully to +91 ' + phone
    };
  };

  const verifyOtp = async (phone, otp, selectedRole = 'customer') => {
    await new Promise(r => setTimeout(r, 600));
    
    // Accept standard demo OTP "1234" or any 4-digit code
    if (!otp || otp.length < 4) {
      return { success: false, message: 'Please enter a valid 4-digit OTP' };
    }

    // Match or create profile
    let targetProfile = Object.values(DEMO_PROFILES).find(
      p => p.phone === phone.replace(/\D/g, '') || (p.role === selectedRole)
    );

    if (!targetProfile) {
      targetProfile = {
        id: `user-${Date.now()}`,
        role: selectedRole,
        name: `User ${phone.slice(-4)}`,
        phone: phone.replace(/\D/g, ''),
        email: `user${phone.slice(-4)}@burlamart.com`,
        roleTitle: selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
      };
    } else {
      // Ensure role matches selected role
      targetProfile = { ...targetProfile, role: selectedRole };
    }

    setCurrentRole(selectedRole);
    setCurrentUser(targetProfile);
    setIsAuthenticated(true);

    return {
      success: true,
      user: targetProfile,
      redirectPath: selectedRole === 'admin' 
        ? '/admin' 
        : selectedRole === 'vendor' 
          ? '/vendor' 
          : selectedRole === 'rider' 
            ? '/rider' 
            : '/'
    };
  };

  const logout = () => {
    setCurrentRole('customer');
    setCurrentUser(DEMO_PROFILES.customer);
    setIsAuthenticated(false);
    localStorage.removeItem('burlamart_auth');
  };

  return (
    <AuthContext.Provider value={{
      currentRole,
      switchRole,
      switchVendorShop,
      currentUser,
      setCurrentUser,
      isAuthenticated,
      requestOtp,
      verifyOtp,
      logout,
      DEMO_PROFILES
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


