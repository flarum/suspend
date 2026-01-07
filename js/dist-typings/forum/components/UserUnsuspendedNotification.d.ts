/// <reference types="flarum/@types/translator-icu-rich" />
export default class UserUnsuspendedNotification {
    icon(): string;
    href(): string;
    content(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
}
