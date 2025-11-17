import React, { useCallback, useState } from 'react';
import { useTemplateQuery, useTemplatesQuery } from '/hooks/queries/template.queries';
import UIButton from '/components/UI/UIButton/UIButton';
import PixelGridInteractive from '/components/features/PixelGridInteractive/PixelGridInteractive';
import { userAttemptPixelMutation } from '/hooks/mutations/template.mutations';
import { usePixelSelectStore } from '/store/pixelSelcet.store';

const Home = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: templates, isLoading, isError } = useTemplatesQuery();

  const activeTemplateId = templates?.[activeIndex]?.id;

  const {
    data: template,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = useTemplateQuery(activeTemplateId);

  const { mutate, isPending } = userAttemptPixelMutation(activeTemplateId);
  const selected = usePixelSelectStore((s) => s.selected);
  const clearSelected = usePixelSelectStore((s) => s.clear);

  const handleAttempt = useCallback(() => {
    if (!selected || !activeTemplateId) return;
    mutate({ x: selected.x, y: selected.y });
  }, [mutate, selected, activeTemplateId]);

  const changeTemplate = (direction: 'prev' | 'next') => {
    if (!templates) return;

    const delta = direction === 'prev' ? -1 : 1;
    const nextIndex = activeIndex + delta;

    if (nextIndex < 0 || nextIndex >= templates.length) return;

    clearSelected();
    setActiveIndex(nextIndex);
  };

  if (isLoading) return null;
  if (isError || !templates) return null;

  if (isTemplateLoading || isTemplateError || !template) return null;

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
      <p>{template.name}</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button disabled={activeIndex === 0} onClick={() => changeTemplate('prev')}>
          {'<'}
        </button>
        <span>
          {activeIndex + 1} / {templates.length}
        </span>
        <button
          disabled={activeIndex === templates.length - 1}
          onClick={() => changeTemplate('next')}
        >
          {'>'}
        </button>
      </div>

      <div style={{ padding: '10px', border: '4px solid #9e9e9b' }}>
        <PixelGridInteractive
          gridWidth={template.width}
          gridHeight={template.height}
          showGrid={showGrid}
          solvedCoords={template.solvedCoords}
          solvedCount={template.solvedCount}
          isCompleted={template.isCompleted}
          // cellSize={10}
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
