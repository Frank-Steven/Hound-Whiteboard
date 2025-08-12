// 界面初始化、侧栏与工具栏按钮绑定
import { renderPageIndicator } from './app.js';

export function initUI(docModel) {
  // 侧栏镜像
    document.getElementById('side-right').innerHTML =
        document.getElementById('side-left').innerHTML;

          // 翻页
            document.getElementById('btn-prev').onclick = () => {
                if (docModel.current > 0) {
                      docModel.current--;
                            renderPageIndicator(docModel);
                                  window.renderCurrentPage();
                                      }
                                        };
                                          document.getElementById('btn-next').onclick = () => {
                                              if (docModel.current < docModel.pages.length - 1) {
                                                    docModel.current++;
                                                          renderPageIndicator(docModel);
                                                                window.renderCurrentPage();
                                                                    }
                                                                      };
                                                                        document.getElementById('btn-add-page').onclick = () => {
                                                                            docModel.pages.splice(docModel.current + 1, 0, new docModel.pages[0].constructor());
                                                                                docModel.current++;
                                                                                    renderPageIndicator(docModel);
                                                                                        window.renderCurrentPage();
                                                                                          };
                                                                                            document.getElementById('btn-del-page').onclick = () => {
                                                                                                if (docModel.pages.length > 1) {
                                                                                                      docModel.pages.splice(docModel.current, 1);
                                                                                                            docModel.current = Math.max(0, docModel.current - 1);
                                                                                                                  renderPageIndicator(docModel);
                                                                                                                        window.renderCurrentPage();
                                                                                                                            }
                                                                                                                              };

                                                                                                                                // 文件操作
                                                                                                                                  document.getElementById('btn-new').onclick = () => {
                                                                                                                                      if (confirm('确定新建？未保存内容将丢失')) location.reload();
                                                                                                                                        };
                                                                                                                                          const input = document.getElementById('file-import');
                                                                                                                                            document.getElementById('btn-import').onclick = () => input.click();
                                                                                                                                              document.getElementById('btn-export').onclick = () => window.exportFile();
                                                                                                                                                input.onchange = e => window.importFile(e.target.files[0]);

                                                                                                                                                  // 保存版本
                                                                                                                                                    document.getElementById('btn-save').onclick = () => window.saveVersion();

                                                                                                                                                      // 工具栏切换
                                                                                                                                                        document.querySelectorAll('#toolbar .tool').forEach(btn => {
                                                                                                                                                            btn.onclick = () => {
                                                                                                                                                                  document.querySelectorAll('.tool').forEach(b => b.classList.remove('active'));
                                                                                                                                                                        btn.classList.add('active');
                                                                                                                                                                              window.currentTool = btn.dataset.tool;
                                                                                                                                                                                  };
                                                                                                                                                                                    });

                                                                                                                                                                                      // 颜色和粗细
                                                                                                                                                                                        document.getElementById('color-picker').oninput = e => window.penColor = e.target.value;
                                                                                                                                                                                          document.getElementById('size-picker').oninput  = e => window.penSize = +e.target.value;

                                                                                                                                                                                            // 撤销/重做
                                                                                                                                                                                              document.getElementById('btn-undo').onclick = () => window.undo();
                                                                                                                                                                                                document.getElementById('btn-redo').onclick = () => window.redo();
                                                                                                                                                                                                }
                                                                                                                                                                                                