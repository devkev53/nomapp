# 💵 NOMAPP 💱
## La aplicacion de control de nominas multiempresa

NOMAPP es una aplicacion que te ofrece manejar la nomina de multipes empresas, manejar pagos y creditos del personal de las empreas.

# ⚙️ Información Técnica
Para la creacion de NOMAPP se utilziaron proyectos de codigo abierto para funcioanr correctamente y facilitar el desarrollo.

<span style="margin-left:30px;display:flex; width:100%; red; align-items:center; gap:5px; margin-bottom: 10px">
  <a style="display:flex; align-items:center; gap:5px">
    <img src="./core/static/imgs/python_logo.png" style="object-fit:cover; height: 30px; display:flex" />
    Python
  </a>
  para la creacion del backend.
</span>

<span style="margin-left:30px;display:flex; width:100%; red; gap:5px; margin-bottom: 10px; align-items:center">
  <a style="display:flex; align-items:center; gap:5px">
    <img src="./core/static/imgs/docker_logo.png" style="object-fit:cover; height: 30px; display:flex" />
    Docker
  </a>
  para la creacion del backend.
</span>

<span style="margin-left:30px;display:flex; width:100%; red; gap:5px; margin-bottom: 10px; align-items:center">
  <a style="display:flex; align-items:center; gap:5px">
    <img src="./core/static/imgs/node_logo.svg" style="object-fit:cover; height: 30px; display:flex" />
    Node JS
  </a>
  para la instalacion de paquetes requeridos por el frontend.
</span>

# 🚀 Instalación

NOMAPP esta creado con un backend en python con ayuda de Django y con el frontend con la ayuda de React.js, por lo que dependiendo de cual de estos desee isntalar o correr debera seguir los sigueintes pasos:

<a style="display:flex; gap: 5px; font-size: 25px; color: rgba(12,75,51); font-weight:bold; align-items:center; margin-bottom: 20px;margin-top: 0">
  <img style="height: 40px; border-radius:100%" src="./core/static/imgs/django_logo.png" />
  Django
</a>

Rquiere <a href="https://www.python.org">Python</a> v3.8+ o una version mayor para correr.
Asi como de requiere que se cuente con <a href="https://pip.pypa.io/en/stable/installation/">pip</a> instalado el cual es manejador de paquetes de <a href="https://www.python.org">Python</a>

- Se recomienda el uso de un entorno virtual para controlar de mejor manera las dependencias a instalar.
\
  En lo personal utilizamos el paquete virtualenwrapper para el manejo de los entornos virtuales este se instala con el comando
  ```sh
  # Si se utiliza un sistema operativo basado en linux
  pip install virtualenvwrapper

  # En caso de ser un sistema operativo windows
  pip install virtaulenvwrapper-win
  ```
  Luego que se tiene instalado el paquete se procede a realizar el ingresar el siguiente comando

  ```sh
  # Creacion del entorno virtual
  mkvirtualenv #nombre del entorno

  # Al crear el entorno este se activa automaticamente
  ```
  tal como se muestra en la siguiente imagen podemos ver el entorno virtual activo llamado **nomapp**
  <img src="./core/static/imgs/ejemplo_env.png" style="border-radius:5px">
  caso contrario si lo que deseamos es activar nuestro entorno virtual debemos ingresar el comando **workon** seguido del nombre de entorno


  ```sh
    workon #nombre del entorno
  ```
  En la siguiente imagen podemos obeservar el uso del comando workon
  <img src="./core/static/imgs/workon.png" style="border-radius:5px">
  gracias a plugins que se tienen instalados en mi terminal esta muestra los posibles entornos en el equipo sin embargo lo que continua luego del comapndo workon es el nombre del entorno en el cual se esta trabajando.

Instalar las dependencias, verifique el se encuentre el documento requirements.txt en la raiz del proyecto.
```sh
pip install -r requirements.txt
```
Recolectar los archivos estaticos, para este punto se debio realizar el build de react, para tener los ultimos cambios y cargar los estaticos que servira Django, se debe de aseguar de encontrarse a mismo nivel que el archivo manage.py.
```sh
python manage.py collectstatic
```
Configurar Base de Datos, dependiendo de que base de datos se dese utilizar se debera configurar esta configuracion se encuentra en local.py que se encuentra en la carpeta app/settings/

```sh
# Configuracion para usar Base de Datos predeterminada
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Configuracion para usar Base de Datos de postgresql
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'database_name',
        'USER': 'user_postgres',
        'PASSWORD': 'password_user',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

Crear y correr las migraciones, este comando se utiliza para crear o modificar las migraciones que manejan los cambios en la base de datos del ORM de django.

```sh
# Crea las migraciones para la modificacion en Base de Datos
python manage.py makemigrations
# Corre las migraciones y realiza los cambios en la base de datos
python manage.py migrate
```

👨‍💻 Correr el proyecto..! Si se realizaron correctamente todas las configuraciones y se corrieron con exito los comandos anteriroes el proyecto se correra en el puerto 8000, si desea cambiar el puerto se le debe especificar en el siguiente comando.
```sh
# Corre el proyecto en el puerto 8000
python manage.py runserver

# Corre el proyecto en el puerto especificado
python manage.py runsever 'Puerto'
```

<a style="display:flex; gap: 5px; font-size: 25px; color: rgba(8,126,164); font-weight:bold; align-items:center; margin-bottom: 20px;margin-top: 0">
  <img style="height: 40px;" src="./core/static/imgs/react_logo.png" />
  React
</a>