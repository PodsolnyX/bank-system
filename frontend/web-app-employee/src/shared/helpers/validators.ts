export const validators = {
    required: "Обязательное поле",
    fullNamePattern: {
        value: /^([А-ЯЁA-Z][а-яЁёa-zА-ЯA-Z\\-]+\s?){2,}\s*$/,
        message: "Некорректный формат"
    },
    nickNamePattern: {
        value: /^([А-ЯЁA-Z][а-яЁёa-zА-ЯA-Z\\-]+\s?)+\s*$/,
        message: "Некорректный формат"
    },
    emailPattern: {
        value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
        message: "Некорректный формат"
    },
    passwordPattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/,
        message: "Некорректный формат"
    }
}