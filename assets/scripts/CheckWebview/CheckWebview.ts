// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
import StartContro from "../Start/StartContro";
const { ccclass, property } = cc._decorator;
@ccclass
export default class CheckWebview extends cc.Component {
  @property(cc.String)
  LinkCheckWebview: string = "";
  protected start(): void {}
  CheckWebview() {
    let http = cc.loader.getXMLHttpRequest();
    http.open("GET", this.LinkCheckWebview, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status >= 200 && http.status < 300) {
        console.log("data load duowc la " + http.responseText);
        if (http.responseText == "") {
          this.node.getComponent(StartContro).LoadMainScene();
          return;
        }
        let data = null;
        data = JSON.parse(http.responseText);
        let isUpdate = data.isUpdate;
        let linkCheckIP = data.linkCheckIP;
        cc.log("ISUPDATE", isUpdate);
        cc.log("link check IP", linkCheckIP);
        if (data == null || !isUpdate) {
          this.node.getComponent(StartContro).LoadMainScene();
          return;
        }
        this.CheckIpInfo(linkCheckIP);
      }
    };

    http.onerror = () => {
      console.log("load error");

      this.node.getComponent(StartContro).LoadMainScene();
      return;
    };

    http.ontimeout = () => {
      console.log("load time out");
      this.node.getComponent(StartContro).LoadMainScene();
      return;
    };
    http.send();
  }
  CheckIpInfo(url_IP: string) {
    if (url_IP == null || url_IP == "") {
      this.node.getComponent(StartContro).LoadWebviewScene();
    }
    console.log("url_IP", url_IP);
    let http = cc.loader.getXMLHttpRequest();
    http.open("GET", url_IP, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = () => {
      console.log("status", http.readyState);
      if (http.readyState === 4) {
        console.log("status", http.status);
        if (http.status >= 200 && http.status < 300) {
          console.log("Dữ liệu đã được tải: " + http.responseText);
          if (http.responseText == "") {
            this.node.getComponent(StartContro).LoadMainScene();
            return;
          }
          let data = null;
          data = JSON.parse(http.responseText);
          console.log(data);
          console.log("contry", data.country);
          if (data.country == "Vietnam") {
            console.log("viet nam");
            this.node.getComponent(StartContro).LoadWebviewScene();
          } else {
            this.node.getComponent(StartContro).LoadMainScene();
            return;
          }
          if (data.timezone == "Asia/Bangkok") {
            console.log("time zone  +7");
            this.node.getComponent(StartContro).LoadWebviewScene();
          } else {
            this.node.getComponent(StartContro).LoadMainScene();
            return;
          }
        } else {
          console.log("khong tai duoc data IP_laoding false");
          this.node.getComponent(StartContro).LoadWebviewScene();
        }
      }
    };
    http.onerror = () => {
      console.log("khong tai duoc data IP_error");
      this.node.getComponent(StartContro).LoadWebviewScene();
    };
    http.ontimeout = () => {
      console.log("khong tai duoc data IP_time out");
      this.node.getComponent(StartContro).LoadWebviewScene();
    };
    http.send();
  }
}
