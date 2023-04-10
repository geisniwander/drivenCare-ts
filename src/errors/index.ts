interface Error {
  name: string;
  message: string;
}

interface ErrorEmail {
  name: string;
  message: string;
  email: string;
}

function conflictError(message: string[]): Error {
  return {
    name: "ConflictError",
    message: "Conflito",
  };
}

function ConflictDateError(message: Date): Error {
  return {
    name: "ConflictDateError",
    message: `A data/horário não estão disponíveis (consulta agendada no horário ou fora do horário de atendimento). Lembre-se: o horário de funcionamento é entre
      as 07:00:00 horas e as 18:00:00 e só é possível agendar consultas em horarios cheios ou com meia hora, como: 07:00:00, 07:30:00, 08:00:00.`,
  };
}

function duplicatedEmailError(email: string): ErrorEmail {
  return {
    name: "DuplicatedEmailError",
    message: "O email informado já está sendo utilizado!",
    email,
  };
}

function unauthorizedError(): Error {
  return {
    name: "UnauthorizedError",
    message: "Você precisa realizar login para continuar",
  };
}

function notFoundError(): Error {
  return {
    name: "NotFoundError",
    message: "Não encontrado!",
  };
}

function invalidCredentialsError(): Error {
  return {
    name: "InvalidCredentialsError",
    message: "Credenciais incorretas",
  };
}

function invalidAppointmentError(): Error {
  return {
    name: "InvalidAppointmentError",
    message: "Consulta não encontrada",
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  ConflictDateError,
  invalidAppointmentError,
};
