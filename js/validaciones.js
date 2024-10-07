let cont = 0;
let rdn = 0;
const captchas = [
    {
        "url":"\\img\\cap1.png",
        "captcha":"68752"
    },
    {
        "url":"\\img\\cap2.png",
        "captcha":"s7Ea2ñ"
    },
    {
        "url":"\\img\\3.png",
        "captcha":"2W4M"
    },
];


function validar(){
        let pass = document.getElementById('password');
        let res = revisar(pass.value)
        console.log(res);
        let msg = "";
        for(let value of res){
            msg+=value;
        }

        if(res.length>0){
            cont++;
            alert(msg);

            if(cont>=3){
                pass.disabled = true;
                let user = document.getElementById('username');
                user.disabled = true;
            }
        }else{
            rdn = Math.floor(Math.random() * (3 - 0) + 0);
            let image = document.querySelector("#modal-body img");
            image.setAttribute("src", captchas[rdn].url);
            open();
            //window.location.href='lol.html';
        }
}

function revisar(password){
    let errores = [];
    if(password.length<8){
        errores.push("La contraseña debe contener almenos 8 caracteres\n");
    }

    if (!password.match(/[a-z]/) ) {
        errores.push("La contraseña debe contener almenos una letra minuscula\n");
    }

    if (!password.match(/[A-Z]/) ) {
        errores.push("La contraseña debe contener almenos una letra mayuscula\n");
    }

    if (!password.match(/[$@$!%*?&]/) ) {
        errores.push("La contraseña debe contener almenos un caracter especial\n");
    }

        return errores;
}

function Captched(){
    let text = document.querySelector("#captcha").value;
    //console.log(text);
    if(text===captchas[rdn].captcha)
    {
        window.location.href='lol.html';
    }
    else
    {
        alert("texto incorrecto");
        cont++;
        if(cont>=3){
            close();
            document.getElementById('username').disabled = true;
            document.getElementById('password').disabled = true;
        }
    }
}

//var openModal = document.getElementById('open_modal');
        var closeModal = document.getElementById('close_modal');
        var fondoModal = document.getElementById('fondoModal');
        var modal = document.getElementById('modal');

function close(){
	modal.style.display = "none";
	fondoModal.style.display = "none";
}

function open(){
	modal.style.display = "block";
	fondoModal.style.display = "block";
}

//openModal.addEventListener('click', open);
closeModal.addEventListener('click', close);
fondoModal.addEventListener('click', close);

// Función para mostrar mensajes de confirmación
function mostrarMensaje(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    elemento.innerText = mensaje;
    elemento.style.display = 'block'; // Muestra el mensaje
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(function() {
        elemento.style.display = 'none';
    }, 3000);
}

// Evento para el botón de guardar usuario
document.getElementById('guardarUsuario').addEventListener('click', function() {
    mostrarMensaje('mensajeUsuario', 'Usuario guardado exitosamente.');
});

// Evento para el botón de eliminar usuario
document.getElementById('eliminarUsuario').addEventListener('click', function() {
    mostrarMensaje('mensajeUsuario', 'Usuario eliminado.');
});

// Evento para el botón de modificar usuario
document.getElementById('modificarUsuario').addEventListener('click', function() {
    mostrarMensaje('mensajeUsuario', 'Usuario modificado.');
});

// Evento para el botón de cancelar usuario
document.getElementById('cancelarUsuario').addEventListener('click', function() {
    document.getElementById('userForm').reset();
    mostrarMensaje('mensajeUsuario', 'Formulario de usuario cancelado.');
});

// Evento para el botón de guardar producto
document.getElementById('guardarProducto').addEventListener('click', function() {
    mostrarMensaje('mensajeProducto', 'Producto guardado exitosamente.');
});

// Evento para el botón de eliminar producto
document.getElementById('eliminarProducto').addEventListener('click', function() {
    mostrarMensaje('mensajeProducto', 'Producto eliminado.');
});

// Evento para el botón de modificar producto
document.getElementById('modificarProducto').addEventListener('click', function() {
    mostrarMensaje('mensajeProducto', 'Producto modificado.');
});

// Evento para el botón de cancelar producto
document.getElementById('cancelarProducto').addEventListener('click', function() {
    document.getElementById('productForm').reset();
    mostrarMensaje('mensajeProducto', 'Formulario de producto cancelado.');
});


