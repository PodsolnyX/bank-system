export const getRatingText = (max: number, rating: number | null | undefined) => {
  if (rating == undefined) {
    return 'Ваш рейтинг не определен'
  }

  if (rating < max * 0.2) {
    return 'У Вас низкий рейтинг'
  }

  if (rating < max * 0.4) {
    return 'У Вас средний рейтинг'
  }

  if (rating < max * 0.6) {
    return 'У Вас хороший рейтинг'
  }

  return 'У Вас отличный рейтинг!'
}
