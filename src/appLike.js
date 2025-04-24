
const { QMainWindow, QLabel, QWidget, FlexLayout } = require ("@nodegui/nodegui");

const win = new QMainWindow();
win.setWindowTitle('Exploring NodeGui');
//win.setMinimumWidth(400);
//win.setMinimumHeight(400);
//win.setGeometry(100, 100, 800, 600);
win.setObjectName('mainWindow');

const view = new QWidget();
view.setObjectName("rootView");
view.setLayout(new FlexLayout());

const label1 = new QLabel();
label1.setText('Hello world again');
label1.setObjectName("label1");
label1.setInlineStyle("color: green; background-color: white;");

const label2 = new QLabel();
label2.setText('Hi developers!');
label1.setObjectName("label2");
label2.setInlineStyle("color: blue; background-color: gray;");

view.layout.addWidget(label1);
view.layout.addWidget(label2);

win.setCentralWidget(view);
win.show();

global.win = win;