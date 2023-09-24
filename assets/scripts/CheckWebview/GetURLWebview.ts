// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetURLWebview extends cc.Component {
  @property(cc.String)
  LinkCheckWebview: string = "";
  URLWebview: string = "";
  showWebview: cc.Node = null;
  protected start(): void {
    this.CheckWebview();
    this.scheduleOnce(function () {
      this.onCallNative(2);
    }, 2);
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
  CheckWebview() {
    let http = cc.loader.getXMLHttpRequest();
    http.open("GET", this.LinkCheckWebview, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = () => {
      //Call a function when the state changes.
      if (http.readyState === 4 && http.status >= 200 && http.status < 300) {
        console.log("data load duowc la " + http.responseText);
        if (http.responseText == "") {
          this.LoadMainScene();
          return;
        }
        let data = null;
        data = JSON.parse(http.responseText);
        let isUpdate = data.isUpdate;
        cc.log("ISUPDATE", isUpdate);
        let urlWebview = data.linkWebview;
        if (data == null || !isUpdate || urlWebview == "" || urlWebview == null) {
          this.LoadMainScene();
          return;
        }
        this.URLWebview = urlWebview;
        this.ShowWebview();
      }
    };

    http.onerror = () => {
      this.LoadMainScene();
      console.log("load error");
      return;
    };
    http.ontimeout = () => {
      console.log("load time out");
      this.LoadMainScene();
      return;
    };
    http.send();
  }
  ShowWebview() {
    let webview = this.node.getComponent(cc.WebView);
    webview.url = this.URLWebview;
  }
  LoadMainScene() {
    cc.director.loadScene("Main");
  }
}
