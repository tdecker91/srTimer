!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["sr-timer"]=e():t["sr-timer"]=e()}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>r});var i=function(){function t(){}return t.Space=32,t}();function n(t,e){for(var i=t.toString(),n=i.length,s=0;s<e-n;s++)i="0"+i;return i}function s(t){if(null==t)return"00:00.00";var e=Math.floor(t/1e3/60/60),i=Math.floor(t%36e5/1e3/60),s=Math.floor(t%36e5%6e4/1e3),r=Math.floor(t%36e5%6e4%1e3);return(e>0?n(e,2)+":":"")+n(i,2)+":"+n(s,2)+"."+(2,n(r,3).substring(0,2))}const r=function(){function t(t,e){void 0===t&&(t=i.Space),void 0===e&&(e=15),this.startTime=0,this.endTime=0,this.running=!1,this.isReset=!1,this.startListeners=[],this.stopListeners=[],this.resetListeners=[],this.tickListeners=[],this.timerKey=t,this.tickInterval=e,this.unbind=this.bind()}return t.prototype.bind=function(){if(!this.timerKey)return function(){};var t=this.onKeyUp.bind(this),e=this.onKeyDown.bind(this);return window.addEventListener("keyup",t),window.addEventListener("keydown",e),function(){window.removeEventListener("keyup",t),window.removeEventListener("keydown",e)}},t.prototype.tickTimer=function(){var t=this.getRawElapsedTime(),e={time:t,displayTime:s(t)};this.fireListeners(this.tickListeners,e)},t.prototype.onKeyUp=function(t){var e=this;(t.keyCode?t.keyCode:t.which)===this.timerKey&&(this.running?(this.stop(),clearInterval(this.ticker)):(this.start(),this.ticker=setInterval((function(){return e.tickTimer()}),this.tickInterval)))},t.prototype.onKeyDown=function(t){(t.keyCode?t.keyCode:t.which)===this.timerKey&&(this.running||this.reset())},t.prototype.fireListeners=function(t,e){t.forEach((function(t){t(e)}))},t.prototype.getRawElapsedTime=function(){return null==this.startTime?0:(this.running?new Date((new Date).getTime()-this.startTime):new Date(this.endTime-this.startTime)).getTime()},t.prototype.start=function(){this.isReset=!1,this.running=!0,this.startTime=(new Date).getTime(),this.fireListeners(this.startListeners,null)},t.prototype.stop=function(){this.running=!1,this.endTime=(new Date).getTime();var t={time:this.getRawElapsedTime(),displayTime:this.getElapsedTime()};this.fireListeners(this.stopListeners,t)},t.prototype.reset=function(){this.isReset||(this.isReset=!0,this.startTime=void 0,this.fireListeners(this.resetListeners,null))},t.prototype.isRunning=function(){return this.running},t.prototype.getElapsedTime=function(){return null==this.startTime?s(this.startTime):s(this.getRawElapsedTime())},t.prototype.addStartListener=function(t){this.startListeners.push(t)},t.prototype.addStopListener=function(t){this.stopListeners.push(t)},t.prototype.addResetListener=function(t){this.resetListeners.push(t)},t.prototype.addTickListener=function(t){this.tickListeners.push(t)},t}();return e})()));
//# sourceMappingURL=main.js.map