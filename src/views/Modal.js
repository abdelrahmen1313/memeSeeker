import { QMessageBox, ButtonRole, QPushButton } from '@nodegui/nodegui';


export function showModal(title, details) { 
 
    const modal = new QMessageBox();
    modal.setText(title);
    modal.setDetailedText(details);
    modal.setWindowTitle("Giphy App");
   // modal.setIcon(QMessageBox.Icon.Information);

    const OKButton = new QPushButton();
    OKButton.setText("OK");
    OKButton.addEventListener("clicked", () => {
        modal.close();
    });
    modal.addButton(OKButton, ButtonRole.AcceptRole);

    modal.exec();
}