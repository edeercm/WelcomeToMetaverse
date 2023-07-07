export function valida (input) {
    const tipoInput = input.dataset.tipo;

    if(validadores[tipoInput]) {
        validadores[tipoInput](input) 
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input__container--invalid");
        input.parentElement.querySelector(".input__message-error").innerHTML = "";
    } else
        input.parentElement.classList.add("input__container--invalid");
        input.parentElement.querySelector(".input__message-error").innerHTML = mostrarMensajeError(tipoInput, input);
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesError = {
    nombre: {
      valueMissing: "This field can not be blank",
    },
    email: {
      valueMissing: "This field can not be blank",
      typeMismatch: "The email is invalid",
    },
    password: {
      valueMissing: "This field can not be blank",
      patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "This field can not be blank",
      customError: "You must be at least 18 years old",
    },
    numero: {
        valueMissing: "This field can not be blank",
        patternMismatch: "The required format is 10 numbers"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input) {
    let mensaje = ""
    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesError[tipoInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input) {

    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if (!mayorEdad(fechaCliente)) {
        mensaje = "You must be at least 18 years old";
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad (fecha) {

    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual;
}