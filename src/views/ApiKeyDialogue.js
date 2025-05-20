
import { FlexLayout, QDialog, QIcon, QLabel, QLineEdit, QPushButton } from "@nodegui/nodegui";

import { resolvePath } from "../../config/paths.js";

export function ApiKeyDialogue() {
    let SecretWord = "ABRACADABRA";
    let attempts = 3; // Number of attempts allowed
    

  const dialog = new QDialog();
  dialog.setMinimumWidth(400);
  dialog.setWindowTitle("SECRET CODE");
  const dialogIcon = new QIcon(resolvePath.asset('Kitty.png'));
  dialog.setWindowIcon(dialogIcon);
  const dialogLayout = new FlexLayout();
  dialog.setLayout(dialogLayout);
  const attemptsLabel = new QLabel();

   const label = new QLabel();
  label.setText('Enter the secret code below:');
  label.setInlineStyle(`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  `);
  const input = new QLineEdit();
  const okButton = new QPushButton();
  okButton.setText('OK');
  okButton.addEventListener('clicked', () => {
    if (input.text() !== SecretWord) {
      label.setText('Incorrect code. Please try again.');
      label.setInlineStyle(`
        color: red;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      `);
      attempts--;
        input.clear(); // Clear the input field
        attemptsLabel.setText(`Attempts left: ${attempts}`);
        attemptsLabel.setInlineStyle(`
            color: red;
            font-size: 16px;
            margin-bottom: 10px;
        `);
        dialogLayout.addWidget(attemptsLabel);
      if (attempts === 0) {
        label.setText('No attempts left. Exiting...');
        label.setInlineStyle(`
            color: red;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        `);
        dialog.reject(); // Close the dialog on incorrect code

        // Optionally, you can exit the application here
        // app.quit();
      }
      return;
    } else {
        label.setText('Correct code! You can now use the app.');
        label.setInlineStyle(`
            color: green;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        `);

        dialog.accept(); // Close the dialog on correct code

    }
  });
  dialogLayout.addWidget(label);
  dialogLayout.addWidget(input);
  dialogLayout.addWidget(okButton);

    dialog.setInlineStyle(`
    padding: 10;
    height: 150px;
    flex-direction: 'column';
    align-items:'center';
    justify-content: 'space-around';
  `);



    dialog.exec();




}