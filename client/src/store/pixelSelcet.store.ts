import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SelectedCoord = {
  x: number;
  y: number;
} | null;

type PixelSelectState = {
  selected: SelectedCoord;
  setSelected: (coord: { x: number; y: number }) => void;
  clear: () => void;
};

const _usePixelSelectStore = create<PixelSelectState>()(
  devtools(
    (set) => ({
      selected: null,
      setSelected: (coord) => set({ selected: { x: coord.x, y: coord.y } }, false, 'select/set'),
      clear: () => set({ selected: null }, false, 'select/clear'),
    }),
    { name: 'pixel-select' },
  ),
);

export const usePixelSelectStore = _usePixelSelectStore;
