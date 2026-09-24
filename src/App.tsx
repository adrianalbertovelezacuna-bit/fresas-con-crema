/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { Interactive3DViewer } from './components/Interactive3DViewer';
import { AIDocumentScanner } from './components/AIDocumentScanner';
import { AboutAndValues } from './components/AboutAndValues';
import { CustomerOrdersTracker } from './components/CustomerOrdersTracker';
import { CartDrawer } from './components/CartDrawer';
import { CustomerVerificationModal } from './components/CustomerVerificationModal';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS } from './data/catalog';
import { Product, CartItem, VerifiedCustomer, GitHubSyncLog } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [placedOrders, setPlacedOrders] = useState<any[]>([]);

  // Customer verification state (persisted locally)
  const [customer, setCustomer] = useState<VerifiedCustomer | null>(() => {
    try {
      const saved = localStorage.getItem('sweet_berry_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // GitHub CI/CD sync logs
  const [syncLogs, setSyncLogs] = useState<GitHubSyncLog[]>([
    {
      commitHash: '7c89f1a',
      message: 'feat(catalog): initial spring stock release v2.4',
      timestamp: '14:20:10',
      branch: 'main',
      status: 'SYNCED',
      revision: 'sweet-berry-prod-7c89f1a',
      syncedItemsCount: 3
    }
  ]);

  // Save customer profile on change
  useEffect(() => {
    if (customer) {
      try {
        localStorage.setItem('sweet_berry_customer', JSON.stringify(customer));
      } catch (e) {
        console.error(e);
      }
    }
  }, [customer]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if matching item exists
      const existingIdx = prev.findIndex(
        i =>
          i.productId === item.productId &&
          i.portionName === item.portionName &&
          i.selectedCream === item.selectedCream &&
          JSON.stringify(i.selectedToppings) === JSON.stringify(item.selectedToppings)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Stock update from AI Document Scanner
  const handleUpdateStock = (
    updates: { productId: string; addedStock: number; unitCost: number; batchCode: string }[]
  ) => {
    setProducts(prev =>
      prev.map(prod => {
        const update = updates.find(u => u.productId === prod.id);
        if (update) {
          return {
            ...prod,
            stock: prod.stock + update.addedStock
          };
        }
        return prod;
      })
    );
  };

  const handleAddSyncLog = (newLog: GitHubSyncLog) => {
    setSyncLogs(prev => [newLog, ...prev]);
  };

  const handleOrderPlaced = (orderData: any) => {
    setPlacedOrders(prev => [orderData, ...prev]);
    // Deduct stock for ordered items
    setProducts(prev =>
      prev.map(prod => {
        const ordered = cartItems.find(c => c.productId === prod.id);
        if (ordered) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - ordered.quantity)
          };
        }
        return prod;
      })
    );
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col selection:bg-[#E11D48] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        customer={customer}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreClick={() => {
            document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomizerClick={() => {
            document.getElementById('personalizador-3d')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Active Orders Tracker (if any order placed) */}
        <CustomerOrdersTracker orders={placedOrders} />

        {/* 2. Page 3 of PDF: Nuestros Productos */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={() => {
            document.getElementById('personalizador-3d')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Interactive 3D Gourmet Customizer */}
        <Interactive3DViewer
          onAddToCart={handleAddToCart}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
          isVerified={!!customer?.isVerified}
        />

        {/* 4. AI Document & Invoices Scanner + Real-time Inventory & GitHub Pipeline */}
        <AIDocumentScanner
          products={products}
          onUpdateStock={handleUpdateStock}
          syncLogs={syncLogs}
          onAddSyncLog={handleAddSyncLog}
        />

        {/* 5. Page 2, 4 & 5 of PDF: Conócenos, Objetivos & Formulario Online */}
        <AboutAndValues
          customer={customer}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
        />
      </main>

      {/* Footer honoring Page 6 of PDF */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        customer={customer}
        onOpenVerification={() => {
          setIsCartOpen(false);
          setIsVerificationModalOpen(true);
        }}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Mandatory Customer Registration & Verification 2FA Modal */}
      <CustomerVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onVerified={verifiedProfile => {
          setCustomer(verifiedProfile);
        }}
        currentCustomer={customer}
      />
    </div>
  );
}
