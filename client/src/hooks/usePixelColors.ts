import { useEffect, useState } from 'react';
import { readCssVars } from '/utils/utils';

export type PixelColors = {
  bg: string;
  correct: string;
  gridStroke: string;
  selectionStroke: string;
};

const VARS = {
  bg: '--ui-color-bg',
  correct: '--ui-gray-900',
  gridStroke: '--ui-grey-500',
  selectionStroke: '--ui-gray-900',
};

export function usePixelColors(): PixelColors {
  const [colors, setColors] = useState<PixelColors>(() => ({
    bg: '',
    correct: '',
    gridStroke: '',
    selectionStroke: '',
  }));

  useEffect(() => {
    setColors({
      bg: readCssVars(VARS.bg),
      correct: readCssVars(VARS.bg),
      gridStroke: readCssVars(VARS.gridStroke),
      selectionStroke: readCssVars(VARS.selectionStroke),
    });
  }, []);

  return colors;
}
