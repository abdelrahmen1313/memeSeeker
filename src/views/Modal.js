import { QMessageBox, ButtonRole, QPushButton } from '@nodegui/nodegui';

import { QIcon } from '@nodegui/nodegui';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.resolve(__dirname, "../../assets");


export function showModal(title, details) { 
 
    const modal = new QMessageBox();
    modal.setText(title);
    modal.setDetailedText(details);
    modal.setWindowTitle("memeSeeker");
    let iconPath = path.join(assetsPath, "Kitty.png");
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