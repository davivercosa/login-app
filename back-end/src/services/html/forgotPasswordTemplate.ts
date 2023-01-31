export default function forgotPasswordTemplate(link: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login App - Davi Verçosa</title>
    </head>
    <body>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 1rem;
        "
      >
        <h2>A big hello, from our master:Davi Verçosa 🦩</h2>
        <div style="display: flex; flex-direction: column; align-items: center">
          <p>
            If you wish to recover your password, please follow the link bellow:
          </p>
          <a href=${link}>Login App</a>
        </div>
  
        <strong style="margin-top: 1rem">
          <small
            >* if it was not you who requested the password change, please
            disregard this e-mail</small
          >
        </strong>
      </div>
    </body>
  </html>
  `;
}
