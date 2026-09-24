export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  basePrice: number; // in COP (approx $14,500 COP)
  image: string;
  category: 'clasica' | 'especial' | 'personalizada';
  stock: number;
  badge?: string;
  portionSizes: {
    name: string;
    grams: string;
    multiplier: number;
  }[];
  includedIngredients: string[];
  recommendedToppings: string[];
}

export interface CartItem {
  id: string; // unique item uuid
  productId: string;
  name: string;
  portionName: string;
  price: number;
  quantity: number;
  image: string;
  selectedCream: string;
  selectedToppings: string[];
  customerNote?: string;
}

export interface VerifiedCustomer {
  isVerified: boolean;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  verificationToken: string;
  verifiedAt: string;
  badgeNumber: string;
}

export interface InventoryBatch {
  id: string;
  productName: string;
  batchCode: string;
  quantityAdded: number;
  unit: string;
  supplier: string;
  receivedAt: string;
  expirationDate: string;
  unitCost: number;
  qualityPassed: boolean;
}

export interface ExtractedDocumentData {
  provider: {
    name: string;
    taxId: string;
    invoiceNumber: string;
    date: string;
  };
  summary: {
    subtotal: number;
    total: number;
    currency: string;
    itemsCount: number;
  };
  extractedItems: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    unitCost: number;
    suggestedRetailPrice: number;
    batchNumber: string;
    expirationDate: string;
    qualityNotes: string;
    impactedProducts: string[];
  }[];
  confidenceScore: number;
  insights: string;
}

export interface GitHubSyncLog {
  commitHash: string;
  message: string;
  timestamp: string;
  branch: string;
  status: 'PENDING' | 'BUILDING' | 'DEPLOYED' | 'SYNCED';
  revision: string;
  syncedItemsCount: number;
}
