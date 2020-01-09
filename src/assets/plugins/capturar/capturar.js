/*   function myTest() {

      html2canvas(document.querySelector("#capture")).then(canvas => {
          let captura = document.body.appendChild(canvas);
          console.log(captura)
          console.log(canvas)

      });
  }
 */
function capture() {

    html2canvas(document.querySelector("#capture")).then(canvas => {
        let captura = document.getElementById('mensaje').innerHTML = canvas.toDataURL();
        let attach = canvas.toDataURL()
            /*  console.log(attach) */
        return captura;
    });
}



/* function myTest() {

    window.onload = function() {
        document.getElementById('mensaje').innerHTML = "Hola";
        alert('Hola')
    }
} */


/* window.onload = function() {
    myTest();

    function myTest() {
        document.getElementById('mensaje').innerHTML = '<p>hi</p>';
    };
} */