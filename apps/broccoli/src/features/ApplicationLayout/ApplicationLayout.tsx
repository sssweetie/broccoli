import { Navigation } from './components/Navigation';
import { useApplicationLayout } from './hooks/useApplicationLayout';
import { Content } from './components/Content';

export const ApplicationLayout: React.FC = () => {
  const applicationLayoutProps = useApplicationLayout();
  
  return (
    <main className="app-wrapper">
      <Navigation />
      <Content {...applicationLayoutProps} />
    </main>
  );
};
