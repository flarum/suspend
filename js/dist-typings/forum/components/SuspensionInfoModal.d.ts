/// <reference types="flarum/@types/translator-icu-rich" />
export default class SuspensionInfoModal extends Modal<import("flarum/common/components/Modal").IInternalModalAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    message: any;
    until: any;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
}
import Modal from "flarum/common/components/Modal";
