// 入口，模型初始化，渲染、存档、版本、撤销/重做

import { DocumentModel } from './models.js';
import { initUI } from './ui.js';
import { initCanvasLayers } from './draw.js';

window.doc = new DocumentModel();
window.currentTool  = 'pen';
window.penColor     = '#ffffff';
window.penSize      = 5;
window.historyStack = [];
window.redoStack    = [];

// 渲染当前页（背景 + 绘图 + 对象）
window.renderCurrentPage = function() {
  const page = window.doc.pages[window.doc.current];
    const [bgCtx, drawCtx, objCtx] =
        ['bg-layer','draw-layer','obj-layer'].map(id =>
              document.getElementById(id).getContext('2d'));

                // 背景：用 DOM 背景色，无需 Canvas 重绘
                  // 绘图层 & 对象层重绘
                    drawCtx.clearRect(0,0,drawCtx.canvas.width,drawCtx.canvas.height);
                      objCtx.clearRect(0,0,objCtx.canvas.width,objCtx.canvas.height);
                        page.drawLayer.commands.forEach(cmd => cmd(drawCtx));
                          page.objLayer.commands.forEach(cmd => cmd(objCtx));
                          };

                          // 页码指示
                          export function renderPageIndicator(doc) {
                            const div = document.getElementById('page-indicator');
                              div.textContent = `${doc.current+1} / ${doc.pages.length}`;
                              }

                              // 存档与版本管理
                              window.exportFile = () => {
                                const data = JSON.stringify(window.doc.toJSON());
                                  const blob = new Blob([data], { type:'application/json' });
                                    const a = document.createElement('a');
                                      a.href = URL.createObjectURL(blob);
                                        a.download = 'whiteboard.wb.json';
                                          a.click();
                                          };

                                          window.importFile = (file) => {
                                            file.text().then(txt => {
                                                window.doc = DocumentModel.fromJSON(JSON.parse(txt));
                                                    renderPageIndicator(window.doc);
                                                        renderCurrentPage();
                                                          });
                                                          };

                                                          window.saveVersion = () => {
                                                            const snap = JSON.stringify(window.doc.toJSON());
                                                              window.doc.versions.push(snap);
                                                                alert('已保存版本，共 ' + window.doc.versions.length + ' 个');
                                                                };

                                                                // 简易撤销/重做
                                                                window.undo = () => {
                                                                  if (!window.historyStack.length) return;
                                                                    const snap = window.historyStack.pop();
                                                                      window.redoStack.push(JSON.stringify(window.doc.toJSON()));
                                                                        window.doc = DocumentModel.fromJSON(JSON.parse(snap));
                                                                          renderPageIndicator(window.doc);
                                                                            renderCurrentPage();
                                                                            };
                                                                            window.redo = () => {
                                                                              if (!window.redoStack.length) return;
                                                                                const snap = window.redoStack.pop();
                                                                                  window.historyStack.push(JSON.stringify(window.doc.toJSON()));
                                                                                    window.doc = DocumentModel.fromJSON(JSON.parse(snap));
                                                                                      renderPageIndicator(window.doc);
                                                                                        renderCurrentPage();
                                                                                        };

                                                                                        // 全局指针事件分发（留给 draw.js 处理具体逻辑）
                                                                                        window.handlePointerEvent = (type, ev) => {
                                                                                          // 以下按 currentTool 分发给画笔、橡皮、选区处理
                                                                                            // TODO: 实现 draw, erase, select 具体命令入栈 page.drawLayer/objLayer.commands
                                                                                              //       同时 push 当前快照到 historyStack，实现无缝撤销
                                                                                              };

                                                                                              // 启动
                                                                                              window.addEventListener('DOMContentLoaded', () => {
                                                                                                initCanvasLayers();
                                                                                                  initUI(window.doc);
                                                                                                    renderPageIndicator(window.doc);
                                                                                                      renderCurrentPage();
                                                                                                      });
                                                                                                      