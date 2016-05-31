interface Buttons {
  holder: string;
  ok: string;
  cancel: string
}

interface Dialog {
  buttons: Buttons;
  input: string;
  message: string;
  log: string;
}