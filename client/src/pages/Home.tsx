import React, { useCallback, useState } from 'react';
import { useTemplateQuery, useTemplatesQuery } from '/hooks/queries/template.queries';
import UIButton from '/components/UI/UIButton/UIButton';
import PixelGridInteractive from '/components/features/PixelGridInteractive/PixelGridInteractive';
import { userAttemptPixelMutation } from '/hooks/mutations/template.mutations';
import { usePixelSelectStore } from '/store/pixelSelcet.store';
import { calcCellSize } from '/utils/grid';
import PixelGridPreview from '/components/features/PixelGridPreview/PixelGridPreview';
import UIModal from '/components/UI/UIModal/UIModal';

const Home = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    clearSelected();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    clearSelected();
    setIsModalOpen(false);
  };

  if (isLoading) return null;
  if (isError || !templates) return null;

  if (isTemplateLoading || isTemplateError || !template) return null;

  const cellSize = calcCellSize(template.width, template.height);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
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
        <PixelGridPreview
          gridWidth={template.width}
          gridHeight={template.height}
          solvedCoords={template.solvedCoords}
          solvedCount={template.solvedCount}
          isCompleted={template.isCompleted}
          cellSize={cellSize}
        />
      </div>
      <UIButton onClick={handleOpenModal}>Play</UIButton>

      <UIModal isOpen={isModalOpen} onClose={handleCloseModal} title={template.name}>
        <div style={{ padding: '10px', border: '4px solid #9e9e9b' }}>
          <PixelGridInteractive
            gridWidth={template.width}
            gridHeight={template.height}
            showGrid={showGrid}
            solvedCoords={template.solvedCoords}
            solvedCount={template.solvedCount}
            isCompleted={template.isCompleted}
            cellSize={cellSize}
          />
        </div>
        <div
          style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}
        >
          <UIButton disabled={!selected || isPending} onClick={handleAttempt}>
            {isPending ? 'Checking...' : 'Check pixel'}
          </UIButton>
          <UIButton onClick={() => setShowGrid(!showGrid)}>
            {showGrid ? 'Hide grid' : 'Show grid'}
          </UIButton>
        </div>
      </UIModal>
    </div>
  );
};

export default Home;
