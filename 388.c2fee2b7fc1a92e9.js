"use strict";(self.webpackChunkargon_dashboard_pro_angular=self.webpackChunkargon_dashboard_pro_angular||[]).push([[388],{388:(X,M,d)=>{d.d(M,{tT:()=>b,zk:()=>z});var o=d(1571),c=d(1607),l=d(6895),T=d(5698);let m,I=(()=>{class t{constructor(){this._focusTrapStack=[]}register(e){this._focusTrapStack=this._focusTrapStack.filter(s=>s!==e);let n=this._focusTrapStack;n.length&&n[n.length-1]._disable(),n.push(e),e._enable()}deregister(e){e._disable();const n=this._focusTrapStack,s=n.indexOf(e);-1!==s&&(n.splice(s,1),n.length&&n[n.length-1]._enable())}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();try{m=typeof Intl<"u"&&Intl.v8BreakIterator}catch{m=!1}let g=(()=>{class t{constructor(e){this._platformId=e,this.isBrowser=this._platformId?(0,l.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!m)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(o.Lbi))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),v=(()=>{class t{constructor(e){this._platform=e}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return function R(t){return!!(t.offsetWidth||t.offsetHeight||"function"==typeof t.getClientRects&&t.getClientRects().length)}(e)&&"visible"===getComputedStyle(e).visibility}isTabbable(e){if(!this._platform.isBrowser)return!1;const n=function D(t){try{return t.frameElement}catch{return null}}(function x(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}(e));if(n&&(-1===y(n)||!this.isVisible(n)))return!1;let s=e.nodeName.toLowerCase(),r=y(e);return e.hasAttribute("contenteditable")?-1!==r:!("iframe"===s||"object"===s||this._platform.WEBKIT&&this._platform.IOS&&!function H(t){let i=t.nodeName.toLowerCase(),e="input"===i&&t.type;return"text"===e||"password"===e||"select"===i||"textarea"===i}(e))&&("audio"===s?!!e.hasAttribute("controls")&&-1!==r:"video"===s?-1!==r&&(null!==r||this._platform.FIREFOX||e.hasAttribute("controls")):e.tabIndex>=0)}isFocusable(e,n){return function $(t){return!function O(t){return function F(t){return"input"==t.nodeName.toLowerCase()}(t)&&"hidden"==t.type}(t)&&(function B(t){let i=t.nodeName.toLowerCase();return"input"===i||"select"===i||"button"===i||"textarea"===i}(t)||function N(t){return function L(t){return"a"==t.nodeName.toLowerCase()}(t)&&t.hasAttribute("href")}(t)||t.hasAttribute("contenteditable")||S(t))}(e)&&!this.isDisabled(e)&&(n?.ignoreVisibility||this.isVisible(e))}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(g))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();function S(t){if(!t.hasAttribute("tabindex")||void 0===t.tabIndex)return!1;let i=t.getAttribute("tabindex");return"-32768"!=i&&!(!i||isNaN(parseInt(i,10)))}function y(t){if(!S(t))return null;const i=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(i)?-1:i}function A(t){return null!=t&&"false"!=`${t}`}class P{constructor(i,e,n,s,r=!1){this._element=i,this._checker=e,this._ngZone=n,this._document=s,this._hasAttached=!1,this.startAnchorListener=()=>this.focusLastTabbableElement(),this.endAnchorListener=()=>this.focusFirstTabbableElement(),this._enabled=!0,r||this.attachAnchors()}get enabled(){return this._enabled}set enabled(i){this._enabled=i,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(i,this._startAnchor),this._toggleAnchorTabIndex(i,this._endAnchor))}destroy(){const i=this._startAnchor,e=this._endAnchor;i&&(i.removeEventListener("focus",this.startAnchorListener),i.parentNode&&i.parentNode.removeChild(i)),e&&(e.removeEventListener("focus",this.endAnchorListener),e.parentNode&&e.parentNode.removeChild(e)),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return!!this._hasAttached||(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(){return new Promise(i=>{this._executeOnStable(()=>i(this.focusInitialElement()))})}focusFirstTabbableElementWhenReady(){return new Promise(i=>{this._executeOnStable(()=>i(this.focusFirstTabbableElement()))})}focusLastTabbableElementWhenReady(){return new Promise(i=>{this._executeOnStable(()=>i(this.focusLastTabbableElement()))})}_getRegionBoundary(i){let e=this._element.querySelectorAll(`[cdk-focus-region-${i}], [cdkFocusRegion${i}], [cdk-focus-${i}]`);for(let n=0;n<e.length;n++)e[n].hasAttribute(`cdk-focus-${i}`)?console.warn(`Found use of deprecated attribute 'cdk-focus-${i}', use 'cdkFocusRegion${i}' instead. The deprecated attribute will be removed in 8.0.0.`,e[n]):e[n].hasAttribute(`cdk-focus-region-${i}`)&&console.warn(`Found use of deprecated attribute 'cdk-focus-region-${i}', use 'cdkFocusRegion${i}' instead. The deprecated attribute will be removed in 8.0.0.`,e[n]);return"start"==i?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(){const i=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(i){if(i.hasAttribute("cdk-focus-initial")&&console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",i),!this._checker.isFocusable(i)){const e=this._getFirstTabbableElement(i);return e?.focus(),!!e}return i.focus(),!0}return this.focusFirstTabbableElement()}focusFirstTabbableElement(){const i=this._getRegionBoundary("start");return i&&i.focus(),!!i}focusLastTabbableElement(){const i=this._getRegionBoundary("end");return i&&i.focus(),!!i}hasAttached(){return this._hasAttached}_getFirstTabbableElement(i){if(this._checker.isFocusable(i)&&this._checker.isTabbable(i))return i;let e=i.children||i.childNodes;for(let n=0;n<e.length;n++){let s=e[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[n]):null;if(s)return s}return null}_getLastTabbableElement(i){if(this._checker.isFocusable(i)&&this._checker.isTabbable(i))return i;let e=i.children||i.childNodes;for(let n=e.length-1;n>=0;n--){let s=e[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[n]):null;if(s)return s}return null}_createAnchor(){const i=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,i),i.classList.add("cdk-visually-hidden"),i.classList.add("cdk-focus-trap-anchor"),i.setAttribute("aria-hidden","true"),i}_toggleAnchorTabIndex(i,e){i?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(i){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(i,this._startAnchor),this._toggleAnchorTabIndex(i,this._endAnchor))}_executeOnStable(i){this._ngZone.isStable?i():this._ngZone.onStable.pipe((0,T.q)(1)).subscribe(i)}}let W=(()=>{class t{constructor(e,n,s){this._checker=e,this._ngZone=n,this._document=s}create(e,n=!1){return new P(e,this._checker,this._ngZone,this._document,n)}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(v),o.LFG(o.R0b),o.LFG(l.K0))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),j=(()=>{class t{constructor(e,n,s){this._elementRef=e,this._focusTrapFactory=n,this._previouslyFocusedElement=null,this._autoCapture=!1,this._document=s,this.focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement,!0)}get enabled(){return this.focusTrap.enabled}set enabled(e){this.focusTrap.enabled=A(e)}get autoCapture(){return this._autoCapture}set autoCapture(e){this._autoCapture=A(e)}ngOnDestroy(){this.focusTrap.destroy(),this._previouslyFocusedElement&&(this._previouslyFocusedElement.focus(),this._previouslyFocusedElement=null)}ngAfterContentInit(){this.focusTrap.attachAnchors(),this.autoCapture&&this._captureFocus()}ngDoCheck(){this.focusTrap.hasAttached()||this.focusTrap.attachAnchors()}ngOnChanges(e){const n=e.autoCapture;n&&!n.firstChange&&this.autoCapture&&this.focusTrap.hasAttached()&&this._captureFocus()}_captureFocus(){this._previouslyFocusedElement=this._document.activeElement,this.focusTrap.focusInitialElementWhenReady()}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(o.SBq),o.Y36(W),o.Y36(l.K0))},t.\u0275dir=o.lG2({type:t,selectors:[["","focusTrap",""]],inputs:{enabled:["cdkTrapFocus","enabled"],autoCapture:["cdkTrapFocusAutoCapture","autoCapture"]},exportAs:["focusTrap"],features:[o.TTD]}),t})(),E=(()=>{class t{static forRoot(){return{ngModule:t,providers:[I,g,v]}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[l.ez]]}),t})();var p=d(2381),C=d(8664);const K=["*"];let k=(()=>{class t{constructor(){this.hide=()=>{},this.setClass=()=>{}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"platform"}),t})(),w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"platform"}),t})();const h={backdrop:!0,keyboard:!0,focus:!0,show:!1,ignoreBackdropClick:!1,class:"",animated:!0,initialState:{},closeInterceptor:void 0},G=new o.OlP("override-default-config");let V=(()=>{class t{constructor(e,n,s){this._element=n,this._renderer=s,this.isShown=!1,this.isAnimated=!1,this.isModalHiding=!1,this.clickStartedInContent=!1,this.config=Object.assign({},e)}ngOnInit(){this.isAnimated&&this._renderer.addClass(this._element.nativeElement,"fade"),this._renderer.setStyle(this._element.nativeElement,"display","block"),setTimeout(()=>{this.isShown=!0,this._renderer.addClass(this._element.nativeElement,(0,c.XA)()?"in":"show")},this.isAnimated?150:0),document&&document.body&&(this.bsModalService&&1===this.bsModalService.getModalsCount()&&(this.bsModalService.checkScrollbar(),this.bsModalService.setScrollbar()),this._renderer.addClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y","hidden")),this._element.nativeElement&&this._element.nativeElement.focus()}onClickStarted(e){this.clickStartedInContent=e.target!==this._element.nativeElement}onClickStop(e){this.config.ignoreBackdropClick||"static"===this.config.backdrop||e.target!==this._element.nativeElement||this.clickStartedInContent?this.clickStartedInContent=!1:(this.bsModalService?.setDismissReason("backdrop-click"),this.hide())}onPopState(){this.bsModalService?.setDismissReason("browser-back-navigation-clicked"),this.hide()}onEsc(e){!this.isShown||((27===e.keyCode||"Escape"===e.key)&&e.preventDefault(),this.config.keyboard&&this.level===this.bsModalService?.getModalsCount()&&(this.bsModalService?.setDismissReason("esc"),this.hide()))}ngOnDestroy(){this.isShown&&this._hide()}hide(){if(!this.isModalHiding&&this.isShown){if(this.config.closeInterceptor)return void this.config.closeInterceptor().then(()=>this._hide(),()=>{});this._hide()}}_hide(){this.isModalHiding=!0,this._renderer.removeClass(this._element.nativeElement,(0,c.XA)()?"in":"show"),setTimeout(()=>{this.isShown=!1,document&&document.body&&1===this.bsModalService?.getModalsCount()&&(this._renderer.removeClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y","")),this.bsModalService?.hide(this.config.id),this.isModalHiding=!1},this.isAnimated?300:0)}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(w),o.Y36(o.SBq),o.Y36(o.Qsj))},t.\u0275cmp=o.Xpm({type:t,selectors:[["modal-container"]],hostAttrs:["role","dialog","tabindex","-1",1,"modal"],hostVars:3,hostBindings:function(e,n){1&e&&o.NdJ("mousedown",function(r){return n.onClickStarted(r)})("click",function(r){return n.onClickStop(r)})("popstate",function(){return n.onPopState()},!1,o.Jf7)("keydown.esc",function(r){return n.onEsc(r)},!1,o.Jf7),2&e&&o.uIk("aria-modal",!0)("aria-labelledby",n.config.ariaLabelledBy)("aria-describedby",n.config.ariaDescribedby)},ngContentSelectors:K,decls:3,vars:2,consts:[["role","document","focusTrap",""],[1,"modal-content"]],template:function(e,n){1&e&&(o.F$t(),o.TgZ(0,"div",0)(1,"div",1),o.Hsn(2),o.qZA()()),2&e&&o.Tol("modal-dialog"+(n.config.class?" "+n.config.class:""))},dependencies:[j],encapsulation:2}),t})(),Y=(()=>{class t{constructor(e,n){this._isAnimated=!1,this._isShown=!1,this.element=e,this.renderer=n}get isAnimated(){return this._isAnimated}set isAnimated(e){this._isAnimated=e}get isShown(){return this._isShown}set isShown(e){this._isShown=e,e?this.renderer.addClass(this.element.nativeElement,"in"):this.renderer.removeClass(this.element.nativeElement,"in"),(0,c.XA)()||(e?this.renderer.addClass(this.element.nativeElement,"show"):this.renderer.removeClass(this.element.nativeElement,"show"))}ngOnInit(){this.isAnimated&&(this.renderer.addClass(this.element.nativeElement,"fade"),c.cQ.reflow(this.element.nativeElement)),this.isShown=!0}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(o.SBq),o.Y36(o.Qsj))},t.\u0275cmp=o.Xpm({type:t,selectors:[["bs-modal-backdrop"]],hostAttrs:[1,"modal-backdrop"],decls:0,vars:0,template:function(e,n){},encapsulation:2}),t})(),U=1,b=(()=>{class t{constructor(e,n,s){this.clf=n,this.modalDefaultOption=s,this.onShow=new o.vpe,this.onShown=new o.vpe,this.onHide=new o.vpe,this.onHidden=new o.vpe,this.isBodyOverflowing=!1,this.originalBodyPadding=0,this.scrollbarWidth=0,this.modalsCount=0,this.loaders=[],this._backdropLoader=this.clf.createLoader(),this._renderer=e.createRenderer(null,null),this.config=s?Object.assign({},h,s):h}show(e,n){this.modalsCount++,this._createLoaders();const s=n?.id||U++;return this.config=this.modalDefaultOption?Object.assign({},h,this.modalDefaultOption,n):Object.assign({},h,n),this.config.id=s,this._showBackdrop(),this.lastDismissReason=void 0,this._showModal(e)}hide(e){(1===this.modalsCount||null==e)&&(this._hideBackdrop(),this.resetScrollbar()),this.modalsCount=this.modalsCount>=1&&null!=e?this.modalsCount-1:0,setTimeout(()=>{this._hideModal(e),this.removeLoaders(e)},this.config.animated?150:0)}_showBackdrop(){const e=!0===this.config.backdrop||"static"===this.config.backdrop,n=!this.backdropRef||!this.backdropRef.instance.isShown;1===this.modalsCount&&(this.removeBackdrop(),e&&n&&(this._backdropLoader.attach(Y).to("body").show({isAnimated:this.config.animated}),this.backdropRef=this._backdropLoader._componentRef))}_hideBackdrop(){this.backdropRef&&(this.backdropRef.instance.isShown=!1,setTimeout(()=>this.removeBackdrop(),this.config.animated?150:0))}_showModal(e){const n=this.loaders[this.loaders.length-1];if(this.config&&this.config.providers)for(const f of this.config.providers)n.provide(f);const s=new k,r=n.provide({provide:w,useValue:this.config}).provide({provide:k,useValue:s}).attach(V).to("body");return s.hide=()=>r.instance?.hide(),s.setClass=f=>{r.instance&&(r.instance.config.class=f)},s.onHidden=new o.vpe,s.onHide=new o.vpe,this.copyEvent(n.onBeforeHide,s.onHide),this.copyEvent(n.onHidden,s.onHidden),r.show({content:e,isAnimated:this.config.animated,initialState:this.config.initialState,bsModalService:this,id:this.config.id}),r.instance&&(r.instance.level=this.getModalsCount(),s.content=n.getInnerComponent(),s.id=r.instance.config?.id),s}_hideModal(e){if(null!=e){const n=this.loaders.findIndex(r=>r.instance?.config.id===e),s=this.loaders[n];s&&s.hide(e)}else this.loaders.forEach(n=>{n.instance&&n.hide(n.instance.config.id)})}getModalsCount(){return this.modalsCount}setDismissReason(e){this.lastDismissReason=e}removeBackdrop(){this._renderer.removeClass(document.body,"modal-open"),this._renderer.setStyle(document.body,"overflow-y",""),this._backdropLoader.hide(),this.backdropRef=void 0}checkScrollbar(){this.isBodyOverflowing=document.body.clientWidth<window.innerWidth,this.scrollbarWidth=this.getScrollbarWidth()}setScrollbar(){!document||(this.originalBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")||"0",10),this.isBodyOverflowing&&(document.body.style.paddingRight=`${this.originalBodyPadding+this.scrollbarWidth}px`))}resetScrollbar(){document.body.style.paddingRight=`${this.originalBodyPadding}px`}getScrollbarWidth(){const e=this._renderer.createElement("div");this._renderer.addClass(e,"modal-scrollbar-measure"),this._renderer.appendChild(document.body,e);const n=e.offsetWidth-e.clientWidth;return this._renderer.removeChild(document.body,e),n}_createLoaders(){const e=this.clf.createLoader();this.copyEvent(e.onBeforeShow,this.onShow),this.copyEvent(e.onShown,this.onShown),this.copyEvent(e.onBeforeHide,this.onHide),this.copyEvent(e.onHidden,this.onHidden),this.loaders.push(e)}removeLoaders(e){if(null!=e){const n=this.loaders.findIndex(s=>s.instance?.config.id===e);n>=0&&(this.loaders.splice(n,1),this.loaders.forEach((s,r)=>{s.instance&&(s.instance.level=r+1)}))}else this.loaders.splice(0,this.loaders.length)}copyEvent(e,n){e.subscribe(s=>{n.emit(this.lastDismissReason||s)})}}return t.\u0275fac=function(e){return new(e||t)(o.LFG(o.FYo),o.LFG(p.oj),o.LFG(G,8))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"platform"}),t})();E.forRoot();let z=(()=>{class t{static forRoot(){return{ngModule:t,providers:[b,p.oj,C.sA]}}static forChild(){return{ngModule:t,providers:[b,p.oj,C.sA]}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[E]]}),t})()}}]);