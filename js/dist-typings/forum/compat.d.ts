declare const _default: {
    'suspend/components/suspendUserModal': typeof SuspendUserModal;
    'suspend/components/suspensionInfoModal': typeof SuspensionInfoModal;
    'suspend/components/UserSuspendedNotification': typeof UserSuspendedNotification;
    'suspend/components/UserUnsuspendedNotification': typeof UserUnsuspendedNotification;
    'suspend/helpers/suspensionHelper': typeof suspensionHelper;
    'suspend/checkForSuspension': typeof checkForSuspension;
};
export default _default;
import SuspendUserModal from "./components/SuspendUserModal";
import SuspensionInfoModal from "./components/SuspensionInfoModal";
import UserSuspendedNotification from "./components/UserSuspendedNotification";
import UserUnsuspendedNotification from "./components/UserUnsuspendedNotification";
import * as suspensionHelper from "./helpers/suspensionHelper";
import checkForSuspension from "./checkForSuspension";
