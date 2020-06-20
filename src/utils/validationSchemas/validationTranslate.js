import I18n from 'i18n-js';
import translations from '../../translations';

I18n.translations = translations;
I18n.locale = 'es';

const validationTranslate = (key, constraint) => {
  const keyTranslated = I18n.t(`keys.${key}`);
  const message = I18n.t(`validationInput.${constraint}`, { key: keyTranslated });

  return message;
};

export default validationTranslate;
