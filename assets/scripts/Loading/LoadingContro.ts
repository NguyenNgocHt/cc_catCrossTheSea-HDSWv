const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingContro extends cc.Component {
  @property(cc.ProgressBar)
  bar: cc.ProgressBar = null;
  private BarMaxValue: number = 20000;
  private isbarStart: boolean = false;
  private countUpdate: number = 0;
  private number_checkbar: number = 0;
  private isLoadingPrefab: boolean = false;
  private isLoadingAudioClip: boolean = false;
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
  protected start(): void {
    this.isbarStart = true;
  }
  InitBar() {
    let randomNumber = this.getRandomInteger(50, 500);
    this.number_checkbar += randomNumber;
    let barRun = randomNumber / this.BarMaxValue;
    this.bar.progress += barRun;
    if (this.number_checkbar >= 20000) {
      this.isbarStart = false;
      this.scheduleOnce(function () {
        this.loadHomeMain();
      }, 1);
    }
  }
  protected update(dt: number): void {
    if (this.isbarStart) {
      this.countUpdate++;
      if (this.countUpdate % 5 == 0) {
        this.InitBar();
      }
    }
  }
  getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  loadHomeMain() {
    cc.director.preloadScene("Entry", function () {
      cc.director.preloadScene("Main", function () {
        cc.director.loadScene("Entry");
      });
    });
  }
}
