// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import CheckWebview from "../CheckWebview/CheckWebview";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartContro extends cc.Component {
  protected onLoad(): void {
    this.onCallNative(1);
  }
  onCallNative(indexScreen: number) {
    if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative) {
      cc.log("nhay vao đây set native");
      let className = "org/cocos2dx/javascript/AppActivity";
      let methodName = "setOrientation";
      let methodSignature = "(I)V";
      jsb.reflection.callStaticMethod(className, methodName, methodSignature, indexScreen);
    }
  }
  onStartClick() {
    this.node.getComponent(CheckWebview).CheckWebview();
  }
  LoadMainScene() {
    cc.director.loadScene("Main");
  }
  LoadWebviewScene() {
    this.onCallNative(2);
    this.scheduleOnce(function () {
      cc.director.loadScene("Webview");
    }, 2);
  }
}
