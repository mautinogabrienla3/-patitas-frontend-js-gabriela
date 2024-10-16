window.addEventListener("load", function () {
  // INPUTS DEL FORMULARIO
  const tipoDocumento = this.document.getElementById("tipoDocumento");
  const numeroDocumento = this.document.getElementById("numeroDocumento");
  const password = this.document.getElementById("password");

  // BUTTON Q EJECUTA EL FORMULARIO
  const btnIngresar = this.document.getElementById("btnIngresar");

  // MENSAJE DE ERROR
  const msgError = this.document.getElementById("msgError");

  // LISTENER BUTTON
  btnIngresar.addEventListener("click", function () {
    if (
      tipoDocumento.value === null ||
      tipoDocumento.value.trim() === "" ||
      numeroDocumento.value === null ||
      numeroDocumento.value.trim() === "" ||
      password.value === null ||
      password.value.trim() === ""
    ) {
      mostrarAlerta("Error: Debe completar correctamente sus credenciales");
      return;
    }
    ocultarAlerta();
    autenticar();
  });
});

function mostrarAlerta(mensaje) {
  msgError.innerHTML = mensaje;
  msgError.style.display = "block";
}

function ocultarAlerta() {
  msgError.innerHTML = "";
  msgError.style.display = "none";
}

async function autenticar() {
  const url = "http://localhost:8082/autenticacion/login-async";

  const request = {
    tipoDocumento: tipoDocumento.value,
    numeroDocumento: numeroDocumento.value,
    password: password.value,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      mostrarAlerta("Error: Ocurrió un problema con la autenticación");
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.codigo === "00") {
      localStorage.setItem("result", JSON.stringify(result));
      window.location.replace("principal.html");
    } else {
      mostrarAlerta(result.mensaje);
    }
  } catch (error) {
    console.log("Error: Ocurrió un problema con la autenticación", error);
    mostrarAlerta("Error: Ocurrió un problema con la autenticación");
  }
}
