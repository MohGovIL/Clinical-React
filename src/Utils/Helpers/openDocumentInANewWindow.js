import { decodeBase_64IntoBlob } from './decodeBase_64IntoBlob';

const openDocumentInANewWindow = (doc) => {
  if (doc) {
    window.open(
      URL.createObjectURL(decodeBase_64IntoBlob(doc.data, doc.contentType)),
      doc.name,
    );
  } else {
    var myWindow = window.open('', 'MsgWindow');
    myWindow.document.write(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1">

                      <title>Error 204</title>

      </head>
      <body>
      <div style="position: relative;height: 100vh;">
          <div style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);    transform: translate(-50%,-50%);">
              <div style="position: relative;height: 240px;">
                  <h3 style="font-family: Cabin, sans-serif;position: relative;font-size: 16px;font-weight: 700;text-transform: uppercase;color: rgb(38, 38, 38);letter-spacing: 3px;padding-left: 6px;margin: 0px;">Oops! No content</h3>
                  <h1 style="font-family: Montserrat, sans-serif;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);font-size: 252px;font-weight: 900;color: rgb(38, 38, 38);text-transform: uppercase;letter-spacing: -40px;margin: 0px 0px 0px -20px;"><span style="text-shadow: -8px 0 0 #fff;">2</span><span  style="text-shadow: -8px 0 0 #fff;">0</span><span  style="text-shadow: -8px 0 0 #fff;">4</span></h1>
              </div>
              <h2>we are sorry, but no image was found in order to render it</h2>
          </div>
      </div>

      </html>`,
    );
  }
};

export default openDocumentInANewWindow;
