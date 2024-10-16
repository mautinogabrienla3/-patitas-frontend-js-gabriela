window.addEventListener("load", function () {
  const msgSuccess = this.document.getElementById("msgSuccess");

  const btnCerrarSesion = this.document.getElementById("btnCerrarSesion");

  const user = JSON.parse(this.localStorage.getItem("result"));

  mostrarAlerta(`Bienvenido ${user.nombreUsuario}`);

  btnCerrarSesion.addEventListener("click",()=> cerrarSesion(user));
});

function mostrarAlerta(mensaje) {
  msgSuccess.innerHTML = mensaje;
  msgSuccess.style.display = "block";
}

async function cerrarSesion(user) {
  const url = "http://localhost:8082/autenticacion/logout-async";
  const request = {
    tipoDocumento: user?.tipoDocumento,
    numeroDocumento: user?.numeroDocumento,
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
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.resultado) {
      localStorage.clear();
      window.location.replace("login.html");
    } else {
      console.log("Error: " + result.mensajeError);
    }
  } catch (error) {
    console.log("Error al cerrar sesión", error);
  }
}
