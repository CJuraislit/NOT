import React, { useState } from 'react';
import UIButton from '/components/UI/UIButton/UIButton';
import { calcCellSize } from '/utils/grid';
import PixelGridPreview from '/components/features/PixelGridPreview/PixelGridPreview';
import TemplatePlayModal from '/components/features/TemplatePlayModal/TemplatePlayModal';
import { useActiveTemplate } from '/hooks/useActiveTemplate';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    templates,
    template,
    activeIndex,
    isListLoading,
    isListError,
    isTemplateLoading,
    isTemplateError,
    changeTemplate,
  } = useActiveTemplate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (isListLoading) return null;
  if (isListError || !templates) return null;

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

      <TemplatePlayModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={template}
      />
    </div>
  );
};

export default Home;
