// Canvas 绘图与交互逻辑（画笔、橡皮、选区、手势缩放）
export function initCanvasLayers() {
  const bg = document.getElementById('bg-layer');
    const draw = document.getElementById('draw-layer');
      const obj = document.getElementById('obj-layer');
        const container = document.getElementById('canvas-container');

          // 动态适配尺寸
            function resize() {
                [bg, draw, obj].forEach(c => {
                      c.width = container.clientWidth;
                            c.height= container.clientHeight;
                                });
                                    window.renderCurrentPage();
                                      }
                                        window.addEventListener('resize', resize);
                                          resize();

                                            // 画笔/橡皮/选区事件
                                              let pointers = new Map();
                                                draw.addEventListener('pointerdown', onPointerDown);
                                                  draw.addEventListener('pointermove', onPointerMove);
                                                    window.addEventListener('pointerup',   onPointerUp);

                                                      function onPointerDown(e) {
                                                          draw.setPointerCapture(e.pointerId);
                                                              pointers.set(e.pointerId, e);
                                                                  window.handlePointerEvent('down', e);
                                                                    }
                                                                      function onPointerMove(e) {
                                                                          if (pointers.has(e.pointerId)) {
                                                                                pointers.set(e.pointerId, e);
                                                                                      window.handlePointerEvent('move', e);
                                                                                          }
                                                                                            }
                                                                                              function onPointerUp(e) {
                                                                                                  if (pointers.has(e.pointerId)) {
                                                                                                        pointers.delete(e.pointerId);
                                                                                                              window.handlePointerEvent('up', e);
                                                                                                                  }
                                                                                                                    }
                                                                                                                    }
                                                                                                                    