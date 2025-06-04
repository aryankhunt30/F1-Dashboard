import { ReactNode } from 'react';

declare module '@/components/shared/DashboardLayout' {
  interface DashboardLayoutProps {
    children: ReactNode;
  }
  
  const DashboardLayout: React.FC<DashboardLayoutProps>;
  export default DashboardLayout;
}

declare module '@/components/shared/Card' {
  interface CardProps {
    children: ReactNode;
    className?: string;
  }
  
  export const Card: React.FC<CardProps>;
}

declare module '@/components/dashboard/DriverStandingsChart' {
  export const DriverStandingsChart: React.FC;
}

declare module '@/components/dashboard/RaceAnalysis' {
  export const RaceAnalysis: React.FC;
}

declare module '@/components/dashboard/CircuitAnalysis' {
  export const CircuitAnalysis: React.FC;
} 