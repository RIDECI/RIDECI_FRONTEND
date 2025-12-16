// Mock storage para pagos (localStorage)

export interface SavedCardData {
  id: string;
  userId: string;
  cardHolder: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  alias: string;
  isDefault: boolean;
  createdAt: string;
}

export interface BrebKeyData {
  id: string;
  userId: string;
  bankName: string;
  accountType: string;
  keyValue: string;
  createdAt: string;
}

export interface TransactionData {
  id: string;
  bookingId: string;
  passengerId: string;
  amount: number;
  paymentMethod: string;
  extra: string;
  receiptCode: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
}

const CARDS_KEY = 'rideci_saved_cards';
const BREB_KEYS_KEY = 'rideci_breb_keys';
const TRANSACTIONS_KEY = 'rideci_transactions';

// ============ CARDS ============

export function getSavedCards(userId: string): SavedCardData[] {
  const data = localStorage.getItem(CARDS_KEY);
  if (!data) return [];
  const allCards: SavedCardData[] = JSON.parse(data);
  return allCards.filter(card => card.userId === userId);
}

export function saveCard(cardData: Omit<SavedCardData, 'id' | 'createdAt'>): SavedCardData {
  const data = localStorage.getItem(CARDS_KEY);
  const allCards: SavedCardData[] = data ? JSON.parse(data) : [];
  
  const newCard: SavedCardData = {
    ...cardData,
    id: `CARD-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  allCards.push(newCard);
  localStorage.setItem(CARDS_KEY, JSON.stringify(allCards));
  
  return newCard;
}

export function deleteCard(cardId: string): boolean {
  const data = localStorage.getItem(CARDS_KEY);
  if (!data) return false;
  
  const allCards: SavedCardData[] = JSON.parse(data);
  const filtered = allCards.filter(card => card.id !== cardId);
  
  localStorage.setItem(CARDS_KEY, JSON.stringify(filtered));
  return true;
}

// ============ BREB KEYS ============

export function getBrebKeys(userId: string): BrebKeyData[] {
  const data = localStorage.getItem(BREB_KEYS_KEY);
  if (!data) return [];
  const allKeys: BrebKeyData[] = JSON.parse(data);
  return allKeys.filter(key => key.userId === userId);
}

export function saveBrebKey(keyData: Omit<BrebKeyData, 'id' | 'createdAt'>): BrebKeyData {
  const data = localStorage.getItem(BREB_KEYS_KEY);
  const allKeys: BrebKeyData[] = data ? JSON.parse(data) : [];
  
  const newKey: BrebKeyData = {
    ...keyData,
    id: `BREB-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  allKeys.push(newKey);
  localStorage.setItem(BREB_KEYS_KEY, JSON.stringify(allKeys));
  
  return newKey;
}

export function deleteBrebKey(keyId: string): boolean {
  const data = localStorage.getItem(BREB_KEYS_KEY);
  if (!data) return false;
  
  const allKeys: BrebKeyData[] = JSON.parse(data);
  const filtered = allKeys.filter(key => key.id !== keyId);
  
  localStorage.setItem(BREB_KEYS_KEY, JSON.stringify(filtered));
  return true;
}

// ============ TRANSACTIONS ============

export function createTransaction(txData: Omit<TransactionData, 'id' | 'createdAt' | 'status'>): TransactionData {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions: TransactionData[] = data ? JSON.parse(data) : [];
  
  const newTransaction: TransactionData = {
    ...txData,
    id: `TX-${Date.now()}`,
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  };
  
  allTransactions.push(newTransaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(allTransactions));
  
  return newTransaction;
}

export function getTransaction(txId: string): TransactionData | null {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  if (!data) return null;
  
  const allTransactions: TransactionData[] = JSON.parse(data);
  return allTransactions.find(tx => tx.id === txId) || null;
}

export function getTransactionHistory(userId: string): TransactionData[] {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  if (!data) return [];
  
  const allTransactions: TransactionData[] = JSON.parse(data);
  return allTransactions
    .filter(tx => tx.passengerId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
