import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Skeleton, Row, Col, Empty, Alert, Spin } from 'antd';
import { FixedSizeList as List } from 'react-window';
import { PageHeading } from '../../components/Headings';
import { projectsList } from './list';
import type { IProductCard } from '../../components/ProjectCard/ProjectCard';

// Lazy load the ProjectCard component
const ProjectCard = lazy(() =>
  import('../../components/ProjectCard/ProjectCard').then(module => ({
    default: module.ProjectCard
  }))
);

// Error Boundary Component
class ProjectsErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ProjectsList Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} />;
      }
      return (
        <Alert
          message="Error Loading Projects"
          description="Something went wrong while loading the projects. Please try refreshing the page."
          type="error"
          showIcon
        />
      );
    }

    return this.props.children;
  }
}

// Skeleton loader for individual project cards
const ProjectCardSkeleton: React.FC = () => (
  <div className="w-full min-w-[250px] max-w-[600px] p-4">
    <Skeleton.Image style={{ width: '100%', height: '200px' }} active />
    <div className="mt-4 space-y-3">
      <Skeleton.Input style={{ width: '60%' }} active />
      <Skeleton paragraph={{ rows: 3 }} active />
      <div className="flex justify-between items-center mt-4">
        <Skeleton.Button style={{ width: '120px' }} active />
        <Skeleton.Avatar size="small" active />
      </div>
    </div>
  </div>
);

// Grid container for better responsive layout
const ProjectsGrid: React.FC<{
  projects: IProductCard[];
  loading: boolean;
  error: string | null;
}> = ({ projects, loading, error }) => {
  // Memoize the project cards to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, [projects]);

  if (error) {
    return (
      <Alert
        message="Failed to Load Projects"
        description={error}
        type="error"
        showIcon
        className="m-4"
      />
    );
  }

  if (loading) {
    return (
      <Row gutter={[24, 24]} className="p-4 pt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <Col
            key={`skeleton-${index}`}
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
          >
            <ProjectCardSkeleton />
          </Col>
        ))}
      </Row>
    );
  }

  if (!memoizedProjects.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Empty
          description="No projects found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]} className="p-4 pt-8">
      {memoizedProjects.map((project) => (
        <Col
          key={project.id}
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
        >
          <Suspense fallback={<ProjectCardSkeleton />}>
            <ProjectCard {...project} />
          </Suspense>
        </Col>
      ))}
    </Row>
  );
};

// Virtualized list for better performance with large datasets
const VirtualizedProjectsList: React.FC<{
  projects: IProductCard[];
  itemsPerRow: number;
  itemHeight: number;
}> = ({ projects, itemsPerRow, itemHeight }) => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < projects.length; i += itemsPerRow) {
      result.push(projects.slice(i, i + itemsPerRow));
    }
    return result;
  }, [projects, itemsPerRow]);

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const rowProjects = rows[index];
    return (
      <div style={style} className="flex gap-6 px-4">
        {rowProjects.map((project) => (
          <div key={project.id} className="flex-1 min-w-0">
            <Suspense fallback={<ProjectCardSkeleton />}>
              <ProjectCard {...project} />
            </Suspense>
          </div>
        ))}
      </div>
    );
  }, [rows]);

  return (
    <List
      height={800} // Adjust based on your needs
      itemCount={rows.length}
      itemSize={itemHeight}
      className="w-full"
    >
      {Row}
    </List>
  );
};

// Custom hook for projects data management
const useProjectsData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<IProductCard[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate async loading - replace with actual data fetching
        await new Promise(resolve => setTimeout(resolve, 500));

        // Uncomment and modify this section for Google Drive integration
        // try {
        //   const googleDriveData = await listFiles('myFolder/');
        //   // Process and merge with projectsList if needed
        // } catch (driveError) {
        //   console.warn('Google Drive data unavailable:', driveError);
        // }

        setProjects(projectsList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error, refetch: () => loadProjects() };
};

// Main component with optimizations
const ProjectsList: React.FC = () => {
  const { projects, loading, error } = useProjectsData();
  const [useVirtualization, setUseVirtualization] = useState(false);

  // Determine if virtualization should be used based on project count
  useEffect(() => {
    setUseVirtualization(projects.length > 20);
  }, [projects.length]);

  // Memoize the heading to prevent unnecessary re-renders
  const heading = useMemo(() => <PageHeading text="Projects" />, []);

  return (
    <ProjectsErrorBoundary>
      <div className="flex w-full flex-col min-h-screen">
        {heading}

        {/* Loading indicator for the entire component */}
        <Spin spinning={loading && projects.length === 0} size="large">
          {useVirtualization && projects.length > 0 ? (
            <VirtualizedProjectsList
              projects={projects}
              itemsPerRow={3} // Adjust based on your layout needs
              itemHeight={400} // Adjust based on your card height
            />
          ) : (
            <ProjectsGrid
              projects={projects}
              loading={loading}
              error={error}
            />
          )}
        </Spin>
      </div>
    </ProjectsErrorBoundary>
  );
};

export default React.memo(ProjectsList);