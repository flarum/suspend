/// <reference types="flarum/@types/translator-icu-rich" />
export default class SuspendUserModal {
    oninit(vnode: any): void;
    status: any;
    reason: any;
    message: any;
    daysRemaining: any;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
    radioItems(): ItemList<any>;
    formItems(): ItemList<any>;
    onsubmit(e: any): void;
    loading: boolean | undefined;
}
import ItemList from "flarum/common/utils/ItemList";
