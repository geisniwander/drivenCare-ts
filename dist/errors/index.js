function conflictError(message) {
    return {
        name: "ConflictError",
        message: "Conflito",
    };
}
function ConflictDateError(message) {
    return {
        name: "ConflictDateError",
        message: "A data/hor\u00E1rio n\u00E3o est\u00E3o dispon\u00EDveis (consulta agendada no hor\u00E1rio ou fora do hor\u00E1rio de atendimento). Lembre-se: o hor\u00E1rio de funcionamento \u00E9 entre\n      as 07:00:00 horas e as 18:00:00 e s\u00F3 \u00E9 poss\u00EDvel agendar consultas em horarios cheios ou com meia hora, como: 07:00:00, 07:30:00, 08:00:00.",
    };
}
function duplicatedEmailError(email) {
    return {
        name: "DuplicatedEmailError",
        message: "O email informado já está sendo utilizado!",
        email: email,
    };
}
function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "Você precisa realizar login para continuar",
    };
}
function notFoundError() {
    return {
        name: "NotFoundError",
        message: "Não encontrado!",
    };
}
function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Credenciais incorretas",
    };
}
function invalidAppointmentError() {
    return {
        name: "InvalidAppointmentError",
        message: "Consulta não encontrada",
    };
}
export default {
    conflictError: conflictError,
    duplicatedEmailError: duplicatedEmailError,
    unauthorizedError: unauthorizedError,
    notFoundError: notFoundError,
    invalidCredentialsError: invalidCredentialsError,
    ConflictDateError: ConflictDateError,
    invalidAppointmentError: invalidAppointmentError,
};
