import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Group, Shape, Rect } from 'react-konva';
import { usePixelSelectStore } from '/store/pixelSelcet.store';
import { PixelGridInteractiveProps } from '/components/features/PixelGridInteractive/types';

const INITIAL_SCALE = 1;
const MIN_SCALE = INITIAL_SCALE;
const MAX_SCALE = 6;
const SCALE_STEP = 1.08;

const PixelGridInteractive = (props: PixelGridInteractiveProps) => {
  const { gridWidth, gridHeight, cellSize = 6, showGrid = false, solvedCoords } = props;

  // refs
  const stageRef = useRef<Konva.Stage>(null);
  const cellRef = useRef<Konva.Group>(null); // группа «клеточного» пространства внутри интерактивного слоя

  const dragInfo = useRef<{ down?: { x: number; y: number } } | null>(null);
  // const [isDraggingStage, setIsDraggingStage] = useState<boolean>(false);

  // Zustand
  const selectedServer = usePixelSelectStore((s) => s.selected);
  const setSelected = usePixelSelectStore((s) => s.setSelected);
  const clear = usePixelSelectStore((s) => s.clear);

  // сервер -> клиент (для отрисовки)
  const selectedClient = useMemo(
    () => (selectedServer ? { x: selectedServer.x - 1, y: gridHeight - selectedServer.y } : null),
    [selectedServer, gridHeight],
  );

  // предобработка координат (для быстрого рендера)
  const coords = useMemo(() => {
    const out = new Int32Array(solvedCoords.length * 2);
    const H = gridHeight;
    for (let i = 0; i < solvedCoords.length; i++) {
      const [sx, sy] = solvedCoords[i]; // сервер: 1..W,1..H; (0,0) внизу
      out[i * 2] = sx - 1; // x: 0..W-1
      out[i * 2 + 1] = H - sy; // y: 0..H-1
    }
    return out;
  }, [solvedCoords, gridHeight]);

  // выбор клетки — берём позицию указателя в координатах ГРУППЫ cellRef (уже "в клетках")
  const handlePick = useCallback(
    (e: any) => {
      const cell = cellRef.current;
      if (!cell) return;
      const p = cell.getRelativePointerPosition(); // учитывает scale/position Stage
      if (!p) return;

      const cx = Math.floor(p.x);
      const cy = Math.floor(p.y);

      if (cx < 0 || cy < 0 || cx >= gridWidth || cy >= gridHeight) {
        clear();
      } else {
        const sx = cx + 1;
        const sy = gridHeight - cy;
        setSelected({ x: sx, y: sy });
      }
      e.evt?.preventDefault?.();
      e.cancelBubble = true;
    },
    [gridWidth, gridHeight, setSelected, clear],
  );

  // зум в точку — применяем к Stage (масштабируются все слои сразу)
  const zoomTo = useCallback((pointer: { x: number; y: number }, nextScale: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    const old = stage.scaleX() || INITIAL_SCALE;
    const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale));

    // фиксируем якорь под указателем: пересчитываем позицию Stage так,
    // чтобы та же точка сцены осталась под курсором после смены масштаба.
    const anchor = {
      x: (pointer.x - stage.x()) / old,
      y: (pointer.y - stage.y()) / old,
    };

    stage.scale({ x: scale, y: scale });
    stage.position({
      x: pointer.x - anchor.x * scale,
      y: pointer.y - anchor.y * scale,
    });

    // по желанию можно подсказать слою перерисоваться:
    stage.getLayers().forEach((ly) => ly.batchDraw());
  }, []);

  // колесо мыши → зум
  const onWheel = useCallback(
    (e: any) => {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;

      // У Stage правильный метод — getPointerPosition()
      // (если TS ругается, можно: const pointer = (stage as any).getPointerPosition?.();)
      const pointer = stage.getPointerPosition?.();
      if (!pointer) return;

      const oldScale = stage.scaleX() || 1;
      const dir = e.evt.deltaY > 0 ? 1 : -1;
      const next = dir > 0 ? oldScale / SCALE_STEP : oldScale * SCALE_STEP;
      zoomTo(pointer, next);
    },
    [zoomTo],
  );

  // размеры канваса в «базовой» шкале (до зума)
  const stageW = gridWidth * cellSize;
  const stageH = gridHeight * cellSize;

  useEffect(() => {
    console.log('server coords', selectedServer);
    console.log('client coords', selectedClient);
  }, [selectedServer, selectedClient]);

  return (
    <Stage
      ref={stageRef}
      width={stageW}
      height={stageH}
      onWheel={onWheel}
      // drag для панорамирования сценой мышью (по желанию)
      draggable
    >
      {/* 1) Фон + "решённые" клетки */}
      <Layer listening={false} hitGraphEnabled={false}>
        <Group scale={{ x: cellSize, y: cellSize }} listening={false}>
          <Shape
            listening={false}
            shadowForStrokeEnabled={false}
            perfectDrawEnabled={false}
            sceneFunc={(ctx, shape) => {
              ctx.fillStyle = '#f9f9f8';
              ctx.fillRect(0, 0, gridWidth, gridHeight);

              ctx.fillStyle = '#141412';
              const a = coords;
              for (let i = 0; i < a.length; i += 2) {
                ctx.fillRect(a[i], a[i + 1], 1, 1);
              }
              ctx.fillStrokeShape(shape);
            }}
          />
        </Group>
      </Layer>

      {/* 2) Интерактивный слой (ловец кликов и выделение) */}
      <Layer>
        <Group ref={cellRef} scale={{ x: cellSize, y: cellSize }}>
          <Rect
            width={gridWidth}
            height={gridHeight}
            fill="rgba(0,0,0,0.001)"
            onPointerDown={handlePick}
          />
          {selectedClient && (
            <Rect
              x={selectedClient.x}
              y={selectedClient.y}
              width={1}
              height={1}
              fill="#141412"
              strokeScaleEnabled={false}
              listening={false}
            />
          )}
        </Group>
      </Layer>

      {/* 3) Сетка-оверлей (в пикселях, фиксированная толщина 1px) */}
      <Layer visible={showGrid} listening={false} hitGraphEnabled={false}>
        <Shape
          listening={false}
          shadowForStrokeEnabled={false}
          perfectDrawEnabled={false}
          strokeScaleEnabled={false} // ← линия 1px независимо от зума
          sceneFunc={(ctx, shape) => {
            const color = '#9e9e9b';
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;

            const Wpx = gridWidth * cellSize;
            const Hpx = gridHeight * cellSize;

            // вертикали
            for (let x = 0; x <= gridWidth; x++) {
              const px = x === 0 ? 0.5 : x === gridWidth ? Wpx - 0.5 : x * cellSize + 0.5;
              ctx.moveTo(px, 0);
              ctx.lineTo(px, Hpx);
            }
            // горизонтали
            for (let y = 0; y <= gridHeight; y++) {
              const py = y === 0 ? 0.5 : y === gridHeight ? Hpx - 0.5 : y * cellSize + 0.5;
              ctx.moveTo(0, py);
              ctx.lineTo(Wpx, py);
            }

            ctx.stroke();
            ctx.fillStrokeShape(shape);
          }}
        />
      </Layer>
    </Stage>
  );
};

export default PixelGridInteractive;
