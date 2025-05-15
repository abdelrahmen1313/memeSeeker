import { QMessageBox, ButtonRole, QPushButton } from '@nodegui/nodegui';

import { QIcon } from '@nodegui/nodegui';

import { ASSETS_DIR } from "../../config/paths.js";
import path from "path";
const iconPath = path.join(ASSETS_DIR, "Kitty.png");


export function showModal(title, details) { 
 
    const modal = new QMessageBox();
    modal.setText(title);
    modal.setDetailedText(details);
    modal.setWindowTitle("memeSeeker");
    const icon = new QIcon(iconPath);
    modal.setWindowIcon(icon);

    const OKButton = new QPushButton();
    OKButton.setText("OK");
    OKButton.addEventListener("clicked", () => {
        modal.close();
    });
    modal.addButton(OKButton, ButtonRole.AcceptRole);

    modal.exec();
}