import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
  session: {
    type?: 'save' | 'getAll' | 'get' | 'edit' | 'delete';
  };
}
