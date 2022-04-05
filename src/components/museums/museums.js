import { useEffect, useState } from "react";

function Museums() {
  const url = "https://back-museums-uniandes.herokuapp.com/api/museums";

  const [museums, setMuseums] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((museums) => {
        setMuseums(museums);
      });
  })
  return (
    <div>
      <div id="lista-museos" className="div-lista-museos">
        <div className="row">
          {museums.map((museum) => {
            return (
              <div key={"key_"+museum.id} className="col-3">
                <div
                  onClick={() => {
                    abrir(museum.id, museum.name);
                  }}
                  id={"museo_" + museum.id}
                  className="rectangulo-museo"
                >
                  <div className="imagen-museo">
                    <img
                      className="img-fluid"
                      src={museum.image}
                      alt={"foto del museo " + museum.name}
                    />
                  </div>
                  <div className="nombre-museo">{museum.name}</div>
                  <div className="ciudad-museo">{museum.city}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {museums.map((museum) => {
        return (
          <div
            key={"key_detalle_"+museum.id} 
            id={"detalle-museo-" + museum.id}
            className="div-museo-detallado d-none"
          >
            {museum.artworks.map((obra) => {
              return (
                <div key={"key_obra_"+obra.id}  className="row">
                  <div className="col-3">
                    <div className="rectangulo-obra">
                      <div className="imagen-museo">
                        <img
                          className="img-fluid"
                          src="https://img.freepik.com/vector-gratis/dibujo-linea-continua-rostro-femenino-caprichoso-arte-linea-abstraccion-silueta-mujer_121070-406.jpg"
                          alt="Obra de arte generica"
                        />
                      </div>
                      <div className="nombre-museo">{obra.name}</div>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="detalles-museo">
                      <p className="texto-detalle-museo">{obra.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function abrir(idMuseo, nombreMuseo) {
  document.getElementById("lista-museos").classList.add("d-none");
  document
    .getElementById("detalle-museo-" + idMuseo)
    .classList.remove("d-none");
  document
    .getElementById("titulo-barra")
    .innerText = "MUSEO " + nombreMuseo + ": Obras principales";
  document.getElementById("titulo-barra").addEventListener("click", ()=>{volverHome(idMuseo)});
}

function volverHome(idMuseo) {
  document.getElementById("lista-museos").classList.remove("d-none");
  document
    .getElementById("detalle-museo-" + idMuseo)
    .classList.add("d-none");
    document
    .getElementById("titulo-barra")
    .innerText = "MUSEOS" ;
}

export default Museums;
