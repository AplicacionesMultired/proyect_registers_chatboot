function userCreated(): string {
  return` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation Message</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #e9ecef;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .confirmation-container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          text-align: center;
        }
        .confirmation-container h2 {
          color: #0a8827;
          margin-bottom: 20px;
        }
        .confirmation-container p {
          color: #495057;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .confirmation-container strong {
          color: #0e73d8;
        }
        .art-1 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 20px;
          text-align: justify;
        }
        .art-2 {
          font-size: .9rem;
          font-weight: 500;
          margin-top: 20px;
          text-align: start;
        }

        /* Media query for small screens */
        @media (max-width: 600px) {
          body {
            height: auto;
            padding: 20px;
          }
          .confirmation-container {
            padding: 20px;
            max-width: 100%;
          }
          .confirmation-container h2 {
            font-size: 1.5rem;
          }
          .confirmation-container p {
            font-size: 1rem;
          }
          .art-1, .art-2 {
            font-size: 0.9rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="confirmation-container">
        <h2>Grupo Empresarial Multired S.A.</h2>
        <article class="art-1">
          Nos complace informarle que en respuesta a su solicitud tramitada mediante el chat-bot de la compañía <strong>Gane Yumbo</strong>, el registro de usuario para el programa <strong>Cliente Fiel</strong> se ha realizado con éxito.
        </article>
        <p>
          Su inscripción le permitirá acumular puntos al momento de comprar sorteos de azar en nuestras sedes autorizadas y oficiales del municipio de yumbo (Valle Del Cauca). Agradecemos su confianza y le damos la bienvenida a nuestro programa de fidelización.
        </p>
        <article class="art-2">
          Atentamente:<br>
          <strong>Grupo Empresarial Multired S.A.</strong> <br>   
        </article>
      </div>
    </body>
    </html>
  `
}

export { userCreated }