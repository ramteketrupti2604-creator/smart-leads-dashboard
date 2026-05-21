// 1. User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Sales User';
}

// 2. Auth State Interface
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// 3. Lead Interface
export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;
  updatedAt: string;
}

// 4. Pagination Metadata Interface
export interface PaginationMeta {
  totalLeads: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}