export const getRatingText = (rating: number | null | undefined) => {
    if (rating == undefined) {
        return 'Ваш рейтинг не определен'
    }

    if (rating < 200) {
        return 'У Вас низкий рейтинг'
    }

    if (rating < 500) {
        return 'У Вас средний рейтинг'
    }

    if (rating < 1000) {
        return 'У Вас хороший рейтинг'
    }

    return 'У Вас отличный рейтинг!'
}