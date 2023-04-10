import joi from "joi";
export var appointmentSchema = joi
    .object({
    doctor_id: joi.number().required(),
    date: joi.date().required(),
    hour: joi
        .string()
        .pattern(/^([01]\d|2[0-3]):(00|30)(:[0-5]\d)?$/i)
        .custom(function (value, helpers) {
        var _a = value.split(":"), hour = _a[0], minute = _a[1];
        if (hour < 7 || hour >= 18 || (minute !== "00" && minute !== "30")) {
            return helpers.error("hourError");
        }
        return value;
    }, "validate working hours")
        .required(),
})
    .messages({
    hourError: "A data/hor\u00E1rio n\u00E3o est\u00E3o dispon\u00EDveis (consulta agendada no hor\u00E1rio ou fora do hor\u00E1rio de atendimento). Lembre-se: o hor\u00E1rio de funcionamento \u00E9 entre\n  as 07:00:00 horas e as 18:00:00 e s\u00F3 \u00E9 poss\u00EDvel agendar consultas em horarios cheios ou com meia hora, como: 07:00:00, 07:30:00, 08:00:00",
});
