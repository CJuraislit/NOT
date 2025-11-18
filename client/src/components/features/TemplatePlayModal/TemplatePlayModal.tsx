import React, { useCallback, useState } from 'react';
import { TemplatePlayModalProps } from '/components/features/TemplatePlayModal/types';
import { usePixelSelectStore } from '/store/pixelSelcet.store';
import { userAttemptPixelMutation } from '/hooks/mutations/template.mutations';
import { calcCellSize } from '/utils/grid';
import UIModal from '/components/UI/UIModal/UIModal';
import PixelGridInteractive from '/components/features/PixelGridInteractive/PixelGridInteractive';
import UIButton from '/components/UI/UIButton/UIButton';

const TemplatePlayModal = (props: TemplatePlayModalProps) => {
  const { open, onClose, template } = props;
  const [showGrid, setShowGrid] = useState(true);

  const selected = usePixelSelectStore((s) => s.selected);
  const clearSelected = usePixelSelectStore((s) => s.clear);
  const { mutate, isPending } = userAttemptPixelMutation(template.id);

  const handleAttempt = useCallback(() => {
    if (!selected) return;
    mutate({ x: selected.x, y: selected.y });
  }, [mutate, selected]);

  const handleClose = () => {
    clearSelected();
    onClose();
  };

  const cellSize = calcCellSize(template.width, template.height);

  return (
    <UIModal isOpen={open} onClose={handleClose} title={template.name}>
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
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
        <UIButton onClick={() => setShowGrid(!showGrid)}>
          {showGrid ? 'Hide grid' : 'Show grid'}
        </UIButton>
        <UIButton disabled={!selected || isPending} onClick={handleAttempt}>
          {isPending ? 'Checking...' : 'Check pixel'}
        </UIButton>
      </div>
    </UIModal>
  );
};

export default TemplatePlayModal;
