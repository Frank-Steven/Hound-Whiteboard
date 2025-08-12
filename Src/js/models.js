// Document, Page, Layer 数据模型与序列化

class Layer {
  constructor(type) {
      this.type = type;       // 'draw' | 'obj'
          this.commands = [];     // 绘制命令与对象列表
            }
            }

            class Page {
              constructor() {
                  this.bgColor = '#3B5323';      // 画布背景色
                      this.drawLayer = new Layer('draw');
                          this.objLayer  = new Layer('obj');
                            }
                            }

                            class DocumentModel {
                              constructor() {
                                  this.pages = [new Page()];
                                      this.current = 0;
                                          this.versions = [];            // 保存的快照
                                            }

                                              // 序列化与反序列化
                                                toJSON() { return JSON.parse(JSON.stringify(this)); }
                                                  static fromJSON(json) {
                                                      const doc = Object.assign(new DocumentModel(), json);
                                                          // 恢复原型链
                                                              doc.pages = json.pages.map(p => Object.assign(new Page(), p));
                                                                  doc.versions = json.versions || [];
                                                                      return doc;
                                                                        }
                                                                        }

                                                                        export { DocumentModel, Page, Layer };
                                                                        