export function validateForm(ref) {
  if (!ref) return false;

  // Ищем ref в html-элементах, Vue-компонентах, и если не находим, подставляем ref как есть, на всякий случай
  const form = ref instanceof HTMLFormElement ? ref : ref.$el?.querySelector('form') || ref;

  if (form.checkValidity()) return true;

  // Вызываем сообщение о проваленной валидации на форме
  form.reportValidity();
  return false;
}