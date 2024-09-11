import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(process.env.BUTTON_SAVE, 'save'),
      Markup.button.callback(process.env.BUTTON_GET_ALL, 'getAll'),
      Markup.button.callback(process.env.BUTTON_GET_ONE, 'getOne'),
      Markup.button.callback(process.env.BUTTON_DELETE, 'delete'),
    ],
    // { columns: 2 },
  );
}
