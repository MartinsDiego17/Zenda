export type Question = {
  value: string;
  title: string;
  content: string;
};

export const data_questions: Question[] = [
  {
    value: "what-is-zenda",
    title: "¿Qué es Zenda?",
    content:
      "Zenda es una plataforma que permite a profesionales de la salud mental gestionar su agenda y a los pacientes reservar sesiones de forma simple y ordenada.",
  },
  {
    value: "who-can-use-zenda",
    title: "¿Para quién está pensada la aplicación?",
    content:
      "Zenda está diseñada para profesionales de la salud mental y pacientes que buscan una forma clara y eficiente de gestionar y reservar sesiones.",
  },
  {
    value: "how-to-book-session",
    title: "¿Cómo puedo reservar una sesión?",
    content:
      "Solo necesitás crear una cuenta, elegir una modalidad de sesión, seleccionar un horario disponible y confirmar la reserva desde la plataforma.",
  },
  {
    value: "payment-required",
    title: "¿Es obligatorio abonar una seña?",
    content:
      "La seña puede ser obligatoria o no, dependiendo de la configuración definida por el profesional que administra la agenda.",
  },
  {
    value: "cancel-or-reschedule",
    title: "¿Puedo cancelar o reprogramar una sesión?",
    content:
      "Sí, podés solicitar la cancelación o reprogramación de una sesión desde tu cuenta, quedando sujeta a la aprobación del profesional.",
  },
];
