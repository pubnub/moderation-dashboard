// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "@testing-library/jest-dom";

Enzyme.configure({ adapter: new Adapter() });

// The PubNub SDK (v8+) needs TextEncoder/TextDecoder, which the jsdom version used by react-scripts 4
// doesn't provide. It also reads `fetch` from a hidden iframe, and jsdom iframes have no `fetch`, so
// reuse the window's (polyfilled) one there.
import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === "undefined") global.TextDecoder = TextDecoder;

const iframeContentWindow = Object.getOwnPropertyDescriptor(
  window.HTMLIFrameElement.prototype,
  "contentWindow"
);
Object.defineProperty(window.HTMLIFrameElement.prototype, "contentWindow", {
  get() {
    const contentWindow = iframeContentWindow.get.call(this);
    if (contentWindow && !contentWindow.fetch) contentWindow.fetch = window.fetch;
    return contentWindow;
  },
});
