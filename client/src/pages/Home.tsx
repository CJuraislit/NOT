import React, { useCallback, useState } from 'react';
import { useTemplateQuery } from '/hooks/queries/template.queries';
import UIButton from '/components/UI/UIButton/UIButton';
import PixelGridInteractive from '/components/features/PixelGridInteractive/PixelGridInteractive';
import { userAttemptPixelMutation } from '/hooks/mutations/template.mutations';
import { usePixelSelectStore } from '/store/pixelSelcet.store';

const Home = () => {
  const [showGrid, setShowGrid] = useState(true);
  const { data, isLoading, isError } = useTemplateQuery(3);
  const { mutate, isPending } = userAttemptPixelMutation(3);
  const selected = usePixelSelectStore((s) => s.selected);

  const handleAttempt = useCallback(() => {
    if (!selected) return;
    mutate({ x: selected.x, y: selected.y });
  }, [mutate, selected]);

  if (isLoading) return null;
  if (isError || !data) return null;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <p>{data.name}</p>
      <div style={{ padding: '10px', border: '4px solid #9e9e9b' }}>
        <PixelGridInteractive
          gridWidth={data.width}
          gridHeight={data.height}
          showGrid={showGrid}
          solvedCoords={data.solvedCoords}
          solvedCount={data.solvedCount}
          isCompleted={data.isCompleted}
          cellSize={10}
        />
      </div>
      <UIButton disabled={!selected || isPending} onClick={handleAttempt}>
        {isPending ? 'Checking...' : 'Check pixel'}
      </UIButton>
      <UIButton onClick={() => setShowGrid(!showGrid)}>
        {showGrid ? 'Hide grid' : 'Show grid'}
      </UIButton>
    </div>
  );
};

export default Home;
