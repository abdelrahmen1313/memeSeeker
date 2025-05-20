import { QIcon } from "@nodegui/nodegui";

import { resolvePath } from "../../config/paths.js";

const mainIconPath = resolvePath.asset('Kitty.png');
export const sysTrayIcon = new QIcon(mainIconPath);